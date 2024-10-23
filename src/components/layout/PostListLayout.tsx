import CategoryLinks from '@/components/layout/CategoryLinks';
import { PostData } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { FaEye, FaFolder, FaRegClock } from 'react-icons/fa6';

export default function PostListLayout({ posts }: { posts: PostData[] }) {
  // TODO: Replace with actual read count
  const readCount: number = 29;

  return (
    <div className='grid grid-cols-1 gap-6'>
      {posts.map((post, index) => {
        return (
          <article
            key={post.slug}
            className={`flex flex-col overflow-hidden rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-xl md:flex-row ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''} mx-auto`}
            style={{ maxWidth: '780px', maxHeight: '400px' }} // Set max width and height
          >
            <Link
              className='max-h-[400px] w-full md:w-1/2'
              href={`/posts/${post.slug}`}
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
            <div className='flex flex-col justify-between p-4 md:w-1/2'>
              <div>
                {/* Date of Publish */}
                <div className='text-gray-450 mb-2 flex items-center text-sm'>
                  <FaRegClock className='mr-2' />
                  <span>{post.frontmatter.date.split(' ')[0]}</span>
                </div>
                {/* Title in Frontmatter */}
                <Link href={`/posts/${post.slug}`}>
                  <h2 className='mb-2 text-2xl font-bold'>
                    {post.frontmatter.title}
                  </h2>
                </Link>
                {/* Abstract */}
                <p className='text-sm abstract-text'>{post.postAbstract}</p>
              </div>
              <div className='mt-4 text-gray-450 flex items-center justify-between text-sm'>
                {/* Read Count */}
                <span className='flex items-center'>
                  <FaEye className='mr-1' />
                  {readCount} 热度
                </span>
                {/* Category */}
                <span className='flex items-center'>
                  <FaFolder className='mr-1' />
                  <CategoryLinks categories={post.frontmatter.categories} />
                </span>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
