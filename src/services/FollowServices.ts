import { PrismaClient } from '@prisma/client'
import FollowsDTO from '../dtos/FollowsDTO'
import ServiceResponseDTO from '../dtos/ServiceResponseDTO'
import CircleError from '../utils/CircleError'
import { FollowsType } from '../types/types'

const prisma = new PrismaClient()

class FollowServices {
    async follow(followsDTO: FollowsDTO): Promise<ServiceResponseDTO<FollowsType>> {
        try {
            if (followsDTO.followingId === followsDTO.followerId) {
                throw new CircleError({ error: "Can't follow itself." })
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
}

export default new FollowServices()
