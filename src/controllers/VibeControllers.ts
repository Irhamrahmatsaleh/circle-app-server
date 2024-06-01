import { Request, Response } from 'express'
import { VibeType, VibeWithDetailType } from '../types/types'
import VibeServices from '../services/VibeServices'
import ResponseDTO from '../dtos/ResponseDTO'
import ServiceResponseDTO from '../dtos/ServiceResponseDTO'

class VibeControllers {
    async getVibes(req: Request, res: Response) {
        const { error, payload }: ServiceResponseDTO<VibeWithDetailType[]> =
            await VibeServices.getVibes()

        if (error) {
            return res.status(500).json(
                new ResponseDTO<null>({
                    error,
                    message: payload,
                    data: null,
                })
            )
        }

        return res.status(200).json(
            new ResponseDTO<VibeWithDetailType>({
                error,
                message: {
                    status: 'Vibes retrieved!',
                },
                data: payload,
            })
        )
    }

    async getVibe(req: Request, res: Response) {
        const { id } = req.params

        const { error, payload }: ServiceResponseDTO<VibeWithDetailType> =
            await VibeServices.getVibe(+id)

        if (error) {
            return res.status(500).json(
                new ResponseDTO<null>({
                    error,
                    message: payload,
                    data: null,
                })
            )
        }

        return res.status(200).json(
            new ResponseDTO<VibeWithDetailType>({
                error,
                message: {
                    status: 'Vibe retrieved!',
                },
                data: payload,
            })
        )
    }

    async getUserVibes(req: Request, res: Response) {
        const { id } = req.params

        const { error, payload }: ServiceResponseDTO<VibeWithDetailType[]> =
            await VibeServices.getUserVibes(+id)

        if (error) {
            return res.status(500).json(
                new ResponseDTO<null>({
                    error,
                    message: payload,
                    data: null,
                })
            )
        }

        return res.status(200).json(
            new ResponseDTO<VibeWithDetailType[]>({
                error,
                message: {
                    status: "User's vibes retrieved!",
                },
                data: payload,
            })
        )
    }

    async postVibes(req: Request, res: Response) {
        const loggedUser = res.locals.user
        const { content, image } = req.body

        const { error, payload }: ServiceResponseDTO<VibeType> = await VibeServices.postVibe({
            content,
            image,
            authorId: loggedUser.id,
        })

        if (error) {
            return res.status(500).json(
                new ResponseDTO<null>({
                    error,
                    message: payload,
                    data: null,
                })
            )
        }

        return res.status(200).json(
            new ResponseDTO<VibeType>({
                error,
                message: {
                    status: 'Vibe posted!',
                },
                data: payload,
            })
        )
    }

    async deleteVibe(req: Request, res: Response) {
        const { id } = req.params
        const { error, payload }: ServiceResponseDTO<VibeType> = await VibeServices.deleteVibe(+id)

        if (error) {
            return res.status(500).json(
                new ResponseDTO<null>({
                    error,
                    message: payload,
                    data: null,
                })
            )
        }

        return res.status(200).json(
            new ResponseDTO<VibeType>({
                error,
                message: {
                    status: 'Vibe deleted!',
                },
                data: payload,
            })
        )
    }
}

export default new VibeControllers()
