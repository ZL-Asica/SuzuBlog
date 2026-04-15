import { NextResponse } from 'next/server'
import { getRedisClient } from '@/lib/upstashRedis'

function sanitizeSlug(raw: string): string {
  return raw.toLowerCase().replace(/[^a-z0-9-]/g, '-')
}

function getLikeKey(slug: string): string {
  return `stats:like:${sanitizeSlug(slug)}`
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')
  if (slug === null || slug.trim() === '') {
    return NextResponse.json({ error: '缺少文章标识 slug' }, { status: 400 })
  }

  const redis = getRedisClient()
  if (redis === null) {
    return NextResponse.json({ likes: 0, unavailable: true }, { status: 200 })
  }

  const likes = await redis.get<number>(getLikeKey(slug.trim()))
  return NextResponse.json({ likes: Number(likes ?? 0) }, { status: 200 })
}

export async function POST(request: Request) {
  let slug = ''
  try {
    const body = (await request.json()) as { slug?: string }
    slug = (body.slug ?? '').trim()
  }
  catch {
    slug = ''
  }

  if (slug === '') {
    return NextResponse.json({ error: '缺少文章标识 slug' }, { status: 400 })
  }

  const redis = getRedisClient()
  if (redis === null) {
    return NextResponse.json({ likes: 0, unavailable: true }, { status: 200 })
  }

  const likes = await redis.incr(getLikeKey(slug))
  return NextResponse.json({ likes: Number(likes ?? 0) }, { status: 200 })
}
