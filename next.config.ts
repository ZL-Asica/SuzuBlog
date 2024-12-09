import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    dirs: ['src']
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86_400,
    localPatterns: [
      {
        pathname: '/images/**',
        search: ''
      }
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**'
      }
    ]
  },
  experimental: {
    optimizePackageImports: [
      'react-syntax-highlighter',
      'rehype-katex',
      'rehype-raw',
      'remark-gemoji',
      'remark-gfm',
      'remark-math',
      'slugify'
    ]
  }
};

export default nextConfig;
