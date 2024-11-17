'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';
import { defaultTo, flatMap, find } from 'es-toolkit/compat';

import PostListLayout from './PostList';
import Pagination from './Pagination';
import SearchInput from './SearchInput';

import { getFilteredPosts } from '@/services/utils';

interface PostPageClientProperties {
  posts: PostListData[];
  translation: Translation;
}

const PostPageClient = ({ posts, translation }: PostPageClientProperties) => {
  const searchParameters = useSearchParams();
  const pathname = usePathname();

  const searchQuery = defaultTo(searchParameters.get('query'));

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  const categories = defaultTo(
    [
      ...new Set(
        flatMap(posts, (post) =>
          defaultTo(post.frontmatter.categories, [])
        ) as string[]
      ),
    ],
    []
  );

  const tags = defaultTo(
    [
      ...new Set(
        flatMap(posts, (post) =>
          defaultTo(post.frontmatter.tags, [])
        ) as string[]
      ),
    ],
    []
  );

  // Validate category and tag parameters
  const categoryInParameters = searchParameters.get('category');
  const categoryParameter = find(
    categories,
    (category) => category === categoryInParameters
  );

  const tagInParameters = searchParameters.get('tag');
  const tagParameter = find(tags, (tag) => tag === tagInParameters);

  // Update URL if parameters are sanitized or invalid
  useEffect(() => {
    const params = new URLSearchParams(searchParameters.toString());

    if (categoryInParameters && categoryInParameters !== categoryParameter) {
      if (categoryParameter) {
        params.set('category', categoryParameter);
      } else {
        params.delete('category');
      }
    }

    if (tagInParameters && tagInParameters !== tagParameter) {
      if (tagParameter) {
        params.set('tag', tagParameter);
      } else {
        params.delete('tag');
      }
    }

    const newUrl = `${pathname}?${params.toString()}`;
    if (globalThis.location.search !== `?${params.toString()}`) {
      globalThis.history.replaceState(null, '', newUrl);
    }
  }, [
    categoryInParameters,
    tagInParameters,
    categoryParameter,
    tagParameter,
    pathname,
    searchParameters,
  ]);

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
    <div className='container mx-auto flex animate-fadeInDown flex-col items-center p-4'>
      {/* Centered Search Input */}
      <SearchInput
        initialValue={searchQuery}
        categories={categories}
        tags={tags}
        translation={translation}
      />

      {/* Post List */}
      <PostListLayout
        posts={currentPosts}
        translation={translation}
      />

      {/* Pagination */}
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={filteredPosts.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default PostPageClient;
