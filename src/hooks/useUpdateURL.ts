import { sanitizeQuery } from '@/services/utils'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

const useUpdateURL = () => {
  const router = useRouter()

  const update = useCallback((
    updates: Record<string, unknown> | Map<string, unknown>,
    options: { replace?: boolean, scroll?: boolean } = {},
  ): void => {
    const currentUrl = new URL(globalThis.location.href)
    const params = new URLSearchParams(currentUrl.search)

    const entries = updates instanceof Map
      ? Array.from(updates.entries())
      : Object.entries(updates)

    entries.forEach(([key, value]) => {
      if (value === null || value === undefined || value === '') {
        params.delete(key)
      }
      else {
        // Prevent XSS attacks by sanitizing the query parameter
        if (key === 'query') {
          value = sanitizeQuery(String(value))
        }

        params.set(key, String(value))
      }
    })

    const newSearch = `?${params.toString()}`
    if (currentUrl.search !== newSearch) {
      if (options.replace ?? true) {
        router.replace(newSearch, { scroll: options.scroll })
      }
      else {
        router.push(newSearch, { scroll: options.scroll })
      }
    }
  }, [router])

  return update
}

export default useUpdateURL
