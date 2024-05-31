import { PrismaClient } from '@prisma/client'
import { FollowsType } from '../types/types'
import FollowsDTO from '../dtos/FollowsDTO'
import ServiceResponseDTO from '../dtos/ServiceResponseDTO'
import CircleError from '../utils/CircleError'

const prisma = new PrismaClient()

class FollowServices {
    async follow(followsDTO: FollowsDTO): Promise<ServiceResponseDTO<FollowsType>> {
        try {
            if (this.isFollowItSelf(followsDTO)) {
                throw new CircleError({ error: "Can't follow itself." })
            }

            const isFollowed: FollowsType = await this.isFollowed(followsDTO)

            if (isFollowed) {
                throw new CircleError({ error: 'Target user is already followed.' })
            }

            const follows = await prisma.follow.create({
                data: followsDTO,
            })

            return new ServiceResponseDTO({
                error: false,
                payload: follows,
            })
        } catch (error) {
            return new ServiceResponseDTO({
                error: true,
                payload: error,
            })
        }
    }

    private isFollowItSelf(followsDTO: FollowsDTO): boolean {
        return followsDTO.followingId === followsDTO.followerId
    }

    private async isFollowed(followsDTO: FollowsDTO): Promise<FollowsType> {
        return await prisma.follow.findFirst({
            where: {
                AND: [
                    { followingId: followsDTO.followingId },
                    { followerId: followsDTO.followerId },
                ],
            },
        })
    }
}

export default new FollowServices()
