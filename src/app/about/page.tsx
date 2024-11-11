import type { Metadata } from 'next';

import { getConfig } from '@/services/config';
import { getPostData } from '@/services/content';

import PostLayout from '@/components/layout/PostLayout';

export async function generateMetadata(): Promise<Metadata> {
  const config = getConfig();
  return {
    title: `About - ${config.title}`,
    description: `About page of ${config.title} - ${config.description}`,
    openGraph: {
      siteName: config.title,
      type: 'profile',
      username: config.author.name,
      title: `About - ${config.title}`,
      description: `About page of ${config.title} - ${config.description}`,
      images: config.avatar,
      url: '/about',
      locale: config.lang,
    },
  };
}

export default async function AboutPage() {
  const post: PostData = await getPostData('About', 'About');
  const config = getConfig();

  return (
    <PostLayout
      post={post}
      showThumbnail={config.thumbnailAbout}
    />
  );
}
