import type { MetadataRoute } from 'next'

import { getConfig } from '@/services/config'

function robots(): MetadataRoute.Robots {
  const config = getConfig()
  const siteUrl = config.siteUrl

  // Pages settings
  const showAnime = Boolean(config.anilist_username?.trim())

  const allowList = [
    '/',
    '/_next/static/css',
    '/_next/image',
    '/_next/static/media',
    '/_next/static/chunks',
  ]

  const disallowList = [
    '/api',
    '/_next',
  ]

  if (!showAnime) {
    disallowList.push('/about/anime')
  }

  return {
    rules: {
      userAgent: '*',
      allow: allowList,
      disallow: disallowList,
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}

export default robots
