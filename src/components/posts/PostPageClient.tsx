'use client'

import { useSearchedPosts, useUpdateURL } from '@/hooks'
import { backToTop } from '@zl-asica/react'
import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import Pagination from './Pagination'
import PostListLayout from './PostList'

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
  const updateURL = useUpdateURL()
  const searchParams = useSearchParams()

  const filteredPosts = useSearchedPosts(posts, searchParams)

  const currentPage = useMemo(() => {
    const page = Number(searchParams.get('page') ?? '1')
    return Number.isNaN(page) || page < 1 ? 1 : page
  }, [searchParams])

  const handleCurrentPageChange = (page: number) => {
    backToTop(10)()
    updateURL({ page })
  }

  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage,
  )

  return (
    <>
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
        setCurrentPage={handleCurrentPageChange}
      />
    </>
  )
}

export default PostPageClient
