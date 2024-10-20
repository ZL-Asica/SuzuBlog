import { getPostData } from '@/lib/posts';
import { PostData } from '@/types';
import PostLayout from '@/components/PostLayout';
import { getConfig } from '@/lib/getConfig';

export default async function AboutPage() {
  const post: PostData = await getPostData('about', 'about');
  const config = getConfig();

  return (
    <PostLayout
      post={post}
      showComments={config.commentAbout}
      showThumbnail={config.thumbnailAbout}
    />
  );
}
