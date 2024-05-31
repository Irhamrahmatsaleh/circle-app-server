import { PrismaClient } from '@prisma/client'
import { UserType } from '../types/types'
import ServiceResponseDTO from '../dtos/ServiceResponseDTO'
import UserDTO from '../dtos/UserDTO'

const prisma = new PrismaClient()

class UserServices {
    async getUsers(): Promise<ServiceResponseDTO<UserType[]>> {
        try {
            const users = await prisma.user.findMany()

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
