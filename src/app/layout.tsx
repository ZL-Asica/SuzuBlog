import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import ThemeProvider from '@/components/layout/ThemeProvider';
import { getConfig } from '@/services/config/getConfig';
import type { Metadata } from 'next';
import React from 'react';
// eslint-disable-next-line camelcase
import { Noto_Sans_SC, Roboto } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const config = getConfig();

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '400', '700', '900'],
  variable: '--font-roboto',
  style: ['normal', 'italic'],
});

const notoSansSC = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['100', '400', '700', '900'],
  variable: '--font-noto-sans-sc',
  style: ['normal'],
});

export const metadata: Metadata = {
  title: `${config.title} - ${config.subTitle}`,
  description: config.description,
  keywords: config.keywords,
  authors: [{ url: config.author.link, name: config.author.name }],
  openGraph: {
    title: `${config.title} - ${config.subTitle}`,
    description: config.description,
    type: 'website',
    locale: config.lang,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const config = getConfig();

  return (
    <html lang={config.lang}>
      <Script src='/custom.js' strategy='lazyOnload' />
      <body className={`${roboto.variable} ${notoSansSC.variable} antialiased`}>
        <ThemeProvider />
        <Header
          siteTitle={config.title}
          postCategories={config.postCategories}
        />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
