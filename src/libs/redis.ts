/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from 'redis'
import { RedisClientType } from '@redis/client'

import CircleError from '../utils/CircleError'
import dotenv from 'dotenv'
dotenv.config()

export let redisClient: RedisClientType<any, any, any>

export async function initRedis() {
    redisClient = await createClient({
        url: `${process.env.REDIS_URL}`,
    })
        .on('error', (err) => {
            throw new CircleError({ error: `Redis client error: ${err}` })
        })
        .connect()
}
