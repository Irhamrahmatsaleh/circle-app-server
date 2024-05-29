import { Request, Response } from 'express'
import { Vibe, ServiceResponse } from '../types/types'
import VibeServices from '../services/VibeServices'

class VibeControllers {
    async getVibes(req: Request, res: Response) {
        const { error, message, data }: ServiceResponse<Vibe[]> = await VibeServices.getVibes()

        if (error) {
            res.status(500).json({
                error: true,
                message: message,
            })
        }

        res.status(200).json({
            error: false,
            data: data,
        })
    }

    async getVibe(req: Request, res: Response) {
        const { id } = req.params
        const { error, message, data }: ServiceResponse<Vibe> = await VibeServices.getVibe(
            Number(id)
        )

        if (error) {
            res.status(500).json({
                error: true,
                message: message,
            })
        }

        res.status(200).json({
            error: false,
            data: data,
        })
    }
}

export default new VibeControllers()
