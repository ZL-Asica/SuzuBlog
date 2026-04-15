import { NextResponse } from 'next/server'
import { getRedisClient } from '@/lib/upstashRedis'

function getDateKey() {
  const now = new Date()
  const year = now.getUTCFullYear()
  const month = `${now.getUTCMonth() + 1}`.padStart(2, '0')
  const day = `${now.getUTCDate()}`.padStart(2, '0')
  return `${year}-${month}-${day}`
}

export async function GET() {
  const redis = getRedisClient()
  if (redis === null) {
    return NextResponse.json(
      {
        sitePv: 0,
        siteUv: 0,
        todayPv: 0,
        todayUv: 0,
        unavailable: true,
      },
      { status: 200 },
    )
  }

  const dateKey = getDateKey()
  const [sitePv, siteUv, todayPv, todayUv] = await Promise.all([
    redis.get<number>('stats:site:pv'),
    redis.get<number>('stats:site:uv'),
    redis.get<number>(`stats:daily:${dateKey}:pv`),
    redis.get<number>(`stats:daily:${dateKey}:uv`),
  ])

  return NextResponse.json(
    {
      sitePv: Number(sitePv ?? 0),
      siteUv: Number(siteUv ?? 0),
      todayPv: Number(todayPv ?? 0),
      todayUv: Number(todayUv ?? 0),
    },
    { status: 200 },
  )
}
