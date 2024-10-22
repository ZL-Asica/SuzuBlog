import { getConfig } from '@/services/config/getConfig';
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const config = getConfig();
  const siteUrl = config.siteUrl;

  return {
    rules: {
      userAgent: '*',
      // allow: '/',
      disallow: [
        '/',
        '/about',
        '/friends',
        '/posts/*',
        '/categories/*',
        '/tags/*',
      ],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
