import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  eslint: {
    dirs: ['src'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Themed-By',
            value: 'SuzuBlog',
          },
          {
            key: 'X-Theme-Author',
            value: 'ZL Asica',
          },
          {
            key: 'X-Theme-URL',
            value: 'https://suzu.zla.app',
          },
        ],
      },
    ]
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86_400,
    localPatterns: [
      {
        pathname: '/images/**',
        search: '',
      },
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: String.raw`/:type(rss|atom|rss2)\.:format(\w+)`,
        destination: '/feed.xml',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
