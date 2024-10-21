import { getPostData } from '@/services/content/posts';
import { PostData } from '@/types';
import PostLayout from '@/components/layout/PostLayout';
import { getConfig } from '@/services/config/getConfig';
import '@/styles/friendsLinks.css';

export default async function FriendsPage() {
  const post: PostData = await getPostData('Friends', 'Friends');
  const config = getConfig();

  return <PostLayout post={post} showThumbnail={config.thumbnailFriends} />;
}
