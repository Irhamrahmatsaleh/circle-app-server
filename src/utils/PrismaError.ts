import { Prisma } from '@prisma/client'

function primsaErrorHandler(err: Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
        case 'P2002':
            return { error: `The ${err.meta.target} already exist.` }
        case 'P2014':
            return { error: `The id: ${err.meta.target} is invalid.` }
        case 'P2003':
            return { error: `Please input a valid data for ${err.meta.target}` }
        default:
            return { error: `Something went wrong: ${err.message}` }
    }
}

export default primsaErrorHandler
