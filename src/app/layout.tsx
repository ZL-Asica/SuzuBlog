import React from 'react';
import type { Metadata } from 'next';
// eslint-disable-next-line camelcase
import { Roboto, Noto_Sans_SC } from 'next/font/google';
import './globals.css';
import ThemeProvider from '@/components/layout/ThemeProvider';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { getConfig } from '@/services/config/getConfig';
import Script from 'next/script';

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
      {config.scriptSlotHeader?.map((scriptUrl, index) => (
        <Script key={index} src={scriptUrl} strategy='beforeInteractive' />
      ))}
      <body className={`${roboto.variable} ${notoSansSC.variable} antialiased`}>
        <ThemeProvider />
        <Header
          siteTitle={config.title}
          postCategories={config.postCategories}
        />
        <main>{children}</main>
        <Footer />

        {config.scriptSlotFooter?.map((scriptUrl, index) => (
          <Script key={index} src={scriptUrl} strategy='lazyOnload' />
        ))}
      </body>
    </html>
  );
}
