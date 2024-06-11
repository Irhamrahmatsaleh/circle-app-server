import { Prisma, PrismaClient } from '@prisma/client'
import { ReplyType } from '../types/types'
import ReplyDTO from '../dtos/ReplyDTO'
import ServiceResponseDTO from '../dtos/ServiceResponseDTO'
import { replySchema } from '../validators/validators'
import CircleError from '../utils/CircleError'
import primsaErrorHandler from '../utils/PrismaError'

const prisma = new PrismaClient()

class ReplyServices {
    async postReply(replyDTO: ReplyDTO): Promise<ServiceResponseDTO<ReplyType>> {
        try {
            const { error } = replySchema.validate(replyDTO)

            if (error) {
                throw new CircleError({ error: error.details[0].message })
            }

            const postedReply = await prisma.reply.create({
                data: replyDTO,
            })

            delete postedReply.updatedAt

            return new ServiceResponseDTO<ReplyType>({
                error: false,
                payload: postedReply,
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

    async deleteReply(id: number): Promise<ServiceResponseDTO<ReplyType>> {
        try {
            const deletedReply = await prisma.reply.delete({
                where: {
                    id: id,
                },
            })

            return new ServiceResponseDTO<ReplyType>({
                error: false,
                payload: deletedReply,
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

export default new ReplyServices()
