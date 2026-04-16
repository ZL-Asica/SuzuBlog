import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

interface ViewRecord {
  count: number
  slug: string
  visitorIds: Set<string>
  createdAt: number
  updatedAt: number
}

// 使用内存存储（实际项目中应该使用数据库）
const viewsStore: Map<string, ViewRecord> = new Map()

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params
    const type = request.nextUrl.searchParams.get('type')

    if (type !== 'view') {
      return NextResponse.json(
        { error: 'Invalid type parameter' },
        { status: 400 },
      )
    }

    const record = viewsStore.get(slug)
    const views = record?.count ?? 0

    return NextResponse.json({ value: views })
  }
  catch (error) {
    console.error('Error fetching views:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params
    const body = await request.json() as Record<string, unknown>
    const { visitorId } = body
    const visitorIdString = typeof visitorId === 'string' ? visitorId : null
    const hasVisitorIdString = visitorIdString !== null && visitorIdString.trim() !== ''

    if (hasVisitorIdString === false) {
      return NextResponse.json(
        { error: 'Invalid visitorId parameter' },
        { status: 400 },
      )
    }

    const now = Date.now()
    const existing = viewsStore.get(slug)

    if (existing) {
      // 检查这个访客是否已经统计过
      if (!existing.visitorIds.has(visitorIdString)) {
        existing.count += 1
        existing.visitorIds.add(visitorIdString)
        existing.updatedAt = now
        viewsStore.set(slug, existing)
      }
    }
    else {
      const visitorIds = new Set<string>([visitorIdString])
      viewsStore.set(slug, {
        count: 1,
        slug,
        visitorIds,
        createdAt: now,
        updatedAt: now,
      })
    }

    const updatedRecord = viewsStore.get(slug)!

    // 同时更新站点统计（实际项目中应该使用事务）
    // 这里简单模拟，实际应该调用数据库

    return NextResponse.json({ value: updatedRecord.count })
  }
  catch (error) {
    console.error('Error incrementing views:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
