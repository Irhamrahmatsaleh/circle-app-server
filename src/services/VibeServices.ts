import { PrismaClient } from '@prisma/client'
import { Vibe, ServiceResponse } from '../types/types'

const prisma = new PrismaClient()

class VibeServices {
    async getVibes(): Promise<ServiceResponse<Vibe[]>> {
        try {
            const vibes = await prisma.vibe.findMany()

            return {
                error: false,
                message: {
                    status: 'Ok!',
                },
                data: vibes,
            }
        } catch (error) {
            return {
                error: true,
                message: error,
                data: null,
            }
        }
    }

    async getVibe(id: number): Promise<ServiceResponse<Vibe>> {
        try {
            const vibe = await prisma.vibe.findUnique({
                where: {
                    id: id,
                },
            })

            return {
                error: false,
                message: {
                    status: 'Ok!',
                },
                data: vibe,
            }
        } catch (error) {
            return {
                error: true,
                message: error,
                data: null,
            }
        }
    }
}

export default new VibeServices()
