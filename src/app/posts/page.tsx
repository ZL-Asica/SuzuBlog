import { getAllPosts } from '@/services/posts';
import Link from 'next/link';
import { PostData } from '@/types';
import Image from 'next/image';
import { FaFolder, FaRegClock, FaEye } from 'react-icons/fa6';

export default async function PostsPage() {
  const posts: PostData[] = await getAllPosts();

  // TODO: Replace with actual read count
  const readCount: number = 29;

  posts.forEach((post) => {
    const plainText = post.contentHtml
      .replace(/<!--more-->/g, '[[MORE_PLACEHOLDER]]')
      .replace(/<[^>]*>/g, '');

    const moreIndex = plainText.indexOf('[[MORE_PLACEHOLDER]]');

    post.contentHtml =
      moreIndex > 0
        ? plainText.slice(0, moreIndex).replace('[[MORE_PLACEHOLDER]]', '')
        : plainText.slice(0, 150);
  });

  return (
    <div className='container mx-auto p-4'>
      <h1 className='mb-6 text-center text-4xl font-bold'>All Posts</h1>

      <div className='grid grid-cols-1 gap-6'>
        {posts.map((post, index) => (
          <Link
            key={post.slug}
            href={`/posts/${post.slug}`}
            className={`flex flex-col overflow-hidden rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-xl md:flex-row ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''} mx-auto`}
            style={{ maxWidth: '780px', maxHeight: '400px' }} // Set max width and height
          >
            {/* Thumbnail */}
            <div className='max-h-[400px] w-full md:w-1/2'>
              {post.frontmatter.thumbnail && (
                <Image
                  src={post.frontmatter.thumbnail}
                  alt={post.frontmatter.title}
                  width={780}
                  height={400}
                  className='h-full w-full object-cover'
                />
              )}
            </div>

            {/* Content */}
            <div className='flex flex-col justify-between p-4 md:w-1/2'>
              <div>
                {/* Date of Publish */}
                <div className='text-gray-450 mb-2 flex items-center text-sm'>
                  <FaRegClock className='mr-2' />
                  <span>{post.frontmatter.date.split(' ')[0]}</span>
                </div>
                {/* Title in Frontmatter */}
                <h2 className='mb-2 text-2xl font-bold'>
                  {post.frontmatter.title}
                </h2>
                <p className='text-sm text-gray-300'>{post.contentHtml}</p>
              </div>
              <div className='mt-4'>
                <div className='text-gray-450 flex items-center justify-between text-sm'>
                  {/* Read Count */}
                  <span className='flex items-center'>
                    <FaEye className='mr-1' />
                    {readCount} 热度
                  </span>
                  {/* Category */}
                  <span className='flex items-center'>
                    <FaFolder className='mr-1' />
                    {post.frontmatter.categories?.join(', ') || '未分类'}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
