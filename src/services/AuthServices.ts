import { Prisma, PrismaClient } from '@prisma/client'
import { UserType } from '../types/types'
import { CLIENT, SECRET_SAUCE } from '../configs/config'
import jwt from 'jsonwebtoken'
import RegisterDTO from '../dtos/RegisterDTO'
import ServiceResponseDTO from '../dtos/ServiceResponseDTO'
import Hasher from '../utils/Hasher'
import LoginDTO from '../dtos/LoginDTO'
import CircleError from '../utils/CircleError'
import ForgotPasswordDTO from '../dtos/ForgotPasswordDTO'
import ResetPasswordDTO from '../dtos/ResetPasswordDTO'
import {
    forgotPasswordSchema,
    loginSchema,
    registerSchema,
    resetPasswordSchema,
} from '../validators/validators'
import primsaErrorHandler from '../utils/PrismaError'
import { sendMail } from '../libs/mailer'

const prisma = new PrismaClient()

class AuthServices {
    async register(registerDTO: RegisterDTO): Promise<ServiceResponseDTO<UserType>> {
        try {
            const { error } = registerSchema.validate(registerDTO)

            if (error) {
                throw new CircleError({ error: error.details[0].message })
            }

            const user = await prisma.user.create({
                data: {
                    ...registerDTO,
                    password: await Hasher.hashPassword(registerDTO.password),
                },
            })

            delete user.password
            return new ServiceResponseDTO<UserType>({
                error: false,
                payload: user,
            })
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                return new ServiceResponseDTO({
                    error: true,
                    payload: primsaErrorHandler(error),
                })
            }
            return new ServiceResponseDTO({
                error: true,
                payload: error,
            })
        }
    }

    async login(loginDTO: LoginDTO): Promise<ServiceResponseDTO<string>> {
        try {
            const { error } = loginSchema.validate(loginDTO)

            if (error) {
                throw new CircleError({ error: error.details[0].message })
            }

            const requestedUser = await prisma.user.findUnique({
                where: {
                    username: loginDTO.username,
                },
            })

            if (!requestedUser) {
                throw new CircleError({ error: 'The username/password was incorrect.' })
            }

            const isPasswordValid = await Hasher.comparePassword(
                loginDTO.password,
                requestedUser.password
            )
            if (!isPasswordValid) {
                throw new CircleError({ error: 'The username/password was incorrect.' })
            }

            delete requestedUser.password
            const token = jwt.sign(requestedUser, SECRET_SAUCE)

            return new ServiceResponseDTO<string>({
                error: false,
                payload: token,
            })
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                return new ServiceResponseDTO({
                    error: true,
                    payload: primsaErrorHandler(error),
                })
            }
            return new ServiceResponseDTO({
                error: true,
                payload: error,
            })
        }
    }

    async forgotPassword(
        forgotPasswordDTO: ForgotPasswordDTO
    ): Promise<ServiceResponseDTO<string>> {
        try {
            const { error } = forgotPasswordSchema.validate(forgotPasswordDTO)

            if (error) {
                throw new CircleError({ error: error.details[0].message })
            }

            const requestedUser = await prisma.user.findUnique({
                where: {
                    email: forgotPasswordDTO.email,
                },
            })

            if (!requestedUser) {
                throw new CircleError({
                    error: `User with ${forgotPasswordDTO.email} does not exist.`,
                })
            }

            delete requestedUser.password
            const token = jwt.sign(requestedUser, SECRET_SAUCE)

            await sendMail({
                to: requestedUser.email,
                subject: '[Circle App] Reset Password',
                name: requestedUser.name,
                header: 'Plase click button below to reset your password and please do not share this email to anyone, including people claiming from Circle App.',
                footer: 'This email message was auto-generated. Please do not respond. If you need additional help, please visit Circle App Support.',
                CTA: 'Reset Password',
                link: `${CLIENT}/help/reset/${token}`,
            })

            return new ServiceResponseDTO<string>({
                error: false,
                payload: token,
            })
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                return new ServiceResponseDTO({
                    error: true,
                    payload: primsaErrorHandler(error),
                })
            }
            return new ServiceResponseDTO({
                error: true,
                payload: error,
            })
        }
    }

    async resetPassword(resetPasswordDTO: ResetPasswordDTO): Promise<ServiceResponseDTO<string>> {
        try {
            const { error } = resetPasswordSchema.validate(resetPasswordDTO)

            if (error) {
                throw new CircleError({ error: error.details[0].message })
            }

            const updatedUser = await prisma.user.update({
                where: {
                    email: resetPasswordDTO.email,
                },
                data: {
                    password: await Hasher.hashPassword(resetPasswordDTO.password),
                },
            })

            if (!updatedUser) {
                throw new CircleError({ error: 'Requested user does not exist.' })
            }
            delete updatedUser.password
            const token = jwt.sign(updatedUser, SECRET_SAUCE)

            return new ServiceResponseDTO<string>({
                error: false,
                payload: token,
            })
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                return new ServiceResponseDTO({
                    error: true,
                    payload: primsaErrorHandler(error),
                })
            }
            return new ServiceResponseDTO({
                error: true,
                payload: error,
            })
        }
    }
}

export default new AuthServices()
