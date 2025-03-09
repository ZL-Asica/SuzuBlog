import type { Metadata } from 'next'
import process from 'node:process'
import AnimeList from '@/components/anime/AnimeList'
import { AnimeResponseSchema } from '@/schemas/anime'

import { getConfig } from '@/services/config'
import Head from 'next/head'
import { notFound } from 'next/navigation'

export const revalidate = 300 // 5 minutes for whole page

export async function generateMetadata(): Promise<Metadata> {
  const config = getConfig()
  const animeTranslation = config.translation.anime

  return {
    title: `${animeTranslation.title} - ${config.title}`,
    description: `${config.title}${animeTranslation.description} - ${config.description}`,
    alternates: { canonical: `${config.siteUrl}/about/anime` },
    openGraph: {
      siteName: config.title,
      title: `${animeTranslation.title} - ${config.title}`,
      description: `${config.title}${animeTranslation.description} - ${config.description}`,
      url: '/about/anime',
      images: config.avatar,
      type: 'website',
      locale: config.lang,
    },
    twitter: {
      card: 'summary',
      title: `${animeTranslation.title} - ${config.title}`,
      description: `${config.title}${animeTranslation.description} - ${config.description}`,
      images: config.avatar,
    },
  }
}

export default async function AnimePage() {
  const config = getConfig()
  const anilist_username = config.anilist_username

  if (anilist_username === undefined || anilist_username === null) {
    return notFound()
  }

  const API_BASE_URL = process.env.NODE_ENV === 'production'
    ? config.siteUrl
    : 'http://localhost:3000'

  const response = await fetch(`${API_BASE_URL}/api/anime?userName=${anilist_username}`, {
    next: { tags: ['anime'], revalidate: 600 }, // Cache for 10 minutes
  })

  if (!response.ok) {
    console.error(`Failed to fetch anime data: ${response.statusText}`)
    return notFound()
  }

  const data = await response.json() as unknown

  const parsedAnimeData = AnimeResponseSchema.safeParse(data)

  if (parsedAnimeData.success === false) {
    console.error(`Zod validation failed: ${JSON.stringify(parsedAnimeData.error.format())}`)
    return notFound()
  }

  const animeData = parsedAnimeData.data

  const animeTranslation = config.translation.anime
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': config.author.name,
    'description': `${config.title}${animeTranslation.description} - ${config.description}`,
    'url': `${config.siteUrl}/about/anime`,
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
      <AnimeList
        animeData={animeData}
        userName={anilist_username}
        author={config.author.name}
        lang={config.lang}
        translation={config.translation}
      />
    </>
  )
}
