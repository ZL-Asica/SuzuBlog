import Image from 'next/image';
import dynamic from 'next/dynamic';
import { FaFolder, FaTags } from 'react-icons/fa6';
import { includes, isEmpty, lowerCase } from 'es-toolkit/compat';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

import ItemLinks from '../helpers/ItemLinks';

import { getConfig } from '@/services/config';

import createMarkdownComponents from '@/components/posts/markdownComponents';
import TOC from '@/components/posts/TOC';
import CopyrightInfo from '@/components/helpers/CopyrightInfo';

interface PostLayoutProperties {
  config: Config;
  post: FullPostData;
  showThumbnail?: boolean;
}

const DisqusComments = dynamic(
  () => import('@/components/posts/DisqusComments')
);

function PostLayout({
  config,
  post,
  showThumbnail = true,
}: PostLayoutProperties) {
  const markdownComponents = createMarkdownComponents();

  return (
    <article className='container mx-auto p-6'>
      {showThumbnail ? (
        <Thumbnail
          title={post.frontmatter.title}
          src={post.frontmatter.thumbnail}
          author={post.frontmatter.author}
          date={post.frontmatter.date}
        />
      ) : (
        <TitleHeader
          title={post.frontmatter.title}
          author={post.frontmatter.author}
          date={post.frontmatter.date}
        />
      )}

      <div className='mx-auto my-10 w-full max-w-3xl'>
        <CategoriesTagsList
          categories={post.frontmatter.categories}
          tags={post.frontmatter.tags}
        />
        {!isEmpty(post.toc) && (
          <TOC
            items={post.toc}
            showThumbnail={showThumbnail}
          />
        )}
        <Markdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={markdownComponents}
          className='mt-5'
        >
          {post.contentRaw}
        </Markdown>
        <CopyrightInfo
          author={post.frontmatter.author}
          siteUrl={config.siteUrl}
          title={post.frontmatter.title}
          creativeCommons={config.creativeCommons}
        />
      </div>
      {post.frontmatter.showComments && (
        <DisqusComments disqusShortname={getConfig().disqusShortname} />
      )}
    </article>
  );
}

function Thumbnail({
  title,
  src,
  author,
  date,
}: {
  title: string;
  src: string;
  author: string;
  date: string;
}) {
  return (
    <div className='relative h-96 w-full'>
      <Image
        src={src}
        alt={`Thumbnail for ${title}`}
        width={1200}
        height={500}
        className='h-full w-full rounded-lg object-cover'
      />
      <div className='absolute inset-0 rounded-lg bg-black bg-opacity-40'></div>
      <MetaInfo
        title={title}
        author={author}
        date={date}
        isOverlay
      />
    </div>
  );
}

function TitleHeader({
  title,
  author,
  date,
}: {
  title: string;
  author: string;
  date: string;
}) {
  return (
    <div className='mx-auto mb-5 w-full max-w-3xl'>
      <h1 className='text-3xl font-bold'>{title}</h1>
      {includes(['about', 'friends'], lowerCase(title)) || (
        <MetaInfo
          author={author}
          date={date}
        />
      )}
    </div>
  );
}

function MetaInfo({
  title,
  author,
  date,
  isOverlay,
}: {
  title?: string;
  author: string;
  date: string;
  isOverlay?: boolean;
}) {
  return (
    <div
      className={`absolute ${isOverlay ? 'bottom-0 left-1/2 w-full max-w-3xl -translate-x-1/2 transform p-4 text-white' : 'mt-2 flex items-center'}`}
    >
      {title && <h1 className='text-3xl font-bold'>{title}</h1>}
      <p className='left-1 ml-2 flex items-center'>
        {author}
        <span className='mx-3 text-2xl'>•</span>
        {date.split(' ')[0]}
      </p>
    </div>
  );
}

function CategoriesTagsList({
  categories,
  tags,
}: {
  categories?: string[];
  tags?: string[];
}) {
  if (!categories && !tags) return null;

  return (
    <ul className='mx-auto mt-5 flex flex-col gap-4'>
      {categories && (
        <li className='flex items-center gap-2'>
          <FaFolder className='mr-1' />
          <span className='font-semibold'>分类:</span>
          <ItemLinks
            items={categories}
            type='category'
          />
        </li>
      )}
      {tags && (
        <li className='flex items-center gap-2'>
          <FaTags className='mr-1' />
          <span className='font-semibold'>标签:</span>
          <ItemLinks
            items={tags}
            type='tag'
          />
        </li>
      )}
    </ul>
  );
}

export default PostLayout;
