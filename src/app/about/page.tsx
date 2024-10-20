import { getPostData } from '@/services/posts';
import { PostData } from '@/types';
import PostLayout from '@/components/layout/PostLayout';
import { getConfig } from '@/services/getConfig';

export default async function AboutPage() {
  const post: PostData = await getPostData('About', 'About');
  const config = getConfig();

  return <PostLayout post={post} showThumbnail={config.thumbnailAbout} />;
}
