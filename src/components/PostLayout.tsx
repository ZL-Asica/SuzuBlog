import Image from 'next/image';
import DisqusComments from '@/components/DisqusComments';
import { PostData } from '@/types';
import { getConfig } from '@/lib/getConfig';
import '@/styles/codeblock.css';
import '@/styles/postContent.css';
import 'highlight.js/styles/an-old-hope.css';

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
          <p className='mt-2 flex items-center'>
            {post.frontmatter.author}
            <span className='mx-3 text-2xl'>•</span>
            {post.frontmatter.date.split(' ')[0]}
          </p>
        </div>
      )}

      {/* Post content */}
      <div
        className='post-content mx-auto mt-10 w-full max-w-3xl'
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />

      {/* Comment Section */}
      {showComments && (
        <DisqusComments disqusShortname={config.disqusShortname} />
      )}
    </article>
  );
}
