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
  }))

  return [
    {
      url: siteUrl,
      lastModified: updateDate,
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${siteUrl}/posts`,
      lastModified: updateDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: updateDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/friends`,
      lastModified: updateDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...postUrls, // Dynamic post URLs
  ]
}

export default sitemap
