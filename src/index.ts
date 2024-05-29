import { PrismaClient } from '@prisma/client'
import express from 'express'
import cors from 'cors'
import VibeControllers from './controllers/VibeControllers'

const prisma = new PrismaClient()

const app = express()
const v1MainRouter = express.Router()
const port = 8787

app.use(cors())
app.use('/v1', v1MainRouter)

async function main() {
    v1MainRouter.get('/vibes', VibeControllers.getVibes)
    v1MainRouter.get('/vibe/:id', VibeControllers.getVibe)

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
