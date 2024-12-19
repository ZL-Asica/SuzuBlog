import type { MetadataRoute } from 'next'

import { getConfig } from '@/services/config'

function manifest(): MetadataRoute.Manifest {
  const config = getConfig()

  return {
    name: `${config.title} - ${config.subTitle}`,
    short_name: config.title,
    description: config.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#f6a8b8',
    lang: config.lang,
    orientation: 'any',
    icons: [
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/favicon.ico',
        sizes: '64x64',
        type: 'image/x-icon',
      },
    ],
  }
}

export default manifest
