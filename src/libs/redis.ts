/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from 'redis'
import { RedisClientType } from '@redis/client'
import CircleError from '../utils/CircleError'

export let redisClient: RedisClientType<any, any, any>

export async function initRedis() {
    redisClient = await createClient()
        .on('error', (err) => {
            throw new CircleError({ error: `Redis client error: ${err}` })
        })
        .connect()
}
