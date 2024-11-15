import type { Metadata } from 'next';

import { getConfig } from '@/services/config';
import { getPostData } from '@/services/content';

import PostLayout from '@/components/posts/PostLayout';

function generateMetadata(): Metadata {
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

async function AboutPage() {
  const post: FullPostData = await getPostData('About', 'About');
  const config = getConfig();

  return (
    <PostLayout
      config={config}
      post={post}
      showThumbnail={config.thumbnailAbout}
    />
  );
}

export { generateMetadata, AboutPage as default };
