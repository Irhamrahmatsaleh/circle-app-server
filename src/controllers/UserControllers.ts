import { Request, Response } from 'express'
import UserServices from '../services/UserServices'
import ServiceResponseDTO from '../dtos/ServiceResponseDTO'
import { UserType } from '../types/types'

class UserControllers {
    async editUser(req: Request, res: Response) {
        const { username, name, avatar, bio } = req.body
        const { id } = req.params

        const { error, payload }: ServiceResponseDTO<UserType> = await UserServices.editUser({
            id: +id,
            username,
            name,
            avatar,
            bio,
        })

        if (error) {
            return res.status(500).json({
                error,
                message: payload,
                data: null,
            })
        }

        return res.status(200).json({
            error,
            message: {
                status: 'User edited!',
            },
            data: payload,
        })
    }
}

export default new UserControllers()
