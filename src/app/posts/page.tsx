import type { Metadata } from 'next'
import PostsPageClient from '@/components/posts/PostPageClient'

import { getConfig } from '@/services/config'
import { getAllPosts } from '@/services/content'

import Head from 'next/head'

export function generateMetadata(): Metadata {
  const config = getConfig()
  const translation = config.translation

  return {
    title: `${translation.posts.title} - ${config.title}`,
    description: `${config.title}${translation.posts.description} - ${config.description}`,
    alternates: { canonical: `${config.siteUrl}/posts` },
    openGraph: {
      siteName: config.title,
      title: `${translation.posts.title} - ${config.title}`,
      description: `${config.title}${translation.posts.description} - ${config.description}`,
      url: `${config.siteUrl}/posts`,
      images: config.avatar,
      type: 'website',
      locale: config.lang,
    },
    twitter: {
      card: 'summary',
      title: `${translation.posts.title} - ${config.title}`,
      description: `${config.title}${translation.posts.description} - ${config.description}`,
      images: config.avatar,
    },
  }
}

export default async function PostsPage() {
  const config = getConfig()
  const translation = config.translation
  const posts: PostListData[] = await getAllPosts()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    'name': `${translation.posts.title} - ${config.title}`,
    'url': `${config.siteUrl}/posts`,
    'description': config.title + translation.posts.description,
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `${config.siteUrl}/posts`,
    },
  }

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <PostsPageClient
        posts={posts}
        translation={translation}
        postsPerPage={Math.min(15, config.postsPerPage ?? 5)}
      />
    </>
  )
}
