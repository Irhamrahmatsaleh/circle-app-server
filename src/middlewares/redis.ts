import { NextFunction, Request, Response } from 'express'
import { VibeType, VibeWithDetailType } from '../types/types'
import { redisClient } from '../libs/redis'

import ResponseDTO from '../dtos/ResponseDTO'

class Redis {
    async getVibes(req: Request, res: Response, next: NextFunction) {
        const rawVibes = await redisClient.get('VIBES')
        const vibes = JSON.parse(rawVibes)

        if (vibes) {
            return res.status(200).json(
                new ResponseDTO<VibeWithDetailType[]>({
                    error: false,
                    message: {
                        status: 'Vibes retrieved!',
                    },
                    data: vibes,
                })
            )
        }

        next()
    }

    async setVibes(vibes: VibeType[]) {
        await redisClient.set('VIBES', JSON.stringify(vibes))
    }

    async deleteVibes() {
        await redisClient.del('VIBES')
    }
}

export default new Redis()
