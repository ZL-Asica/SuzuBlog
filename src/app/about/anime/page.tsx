import type { Metadata } from 'next'
import process from 'node:process'
import { notFound } from 'next/navigation'
import AnimeListCollection from '@/components/anime/AnimeListCollection'
import { buildWebsiteJsonLd } from '@/lib/buildJsonLd'
import { buildMetadata } from '@/lib/buildMetadata'
import { AnimeResponseSchema } from '@/schemas/anime'
import { getConfig } from '@/services/config'

export const revalidate = 300 // 5 minutes for whole page

export async function generateMetadata(): Promise<Metadata> {
  const config = getConfig()
  const animeTranslation = config.translation.anime

  return buildMetadata({
    title: `${animeTranslation.title} - ${config.title}`,
    description: `${config.title}${animeTranslation.description} - ${config.description}`,
    urlPath: '/about/anime',
    ogType: 'website',
    image: config.avatar,
    indexAble: config.anilist_username !== null,
  })
}

export default async function AnimePage() {
  const config = getConfig()
  const anilist_username = config.anilist_username

  if (anilist_username === null) {
    return notFound()
  }

  const API_BASE_URL = process.env.NODE_ENV === 'production'
    ? config.siteUrl
    : 'http://localhost:3000'

  const response = await fetch(`${API_BASE_URL}/api/anime?userName=${anilist_username}`)

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
  const jsonLd = buildWebsiteJsonLd({
    title: `${animeTranslation.title} - ${config.title}`,
    description: `${config.title}${animeTranslation.description} - ${config.description}`,
    urlPath: '/about/anime',
    image: config.avatar,
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AnimeListCollection
        animeData={animeData}
        userName={anilist_username}
        config={config}
      />
    </>
  )
}
