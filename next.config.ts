import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    dirs: ['src'],
  },
  images: {
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
  experimental: {
    optimizePackageImports: [
      'react-syntax-highlighter',
      'rehype-katex',
      'rehype-raw',
      'remark-gemoji',
      'remark-gfm',
      'remark-math',
      'slugify',
    ],
  },
  async redirects() {
    return [
      {
        source: '/feed',
        destination: '/feed.xml',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
