'use client'

import { getFilteredPosts, updateURL, validateParameters } from '@/services/utils'
import { backToTop } from '@zl-asica/react'
import { parseInt } from 'es-toolkit/compat'
import { useSearchParams } from 'next/navigation'

import { useEffect, useMemo, useState } from 'react'
import Pagination from './Pagination'
import PostListLayout from './PostList'

import SearchInput from './SearchInput'

interface PostPageClientProps {
  posts: PostListData[]
  translation: Translation
  postsPerPage: number
}

const PostPageClient = ({
  posts,
  translation,
  postsPerPage,
}: PostPageClientProps) => {
  const searchParameters = useSearchParams()
  const queryParameters = searchParameters.get('query') ?? ''
  const categoryParameter = searchParameters.get('category') ?? ''
  const tagParameter = searchParameters.get('tag') ?? ''

  const searchQueries = {
    query: queryParameters,
    category: categoryParameter,
    tag: tagParameter,
  }

  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParameters.get('page') ?? '1', 10),
  )

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    backToTop(10)()

    const currentUrl = new URL(globalThis.location.href)
    currentUrl.searchParams.set('page', page.toString())
    globalThis.history.pushState(null, '', currentUrl)
  }

  const categories = useMemo(() => [
    ...new Set(posts.flatMap(post => post.frontmatter.categories || [])),
  ], [posts])
  const tags = useMemo(() => [...new Set(posts.flatMap(post => post.frontmatter.tags || []))], [posts])

  useEffect(() => {
    const sanitizedParameters = validateParameters(searchParameters, categories, tags)
    const currentUrl = new URL(globalThis.location.href)
    updateURL(currentUrl, sanitizedParameters)
  }, [searchParameters, categories, tags])

  const filteredPosts = getFilteredPosts(
    posts,
    queryParameters,
    categoryParameter,
    tagParameter,
  )

  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage,
  )

  return (
    <div className="container mt-5 mx-auto flex flex-col items-center p-4">
      {/* Centered Search Input */}
      <SearchInput
        categories={categories}
        tags={tags}
        translation={translation}
        searchQueries={searchQueries}
      />

      {/* Post List */}
      {filteredPosts.length === 0 && (
        <h2 className="my-4 text-3xl font-bold">{translation.search.noResultsFound}</h2>
      )}

      <PostListLayout
        posts={currentPosts}
        translation={translation}
      />

      {/* Pagination */}
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={filteredPosts.length}
        currentPage={currentPage}
        setCurrentPage={handlePageChange}
      />
    </div>
  )
}

export default PostPageClient
