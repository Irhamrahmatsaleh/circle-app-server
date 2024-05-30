import { PrismaClient } from '@prisma/client'
import { UserType } from '../types/types'
import UserDTO from '../dtos/UserDTO'
import ServiceResponseDTO from '../dtos/ServiceResponseDTO'
import Hasher from '../utils/Hasher'
import LoginDTO from '../dtos/LoginDTO'
import CircleError from '../utils/CircleError'
import ForgotPasswordDTO from '../dtos/ForgotPasswordDTO'

const prisma = new PrismaClient()

class UserServices {
    async createUser(userDTO: UserDTO): Promise<ServiceResponseDTO<UserType>> {
        try {
            const user = await prisma.user.create({
                data: {
                    ...userDTO,
                    password: await Hasher.hashPassword(userDTO.password),
                },
            })

            return new ServiceResponseDTO<UserType>({
                error: false,
                payload: user,
            })
        } catch (error) {
            return new ServiceResponseDTO({
                error: true,
                payload: error,
            })
        }
    }

    async userLogin(loginDTO: LoginDTO): Promise<ServiceResponseDTO<string>> {
        try {
            const requestedUser = await prisma.user.findUnique({
                where: {
                    username: loginDTO.username,
                },
            })

            const isPasswordValid = await Hasher.comparePassword(
                loginDTO.password,
                requestedUser.password
            )

            if (!isPasswordValid) {
                throw new CircleError({ error: 'The username/password was incorrect.' })
            }

            return new ServiceResponseDTO<string>({
                error: false,
                payload: requestedUser.password,
            })
        } catch (error) {
            return new ServiceResponseDTO({
                error: true,
                payload: error,
            })
        }
    }

    async userForgotPassword(
        forgotPasswordDTO: ForgotPasswordDTO
    ): Promise<ServiceResponseDTO<UserType>> {
        try {
            const requestedUser = await prisma.user.findUnique({
                where: {
                    email: forgotPasswordDTO.email,
                },
            })
            if (!requestedUser) {
                throw new CircleError({ error: 'Requested user does not exist.' })
            }

            return new ServiceResponseDTO<UserType>({
                error: false,
                payload: requestedUser,
            })
        } catch (error) {
            return new ServiceResponseDTO({
                error: true,
                payload: error,
            })
        }
    }
}

export default new UserServices()
