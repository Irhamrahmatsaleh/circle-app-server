import { PrismaClient } from '@prisma/client'
import { LikeType } from '../types/types'
import LikeDTO from '../dtos/LikeDTO'
import ServiceResponseDTO from '../dtos/ServiceResponseDTO'

const prisma = new PrismaClient()

class LikeServices {
    async addLike(likeDTO: LikeDTO): Promise<ServiceResponseDTO<LikeType>> {
        try {
            const addedLike = await prisma.like.create({
                data: likeDTO,
            })

            return new ServiceResponseDTO<LikeType>({
                error: false,
                payload: addedLike,
            })
        } catch (error) {
            return new ServiceResponseDTO({
                error: true,
                payload: error,
            })
        }
    }
}

export default new LikeServices()
