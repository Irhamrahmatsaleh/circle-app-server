import { PrismaClient } from '@prisma/client'
import express from 'express'
import cors from 'cors'

import VibeControllers from './controllers/VibeControllers'
import AuthControllers from './controllers/AuthControllers'
import ReplyControllers from './controllers/ReplyControllers'
import LikeControllers from './controllers/LikeControllers'
import UserControllers from './controllers/UserControllers'
import FollowControllers from './controllers/FollowControllers'
import authenticate from './middlewares/authenticate'
import uploader from './middlewares/upload'

const prisma = new PrismaClient()

const app = express()
const v1MainRouter = express.Router()
const port = 8787

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/v1', v1MainRouter)

async function main() {
    v1MainRouter.post('/register', AuthControllers.register)
    v1MainRouter.post('/login', AuthControllers.login)
    v1MainRouter.post('/auth/forgot', AuthControllers.forgotPassword)
    v1MainRouter.patch('/auth/reset', authenticate, AuthControllers.resetPassword)

    v1MainRouter.get('/vibes', authenticate, VibeControllers.getVibes)
    v1MainRouter.get('/vibes/:id', authenticate, VibeControllers.getVibe)
    v1MainRouter.get('/vibes/user/:id', authenticate, VibeControllers.getUserVibes)
    v1MainRouter.post('/vibes', uploader.single('image'), authenticate, VibeControllers.postVibes)
    v1MainRouter.delete('/vibes/:id', authenticate, VibeControllers.deleteVibe)

    v1MainRouter.get('/follow/:id', authenticate, FollowControllers.follow)
    v1MainRouter.get('/unfollow/:id', authenticate, FollowControllers.unfollow)

    v1MainRouter.get('/find', authenticate, UserControllers.searchUser)
    v1MainRouter.post('/likes', authenticate, LikeControllers.likeMechanism)
    v1MainRouter.get('/me', authenticate, UserControllers.getLoggedUser)

    v1MainRouter.get('/users/:id', authenticate, UserControllers.getUser)
    v1MainRouter.get('/users', authenticate, UserControllers.getUsers)
    v1MainRouter.patch(
        '/users/me',
        uploader.single('avatar'),
        authenticate,
        UserControllers.editUser
    )

    v1MainRouter.delete('/replies/:id', authenticate, ReplyControllers.deleteReply)
    v1MainRouter.post(
        '/replies',
        uploader.single('image'),
        authenticate,
        ReplyControllers.postReply
    )

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
