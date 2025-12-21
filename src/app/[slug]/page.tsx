import type { Metadata } from 'next'
import { uniqueArray } from '@zl-asica/react/utils'
import { notFound, redirect } from 'next/navigation'
import { ArticlePage } from '@/components/article'
import { buildArticleJsonLd } from '@/lib/buildJsonLd'

import { buildMetadata } from '@/lib/buildMetadata'
import { getConfig } from '@/services/config'
import { getAllPosts, getPostData } from '@/services/content'
import { canUsePost, isFollowable, isIndexable, resolveStatus } from '@/services/content/postVisibility'
import { generateLLMsTXTs, generateRssFeed } from '@/services/utils'

// build static params for all posts
export async function generateStaticParams() {
  const config = getConfig()

  // Posts for rendering
  const pagePosts = await getAllPosts('page')
  // Posts for RSS and LLMs
  const trackPosts = await getAllPosts('track')

  if (config.socialMedia.rss !== null) {
    await generateRssFeed(trackPosts, config)
  }
  await generateLLMsTXTs(trackPosts, config)

  return pagePosts.map(post => ({ slug: post.slug }))
}

export const dynamicParams = false

interface ParamProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ParamProps): Promise<Metadata> {
  // get post data
  const { slug } = await params
  const postData = await getPostData(slug)

  const config = getConfig()

  if (!postData) {
    notFound()
  }

  const status = resolveStatus(postData.frontmatter.status)
  const pageAllowed = canUsePost(status, 'page')

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
    index: pageAllowed && isIndexable(status) && postData.frontmatter.redirect === undefined,
    follow: pageAllowed && isFollowable(status) && postData.frontmatter.redirect === undefined,
  })
}

// PostPage component that receives the params directly
export default async function PostPage(props: ParamProps) {
  const parameters = await props.params
  const post = await getPostData(parameters.slug)
  if (!post) {
    return notFound()
  }

  const status = resolveStatus(post.frontmatter.status)
  if (!canUsePost(status, 'page')) {
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
