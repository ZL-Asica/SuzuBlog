import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArticlePage } from '@/components/article'
import { buildCollectionPageJsonLd } from '@/lib/buildJsonLd'
import { buildMetadata } from '@/lib/buildMetadata'
import { getConfig } from '@/services/config'
import { getPostData } from '@/services/content'

export async function generateMetadata(): Promise<Metadata> {
  const config = getConfig()
  const friendPage: FullPostData | null = await getPostData('Friends')
  const friendTranslation = config.translation.friends

  return buildMetadata({
    title: `${friendPage?.frontmatter.title ?? friendTranslation.title} - ${config.title}`,
    description: `${config.title}${friendTranslation.description} - ${config.description}`,
    urlPath: '/friends',
    ogType: 'website',
    image: config.avatar,
  })
}

export default async function FriendsPage() {
  const post: FullPostData | null = await getPostData('Friends')
  if (!post) {
    return notFound()
  }
  const config = getConfig()
  const friendTranslation = config.translation.friends

  const jsonLd = buildCollectionPageJsonLd({
    title: `${post?.frontmatter.title || friendTranslation.title} - ${config.title}`,
    description: `${config.title}${friendTranslation.description} - ${config.description}`,
    urlPath: '/friends',
    image: config.avatar,
    friendLinks: config.friendLinks,
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
