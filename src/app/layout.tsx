import type { Metadata } from 'next';
import React from 'react';
import { Noto_Sans_SC, JetBrains_Mono } from 'next/font/google';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { getConfig } from '@/services/config';

import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import BackToTop from '@/components/common/BackToTop';

import './globals.css';

const config: Config = getConfig();

const notoSansSC = Noto_Sans_SC({
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  variable: '--font-noto-sans-sc'
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  variable: '--font-jetbrains-mono'
});

const metadata: Metadata = {
  metadataBase: new URL(config.siteUrl),
  title: `${config.title} - ${config.subTitle}`,
  description: config.description,
  keywords: config.keywords,
  authors: [{ url: config.author.link, name: config.author.name }],
  openGraph: {
    siteName: `${config.title} - ${config.subTitle}`,
    title: `${config.title} - ${config.subTitle}`,
    images: config.avatar,
    description: config.description,
    type: 'website',
    locale: config.lang,
    url: config.siteUrl
  },
  twitter: {
    card: 'summary',
    title: `${config.title} - ${config.subTitle}`,
    description: config.description,
    images: config.avatar
  }
};

function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const config: Config = getConfig();
  const googleAnalytics = config.googleAnalytics;

  return (
    <html lang={config.lang}>
      <link
        rel='icon'
        type='image/png'
        href='/icons/favicon-96x96.png'
        sizes='96x96'
      />
      <link
        rel='icon'
        type='image/svg+xml'
        href='/icons/favicon.svg'
      />
      <link
        rel='apple-touch-icon'
        sizes='180x180'
        href='/icons/apple-touch-icon.png'
      />

      {/* If rss set in config */}
      {config.socialMedia.rss && (
        <link
          rel='alternate'
          type='application/rss+xml'
          title='RSS Feed'
          href={config.siteUrl + '/feed.xml'}
        />
      )}
      {/* Custom js */}
      {config.headerJavascript.map((jsFile, index) => (
        <Script
          key={index}
          src={jsFile}
          strategy='afterInteractive'
        />
      ))}
      {/* Google Analytics Script */}
      {googleAnalytics && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalytics}`}
            strategy='afterInteractive'
          />
          <Script
            id='google-analytics'
            strategy='afterInteractive'
          >
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
        className={`${notoSansSC.variable} ${jetBrainsMono.variable} flex max-h-full min-h-screen flex-col antialiased`}
      >
        <Header config={config} />
        <main className='flex-grow'>
          {children}
          <Analytics />
          <SpeedInsights />
        </main>
        <BackToTop />
        <Footer config={config} />
      </body>
    </html>
  );
}

export { metadata, RootLayout as default };
