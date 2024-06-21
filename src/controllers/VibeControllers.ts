import { Request, Response } from 'express'
import { VibeType, VibeWithDetailType } from '../types/types'
import VibeServices from '../services/VibeServices'
import ResponseDTO from '../dtos/ResponseDTO'
import ServiceResponseDTO from '../dtos/ServiceResponseDTO'
import Redis from '../middlewares/redis'

class VibeControllers {
    async getVibes(req: Request, res: Response) {
        const loggedUser = res.locals.user

        const { error, payload }: ServiceResponseDTO<VibeWithDetailType[]> =
            await VibeServices.getVibes(loggedUser)

        if (error) {
            return res.status(500).json(
                new ResponseDTO<null>({
                    error,
                    message: payload,
                    data: null,
                })
            )
        }

        await Redis.setVibes(payload)

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
        const loggedUser = res.locals.user
        const { id } = req.params

        const { error, payload }: ServiceResponseDTO<VibeWithDetailType> =
            await VibeServices.getVibe(+id, loggedUser)

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
        const image = req.file?.path || null
        const { content, badLabels } = req.body

        const { error, payload }: ServiceResponseDTO<VibeType> = await VibeServices.postVibe({
            content,
            image,
            badLabels: JSON.parse(badLabels),
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

        // to make sure getAllVibes request gets the latest vibes data
        await Redis.deleteVibes()

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

        // to make sure getAllVibes request gets the latest vibes data
        await Redis.deleteVibes()

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
