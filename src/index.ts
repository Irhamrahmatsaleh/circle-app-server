import { PrismaClient } from '@prisma/client'
import express from 'express'
import cors from 'cors'
import VibeControllers from './controllers/VibeControllers'
import UserControllers from './controllers/UserControllers'
import ReplyControllers from './controllers/ReplyControllers'
import LikeControllers from './controllers/LikeControllers'

const prisma = new PrismaClient()

const app = express()
const v1MainRouter = express.Router()
const port = 8787

app.use(cors())
app.use(express.json())
app.use('/v1', v1MainRouter)

async function main() {
    v1MainRouter.post('/register', UserControllers.createUser)
    v1MainRouter.post('/login', UserControllers.userLogin)
    v1MainRouter.post('/auth/forgot', UserControllers.userForgotPassword)
    v1MainRouter.post('/auth/reset', UserControllers.userResetPassowrd)

    v1MainRouter.get('/vibes', VibeControllers.getVibes)
    v1MainRouter.get('/vibes/:id', VibeControllers.getVibe)
    v1MainRouter.get('/vibes/user/:uid', VibeControllers.getUserVibes)
    v1MainRouter.post('/vibes', VibeControllers.postVibes)
    v1MainRouter.delete('/vibes/:id', VibeControllers.deleteVibe)

    v1MainRouter.post('/replies', ReplyControllers.postReply)
    v1MainRouter.post('/likes', LikeControllers.addLike)

    app.listen(port, () => {
        console.log(`App is listening on port ${port}`)
    })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
