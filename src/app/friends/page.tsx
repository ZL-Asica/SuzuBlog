import { getPostData } from '@/services/posts';
import { PostData } from '@/types';
import PostLayout from '@/components/layout/PostLayout';
import { getConfig } from '@/services/getConfig';

export default async function FriendsPage() {
  const post: PostData = await getPostData('Friends', 'Friends');
  const config = getConfig();

  return <PostLayout post={post} showThumbnail={config.thumbnailFriends} />;
}
