import LoadingIndicator from '@/components/common/LoadingIndicator'
import { CustomImage } from '@/components/ui'
import { includes, isEmpty, lowerCase } from 'es-toolkit/compat'

import dynamic from 'next/dynamic'

import { Suspense } from 'react'
import CategoriesTagsList from './CategoriesTagsList'
import MarkdownContent from './parser'

import TOC from './TOC'

const CopyrightInfo = dynamic(async () => import('./CopyrightInfo'))
const TwikooComments = dynamic(async () => import('./comments/TwikooComments'))
const DisqusComments = dynamic(async () => import('./comments/DisqusComments'))

interface PostLayoutProps {
  config: Config
  post: FullPostData
}

function ArticlePage({ config, post }: PostLayoutProps) {
  const translation = config.translation

  return (
    <article className="container mx-auto animate-fadeInDown p-6 pb-2">
      {post.frontmatter.showThumbnail
        ? (
            <Thumbnail
              title={post.frontmatter.title}
              src={post.frontmatter.thumbnail}
              author={post.frontmatter.author}
              date={post.frontmatter.date}
              thumbnailTranslation={translation.post.thumbnail}
              fallbackImage={config.background}
            />
          )
        : (
            <TitleHeader
              title={post.frontmatter.title}
              author={post.frontmatter.author}
              date={post.frontmatter.date}
              slug={post.slug}
            />
          )}

      <div className="mx-auto my-10 w-full max-w-3xl">
        <Suspense fallback={<LoadingIndicator />}>
          {(post.frontmatter.categories || post.frontmatter.tags) && (
            <ul className="mx-auto mt-5 flex flex-col gap-4">
              <CategoriesTagsList
                type="category"
                translation={translation}
                items={post.frontmatter.categories}
              />
              <CategoriesTagsList
                type="tag"
                translation={translation}
                items={post.frontmatter.tags}
              />
            </ul>
          )}
        </Suspense>
        {!isEmpty(post.toc) && (
          <TOC
            items={post.toc}
            translation={translation}
            autoSlug={post.frontmatter.autoSlug}
            showThumbnail={post.frontmatter.showThumbnail}
          />
        )}
        <MarkdownContent
          post={post}
          translation={translation}
        />
        {post.frontmatter.showLicense && (
          <CopyrightInfo
            author={post.frontmatter.author}
            siteUrl={config.siteUrl}
            title={post.frontmatter.title}
            creativeCommons={config.creativeCommons}
            translation={translation}
          />
        )}
        <div className="mt-10"></div>
        {post.frontmatter.showComments && (
          config.twikooEnvId != null
            ? (
                <TwikooComments environmentId={config.twikooEnvId} />
              )
            : config.disqusShortname != null
              ? (
                  <DisqusComments disqusShortname={config.disqusShortname} />
                )
              : null
        )}

      </div>
    </article>
  )
}

function Thumbnail({
  title,
  src,
  author,
  date,
  thumbnailTranslation,
  fallbackImage,
}: {
  title: string
  src: string
  author: string
  date: string
  thumbnailTranslation: string
  fallbackImage: string
}) {
  return (
    <div className="relative h-96 w-full">
      <CustomImage
        src={src}
        alt={`${thumbnailTranslation} ${title}`}
        width={1200}
        height={500}
        className="h-full w-full rounded-lg object-cover"
        blurDataURL={fallbackImage}
      />
      <div className="absolute inset-0 rounded-lg bg-black bg-opacity-40"></div>
      <MetaInfo
        title={title}
        author={author}
        date={date}
        isOverlay
      />
    </div>
  )
}

function TitleHeader({
  title,
  author,
  date,
  slug,
}: {
  title: string
  author: string
  date: string
  slug: string
}) {
  return (
    <div className="mx-auto mb-5 w-full max-w-3xl">
      <h1 className="text-3xl font-bold">{title}</h1>
      {includes(['about', 'friends'], lowerCase(slug)) || (
        <MetaInfo
          author={author}
          date={date}
        />
      )}
    </div>
  )
}

function MetaInfo({
  title,
  author,
  date,
  isOverlay,
}: {
  title?: string
  author: string
  date: string
  isOverlay?: boolean
}) {
  return (
    <div
      className={`absolute ${isOverlay ? 'bottom-0 left-1/2 w-full max-w-3xl -translate-x-1/2 transform p-4 text-white' : 'mt-2 flex items-center'}`}
    >
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="left-1 ml-2 flex items-center">
        {author}
        <span className="mx-3 text-2xl">•</span>
        {date.split(' ')[0]}
      </p>
    </div>
  )
}

export default ArticlePage
