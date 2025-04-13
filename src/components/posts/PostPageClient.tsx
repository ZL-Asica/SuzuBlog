'use client'

import { Pagination } from '@/components/ui'
import { useSearchedPosts, useUpdateURL } from '@/hooks'
import { backToTop, clamp } from '@zl-asica/react'
import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
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
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)

  const currentPage = useMemo(
    () => clamp(Number(searchParams.get('page') ?? '1'), 1, totalPages),
    [searchParams, totalPages],
  )

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
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={handleCurrentPageChange}
        translation={translation}
      />
    </>
  )
}

export default PostPageClient
