'use client'

import type { ReadonlyURLSearchParams } from 'next/navigation'
import MiniSearch from 'minisearch'
import { useMemo } from 'react'

const useSearchedPosts = (
  posts: PostListData[],
  searchParams: ReadonlyURLSearchParams,
): PostListData[] => {
  const { query, category, tag } = Object.fromEntries(searchParams.entries())

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
      searchOptions: {
        boost: {
          searchableTitle: 2,
          searchableCategories: 1.5,
          searchableTags: 1.2,
          searchableContent: 1,
        },
        prefix: true,
        fuzzy: 0.1,
      },
      idField: 'slug',
    })

    search.addAll(preparedPosts)
    return search
  }, [preparedPosts])

  // Filter results based on query + category + tag
  return useMemo(() => {
    const baseResults = query
      ? miniSearch.search(query).flatMap((result) => {
          const post = slugMap.get(result.id as string)
          return post ? [post] : []
        })
      : preparedPosts

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
