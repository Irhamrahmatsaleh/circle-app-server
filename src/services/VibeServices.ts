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
}

export default new VibeServices()
