import { getPostData } from '@/lib/posts';
import { PostData } from '@/types';
import PostLayout from '@/components/PostLayout';

interface PostPageProps {
  params: {
    slug: string;
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const post: PostData = await getPostData(params.slug);

  return <PostLayout post={post} />;
}
