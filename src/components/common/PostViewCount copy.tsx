'use client'

import { Eye } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

interface PostViewCountProps {
  siteUrl: string
  postSlug: string
  increment?: boolean
  className?: string
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
    const data = (await response.json()) as { value?: number }
    return typeof data.value === 'number' ? data.value : 0
  }
  catch {
    return 0
  }
  finally {
    clearTimeout(timeoutId)
  }
}

export default function PostViewCount({
  siteUrl,
  postSlug,
  increment = false,
  className = '',
}: PostViewCountProps) {
  const key = useMemo(() => `pv-${normalizeKey(postSlug)}`, [postSlug])
  const namespace = useMemo(() => normalizeNamespace(siteUrl), [siteUrl])
  const sessionViewKey = useMemo(
    () => `viewed:${namespace}:${key}`,
    [namespace, key],
  )
  const cacheKey = useMemo(
    () => `view-cache:${namespace}:${key}`,
    [namespace, key],
  )
  const apiUrl = useMemo(
    () => `/api/stats/${normalizeKey(postSlug)}?type=view`,
    [postSlug],
  )

  const [views, setViews] = useState<number | null>(null)

  const getVisitorId = () => {
    const storageKey = `visitor-id:${namespace}`
    const existed = localStorage.getItem(storageKey)
    if (existed !== null && existed.trim() !== '') {
      return existed
    }

    const nextId
      = typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(16).slice(2)}`
    localStorage.setItem(storageKey, nextId)
    return nextId
  }

  useEffect(() => {
    const cached = localStorage.getItem(cacheKey)
    if (cached !== null) {
      const num = Number(cached)
      if (!Number.isNaN(num)) {
        setViews(num)
      }
    }

    const loadViews = async () => {
      const hasViewedInSession = sessionStorage.getItem(sessionViewKey) === '1'
      const method: 'GET' | 'POST'
        = increment && !hasViewedInSession ? 'POST' : 'GET'

      const nextValue
        = method === 'POST'
          ? await fetchCounterWithVisitor(apiUrl, getVisitorId())
          : await fetchCounter(apiUrl, method)
      setViews(nextValue)
      localStorage.setItem(cacheKey, String(nextValue))

      if (increment && !hasViewedInSession) {
        sessionStorage.setItem(sessionViewKey, '1')
      }
    }

    void loadViews()
  }, [increment, sessionViewKey, cacheKey, apiUrl])

  return (
    <span className={`inline-flex items-center gap-1 ${className}`}>
      <Eye size={16} />
      <span>{views ?? '--'}</span>
    </span>
  )
}

async function fetchCounterWithVisitor(
  url: string,
  visitorId: string,
  timeoutMs = 5000,
): Promise<number> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const response = await fetch(url, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ visitorId }),
    })
    const data = (await response.json()) as { value?: number }
    return typeof data.value === 'number' ? data.value : 0
  }
  catch {
    return 0
  }
  finally {
    clearTimeout(timeoutId)
  }
}
