import Loading from '@/app/loading';
import PostListLayout from '@/components/layout/PostListLayout';
import { getConfig } from '@/services/config/getConfig';
import { getAllPosts } from '@/services/content/posts';
import { convertToPinyin, getUniqueTags } from '@/services/parsing/tagLinks';
import { notFound } from 'next/navigation';
import { Metadata } from 'next/types';
import { Suspense } from 'react';

// Generate static paths for all unique tags
export async function generateStaticParams() {
  const uniqueTags = await getUniqueTags();
  return uniqueTags.map((tag) => ({
    // Convert only Chinese tags to pinyin slug
    tagSlug: convertToPinyin(tag),
  }));
}

type Props = {
  params: Promise<{ tagSlug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read post slug
  const tag = (await params).tagSlug;

  const config = getConfig();

  // Find the tag based on the slug from params
  const uniqueTags = await getUniqueTags();
  const tagData =
    uniqueTags.find((t) => convertToPinyin(t) === tag) || 'Not Found';
  return {
    title: `标签：${tagData} - ${config.title}`,
    openGraph: {
      siteName: config.title,
      title: `标签：${tagData} - ${config.title}`,
      url: `${config.siteUrl}/tags/${tag}`,
      images: config.avatar,
      type: 'website',
      locale: config.lang,
    },
  };
}

export default async function TagPage(props: {
  params: Promise<{ tagSlug: string }>;
}) {
  const params = await props.params;
  const posts = await getAllPosts();

  // Retrieve all unique tags from the posts
  const uniqueTags = await getUniqueTags();

  // Find the tag based on the slug from params
  const tag = uniqueTags.find((tag) => convertToPinyin(tag) === params.tagSlug);

  if (!tag) {
    // If the tag doesn't exist, show 404
    notFound();
  }

  // Filter posts by the tag name
  const filteredPosts = posts.filter((post) =>
    post.frontmatter.tags?.includes(tag),
  );

  return (
    <div className='container mx-auto p-4'>
      <h1 className='mb-6 text-center text-4xl font-bold'>{tag}</h1>
      <Suspense fallback={<Loading />}>
        <PostListLayout posts={filteredPosts} />
      </Suspense>
    </div>
  );
}
