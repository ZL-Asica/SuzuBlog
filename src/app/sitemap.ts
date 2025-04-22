import type { MetadataRoute } from 'next'

import { getConfig } from '@/services/config'
import { getAllPosts } from '@/services/content'
import { generateImageUrl } from '@/services/utils'

async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const config = getConfig()
  const siteUrl = config.siteUrl
  const updateDate = new Date()

  // Load posts data
  const posts = await getAllPosts()

  const makeSitemapItem = (
    url: string,
    options?: Partial<MetadataRoute.Sitemap[number]>,
  ): MetadataRoute.Sitemap[number] => ({
    url,
    lastModified: updateDate,
    changeFrequency: 'monthly',
    priority: 0.8,
    ...options,
  })

  // Generate sitemap entries for each post
  const postUrls = posts.map(post =>
    makeSitemapItem(`${siteUrl}/${post.slug}`, {
      changeFrequency: 'weekly',
      priority: 0.5,
      images: post.frontmatter.showThumbnail
        ? generateImageUrl(siteUrl, post.frontmatter.thumbnail)
        : undefined,
    }),
  )
  const homepage = makeSitemapItem(siteUrl, {
    changeFrequency: 'yearly',
    priority: 1,
  })

  const aboutPage = makeSitemapItem(`${siteUrl}/about`, {
    priority: 0.8,
    images: generateImageUrl(siteUrl, config.avatar),
  })

  const showAnime = Boolean(config.anilist_username?.trim())
  const staticPages = [
    { path: '/posts', priority: 0.6 },
    { path: '/friends', priority: 0.4 },
    ...(showAnime ? [{ path: '/about/anime', priority: 0.5 }] : []),
  ]

  const staticSitemap = staticPages.map(({ path, priority }) =>
    makeSitemapItem(`${siteUrl}${path}`, { priority }),
  )

  return [homepage, aboutPage, ...staticSitemap, ...postUrls]
}

export default sitemap
