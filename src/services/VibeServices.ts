import { PrismaClient } from '@prisma/client'
import { VibeType, ServiceResponseType } from '../types/types'
import ServiceResponseDTO from '../dtos/ServiceResponseDTO'

const prisma = new PrismaClient()

class VibeServices {
    async getVibes(): Promise<ServiceResponseType<VibeType[]>> {
        try {
            const vibes = await prisma.vibe.findMany()

            return new ServiceResponseDTO<VibeType[]>({
                error: false,
                message: {
                    status: 'Ok!',
                },
                data: vibes,
            })
        } catch (error) {
            return new ServiceResponseDTO<null>({
                error: true,
                message: {
                    error: error,
                },
                data: null,
            })
        }
    }

    async getVibe(id: number): Promise<ServiceResponseType<VibeType>> {
        try {
            const vibe = await prisma.vibe.findUnique({
                where: {
                    id: id,
                },
            })

            return new ServiceResponseDTO<VibeType>({
                error: false,
                message: {
                    status: 'Ok!',
                },
                data: vibe,
            })
        } catch (error) {
            return new ServiceResponseDTO<null>({
                error: true,
                message: {
                    error: error,
                },
                data: null,
            })
        }
    }
}

export default new VibeServices()
