import { Request, Response } from 'express'
import { UploadType, UserType } from '../types/types'
import UserServices from '../services/UserServices'
import ServiceResponseDTO from '../dtos/ServiceResponseDTO'
import ResponseDTO from '../dtos/ResponseDTO'

class UserControllers {
    async getUser(req: Request, res: Response) {
        const loggedUser = res.locals.user
        const { id } = req.params
        const { error, payload }: ServiceResponseDTO<UserType> = await UserServices.getUser(
            +id,
            loggedUser
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
            new ResponseDTO<UserType>({
                error,
                message: {
                    status: 'User retrieved!',
                },
                data: payload,
            })
        )
    }

    async getLoggedUser(req: Request, res: Response) {
        const loggedUser = res.locals.user
        const { error, payload }: ServiceResponseDTO<UserType> = await UserServices.getLoggedUser(
            loggedUser
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
            new ResponseDTO<UserType>({
                error,
                message: {
                    status: 'User retrieved!',
                },
                data: payload,
            })
        )
    }

    async getUsers(req: Request, res: Response) {
        const loggedUser = res.locals.user
        const { error, payload }: ServiceResponseDTO<UserType[]> = await UserServices.getUsers(
            loggedUser
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
            new ResponseDTO<UserType[]>({
                error,
                message: {
                    status: 'Users retrieved!',
                },
                data: payload,
            })
        )
    }

    async editUser(req: Request, res: Response) {
        const loggedUser = res.locals.user

        const files = req.files as UploadType
        const avatar = files.avatar ? files.avatar[0].path : null
        const banner = files.banner ? files.banner[0].path : null

        const { username, name, filterContent, bio } = req.body

        const { error, payload }: ServiceResponseDTO<UserType> = await UserServices.editUser({
            id: loggedUser.id,
            username,
            name,
            filterContent: JSON.parse(filterContent),
            avatar,
            banner,
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

    async searchUser(req: Request, res: Response) {
        const loggedUser = res.locals.user
        const keyword = req.query.keyword

        if (typeof keyword !== 'string') {
            return res.status(400).json(
                new ResponseDTO<null>({
                    error: true,
                    message: {
                        error: 'Keyword must be a string.',
                    },
                    data: null,
                })
            )
        }

        const { error, payload } = await UserServices.searchUser({ keyword }, loggedUser)

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
}

export default new UserControllers()
