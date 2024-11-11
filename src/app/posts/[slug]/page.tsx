import type { Metadata } from 'next';

import { getConfig } from '@/services/config';
import { getAllPosts, getPostData } from '@/services/content';

import PostLayout from '@/components/layout/PostLayout';

// build static params for all posts
async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  // get post data
  const postData = await getPostData(params.slug);

  const config = getConfig();
  const metaKeywords = [
    ...(postData.frontmatter.tags || []),
    ...(postData.frontmatter.categories || []),
    postData.frontmatter.author,
    'blog',
  ].join(', ');

  return {
    title: `${postData.frontmatter.title} - ${config.title}`,
    description: postData.postAbstract,
    keywords: metaKeywords,
    openGraph: {
      siteName: config.title,
      type: 'article',
      authors: postData.frontmatter.author,
      tags: metaKeywords,
      modifiedTime: postData.frontmatter.date,
      title: postData.frontmatter.title,
      description: postData.postAbstract,
      images: postData.frontmatter.thumbnail,
      url: `/posts/${params.slug}`,
      locale: config.lang,
    },
  };
}

// PostPage component that receives the params directly
async function PostPage(props: { params: Promise<{ slug: string }> }) {
  const parameters = await props.params;
  const post: PostData = await getPostData(parameters.slug);

  return <PostLayout post={post} />;
}

export { generateStaticParams, generateMetadata, PostPage as default };
