import { PrismaClient } from '@prisma/client'
import UserDTO from '../dtos/UserDTO'
import ServiceResponseDTO from '../dtos/ServiceResponseDTO'
import Hasher from '../utils/Hasher'
import LoginDTO from '../dtos/LoginDTO'
import CircleError from '../utils/CircleError'

const prisma = new PrismaClient()

class UserServices {
    async createUser(userDTO: UserDTO): Promise<ServiceResponseDTO<UserDTO>> {
        try {
            const user = await prisma.user.create({
                data: {
                    ...userDTO,
                    password: await Hasher.hashPassword(userDTO.password),
                },
            })

            return new ServiceResponseDTO<UserDTO>({
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

            return new ServiceResponseDTO({
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
}

export default new UserServices()
