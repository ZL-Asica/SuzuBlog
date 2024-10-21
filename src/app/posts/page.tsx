import PostListLayout from '@/components/layout/PostListLayout';
import { getAllPosts } from '@/services/content/posts';
import { PostData } from '@/types';

export default async function PostsPage() {
  const posts: PostData[] = await getAllPosts();

  return (
    <div className='container mx-auto p-4'>
      <h1 className='mb-6 text-center text-4xl font-bold'>All Posts</h1>

      <PostListLayout posts={posts} />
    </div>
  );
}
