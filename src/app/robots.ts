import type { MetadataRoute } from 'next'

import { getConfig } from '@/services/config'
import { getAllPosts } from '@/services/content'

async function robots(): Promise<MetadataRoute.Robots> {
  const config = getConfig()
  const siteUrl = config.siteUrl

  // Generate robots.txt entries for each post
  const posts = await getAllPosts()
  const postUrls = posts.map(post => `/${post.slug}`)

  // Pages settings
  const showAnime = config.anilist_username === undefined || config.anilist_username !== null || config.anilist_username !== ''

  const allowList = [
    '/',
    '/about',
    '/friends',
    '/posts',
    ...postUrls, // Dynamic post URLs
  ]

  const disallowList = [
    '/posts?',
    '/images',
    '/icons',
    '/_next',
  ]

  if (showAnime) {
    allowList.push('/about/anime')
  }
  else {
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
