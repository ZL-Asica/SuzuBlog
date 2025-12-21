import type { Metadata } from 'next'
import { isEmpty } from '@zl-asica/react/utils'
import { notFound } from 'next/navigation'
import AnimeListCollection from '@/components/anime/AnimeListCollection'
import { fetchAnilistData } from '@/lib/actions/anilist'
import { buildWebsiteJsonLd } from '@/lib/buildJsonLd'
import { buildMetadata } from '@/lib/buildMetadata'
import { getConfig } from '@/services/config'

export const revalidate = 300 // 5 minutes for whole page

export async function generateMetadata(): Promise<Metadata> {
  const config = getConfig()
  const animeTranslation = config.translation.anime

  const animePageExists = config.anilist_username !== null && !isEmpty(config.anilist_username)

  return buildMetadata({
    title: `${animeTranslation.title} - ${config.title}`,
    description: `${config.title}${animeTranslation.description} - ${config.description}`,
    urlPath: '/about/anime',
    ogType: 'website',
    image: config.avatar,
    index: animePageExists,
    follow: animePageExists,
  })
}

export default async function AnimePage() {
  const config = getConfig()
  const anilist_username = config.anilist_username

  if (anilist_username === null || isEmpty(anilist_username)) {
    return notFound()
  }

  const anilistRes = await fetchAnilistData(anilist_username)

  if (!anilistRes.success || !anilistRes.data) {
    console.error(`Failed to fetch anime data: ${anilistRes.message}`)
    return notFound()
  }

  const animeData = anilistRes.data

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
