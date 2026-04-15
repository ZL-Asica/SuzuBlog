'use client'

import { Heart } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

interface EngagementStatsProps {
  siteUrl: string
  postSlug: string
  showSiteStats?: boolean
  showLikeButton?: boolean
}

function normalizeNamespace(siteUrl: string): string {
  try {
    const host = new URL(siteUrl).host
    return host.replace(/[^a-z0-9-]/gi, '-')
  }
  catch {
    return 'blog-site'
  }
}

function normalizeKey(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9-]/g, '-')
}

async function fetchCounter(
  url: string,
  method: 'GET' | 'POST',
  timeoutMs = 5000,
): Promise<number> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const response = await fetch(url, { method, signal: controller.signal })
    const data = (await response.json()) as { value?: number, likes?: number }
    if (typeof data.likes === 'number') {
      return data.likes
    }
    return typeof data.value === 'number' ? data.value : 0
  }
  catch {
    return 0
  }
  finally {
    clearTimeout(timeoutId)
  }
}

export default function EngagementStats({
  siteUrl,
  postSlug,
  showSiteStats = false,
  showLikeButton = true,
}: EngagementStatsProps) {
  const namespace = useMemo(() => normalizeNamespace(siteUrl), [siteUrl])
  const postKey = useMemo(() => normalizeKey(postSlug), [postSlug])
  const likeStorageKey = useMemo(
    () => `liked:${namespace}:${postKey}`,
    [namespace, postKey],
  )
  const likePendingKey = useMemo(
    () => `like-pending:${namespace}:${postKey}`,
    [namespace, postKey],
  )
  const likeCacheKey = useMemo(
    () => `like-cache:${namespace}:${postKey}`,
    [namespace, postKey],
  )
  const likeApiUrl = useMemo(() => `/api/likes?slug=${postKey}`, [postKey])

  const [likes, setLikes] = useState<number | null>(null)
  const [liked, setLiked] = useState(false)
  const [likeLoading, setLikeLoading] = useState(false)
  const [siteStats, setSiteStats] = useState({
    siteUv: 0,
    sitePv: 0,
    todayUv: 0,
    todayPv: 0,
  })

  useEffect(() => {
    const cached = localStorage.getItem(likeCacheKey)
    if (cached !== null) {
      const num = Number(cached)
      if (!Number.isNaN(num)) {
        setLikes(num)
      }
    }

    const hasLiked = localStorage.getItem(likeStorageKey) === '1'
    setLiked(hasLiked)

    const loadLikes = async () => {
      const pendingLike = localStorage.getItem(likePendingKey) === '1'
      if (pendingLike) {
        const syncValue = await fetchLikeIncrement(postKey)
        if (syncValue > 0) {
          localStorage.removeItem(likePendingKey)
          setLikes(syncValue)
          localStorage.setItem(likeCacheKey, String(syncValue))
        }
      }

      const value = await fetchCounter(likeApiUrl, 'GET')
      setLikes(value)
      localStorage.setItem(likeCacheKey, String(value))
    }

    void loadLikes()
  }, [likeApiUrl, likeStorageKey, likePendingKey, likeCacheKey])

  useEffect(() => {
    if (!showSiteStats) {
      return
    }

    const loadSiteStats = async () => {
      const value = await fetchSiteStats('/api/stats/site')
      setSiteStats(value)
    }

    void loadSiteStats()
  }, [showSiteStats])

  const handleLike = async () => {
    if (liked || likeLoading) {
      return
    }

    setLikeLoading(true)
    const optimisticLikes = (likes ?? 0) + 1
    setLikes(optimisticLikes)
    setLiked(true)
    localStorage.setItem(likeStorageKey, '1')
    localStorage.setItem(likeCacheKey, String(optimisticLikes))

    const serverValue = await fetchLikeIncrement(postKey)
    if (serverValue > 0) {
      setLikes(serverValue)
      localStorage.setItem(likeCacheKey, String(serverValue))
      localStorage.removeItem(likePendingKey)
    }
    else {
      localStorage.setItem(likePendingKey, '1')
    }

    setLikeLoading(false)
  }

  return (
    <>
      {showSiteStats && (
        <section className="my-10 rounded-xl border border-gray-200/70 p-5 dark:border-gray-700/70">
          <h2 className="text-xl font-bold">网站统计</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
            <div className="rounded-lg bg-primary/10 p-3 text-center">
              <p className="text-2xl font-bold">{siteStats.siteUv}</p>
              <p className="mt-1 text-sm">访客数</p>
            </div>
            <div className="rounded-lg bg-primary/10 p-3 text-center">
              <p className="text-2xl font-bold">{siteStats.sitePv}</p>
              <p className="mt-1 text-sm">总站访问量</p>
            </div>
            <div className="rounded-lg bg-primary/10 p-3 text-center">
              <p className="text-2xl font-bold">{siteStats.todayUv}</p>
              <p className="mt-1 text-sm">今日访客</p>
            </div>
            <div className="rounded-lg bg-primary/10 p-3 text-center">
              <p className="text-2xl font-bold">{siteStats.todayPv}</p>
              <p className="mt-1 text-sm">今日访问量</p>
            </div>
          </div>
        </section>
      )}

      {showLikeButton && (
        <div className="fixed right-4 bottom-24 z-50 md:right-8">
          <button
            type="button"
            onClick={() => {
              void handleLike()
            }}
            disabled={liked || likeLoading}
            title={liked ? '已点赞' : '点赞'}
            className="relative h-16 w-16 rounded-full bg-background/90 shadow-lg ring-1 ring-gray-300 backdrop-blur-sm transition hover:scale-105 disabled:cursor-not-allowed dark:ring-gray-700"
          >
            <Heart
              className={`mx-auto h-11 w-11 ${liked ? 'fill-rose-500 text-rose-500' : 'text-rose-500'}`}
            />
            <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
              {likes ?? '--'}
            </span>
          </button>
        </div>
      )}
    </>
  )
}

async function fetchSiteStats(
  url: string,
  timeoutMs = 5000,
): Promise<{
  siteUv: number
  sitePv: number
  todayUv: number
  todayPv: number
}> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const response = await fetch(url, {
      method: 'GET',
      signal: controller.signal,
    })
    const data = (await response.json()) as {
      siteUv?: number
      sitePv?: number
      todayUv?: number
      todayPv?: number
    }
    return {
      siteUv: Number(data.siteUv ?? 0),
      sitePv: Number(data.sitePv ?? 0),
      todayUv: Number(data.todayUv ?? 0),
      todayPv: Number(data.todayPv ?? 0),
    }
  }
  catch {
    return {
      siteUv: 0,
      sitePv: 0,
      todayUv: 0,
      todayPv: 0,
    }
  }
  finally {
    clearTimeout(timeoutId)
  }
}

async function fetchLikeIncrement(
  slug: string,
  timeoutMs = 5000,
): Promise<number> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const response = await fetch('/api/likes', {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ slug }),
    })
    const data = (await response.json()) as { likes?: number }
    return typeof data.likes === 'number' ? data.likes : 0
  }
  catch {
    return 0
  }
  finally {
    clearTimeout(timeoutId)
  }
}
