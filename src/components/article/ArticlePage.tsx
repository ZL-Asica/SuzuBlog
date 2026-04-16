import type { Config } from '@/schemas'
import process from 'node:process'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import readingTime from 'reading-time'
import { PostViewCount } from '@/components/common'
import { CustomImage } from '@/components/ui'
import CategoriesTagsList from './CategoriesTagsList'
import CommentsSection from './comments/CommentsSection'
import EngagementStats from './EngagementStats'
import MarkdownContent from './parser'
import TOC from './TOC'

const CopyrightInfo = dynamic(async () => import('./CopyrightInfo'))

interface MetaInfoProps {
  title?: string
  author: string
  date: string
  siteUrl: string
  postSlug: string
  showViewCount: boolean
  readingMinutes: number
  wordCount: number
}

const MetaInfo = ({
  title,
  author,
  date,
  siteUrl,
  postSlug,
  showViewCount,
  readingMinutes,
  wordCount,
}: MetaInfoProps) => {
  return (
    <div
      className={`absolute
        ${title !== undefined && title.trim() !== ''
      ? 'bottom-0 left-1/2 w-full max-w-3xl -translate-x-1/2 transform p-4 text-white'
      : 'mt-2 flex items-center'}
        `}
    >
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="left-1 ml-2 flex items-center flex-wrap gap-y-1">
        {author}
        <span className="mx-3 text-2xl">•</span>
        {date.split(' ')[0]}
        <span className="mx-3 text-2xl">•</span>
        字数
        {' '}
        {wordCount}
        <span className="mx-3 text-2xl">•</span>
        预计阅读
        {' '}
        {readingMinutes}
        {' '}
        分钟
        {showViewCount && (
          <>
            <span className="mx-3 text-2xl">•</span>
            <PostViewCount
              siteUrl={siteUrl}
              postSlug={postSlug}
              increment
              className={`${title !== undefined && title.trim() !== '' ? 'text-white' : ''}`}
            />
          </>
        )}
      </p>
    </div>
  )
}

interface ArticlePageProps {
  config: Config
  post: FullPostData
  previousPost?: {
    slug: string
    title: string
  } | null
  nextPost?: {
    slug: string
    title: string
  } | null
  relatedPosts?: Array<{
    slug: string
    title: string
    postAbstract: string
    date: string
  }>
}

const ArticlePage = ({
  config,
  post,
  previousPost = null,
  nextPost = null,
  relatedPosts = [],
}: ArticlePageProps) => {
  const translation = config.translation
  const walineServerURL
    = config.walineServerURL ?? process.env.NEXT_PUBLIC_WALINE_SERVER_URL ?? null
  const isAboutPage = post.slug.toLowerCase() === 'about'
  const isFriendsPage = post.slug.toLowerCase() === 'friends'
  const showPostView = !isAboutPage && !isFriendsPage
  const readingMinutes = Math.max(
    1,
    Math.ceil(readingTime(post.contentRaw).minutes),
  )
  const wordCount = post.contentRaw.replace(/\s+/g, '').length

  return (
    <article className="container mx-auto p-6 pb-2 mt-5 motion-safe:animate-mask-reveal">
      {post.frontmatter.showThumbnail
        ? (
            <div className="relative h-96 w-full">
              <CustomImage
                src={post.frontmatter.thumbnail}
                alt={`${translation.post.thumbnail} ${post.frontmatter.title}`}
                width={1200}
                height={500}
                className="h-full w-full rounded-lg object-cover"
                blurDataURL={config.background}
              />
              <div className="absolute inset-0 rounded-lg bg-black/40"></div>
              <MetaInfo
                title={post.frontmatter.title}
                author={post.frontmatter.author}
                date={post.frontmatter.date}
                siteUrl={config.siteUrl}
                postSlug={post.slug}
                showViewCount={showPostView}
                readingMinutes={readingMinutes}
                wordCount={wordCount}
              />
            </div>
          )
        : (
            <div className="mx-auto mb-5 w-full max-w-3xl">
              <h1 className="text-3xl font-bold">{post.frontmatter.title}</h1>
              {post.slug.toLowerCase() !== 'about' && post.slug.toLowerCase() !== 'friends' && (
                <MetaInfo
                  author={post.frontmatter.author}
                  date={post.frontmatter.date}
                  siteUrl={config.siteUrl}
                  postSlug={post.slug}
                  showViewCount={showPostView}
                  readingMinutes={readingMinutes}
                  wordCount={wordCount}
                />
              )}
            </div>
          )}

      <div className="mx-auto my-10 w-full max-w-5xl">
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
        {Array.isArray(post.toc) && post.toc.length > 0 && (
          <TOC
            items={post.toc}
            translation={translation}
            autoSlug={post.frontmatter.autoSlug}
            showThumbnail={post.frontmatter.showThumbnail}
          />
        )}

        {/* Main Content */}
        <MarkdownContent post={post} translation={translation} />
        <EngagementStats
          siteUrl={config.siteUrl}
          postSlug={post.slug}
          showSiteStats={false}
          showLikeButton={showPostView}
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
        {showPostView && relatedPosts.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-4 text-2xl font-bold">相关文章</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {relatedPosts.map(relatedPost => (
                <Link
                  key={relatedPost.slug}
                  href={`/${relatedPost.slug}`}
                  className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-gray-700 dark:bg-black/20"
                >
                  <h3 className="line-clamp-2 text-base font-semibold text-hover-primary">
                    {relatedPost.title}
                  </h3>
                  <p className="mt-2 text-xs text-gray-500">
                    {relatedPost.date.split(' ')[0]}
                  </p>
                  <p className="mt-2 line-clamp-3 text-sm text-gray-600 dark:text-gray-300">
                    {relatedPost.postAbstract}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
        {showPostView && (previousPost !== null || nextPost !== null) && (
          <nav className="mt-8 grid gap-4 md:grid-cols-2">
            {previousPost !== null && (
              <Link
                href={`/${previousPost.slug}`}
                className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-gray-700 dark:bg-black/20"
              >
                <p className="text-xs text-gray-500">上一篇</p>
                <p className="mt-1 line-clamp-2 font-semibold text-hover-primary">
                  {previousPost.title}
                </p>
              </Link>
            )}
            {nextPost !== null && (
              <Link
                href={`/${nextPost.slug}`}
                className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-gray-700 dark:bg-black/20"
              >
                <p className="text-xs text-gray-500">下一篇</p>
                <p className="mt-1 line-clamp-2 font-semibold text-hover-primary">
                  {nextPost.title}
                </p>
              </Link>
            )}
          </nav>
        )}
        <div className="mt-10" />
        <CommentsSection
          walineServerURL={walineServerURL}
          twikooEnvId={config.twikooEnvId}
          disqusShortname={config.disqusShortname}
          path={`/${post.slug}`}
        />
      </div>
    </article>
  )
}

export default ArticlePage
