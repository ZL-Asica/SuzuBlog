import { getConfig } from '@/services/config/getConfig';
import fs from 'fs';
import { MetadataRoute } from 'next';
import path from 'path';

export default function robots(): MetadataRoute.Robots {
  const config = getConfig();
  const siteUrl = config.siteUrl;

  // Load posts data from JSON file
  const filePath = path.join(process.cwd(), 'public', 'postsData.json');
  const posts = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // Generate robots.txt entries for each post
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
        '/categories/*',
        '/tags/*',
        ...postUrls, // Dynamic post URLs
      ],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
