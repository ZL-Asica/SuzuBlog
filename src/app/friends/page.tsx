import type { Metadata } from 'next'
import { ArticlePage } from '@/components/article'
import { getConfig } from '@/services/config'

import { getPostData } from '@/services/content'
import Head from 'next/head'

import { notFound } from 'next/navigation'

export async function generateMetadata(): Promise<Metadata> {
  const config = getConfig()
  const friendPage: FullPostData | null = await getPostData('Friends')
  const friendTranslation = config.translation.friends
  return {
    title: `${friendPage?.frontmatter.title ?? friendTranslation.title} - ${config.title}`,
    description: `${config.title}${friendTranslation.description} - ${config.description}`,
    alternates: { canonical: `${config.siteUrl}/friends` },
    openGraph: {
      siteName: config.title,
      title: `${friendPage?.frontmatter.title ?? friendTranslation.title} - ${config.title}`,
      description: `${config.title}${friendTranslation.description} - ${config.description}`,
      url: '/friends',
      images: config.avatar,
      type: 'website',
      locale: config.lang,
    },
    twitter: {
      card: 'summary',
      title: `${friendPage?.frontmatter.title ?? friendTranslation.title} - ${config.title}`,
      description: `${config.title}${friendTranslation.description} - ${config.description}`,
      images: config.avatar,
    },
  }
}

export default async function FriendsPage() {
  const post: FullPostData | null = await getPostData('Friends')
  if (!post) {
    return notFound()
  }
  const config = getConfig()
  const friendTranslation = config.translation.friends

  const friends = Array.isArray(config.friendLinks) ? config.friendLinks : []
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    'name': `${post?.frontmatter.title || friendTranslation.title} - ${config.title}`,
    'url': `${config.siteUrl}/friends`,
    'description': `${config.title}${friendTranslation.description} - ${config.description}`,
    'hasPart': friends.map(friend => ({
      '@type': 'WebSite',
      'name': friend.title,
      'url': friend.link,
    })),
  }

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <ArticlePage config={config} post={post} />
    </>
  )
}
