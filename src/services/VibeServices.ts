import { PrismaClient } from '@prisma/client'
import { VibeType, VibeWithDetailType } from '../types/types'
import ServiceResponseDTO from '../dtos/ServiceResponseDTO'
import VibeDTO from '../dtos/VibeDTO'
import CircleError from '../utils/CircleError'

const prisma = new PrismaClient()

class VibeServices {
    async getVibes(): Promise<ServiceResponseDTO<VibeType[]>> {
        try {
            const rawVibes: VibeWithDetailType[] = await prisma.vibe.findMany({
                include: {
                    replies: true,
                    likes: true,
                },
            })

            const vibes = rawVibes.map((vibe) => {
                const { replies, likes, ...rest } = vibe

                return {
                    ...rest,
                    totalReplies: replies.length,
                    totalLikes: likes.length,
                }
            })

            return new ServiceResponseDTO<VibeType[]>({
                error: false,
                payload: vibes,
            })
        } catch (error) {
            return new ServiceResponseDTO({
                error: true,
                payload: error,
            })
        }
    }

    async getVibe(id: number): Promise<ServiceResponseDTO<VibeType>> {
        try {
            const rawVibes: VibeWithDetailType[] = await prisma.vibe.findMany({
                where: {
                    id: id,
                },
                include: {
                    replies: true,
                    likes: true,
                },
            })

            if (!rawVibes.length) {
                throw new CircleError({ error: 'Requested vibe does not exist.' })
            }

            const vibes = rawVibes.map((vibe) => {
                return {
                    ...vibe,
                    totalReplies: vibe.replies.length,
                    totalLikes: vibe.likes.length,
                }
            })

            return new ServiceResponseDTO<VibeType>({
                error: false,
                payload: vibes,
            })
        } catch (error) {
            return new ServiceResponseDTO({
                error: true,
                payload: error,
            })
        }
    }

    async getUserVibes(id: number): Promise<ServiceResponseDTO<VibeType>> {
        try {
            const rawVibes: VibeWithDetailType[] = await prisma.vibe.findMany({
                where: {
                    authorId: id,
                },
                include: {
                    replies: true,
                    likes: true,
                },
            })

            if (!rawVibes.length) {
                throw new CircleError({ error: 'Requested user does not have any vibes.' })
            }
            const vibes = rawVibes.map((vibe) => {
                const { replies, likes, ...rest } = vibe

                return {
                    ...rest,
                    totalReplies: replies.length,
                    totalLikes: likes.length,
                }
            })

            return new ServiceResponseDTO<VibeType>({
                error: false,
                payload: vibes,
            })
        } catch (error) {
            return new ServiceResponseDTO({
                error: true,
                payload: error,
            })
        }
    }

    async postVibe(vibeDTO: VibeDTO): Promise<ServiceResponseDTO<VibeType>> {
        try {
            const postedVibe = await prisma.vibe.create({
                data: vibeDTO,
            })

            return new ServiceResponseDTO<VibeType>({
                error: false,
                payload: postedVibe,
            })
        } catch (error) {
            return new ServiceResponseDTO({
                error: true,
                payload: error,
            })
        }
    }

    async deleteVibe(id: number): Promise<ServiceResponseDTO<VibeType>> {
        try {
            const deletedVibes = await prisma.vibe.delete({
                where: {
                    id: id,
                },
            })

            return new ServiceResponseDTO({
                error: false,
                payload: deletedVibes,
            })
        } catch (error) {
            return new ServiceResponseDTO({
                error: true,
                payload: error,
            })
        }
    }
}

export default new VibeServices()
