import type { MetadataRoute } from 'next'

import { getConfig } from '@/services/config'
import { getAllPosts } from '@/services/content'

async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const config = getConfig()
  const siteUrl = config.siteUrl
  const updateDate = new Date()

  // Load posts data from JSON file
  const posts = await getAllPosts()

  // Generate sitemap entries for each post
  const postUrls = posts.map(post => ({
    url: `${siteUrl}/${post.slug}`,
    lastModified: post.lastModified || updateDate,
    changeFrequency: 'weekly' as const,
    priority: 0.5,
    images: post.frontmatter.showThumbnail && post.frontmatter.thumbnail !== undefined
      ? [post.frontmatter.thumbnail]
      : [],
  }))

  // Pages settings
  const showAnime = config.anilist_username === undefined || config.anilist_username !== null || config.anilist_username !== ''

  const pages = [`${siteUrl}/posts`, `${siteUrl}/about`, `${siteUrl}/friends`]

  if (showAnime) {
    pages.push(`${siteUrl}/about/anime`)
  }

  const pagesSitemap = pages.map(page => ({
    url: page,
    lastModified: updateDate,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: siteUrl,
      lastModified: updateDate,
      changeFrequency: 'yearly',
      priority: 1,
    },
    ...pagesSitemap, // Static page
    ...postUrls, // Dynamic post URLs
  ]
}

export default sitemap
