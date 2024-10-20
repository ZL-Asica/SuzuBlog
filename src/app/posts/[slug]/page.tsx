import { getPostData } from '@/services/posts';
import { PostData } from '@/types';
import PostLayout from '@/components/layout/PostLayout';

interface PostPageProps {
  params: {
    slug: string;
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const post: PostData = await getPostData(params.slug);

  return <PostLayout post={post} />;
}
