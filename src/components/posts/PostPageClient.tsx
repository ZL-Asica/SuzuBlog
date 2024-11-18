'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import PostListLayout from './PostList';
import Pagination from './Pagination';
import SearchInput from './SearchInput';

import {
  getFilteredPosts,
  validateParameters,
  updateURL,
} from '@/services/utils';

interface PostPageClientProperties {
  posts: PostListData[];
  translation: Translation;
}

const PostPageClient = ({ posts, translation }: PostPageClientProperties) => {
  const searchParameters = useSearchParams();
  const searchQuery = searchParameters.get('query') || '';
  const categoryParameter = searchParameters.get('category') || '';
  const tagParameter = searchParameters.get('tag') || '';

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;
  const categories = [
    ...new Set(posts.flatMap((post) => post.frontmatter.categories || [])),
  ];
  const tags = [
    ...new Set(posts.flatMap((post) => post.frontmatter.tags || [])),
  ];

  useEffect(() => {
    const sanitizedParameters = validateParameters(
      searchParameters,
      categories,
      tags
    );
    const currentUrl = new URL(globalThis.location.href);
    updateURL(currentUrl, sanitizedParameters);
  }, [searchParameters]);

  const filteredPosts = getFilteredPosts(
    posts,
    searchQuery,
    categoryParameter,
    tagParameter
  );

  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  return (
    <div className='container mx-auto flex animate-fadeInDown flex-col items-center p-4'>
      {/* Centered Search Input */}
      <SearchInput
        categories={categories}
        tags={tags}
        translation={translation}
        initialValue={searchQuery}
      />

      {/* Post List */}
      {filteredPosts.length === 0 && (
        <h2 className='my-4 text-3xl font-bold'>
          {translation.search.noResultsFound}
        </h2>
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
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default PostPageClient;
