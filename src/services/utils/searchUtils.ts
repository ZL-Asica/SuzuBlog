const sanitizeQuery = (query: string | null): string => {
  // Remove non-alphanumeric characters and trim the query
  if (query === null) {
    return ''
  }
  return query
    .replaceAll(/[^\p{L}\p{N}\s]/gu, '')
    .trim()
    .slice(0, 30)
}

const validateParameters = (
  searchParameters: URLSearchParams,
  categories: string[],
  tags: string[],
): Map<string, string> => {
  const newParameters = new Map<string, string>()

  for (const [key, value] of searchParameters.entries()) {
    if (key === 'category' && categories.includes(value)) {
      newParameters.set(key, value)
    }
    else if (key === 'tag' && tags.includes(value)) {
      newParameters.set(key, value)
    }
    else if (key === 'query') {
      newParameters.set(key, sanitizeQuery(value))
    }
    else if (key === 'page') {
      const page = Number.parseInt(value, 10)
      newParameters.set(key, Number.isNaN(page) || page < 1 ? '1' : page.toString())
    }
  }

  return newParameters
}

const updateURL = (
  updates: Record<string, unknown> | Map<string, unknown>,
  options: { replace?: boolean } = {},
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
      params.set(key, String(value))
    }
  })

  const newSearch = params.toString()
  if (currentUrl.search !== `?${newSearch}`) {
    currentUrl.search = newSearch
    const url = currentUrl.toString()
    if (options.replace ?? true) {
      globalThis.history.replaceState(null, '', url)
    }
    else {
      globalThis.history.pushState(null, '', url)
    }
  }
}

export { sanitizeQuery, updateURL, validateParameters }
