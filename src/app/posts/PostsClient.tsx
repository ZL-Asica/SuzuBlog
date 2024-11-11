'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

import getFilteredPosts from '@/services/utils/getFilteredPosts';

import PostListLayout from '@/components/layout/PostListLayout';
import Pagination from '@/components/common/Pagination';
import SearchInput from '@/components/common/SearchInput';

interface PostsClientProperties {
  posts: PostData[];
}

function PostsClient({ posts }: PostsClientProperties) {
  const searchParameters = useSearchParams();
  const categoryParameter = searchParameters.get('category') || '';
  const tagParameter = searchParameters.get('tag') || '';
  const searchQuery = searchParameters.get('query') || '';

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  // Filter posts based on search, category, and tag
  const filteredPosts = getFilteredPosts(
    posts,
    searchQuery,
    categoryParameter,
    tagParameter
  );

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className='container mx-auto flex flex-col items-center p-4'>
      <h1 className='mb-6 text-center text-4xl font-bold'>All Posts</h1>

      {/* Centered Search Input */}
      <div className='w-full'>
        <SearchInput initialValue={searchQuery} />
      </div>

      {/* Post List */}
      <PostListLayout posts={currentPosts} />

      {/* Pagination */}
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={filteredPosts.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
}

export default PostsClient;
