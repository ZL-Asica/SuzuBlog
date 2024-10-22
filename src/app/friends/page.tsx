import PostLayout from '@/components/layout/PostLayout';
import { getConfig } from '@/services/config/getConfig';
import { getPostData } from '@/services/content/posts';
import '@/styles/friendsLinks.css';
import { PostData } from '@/types';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const config = getConfig();
  return {
    title: `Friends - ${config.title}`,
    description: `Friends page of ${config.title} - ${config.description}`,
    openGraph: {
      title: `Friends - ${config.title}`,
      description: `Friends page of ${config.title} - ${config.description}`,
      type: 'website',
      locale: config.lang,
    },
  };
}

export default async function FriendsPage() {
  const post: PostData = await getPostData('Friends', 'Friends');
  const config = getConfig();

  return <PostLayout post={post} showThumbnail={config.thumbnailFriends} />;
}
