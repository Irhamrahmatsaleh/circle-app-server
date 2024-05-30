import { Request, Response } from 'express'
import ServiceResponseDTO from '../dtos/ServiceResponseDTO'
import ReplyDTO from '../dtos/ReplyDTO'
import ReplyServices from '../services/ReplyServices'
import ResponseDTO from '../dtos/ResponseDTO'

class ReplyControllers {
    async postReply(req: Request, res: Response) {
        const { image, content, authorId, vibeId } = req.body

        const { error, payload }: ServiceResponseDTO<ReplyDTO> = await ReplyServices.postReply({
            image,
            content,
            authorId,
            vibeId,
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
            new ResponseDTO({
                error,
                message: {
                    status: 'Reply posted!',
                },
                data: payload,
            })
        )
    }
}

export default new ReplyControllers()
