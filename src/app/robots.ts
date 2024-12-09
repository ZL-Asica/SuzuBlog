import type { MetadataRoute } from 'next';

import { getConfig } from '@/services/config';
import { getAllPosts } from '@/services/content';

async function robots(): Promise<MetadataRoute.Robots> {
  const config = getConfig();
  const siteUrl = config.siteUrl;

  // Generate robots.txt entries for each post
  const posts = await getAllPosts();
  const postUrls = posts.map((post) => `/${post.slug}`);

  return {
    rules: {
      userAgent: '*',
      allow: [
        '/',
        '/about',
        '/friends',
        '/posts',
        ...postUrls // Dynamic post URLs
      ],
      disallow: [
        // Below are disallow
        '/posts?',
        '/images',
        '/icons',
        '/_next'
      ]
    },
    sitemap: `${siteUrl}/sitemap.xml`
  };
}

export default robots;
