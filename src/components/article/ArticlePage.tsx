import { CustomImage } from '@/components/ui'
import { includes, isEmpty, lowerCase } from 'es-toolkit/compat'
import dynamic from 'next/dynamic'
import CategoriesTagsList from './CategoriesTagsList'
import MarkdownContent from './parser'
import TOC from './TOC'

const CopyrightInfo = dynamic(async () => import('./CopyrightInfo'))
const TwikooComments = dynamic(async () => import('./comments/TwikooComments'))
const DisqusComments = dynamic(async () => import('./comments/DisqusComments'))

interface MetaInfoProps {
  title?: string
  author: string
  date: string
}

const MetaInfo = ({
  title,
  author,
  date,
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
      <p className="left-1 ml-2 flex items-center">
        {author}
        <span className="mx-3 text-2xl">•</span>
        {date.split(' ')[0]}
      </p>
    </div>
  )
}

interface ArticlePageProps {
  config: Config
  post: FullPostData
}

const ArticlePage = ({ config, post }: ArticlePageProps) => {
  const translation = config.translation

  return (
    <article className="container mx-auto p-6 pb-2 mt-5">
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
              />
            </div>
          )
        : (
            <div className="mx-auto mb-5 w-full max-w-3xl">
              <h1 className="text-3xl font-bold">{post.frontmatter.title}</h1>
              {includes(['about', 'friends'], lowerCase(post.slug)) || (
                <MetaInfo
                  author={post.frontmatter.author}
                  date={post.frontmatter.date}
                />
              )}
            </div>
          )}

      {/* TODO: Change max-w-3xl to max-w-5xl */}
      <div className="mx-auto my-10 w-full max-w-3xl">
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
        {!isEmpty(post.toc) && (
          <TOC
            items={post.toc}
            translation={translation}
            autoSlug={post.frontmatter.autoSlug}
            showThumbnail={post.frontmatter.showThumbnail}
          />
        )}

        {/* Main Content */}
        <MarkdownContent post={post} translation={translation} />

        {post.frontmatter.showLicense && (
          <CopyrightInfo
            author={post.frontmatter.author}
            siteUrl={config.siteUrl}
            title={post.frontmatter.title}
            creativeCommons={config.creativeCommons}
            translation={translation}
          />
        )}
        <div className="mt-10" />
        {post.frontmatter.showComments && (
          config.twikooEnvId != null && config.twikooEnvId.trim() !== ''
            ? (
                <TwikooComments environmentId={config.twikooEnvId} />
              )
            : config.disqusShortname != null && config.disqusShortname.trim() !== ''
              ? (
                  <DisqusComments disqusShortname={config.disqusShortname} />
                )
              : null
        )}

      </div>
    </article>
  )
}

export default ArticlePage
