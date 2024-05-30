import { PrismaClient } from '@prisma/client'
import { ReplyType } from '../types/types'
import ReplyDTO from '../dtos/ReplyDTO'
import ServiceResponseDTO from '../dtos/ServiceResponseDTO'

const prisma = new PrismaClient()

class ReplyServices {
    async postReply(replyDTO: ReplyDTO): Promise<ServiceResponseDTO<ReplyType>> {
        try {
            const postedReply = await prisma.reply.create({
                data: replyDTO,
            })

            return new ServiceResponseDTO<ReplyType>({
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
