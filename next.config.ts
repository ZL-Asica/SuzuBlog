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
        hostname: 's2.loli.net',
      },
      {
        protocol: 'https',
        hostname: 'i.loli.net',
      },
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
      },
      {
        protocol: 'https',
        hostname: 'cdn.akamai.steamstatic.com',
      },
      {
        protocol: 'https',
        hostname: 'www.apple.com.cn',
      },
      {
        protocol: 'https',
        hostname: 'fp1.fghrsh.net',
      },
      {
        protocol: 'https',
        hostname: 'avatar.fghrsh.net',
      },
      {
        protocol: 'https',
        hostname: 'gravatar.fghrsh.net',
      },
    ],
  },
};

export default nextConfig;
