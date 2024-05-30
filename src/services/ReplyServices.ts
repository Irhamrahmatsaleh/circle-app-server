import { PrismaClient } from '@prisma/client'
import ReplyDTO from '../dtos/ReplyDTO'
import ServiceResponseDTO from '../dtos/ServiceResponseDTO'

const prisma = new PrismaClient()

class ReplyServices {
    async postReply(replyDTO: ReplyDTO): Promise<ServiceResponseDTO<ReplyDTO>> {
        try {
            const postedReply = await prisma.reply.create({
                data: replyDTO,
            })

            return new ServiceResponseDTO({
                error: false,
                payload: postedReply,
            })
        } catch (error) {
            return new ServiceResponseDTO({
                error: true,
                payload: error,
            })
        }
    }
}

export default new ReplyServices()
