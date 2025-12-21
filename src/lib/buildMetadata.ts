import type { Metadata } from 'next'
import type { OpenGraphType } from 'next/dist/lib/metadata/types/opengraph-types'
import { uniqueArray } from '@zl-asica/react/utils'
import { getConfig } from '@/services/config'
import { generateImageUrl } from '@/services/utils'

interface MetadataInput {
  title: string
  description: string
  keywords?: string[]
  urlPath?: string
  ogType?: OpenGraphType
  image?: string
  index?: boolean
  follow?: boolean
}

export const buildMetadata = ({
  title,
  description,
  keywords = [],
  urlPath = '/',
  ogType = 'website',
  image,
  index = true,
  follow = true,
}: MetadataInput): Metadata => {
  const config = getConfig()
  const fullUrl = `${config.siteUrl}${urlPath}`
  const imageUrl = generateImageUrl(config.siteUrl, image)
  const metaKeywords = uniqueArray([
    config.author.name,
    config.title,
    ...keywords, // Unpack keywords
    'Blog',
    'Personal',
    'SuzuBlog',
  ])

  const basicMetadata: Metadata = {
    title,
    description,
    applicationName: 'Suzu Blog',
    generator: 'Next.js with Suzu Blog',
    keywords: metaKeywords,
    openGraph: {
      type: ogType,
      title,
      description,
      url: fullUrl,
      tags: metaKeywords,
      siteName: `${config.title} - ${config.subTitle}`,
      locale: config.lang,
    },
    twitter: {
      card: imageUrl !== undefined ? 'summary_large_image' : 'summary',
      title,
      description,
    },
    creator: 'ZL-Asica',
    publisher: config.author.name,
    robots: { index, follow },
    authors: [{ name: config.author.name, url: config.author.link }],
    alternates: { canonical: fullUrl },
  }

  if (imageUrl !== undefined) {
    basicMetadata.openGraph!.images = [
      {
        url: imageUrl,
        alt: title,
      },
    ]
    basicMetadata.twitter!.images = [imageUrl]
  }

  return basicMetadata
}
