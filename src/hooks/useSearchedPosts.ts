'use client'

import type { ReadonlyURLSearchParams } from 'next/navigation'
import MiniSearch from 'minisearch'
import { useMemo } from 'react'

const useSearchedPosts = (
  posts: PostListData[],
  searchParams: ReadonlyURLSearchParams,
): PostListData[] => {
  const { query, category, tag } = Object.fromEntries(searchParams.entries())

  // Custom tokenizer for better CJK (Chinese, Japanese, Korean) support
  const tokenize = (text: string): string[] => {
    // Remove extra whitespace and normalize
    const normalized = text.trim().toLowerCase()

    // Split by word boundaries for Latin scripts
    const latinWords = normalized.match(/\w+/g) || []

    // Handle CJK text more intelligently
    const tokens: string[] = [...latinWords]

    // Extract CJK characters and create meaningful segments
    const cjkText = text.match(/[\u4E00-\u9FFF\u3400-\u4DBF\u3040-\u309F\u30A0-\u30FF]+/g) || []

    for (const segment of cjkText) {
      // Add the full segment for exact matching
      tokens.push(segment.toLowerCase())

      // Only create bigrams for segments longer than 2 characters
      // This reduces noise while still allowing partial matching
      if (segment.length > 2) {
        for (let i = 0; i <= segment.length - 2; i++) {
          const bigram = segment.slice(i, i + 2).toLowerCase()
          tokens.push(bigram)
        }
      }
    }

    // Remove duplicates and return
    return [...new Set(tokens)]
  }

  // Custom term processor
  const processTerm = (term: string): string => {
    return term.toLowerCase().trim()
  }

  // Preprocess posts into searchable flat fields
  const preparedPosts = useMemo(() => {
    return posts.map(post => ({
      ...post,
      searchableTitle: post.frontmatter.title,
      searchableContent: post.contentRaw || '',
      searchableCategories: (post.frontmatter.categories || []).join(' '),
      searchableTags: (post.frontmatter.tags || []).join(' '),
    }))
  }, [posts])

  // Build a fast lookup map for slug -> post
  const slugMap = useMemo(() => {
    const map = new Map<string, PostListData>()
    preparedPosts.forEach(post => map.set(post.slug, post))
    return map
  }, [preparedPosts])

  // Create and fill the MiniSearch index
  const miniSearch = useMemo(() => {
    const search = new MiniSearch<PostListData>({
      fields: ['searchableTitle', 'searchableContent', 'searchableCategories', 'searchableTags'],
      tokenize,
      processTerm,
      searchOptions: {
        boost: {
          searchableTitle: 3,
          searchableCategories: 2,
          searchableTags: 2,
          searchableContent: 1,
        },
        prefix: true,
        fuzzy: 0.1,
        combineWith: 'AND', // Use AND for more precise matching
      },
      idField: 'slug',
    })

    search.addAll(preparedPosts)
    return search
  }, [preparedPosts])

  // Filter results based on query + category + tag
  return useMemo(() => {
    let baseResults: PostListData[]

    if (query) {
      const queryLower = query.toLowerCase()

      // Try MiniSearch first with relevance filtering
      const searchResults = miniSearch.search(queryLower, {
        filter: result => result.score > 0.5, // Only include results with decent relevance
      }).flatMap((result) => {
        const post = slugMap.get(result.id as string)
        return post ? [post] : []
      })

      // If MiniSearch returns good results, use them
      if (searchResults.length > 0) {
        baseResults = searchResults
      }
      else {
        // Fallback: more targeted substring search
        // Only search in title and tags for better precision
        baseResults = preparedPosts.filter((post) => {
          const title = post.searchableTitle.toLowerCase()
          const tags = post.searchableTags.toLowerCase()
          const categories = post.searchableCategories.toLowerCase()

          // Prioritize matches in title, tags, and categories over content
          return title.includes(queryLower)
            || tags.includes(queryLower)
            || categories.includes(queryLower)
          // Only check content if query is reasonably long to avoid noise
            || (queryLower.length >= 3 && post.searchableContent.toLowerCase().includes(queryLower))
        })
      }
    }
    else {
      baseResults = preparedPosts
    }

    return baseResults.filter((post) => {
      const categories = post.frontmatter.categories?.map(c => c.toLowerCase()) || []
      const tags = post.frontmatter.tags?.map(t => t.toLowerCase()) || []

      const matchCategory = category ? categories.includes(category.toLowerCase()) : true
      const matchTag = tag ? tags.includes(tag.toLowerCase()) : true

      return matchCategory && matchTag
    })
  }, [miniSearch, query, category, tag, preparedPosts, slugMap])
}

export default useSearchedPosts
