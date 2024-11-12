import type { Metadata } from 'next';
import React from 'react';
import { Noto_Sans_SC } from 'next/font/google';
import Script from 'next/script';

import { getConfig } from '@/services/config';

import ThemeProvider from '@/components/layout/ThemeProvider';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import './globals.css';

const config = getConfig();

const notoSansSC = Noto_Sans_SC({
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
        <Footer />
      </body>
    </html>
  );
}

export { metadata, RootLayout as default };
