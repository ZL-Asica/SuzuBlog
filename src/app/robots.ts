import type { MetadataRoute } from 'next';

import { getConfig } from '@/services/config';
import { getAllPosts } from '@/services/content';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const config = getConfig();
  const siteUrl = config.siteUrl;

  // Generate robots.txt entries for each post
  const posts = await getAllPosts();
  const postUrls = posts.map((post) => `/posts/${post.slug}`);

  return {
    rules: {
      userAgent: '*',
      // allow: '/',
      disallow: [
        '/',
        '/about',
        '/friends',
        '/posts',
        ...postUrls, // Dynamic post URLs
      ],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
