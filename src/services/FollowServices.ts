import { Prisma, PrismaClient } from '@prisma/client'
import { FollowType } from '../types/types'
import FollowDTO from '../dtos/FollowDTO'
import ServiceResponseDTO from '../dtos/ServiceResponseDTO'
import CircleError from '../utils/CircleError'
import primsaErrorHandler from '../utils/PrismaError'

const prisma = new PrismaClient()

class FollowServices {
    async follow(FollowDTO: FollowDTO): Promise<ServiceResponseDTO<FollowType>> {
        try {
            if (this.isTargetedItSelf(FollowDTO)) {
                throw new CircleError({ error: "Can't follow itself." })
            }

            if (await this.isFollowed(FollowDTO)) {
                throw new CircleError({ error: 'Target user is already followed.' })
            }

            const createdFollow = await prisma.follow.create({
                data: FollowDTO,
            })

            delete createdFollow.createdAt
            delete createdFollow.updatedAt

            return new ServiceResponseDTO<FollowType>({
                error: false,
                payload: createdFollow,
            })
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                return new ServiceResponseDTO({
                    error: true,
                    payload: primsaErrorHandler(error),
                })
            }
            return new ServiceResponseDTO({
                error: true,
                payload: error,
            })
        }
    }

    async unfollow(FollowDTO: FollowDTO): Promise<ServiceResponseDTO<FollowType>> {
        try {
            if (this.isTargetedItSelf(FollowDTO)) {
                throw new CircleError({ error: "Can't unfollow itself." })
            }

            const isFollowed: FollowType = await this.isFollowed(FollowDTO)

            if (!isFollowed) {
                throw new CircleError({ error: 'Target user is not followed yet.' })
            }

            const createdUnfollow = await prisma.follow.delete({
                where: {
                    id: isFollowed.id,
                },
            })

            delete createdUnfollow.createdAt
            delete createdUnfollow.updatedAt

            return new ServiceResponseDTO<FollowType>({
                error: false,
                payload: createdUnfollow,
            })
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                return new ServiceResponseDTO({
                    error: true,
                    payload: primsaErrorHandler(error),
                })
            }
            return new ServiceResponseDTO({
                error: true,
                payload: error,
            })
        }
    }

    private isTargetedItSelf(FollowDTO: FollowDTO): boolean {
        return FollowDTO.targetId === FollowDTO.ownerId
    }

    private async isFollowed(FollowDTO: FollowDTO): Promise<FollowType> {
        return await prisma.follow.findFirst({
            where: {
                AND: [{ targetId: FollowDTO.targetId }, { ownerId: FollowDTO.ownerId }],
            },
        })
    }
}

export default new FollowServices()
