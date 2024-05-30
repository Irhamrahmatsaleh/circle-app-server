import { Request, Response } from 'express'
import { UserType } from '../types/types'
import UserDTO from '../dtos/UserDTO'
import ResponseDTO from '../dtos/ResponseDTO'
import ServiceResponseDTO from '../dtos/ServiceResponseDTO'
import UserServices from '../services/UserServices'

class UserControllers {
    async createUser(req: Request, res: Response) {
        const { username, email, name, password, avatar, bio } = req.body
        const userDTO = new UserDTO({ username, email, name, password, avatar, bio })

        const { error, payload }: ServiceResponseDTO<UserType> = await UserServices.createUser(
            userDTO
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

        delete payload.password
        return res.status(500).json(
            new ResponseDTO({
                error,
                message: {
                    status: 'User created!',
                },
                data: payload,
            })
        )
    }

    async userLogin(req: Request, res: Response) {
        const { username, password } = req.body

        const { error, payload }: ServiceResponseDTO<string> = await UserServices.userLogin({
            username,
            password,
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
                    status: 'User logged in!',
                },
                data: {
                    token: payload,
                },
            })
        )
    }

    async userForgotPassword(req: Request, res: Response) {
        const { email } = req.body

        const { error, payload }: ServiceResponseDTO<UserType> =
            await UserServices.userForgotPassword({
                email,
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
                    status: 'Ready to reset password!',
                },
                data: {
                    id: payload.id,
                    email: payload.email,
                },
            })
        )
    }

    async userResetPassowrd(req: Request, res: Response) {
        const { email, password } = req.body

        const { error, payload }: ServiceResponseDTO<string> = await UserServices.userResetPassword(
            {
                email,
                password,
            }
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
            new ResponseDTO({
                error,
                message: {
                    status: 'Ready to reset password!',
                },
                data: {
                    token: payload,
                },
            })
        )
    }
}

export default new UserControllers()
