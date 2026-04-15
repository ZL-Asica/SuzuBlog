import process from 'node:process'
import { Redis } from '@upstash/redis'

let redisInstance: Redis | null = null

export function getRedisClient(): Redis | null {
  if (redisInstance) {
    return redisInstance
  }

  const url
    = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL ?? null
  const token
    = process.env.UPSTASH_REDIS_REST_TOKEN
      ?? process.env.KV_REST_API_TOKEN
      ?? null

  if (
    url === null
    || token === null
    || url.trim() === ''
    || token.trim() === ''
  ) {
    return null
  }

  try {
    redisInstance = new Redis({ url, token })
    return redisInstance
  }
  catch {
    return null
  }
}
