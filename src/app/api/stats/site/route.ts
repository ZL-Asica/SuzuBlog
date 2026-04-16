import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

interface SiteStats {
  siteUv: number
  sitePv: number
  todayUv: number
  todayPv: number
}

// 内存存储站点统计（实际项目中应该使用数据库）
const siteStats: SiteStats = {
  siteUv: 1284,
  sitePv: 5268,
  todayUv: 23,
  todayPv: 67,
}

export async function GET(_request: NextRequest) {
  try {
    // 在实际项目中，这里应该从数据库查询真实的统计数据
    // 这里返回模拟数据
    return NextResponse.json(siteStats)
  }
  catch (error) {
    console.error('Error fetching site stats:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}

// 用于更新统计的POST接口（内部使用）
export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as Record<string, unknown>
    const { type } = body
    const typeString = typeof type === 'string' ? type : null

    // 简单的模拟统计更新逻辑
    if (typeString === 'uv') {
      siteStats.siteUv += 1
      siteStats.todayUv += 1
    }
    else if (type === 'pv') {
      siteStats.sitePv += 1
      siteStats.todayPv += 1
    }

    return NextResponse.json(siteStats)
  }
  catch (error) {
    console.error('Error updating site stats:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
