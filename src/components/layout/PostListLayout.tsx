'use client';

import '@/styles/postListLayout.css';
import Image from 'next/image';
import Link from 'next/link';
import { FaEye, FaFolder, FaRegClock } from 'react-icons/fa6';

import ItemLinks from './ItemLinks';

export default function PostListLayout({ posts }: { posts: PostData[] }) {
  // TODO: Replace with actual read count
  const readCount: number = 29;

  return (
    <div className='grid grid-cols-1 gap-6'>
      {posts.map((post, index) => {
        return (
          <article
            key={post.slug}
            className={`post-article flex-col shadow-lg transition-shadow duration-300 hover:shadow-2xl md:flex-row ${index % 2 === 0 && 'md:flex-row-reverse'} mx-auto dark:shadow-[var(--darkForeground)]`}
          >
            <Link
              className='max-h-[400px] w-full md:w-1/2'
              href={`/posts/${post.slug}`}
              target='_self'
              aria-label={`Read more about ${post.frontmatter.title}`}
            >
              {/* Thumbnail */}
              {post.frontmatter.thumbnail && (
                <Image
                  src={post.frontmatter.thumbnail}
                  alt={`Thumbnail for post titled ${post.frontmatter.title}`}
                  width={780}
                  height={400}
                  className='h-full w-full object-cover'
                  priority={index < 3}
                />
              )}
            </Link>

            {/* Content */}
            <div className='m-6 flex flex-col justify-between md:w-1/2'>
              <div>
                {/* Date of Publish */}
                <div className='text-gray-450 mb-2 flex items-center text-sm'>
                  <FaRegClock className='mr-2' />
                  <span>{post.frontmatter.date.split(' ')[0]}</span>
                </div>
                {/* Title in Frontmatter */}
                <Link
                  href={`/posts/${post.slug}`}
                  target='_self'
                >
                  <h2 className='mb-2 text-2xl font-bold'>
                    {post.frontmatter.title}
                  </h2>
                </Link>
                {/* Abstract */}
                <p className='abstract-text text-sm'>{post.postAbstract}</p>
              </div>
              <div className='text-gray-450 mt-4 flex items-center justify-between text-sm'>
                {/* Read Count */}
                <span className='flex items-center'>
                  <FaEye className='mr-1' />
                  {readCount} 热度
                </span>
                {/* Category */}
                <span className='flex items-center'>
                  <FaFolder className='mr-1' />
                  <ItemLinks
                    items={post.frontmatter.categories}
                    type='category'
                  />
                </span>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
