import Loading from '@/app/loading';
import PostLayout from '@/components/layout/PostLayout';
import { getConfig } from '@/services/config/getConfig';
import { getAllPosts, getPostData } from '@/services/content/posts';
import { PostData } from '@/types';
import type { Metadata } from 'next';
import { Suspense } from 'react';

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
    openGraph: {
      siteName: config.title,
      type: 'article',
      authors: postData.frontmatter.author,
      tags: postData.frontmatter.tags,
      modifiedTime: postData.frontmatter.date,
      title: postData.frontmatter.title,
      description: postData.postAbstract,
      images: thumbnail,
      url: `/posts/${post}`,
      locale: config.lang,
    },
  };
}

// PostPage component that receives the params directly
export default async function PostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const post: PostData = await getPostData(params.slug);

  return (
    <Suspense fallback={<Loading />}>
      <PostLayout post={post} />
    </Suspense>
  );
}
