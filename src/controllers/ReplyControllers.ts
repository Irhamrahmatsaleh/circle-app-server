import { Request, Response } from 'express'
import { ReplyType } from '../types/types'
import ServiceResponseDTO from '../dtos/ServiceResponseDTO'
import ReplyServices from '../services/ReplyServices'
import ResponseDTO from '../dtos/ResponseDTO'
import Redis from '../middlewares/redis'

class ReplyControllers {
    async postReply(req: Request, res: Response) {
        const loggedUser = res.locals.user
        const image = req.file?.path
        const { content, badLabels, targetId } = req.body
        const { error, payload }: ServiceResponseDTO<ReplyType> = await ReplyServices.postReply({
            image,
            content,
            badLabels: JSON.parse(badLabels),
            targetId: +targetId,
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
            new ResponseDTO<ReplyType>({
                error,
                message: {
                    status: 'Reply posted!',
                },
                data: payload,
            })
        )
    }

    async deleteReply(req: Request, res: Response) {
        const { id } = req.params
        const { error, payload }: ServiceResponseDTO<ReplyType> = await ReplyServices.deleteReply(
            +id
        )

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
            new ResponseDTO<ReplyType>({
                error,
                message: {
                    status: 'Reply deleted!',
                },
                data: payload,
            })
        )
    }
}

export default new ReplyControllers()
