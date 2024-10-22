import Loading from '@/app/loading';
import PostLayout from '@/components/layout/PostLayout';
import { getConfig } from '@/services/config/getConfig';
import { getPostData } from '@/services/content/posts';
import { PostData } from '@/types';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export async function generateMetadata(): Promise<Metadata> {
  const config = getConfig();
  return {
    title: `About - ${config.title}`,
    description: `About page of ${config.title} - ${config.description}`,
    openGraph: {
      title: `About - ${config.title}`,
      description: `About page of ${config.title} - ${config.description}`,
      type: 'website',
      locale: config.lang,
    },
  };
}

export default async function AboutPage() {
  const post: PostData = await getPostData('About', 'About');
  const config = getConfig();

  return (
    <Suspense fallback={<Loading />}>
      <PostLayout post={post} showThumbnail={config.thumbnailAbout} />
    </Suspense>
  );
}
