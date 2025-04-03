import type { Metadata } from 'next'
import BackToTop from '@/components/common/BackToTop'
import Footer from '@/components/common/Footer'
import Header from '@/components/common/Header'
import ScrollPositionBar from '@/components/common/ScrollPositionBar'
import { getConfig } from '@/services/config'
import { Analytics } from '@vercel/analytics/react'

import { SpeedInsights } from '@vercel/speed-insights/next'

import { Inter, JetBrains_Mono, Noto_Sans_SC } from 'next/font/google'
import Script from 'next/script'

import './globals.css'

const config: Config = getConfig()

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
  const config: Config = getConfig()
  const googleAnalytics = config.googleAnalytics ?? ''

  return (
    <html lang={config.lang}>
      {/* icons */}
      <link rel="icon" type="image/png" href="/icons/favicon-96x96.png" sizes="96x96" />
      <link rel="icon" type="image/svg+xml" href="/icons/favicon.svg" />
      <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />

      {/* If rss set in config */}
      {config.socialMedia.rss !== undefined
        && config.socialMedia.rss !== null
        && String(config.socialMedia.rss) !== 'false'
        && (
          <link
            rel="alternate"
            type="application/rss+xml"
            title="RSS Feed"
            href={`${config.siteUrl}/feed.xml`}
          />
        )}
      {/* Custom js */}
      {config.headerJavascript.map(jsFile => (
        <Script key={jsFile} src={jsFile} strategy="afterInteractive" />
      ))}
      {/* Google Analytics Script */}
      {googleAnalytics && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalytics}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag() {
              dataLayer.push(arguments);
            }
            gtag('js', new Date());
            gtag('config', '${googleAnalytics}');
          `}
          </Script>
        </>
      )}

      <body
        className={`${inter.variable} ${notoSansSC.variable} ${jetBrainsMono.variable} font-sans flex max-h-full min-h-screen flex-col antialiased`}
      >
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
