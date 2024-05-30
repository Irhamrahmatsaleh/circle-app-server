import { PrismaClient } from '@prisma/client'
import { VibeType } from '../types/types'
import ServiceResponseDTO from '../dtos/ServiceResponseDTO'
import VibeDTO from '../dtos/VibeDTO'
import CircleError from '../utils/CircleError'

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
                error: true,
                payload: error,
            })
        }
    }

    async getVibe(id: number): Promise<ServiceResponseDTO<VibeType>> {
        try {
            const requestedVibe = await prisma.vibe.findUnique({
                where: {
                    id: id,
                },
            })

            if (!requestedVibe) {
                throw new CircleError({ error: 'Requested vibe does not exist.' })
            }

            return new ServiceResponseDTO<VibeType>({
                error: false,
                payload: requestedVibe,
            })
        } catch (error) {
            return new ServiceResponseDTO({
                error: true,
                payload: error,
            })
        }
    }

    async getUserVibes(uid: number): Promise<ServiceResponseDTO<VibeType>> {
        try {
            const requestedUserVibes = await prisma.vibe.findMany({
                where: {
                    authorId: uid,
                },
            })

            if (!requestedUserVibes.length) {
                throw new CircleError({ error: 'Requested user does not have any vibes.' })
            }

            return new ServiceResponseDTO({
                error: false,
                payload: requestedUserVibes,
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
