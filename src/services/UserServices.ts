import { PrismaClient } from '@prisma/client'
import UserDTO from '../dtos/UserDTO'
import ServiceResponseDTO from '../dtos/ServiceResponseDTO'
import Hasher from '../utils/Hasher'

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
}

export default new UserServices()
