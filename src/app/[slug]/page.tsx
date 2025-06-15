import type { Metadata } from 'next'
import { uniqueArray } from '@zl-asica/react/utils'
import { notFound, redirect } from 'next/navigation'
import { ArticlePage } from '@/components/article'
import { buildArticleJsonLd } from '@/lib/buildJsonLd'

import { buildMetadata } from '@/lib/buildMetadata'
import { getConfig } from '@/services/config'
import { getAllPosts, getPostData } from '@/services/content'
import { generateLLMsTXTs, generateRssFeed } from '@/services/utils'

// build static params for all posts
export async function generateStaticParams() {
  const posts = await getAllPosts()
  const config = getConfig()
  if (config.socialMedia.rss !== null) {
    await generateRssFeed(posts, config)
  }
  await generateLLMsTXTs(posts, config)
  return posts.map(post => ({
    slug: post.slug,
  }))
}

export const dynamicParams = false

interface ParamProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ParamProps): Promise<Metadata> {
  // get post data
  const { slug } = await params
  const postData: FullPostData | null = await getPostData(slug)

  const config = getConfig()
  const metaKeywords = uniqueArray([
    ...(postData?.frontmatter.tags || []),
    ...(postData?.frontmatter.categories || []),
    postData?.frontmatter.author ?? config.author.name ?? 'Unknown Author',
    'blog',
  ])

  return buildMetadata({
    title: `${postData?.frontmatter.title} - ${config.title}`,
    description: postData?.postAbstract ?? config.description ?? 'Default description',
    keywords: metaKeywords,
    urlPath: `/${slug}`,
    ogType: 'article',
    image: postData?.frontmatter.showThumbnail !== false ? postData?.frontmatter.thumbnail : undefined,
    indexAble: postData?.frontmatter.redirect === undefined,
  })
}

// PostPage component that receives the params directly
export default async function PostPage(props: ParamProps) {
  const parameters = await props.params
  const post: FullPostData | null = await getPostData(parameters.slug)
  if (!post) {
    return notFound()
  }

  const redirectUrl = post.frontmatter.redirect ?? ''
  if (redirectUrl) {
    redirect(redirectUrl)
  }

  const config = getConfig()

  const metaKeywords = uniqueArray([
    ...(post?.frontmatter.tags || []),
    ...(post?.frontmatter.categories || []),
    post?.frontmatter.author ?? config.author.name ?? 'Unknown Author',
    'blog',
  ])

  // JSON-LD for the article
  const jsonLd = buildArticleJsonLd({
    title: `${post.frontmatter.title} - ${config.title}`,
    description: post.postAbstract || config.description,
    keywords: metaKeywords,
    urlPath: `/${post.slug}`,
    image: post.frontmatter.showThumbnail !== false ? post.frontmatter.thumbnail : undefined,
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArticlePage config={config} post={post} />
    </>
  )
}
