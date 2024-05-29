import { PrismaClient } from '@prisma/client'
import { VibeType } from '../types/types'
import ServiceResponseDTO from '../dtos/ServiceResponseDTO'
import VibeDTO from '../dtos/VibeDTO'

const prisma = new PrismaClient()

class VibeServices {
    async getVibes(): Promise<ServiceResponseDTO<VibeType[]>> {
        try {
            const vibes = await prisma.vibe.findMany()

            return new ServiceResponseDTO<VibeType[]>({
                error: false,
                payload: vibes,
            })
        } catch (error) {
            return new ServiceResponseDTO({
                error: false,
                payload: error,
            })
        }
    }

    async getVibe(id: number): Promise<ServiceResponseDTO<VibeType>> {
        try {
            const vibe = await prisma.vibe.findUnique({
                where: {
                    id: id,
                },
            })

            return new ServiceResponseDTO<VibeType>({
                error: false,
                payload: vibe,
            })
        } catch (error) {
            return new ServiceResponseDTO({
                error: false,
                payload: error,
            })
        }
    }

    async postVibe(vibeDTO: VibeDTO): Promise<ServiceResponseDTO<VibeType>> {
        try {
            const vibe = await prisma.vibe.create({
                data: vibeDTO,
            })

            return new ServiceResponseDTO<VibeType>({
                error: false,
                payload: vibe,
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
