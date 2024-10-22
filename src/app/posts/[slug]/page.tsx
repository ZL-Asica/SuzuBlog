import PostLayout from '@/components/layout/PostLayout';
import { getConfig } from '@/services/config/getConfig';
import { getAllPosts, getPostData } from '@/services/content/posts';
import { PostData } from '@/types';
import type { Metadata } from 'next';

// build static params for all posts
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read post slug
  const post = (await params).slug;

  // get post data
  const postData = await getPostData(post);

  // thumbnail image
  const thumbnail = postData.frontmatter.thumbnail;

  const config = getConfig();
  return {
    title: `${postData.frontmatter.title} - ${config.title}`,
    description: postData.postAbstract,
    metadataBase: new URL(config.siteUrl),
    openGraph: {
      title: postData.frontmatter.title,
      description: postData.postAbstract,
      images: thumbnail,
    },
  };
}

// PostPage component that receives the params directly
export default async function PostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const post: PostData = await getPostData(params.slug);

  return <PostLayout post={post} />;
}
