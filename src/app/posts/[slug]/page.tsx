import { getPostData } from '@/lib/posts';
import Image from 'next/image';
import { PostData } from '@/types';
import '@/styles/codeblock.css';
import '@/styles/postContent.css';
import 'highlight.js/styles/an-old-hope.css';

interface PostPageProps {
  params: {
    slug: string;
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const post: PostData = await getPostData(params.slug);

  return (
    <article className='container mx-auto p-4'>
      {post.frontmatter.thumbnail && (
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
      )}

      {/* Post content */}
      <div
        className='post-content mx-auto mt-10 w-full max-w-3xl'
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </article>
  );
}
