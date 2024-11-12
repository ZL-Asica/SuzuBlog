import type { Metadata } from 'next';
import React from 'react';
import { Noto_Sans_SC } from 'next/font/google';
import type { NextFontWithVariable } from 'next/dist/compiled/@next/font';
import Script from 'next/script';

import { getConfig } from '@/services/config';

import ThemeProvider from '@/components/common/ThemeProvider';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import BackToTop from '@/components/common/BackToTop';

import './globals.css';

const config: Config = getConfig();

const notoSansSC: NextFontWithVariable = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['100', '400', '700', '900'],
  variable: '--font-noto-sans-sc',
  style: ['normal'],
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
    url: config.siteUrl,
  },
};

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const config = getConfig();

  return (
    <html lang={config.lang}>
      <Script
        src='/custom.js'
        strategy='lazyOnload'
      />
      <body className={`${notoSansSC.variable} antialiased`}>
        <ThemeProvider />
        <Header siteTitle={config.title} />
        <main>{children}</main>
        <BackToTop />
        <Footer />
      </body>
    </html>
  );
}

export { metadata, RootLayout as default };
