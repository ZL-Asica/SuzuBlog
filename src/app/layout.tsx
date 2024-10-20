import React from 'react';
import type { Metadata } from 'next';
import { Roboto, Noto_Sans_SC } from 'next/font/google';
import './globals.css';
import ThemeProvider from '@/components/ThemeProvider';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import Script from 'next/script';

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
  title: 'Suzu - Next.js Blog Template',
  description:
    'Suzu is a minimalist blog template with a serene sakura-inspired theme, blending modern design with a touch of traditional Japanese aesthetics.',
  keywords:
    'Suzu, Next.js, markdown blog, Tailwind CSS, blog template, sakura, ZL Asica',
  authors: [{ name: 'ZL Asica' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='zh'>
      <body className={`${notoSansSC.variable} ${roboto.variable} antialiased`}>
        <ThemeProvider />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
