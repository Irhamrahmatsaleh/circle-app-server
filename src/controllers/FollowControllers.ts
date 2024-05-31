import { Request, Response } from 'express'
import FollowServices from '../services/FollowServices'
import ServiceResponseDTO from '../dtos/ServiceResponseDTO'
import { FollowsType } from '../types/types'
import ResponseDTO from '../dtos/ResponseDTO'

class FollowControllers {
    async follow(req: Request, res: Response) {
        const { id } = req.params

        const { error, payload }: ServiceResponseDTO<FollowsType> = await FollowServices.follow({
            followingId: +id,
            followerId: 1, // for test
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
            new ResponseDTO<FollowsType>({
                error,
                message: {
                    status: 'User followed!',
                },
                data: payload,
            })
        )
    }
}

export default new FollowControllers()
