import type { Metadata } from 'next';

import PostsClient from './PostsClient';

import { getConfig } from '@/services/config';
import { getAllPosts } from '@/services/content';

function generateMetadata(): Metadata {
  const config = getConfig();
  return {
    title: `Posts - ${config.title}`,
    description: `Posts page of ${config.title} - ${config.description}`,
    openGraph: {
      siteName: config.title,
      title: `Posts - ${config.title}`,
      description: `Posts page of ${config.title} - ${config.description}`,
      url: `${config.siteUrl}/posts`,
      images: config.avatar,
      type: 'website',
      locale: config.lang,
    },
  };
}

async function PostsPage() {
  const posts: PostData[] = await getAllPosts();

  return <PostsClient posts={posts} />;
}

export { generateMetadata, PostsPage as default };
