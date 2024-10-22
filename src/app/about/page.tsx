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
      type: 'profile',
      username: config.author.name,
      title: `About - ${config.title}`,
      description: `About page of ${config.title} - ${config.description}`,
      images: config.avatar,
      url: '/about',
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
