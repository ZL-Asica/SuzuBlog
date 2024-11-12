import type { MetadataRoute } from 'next';

import { getConfig } from '@/services/config';
import { getAllPosts } from '@/services/content';

async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const config = getConfig();
  const siteUrl = config.siteUrl;

  // Load posts data from JSON file
  const posts = await getAllPosts();

  // Generate sitemap entries for each post
  const postUrls = posts.map((post) => ({
    url: `${siteUrl}/posts/${post.slug}`,
    lastModified: post.lastModified || new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${siteUrl}/posts`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/friends`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...postUrls, // Dynamic post URLs
  ];
}

export default sitemap;
