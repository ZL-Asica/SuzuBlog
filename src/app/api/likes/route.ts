import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

interface LikeRecord {
  count: number
  slug: string
  createdAt: number
  updatedAt: number
}

// 使用内存存储（实际项目中应该使用数据库）
const likesStore: Map<string, LikeRecord> = new Map()

export async function GET(request: NextRequest) {
  try {
    const slug = request.nextUrl.searchParams.get('slug')
    const hasSlug = slug !== null && slug.trim() !== ''
    if (hasSlug === false) {
      return NextResponse.json(
        { error: 'Missing slug parameter' },
        { status: 400 },
      )
    }

    const record = likesStore.get(slug)
    const likes = record?.count ?? 0

    return NextResponse.json({ likes, value: likes })
  }
  catch (error) {
    console.error('Error fetching likes:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as Record<string, unknown>
    const { slug } = body
    const slugString = typeof slug === 'string' ? slug : null
    const hasSlugString = slugString !== null && slugString.trim() !== ''

    if (hasSlugString === false) {
      return NextResponse.json(
        { error: 'Invalid slug parameter' },
        { status: 400 },
      )
    }

    const now = Date.now()
    const existing = likesStore.get(slug)

    if (existing) {
      existing.count += 1
      existing.updatedAt = now
      likesStore.set(slug, existing)
    }
    else {
      likesStore.set(slug, {
        count: 1,
        slug,
        createdAt: now,
        updatedAt: now,
      })
    }

    const updatedRecord = likesStore.get(slug)!
    return NextResponse.json({ likes: updatedRecord.count })
  }
  catch (error) {
    console.error('Error incrementing likes:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
