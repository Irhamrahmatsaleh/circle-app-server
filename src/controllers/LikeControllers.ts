import { Request, Response } from 'express'
import { LikeType } from '../types/types'
import LikeServices from '../services/LikeServices'
import ServiceResponseDTO from '../dtos/ServiceResponseDTO'
import ResponseDTO from '../dtos/ResponseDTO'
import Redis from '../middlewares/redis'

class LikeControllers {
    async likeMechanism(req: Request, res: Response) {
        const loggedUser = res.locals.user
        const { targetId } = req.body

        const { error, payload }: ServiceResponseDTO<LikeType> = await LikeServices.likeMechanism({
            targetId,
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
            new ResponseDTO<LikeType>({
                error,
                message: {
                    status: 'Ok!',
                },
                data: payload,
            })
        )
    }
}

export default new LikeControllers()
