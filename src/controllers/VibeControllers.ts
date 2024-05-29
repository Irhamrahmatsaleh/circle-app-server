import { Request, Response } from 'express'
import { VibeType } from '../types/types'
import VibeServices from '../services/VibeServices'
import VibeDTO from '../dtos/VibeDTO'
import ResponseDTO from '../dtos/ResponseDTO'
import ServiceResponseDTO from '../dtos/ServiceResponseDTO'

class VibeControllers {
    async getVibes(req: Request, res: Response) {
        const { error, payload }: ServiceResponseDTO<VibeType[]> = await VibeServices.getVibes()

        if (error) {
            res.status(500).json(
                new ResponseDTO<null>({
                    error,
                    message: payload,
                    data: null,
                })
            )
        }

        res.status(200).json(
            new ResponseDTO<VibeType>({
                error,
                message: {
                    status: 'Ok!',
                },
                data: payload,
            })
        )
    }

    async getVibe(req: Request, res: Response) {
        const { id } = req.params
        const { error, payload }: ServiceResponseDTO<VibeType> = await VibeServices.getVibe(
            Number(id)
        )

        if (error) {
            res.status(500).json(
                new ResponseDTO<null>({
                    error,
                    message: payload,
                    data: null,
                })
            )
        }

        res.status(200).json(
            new ResponseDTO<VibeType>({
                error,
                message: {
                    status: 'Ok!',
                },
                data: payload,
            })
        )
    }

    async postVibes(req: Request, res: Response) {
        const { content, image, authorId } = req.body
        const vibeDTO = new VibeDTO({ content, image, authorId })
        const { error, payload }: ServiceResponseDTO<VibeType> = await VibeServices.postVibe(
            vibeDTO
        )

        if (error) {
            res.status(500).json(
                new ResponseDTO<null>({
                    error,
                    message: payload,
                    data: null,
                })
            )
        }

        res.status(200).json(
            new ResponseDTO<VibeType>({
                error,
                message: {
                    status: 'Ok!',
                },
                data: payload,
            })
        )
    }
}

export default new VibeControllers()
