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
): URLSearchParams => {
  const newParameters = new URLSearchParams()

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

const updateURL = (currentUrl: URL, updatedParameters: URLSearchParams): void => {
  const newSearch = updatedParameters.toString()
  if (currentUrl.search !== `?${newSearch}`) {
    currentUrl.search = newSearch
    globalThis.history.replaceState(null, '', currentUrl.toString())
  }
}

export { sanitizeQuery, updateURL, validateParameters }
