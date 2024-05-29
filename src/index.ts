import { PrismaClient } from '@prisma/client'
import express from 'express'
import cors from 'cors'
import VibeControllers from './controllers/VibeControllers'

const prisma = new PrismaClient()

const app = express()
const port = 8787

app.use(cors())

async function main() {
    app.get('/vibes', VibeControllers.getAll)

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
