import { PrismaClient } from '@prisma/client'
import { UserType, FollowType } from '../types/types'
import ServiceResponseDTO from '../dtos/ServiceResponseDTO'
import UserDTO from '../dtos/UserDTO'

const prisma = new PrismaClient()

export interface UserWithFollowersType extends UserType {
    Followers?: FollowType[]
}

class UserServices {
    async getUsers(loggedUser: UserType): Promise<ServiceResponseDTO<UserType[]>> {
        try {
            const rawUsers: UserWithFollowersType[] = await prisma.user.findMany({
                include: {
                    Followers: true,
                },
            })

            const users: UserType[] = rawUsers
                .filter((user) => user.id !== loggedUser.id)
                .map((user) => {
                    const followers = user.Followers
                    delete user.Followers
                    delete user.password

                    if (followers.length) {
                        return {
                            ...user,
                            isFollowed: followers.some(
                                (follower) => follower.ownerId === loggedUser.id
                            ),
                        }
                    }

                    return {
                        ...user,
                        isFollowed: false,
                    }
                })

            return new ServiceResponseDTO<UserType[]>({
                error: false,
                payload: users,
            })
        } catch (error) {
            return new ServiceResponseDTO({
                error: true,
                payload: error,
            })
        }
    }

    async editUser(userDTO: UserDTO): Promise<ServiceResponseDTO<UserType>> {
        try {
            const requestedUser = await prisma.user.findUnique({
                where: {
                    id: userDTO.id,
                },
            })

            const editedUser = await prisma.user.update({
                where: {
                    id: userDTO.id,
                },
                data: this.DTOEditor(userDTO, requestedUser),
            })

            delete editedUser.password
            return new ServiceResponseDTO<UserType>({
                error: false,
                payload: editedUser,
            })
        } catch (error) {
            return new ServiceResponseDTO({
                error: true,
                payload: error,
            })
        }
    }

    private DTOEditor(newData: UserDTO, existingData: UserType): UserDTO {
        return new UserDTO({
            id: newData.id,
            username: newData.username || existingData.username,
            name: newData.name || existingData.name,
            avatar: newData.avatar || existingData.avatar,
            bio: newData.bio || existingData.bio,
        })
    }
}

export default new UserServices()
