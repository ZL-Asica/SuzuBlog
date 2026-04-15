import { NextResponse } from 'next/server'
import { getRedisClient } from '@/lib/upstashRedis'

type StatType = 'view' | 'like'

function sanitizeSlug(raw: string): string {
  return raw.toLowerCase().replace(/[^a-z0-9-]/g, '-')
}

function getKey(type: StatType, slug: string): string {
  return `stats:${type}:${sanitizeSlug(slug)}`
}

function parseType(raw: string | null): StatType | null {
  if (raw === 'view' || raw === 'like') {
    return raw
  }
  return null
}

function getDateKey() {
  const now = new Date()
  const year = now.getUTCFullYear()
  const month = `${now.getUTCMonth() + 1}`.padStart(2, '0')
  const day = `${now.getUTCDate()}`.padStart(2, '0')
  return `${year}-${month}-${day}`
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const searchParams = new URL(request.url).searchParams
  const statType = parseType(searchParams.get('type'))
  if (statType === null) {
    return NextResponse.json(
      { error: 'Invalid type. Use view or like.' },
      { status: 400 },
    )
  }

  const { slug } = await params
  const redis = getRedisClient()
  if (redis === null) {
    return NextResponse.json({ value: 0, unavailable: true }, { status: 200 })
  }

  const key = getKey(statType, slug)
  const value = await redis.get<number>(key)
  return NextResponse.json({ value: Number(value ?? 0) }, { status: 200 })
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const searchParams = new URL(request.url).searchParams
  const statType = parseType(searchParams.get('type'))
  if (statType === null) {
    return NextResponse.json(
      { error: 'Invalid type. Use view or like.' },
      { status: 400 },
    )
  }

  const { slug } = await params
  const redis = getRedisClient()
  if (redis === null) {
    return NextResponse.json({ value: 0, unavailable: true }, { status: 200 })
  }

  const key = getKey(statType, slug)
  const value = await redis.incr(key)

  if (statType === 'view') {
    await redis.incr('stats:site:pv')

    const dateKey = getDateKey()
    await redis.incr(`stats:daily:${dateKey}:pv`)
    await redis.expire(`stats:daily:${dateKey}:pv`, 60 * 60 * 24 * 40)

    let visitorId = ''
    try {
      const body = (await request.json()) as { visitorId?: string }
      visitorId = (body.visitorId ?? '').trim()
    }
    catch {
      visitorId = ''
    }

    if (visitorId !== '') {
      const siteUvSetKey = 'stats:site:uv:set'
      const addedSiteUv = await redis.sadd(siteUvSetKey, visitorId)
      if (addedSiteUv === 1) {
        await redis.incr('stats:site:uv')
      }

      const dailyUvSetKey = `stats:daily:${dateKey}:uv:set`
      const addedDailyUv = await redis.sadd(dailyUvSetKey, visitorId)
      if (addedDailyUv === 1) {
        await redis.incr(`stats:daily:${dateKey}:uv`)
      }

      await redis.expire(dailyUvSetKey, 60 * 60 * 24 * 40)
      await redis.expire(`stats:daily:${dateKey}:uv`, 60 * 60 * 24 * 40)
    }
  }

  return NextResponse.json({ value: Number(value ?? 0) }, { status: 200 })
}
