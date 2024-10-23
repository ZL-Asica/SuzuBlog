import DisqusComments from '@/components/common/DisqusComments';
import { getConfig } from '@/services/config/getConfig';
import '@/styles/codeblock.css';
import '@/styles/postContent.css';
import { PostData } from '@/types';
import 'highlight.js/styles/an-old-hope.css';
import Image from 'next/image';
import { FaFolder, FaTags } from 'react-icons/fa6';
import ItemLinks from './ItemLinks';

interface PostLayoutProps {
  post: PostData;
  showThumbnail?: boolean;
}

export default function PostLayout({
  post,
  showThumbnail = true,
}: PostLayoutProps) {
  const config = getConfig();

  // if showComments is defined in the frontmatter, use that value,
  //    otherwise default to true
  const showComments: boolean = post.frontmatter.showComments ?? true;

  return (
    <article className='container mx-auto p-5'>
      {showThumbnail ? (
        <div className='relative h-96 w-full'>
          {/* Thumbnail masking effect */}
          <Image
            src={post.frontmatter.thumbnail}
            alt={`Thumbnail for ${post.frontmatter.title}`}
            width={1200}
            height={500}
            className='h-full w-full rounded-lg object-cover'
          />

          {/* Mask */}
          <div className='absolute inset-0 rounded-lg bg-black bg-opacity-40'></div>

          {/* Title and publishing info */}
          <div className='absolute bottom-0 left-1/2 w-full max-w-3xl -translate-x-1/2 transform p-4 text-white'>
            <h1 className='text-3xl font-bold'>{post.frontmatter.title}</h1>
            <p className='left-1 ml-2 flex items-center'>
              {post.frontmatter.author}
              <span className='mx-3 text-2xl'>•</span>
              {post.frontmatter.date.split(' ')[0]}
            </p>
          </div>
        </div>
      ) : (
        /* If no thumbnail, display the title at the top */
        <div className='mx-auto mb-5 w-full max-w-3xl'>
          <h1 className='text-3xl font-bold'>{post.frontmatter.title}</h1>

          {(post.frontmatter.title === 'About' ||
            post.frontmatter.title === 'Friends') ?? (
            <p className='mt-2 flex items-center'>
              {post.frontmatter.author}
              <span className='mx-3 text-2xl'>•</span>
              {post.frontmatter.date.split(' ')[0]}
            </p>
          )}
        </div>
      )}
      <div className='mx-auto mt-10 w-full max-w-3xl'>
        {/* Show categories and tags if any */}
        {(post.frontmatter.categories?.length ||
          post.frontmatter.tags?.length) && (
          <ul className='mx-auto mt-5 flex flex-col gap-4'>
            <li className='flex items-center gap-2'>
              <FaFolder className='mr-1' />
              <span className='font-semibold'>分类:</span>
              <ItemLinks
                items={post.frontmatter.categories}
                type={'category'}
              />
            </li>
            <li className='flex items-center gap-2'>
              <FaTags className='mr-1' />
              <span className='font-semibold'>标签:</span>
              <ItemLinks items={post.frontmatter.tags} type={'tag'} />
            </li>
          </ul>
        )}

        {/* Post content */}
        <div
          className='post-content mt-8'
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </div>
      {/* Comment Section */}
      {showComments && (
        <DisqusComments disqusShortname={config.disqusShortname} />
      )}
    </article>
  );
}
