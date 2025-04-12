'use client'

import { useSearchedPosts } from '@/hooks'
import { updateURL } from '@/services/utils'

import { backToTop } from '@zl-asica/react'
import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'

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
  const filteredPosts = useSearchedPosts(posts, searchQueries)

  const currentPage = useMemo(() => {
    const page = Number(searchParameters.get('page') ?? '1')
    return Number.isNaN(page) || page < 1 ? 1 : page
  }, [searchParameters])

  const handlePageChange = (page: number) => {
    backToTop(10)()
    updateURL({ page }, { replace: false })
  }

  const categories = useMemo(() => [
    ...new Set(posts.flatMap(post => post.frontmatter.categories || [])),
  ], [posts])
  const tags = useMemo(() => [
    ...new Set(posts.flatMap(post => post.frontmatter.tags || [])),
  ], [posts])

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
        <h2 className="my-4 text-3xl font-bold">
          {translation.search.noResultsFound}
        </h2>
      )}

      <PostListLayout posts={currentPosts} translation={translation} />

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
