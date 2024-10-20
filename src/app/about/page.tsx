import { getPostData } from '@/services/posts';
import { PostData } from '@/types';
import PostLayout from '@/components/layout/PostLayout';
import { getConfig } from '@/services/getConfig';

export default async function AboutPage() {
  const post: PostData = await getPostData('about', 'about');
  const config = getConfig();

  return <PostLayout post={post} showThumbnail={config.thumbnailAbout} />;
}
