import type { Metadata } from 'next'
import process from 'node:process'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Inter, JetBrains_Mono, Noto_Sans_SC } from 'next/font/google'
import { Toaster } from 'sonner'
import { BackToTop, Footer, Head, Header, ScrollPositionBar } from '@/components/common'
import { buildMetadata } from '@/lib/buildMetadata'

import { getConfig } from '@/services/config'
import './globals.css'

const config = getConfig()

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-roboto',
  display: 'swap',
  preload: true,
})

const notoSansSC = Noto_Sans_SC({
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  variable: '--font-noto-sans-sc',
  display: 'swap',
  preload: true,
})

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = buildMetadata({
  title: `${config.title} - ${config.subTitle}`,
  description: config.description,
  keywords: config.keywords !== null ? config.keywords.split(',').map(k => k.trim()) : [],
  urlPath: '/',
  ogType: 'website',
  image: config.avatar,
})

export default function RootLayout(
  { children }: Readonly<{ children: React.ReactNode }>,
) {
  return (
    <html lang={config.lang}>
      <Head
        rss={config.socialMedia.rss}
        siteUrl={config.siteUrl}
        headerJavascript={config.headerJavascript}
        googleAnalytics={config.googleAnalytics}
        links={config.links}
      />
      <body className={`${inter.variable} ${notoSansSC.variable} ${jetBrainsMono.variable} font-sans flex max-h-full min-h-screen flex-col antialiased`}>
        <Toaster richColors position="top-center" />
        <ScrollPositionBar />
        <Header config={config} />
        <main
          id="main-content"
          tabIndex={-1}
          className="grow mt-20 motion-safe:animate-fade-in-down"
        >
          {children}
          {process.env.VERCEL === '1'
            && (
              <>
                <Analytics />
                <SpeedInsights />
              </>
            )}
        </main>
        <BackToTop />
        <Footer config={config} />
      </body>
    </html>
  )
}
