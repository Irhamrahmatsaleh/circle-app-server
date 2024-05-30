import { PrismaClient } from '@prisma/client'
import { LikeType } from '../types/types'
import LikeDTO from '../dtos/LikeDTO'
import ServiceResponseDTO from '../dtos/ServiceResponseDTO'

const prisma = new PrismaClient()

class LikeServices {
    async likeMechanism(likeDTO: LikeDTO): Promise<ServiceResponseDTO<LikeType>> {
        try {
            // check if the vibe already liked
            const isLiked: LikeType = await this.isLiked(likeDTO)

            if (isLiked) {
                // unlike the vibe
                const removedLike: LikeType = await this.removeLike(isLiked)
                return new ServiceResponseDTO<LikeType>({
                    error: false,
                    payload: removedLike,
                })
            }

            // like the vibe
            const addedLike: LikeType = await this.addLike(likeDTO)
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

    private async isLiked(likeDTO: LikeDTO): Promise<LikeType> {
        return await prisma.like.findFirst({
            where: {
                AND: [{ authorId: likeDTO.authorId }, { vibeId: likeDTO.vibeId }],
            },
        })
    }

    private async removeLike(likeData: LikeType): Promise<LikeType> {
        return await prisma.like.delete({
            where: {
                id: likeData.id,
            },
        })
    }

    private async addLike(likeDTO: LikeDTO): Promise<LikeType> {
        return await prisma.like.create({
            data: likeDTO,
        })
    }
}

export default new LikeServices()
