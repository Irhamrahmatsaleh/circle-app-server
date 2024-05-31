import { Request, Response } from 'express'
import { ReplyType } from '../types/types'
import ServiceResponseDTO from '../dtos/ServiceResponseDTO'
import ReplyServices from '../services/ReplyServices'
import ResponseDTO from '../dtos/ResponseDTO'

class ReplyControllers {
    async postReply(req: Request, res: Response) {
        const loggedUser = res.locals.user
        const { image, content, vibeId } = req.body
        const { error, payload }: ServiceResponseDTO<ReplyType> = await ReplyServices.postReply({
            image,
            content,
            vibeId,
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
