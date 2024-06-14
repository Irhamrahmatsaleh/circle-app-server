/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from 'redis'
import { RedisClientType } from '@redis/client'
import { REDIS_URL } from '../configs/config'
import CircleError from '../utils/CircleError'

export let redisClient: RedisClientType<any, any, any>

export async function initRedis() {
    redisClient = await createClient({
        url: `${REDIS_URL}`,
    })
        .on('error', (err) => {
            throw new CircleError({ error: `Redis client error: ${err}` })
        })
        .connect()
}
