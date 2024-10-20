import React from 'react';
import type { Metadata } from 'next';
import { getConfig } from '@/lib/getConfig';

const config = getConfig();

export const metadata: Metadata = {
  title: `About - ${config.title}`,
  description: `About page of ${config.title} - ${config.description}`,
  openGraph: {
    title: `About - ${config.title}`,
    description: `About page of ${config.title} - ${config.description}`,
    type: 'website',
    locale: config.lang,
  },
};

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
