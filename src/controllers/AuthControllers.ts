import { Request, Response } from 'express'
import { UserType } from '../types/types'
import UserDTO from '../dtos/UserDTO'
import ResponseDTO from '../dtos/ResponseDTO'
import ServiceResponseDTO from '../dtos/ServiceResponseDTO'
import AuthServices from '../services/AuthServices'

class AuthControllers {
    async register(req: Request, res: Response) {
        const { username, email, name, password, avatar, bio } = req.body
        const userDTO = new UserDTO({ username, email, name, password, avatar, bio })

        const { error, payload }: ServiceResponseDTO<UserType> = await AuthServices.register(
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
            new ResponseDTO<UserType>({
                error,
                message: {
                    status: 'User created!',
                },
                data: payload,
            })
        )
    }

    async login(req: Request, res: Response) {
        const { username, password } = req.body

        const { error, payload }: ServiceResponseDTO<string> = await AuthServices.login({
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
            new ResponseDTO<string>({
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

    async forgotPassword(req: Request, res: Response) {
        const { email } = req.body

        const { error, payload }: ServiceResponseDTO<UserType> = await AuthServices.forgotPassword({
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
            new ResponseDTO<UserType>({
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

    async resetPassword(req: Request, res: Response) {
        const { email, password } = req.body

        const { error, payload }: ServiceResponseDTO<string> = await AuthServices.resetPassword({
            email,
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
            new ResponseDTO<string>({
                error,
                message: {
                    status: 'Password changed!',
                },
                data: {
                    token: payload,
                },
            })
        )
    }
}

export default new AuthControllers()
