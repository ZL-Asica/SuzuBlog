import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Inter, JetBrains_Mono, Noto_Sans_SC } from 'next/font/google'
import { BackToTop, Footer, Head, Header, ScrollPositionBar } from '@/components/common'
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

export const metadata: Metadata = {
  metadataBase: new URL(config.siteUrl),
  title: `${config.title} - ${config.subTitle}`,
  description: config.description,
  keywords: config.keywords,
  generator: 'SuzuBlog with Next.js',
  creator: 'ZL Asica',
  publisher: config.author.name,
  alternates: { canonical: config.siteUrl },
  authors: [{ url: config.author.link, name: config.author.name }],
  openGraph: {
    siteName: `${config.title} - ${config.subTitle}`,
    title: `${config.title} - ${config.subTitle}`,
    images: config.avatar,
    description: config.description,
    type: 'website',
    locale: config.lang,
    url: config.siteUrl,
  },
  twitter: {
    card: 'summary',
    title: `${config.title} - ${config.subTitle}`,
    description: config.description,
    images: config.avatar,
  },
}

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
      />

      <body className={`${inter.variable} ${notoSansSC.variable} ${jetBrainsMono.variable} font-sans flex max-h-full min-h-dvh flex-col antialiased`}>
        <ScrollPositionBar />
        <Header config={config} />
        <main className="grow mt-20 motion-safe:animate-fade-in-down">
          {children}
          <Analytics />
          <SpeedInsights />
        </main>
        <BackToTop />
        <Footer config={config} />
      </body>
    </html>
  )
}
