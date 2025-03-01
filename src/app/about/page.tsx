import type { Metadata } from 'next'
import { ArticlePage } from '@/components/article'
import { getConfig } from '@/services/config'

import { getPostData } from '@/services/content'
import Head from 'next/head'

import { notFound } from 'next/navigation'

export async function generateMetadata(): Promise<Metadata> {
  const config = getConfig()
  const aboutPage: FullPostData | null = await getPostData('About')
  const aboutTranslation = config.translation.about

  return {
    title: `${aboutPage?.frontmatter.title ?? aboutTranslation.title} - ${config.title}`,
    description: `${config.title}${aboutTranslation.description} - ${config.description}`,
    alternates: { canonical: `${config.siteUrl}/about` },
    openGraph: {
      siteName: config.title,
      title: `${aboutPage?.frontmatter.title ?? aboutTranslation.title} - ${config.title}`,
      description: `${config.title}${aboutTranslation.description} - ${config.description}`,
      username: config.author.name,
      url: '/about',
      images: config.avatar,
      type: 'profile',
      locale: config.lang,
    },
    twitter: {
      card: 'summary',
      title: `${aboutPage?.frontmatter.title ?? aboutTranslation.title} - ${config.title}`,
      description: `${config.title}${aboutTranslation.description} - ${config.description}`,
      images: config.avatar,
    },
  }
}

export default async function AboutPage() {
  const post: FullPostData | null = await getPostData('About')
  if (!post) {
    return notFound()
  }
  const config = getConfig()
  const aboutTranslation = config.translation.about

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    'name': config.author.name,
    'description': `${config.title}${aboutTranslation.description} - ${config.description}`,
    'url': `${config.siteUrl}/about`,
    'image': config.avatar,
    'sameAs': config.author.link,
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
