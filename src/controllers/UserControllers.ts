import { Request, Response } from 'express'
import { UserType } from '../types/types'
import UserServices from '../services/UserServices'
import ServiceResponseDTO from '../dtos/ServiceResponseDTO'
import ResponseDTO from '../dtos/ResponseDTO'

class UserControllers {
    async getUsers(req: Request, res: Response) {
        const { error, payload }: ServiceResponseDTO<UserType[]> = await UserServices.getUsers()

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
            new ResponseDTO<UserType>({
                error,
                message: {
                    status: 'User retrieved!',
                },
                data: payload,
            })
        )
    }

    async editUser(req: Request, res: Response) {
        const loggedUser = res.locals.user
        const { username, name, avatar, bio } = req.body

        const { error, payload }: ServiceResponseDTO<UserType> = await UserServices.editUser({
            id: loggedUser.id,
            username,
            name,
            avatar,
            bio,
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
            new ResponseDTO<UserType>({
                error,
                message: {
                    status: 'User edited!',
                },
                data: payload,
            })
        )
    }
}

export default new UserControllers()
