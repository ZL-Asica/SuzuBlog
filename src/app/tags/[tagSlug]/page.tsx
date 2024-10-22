import { getAllPosts } from '@/services/content/posts';
import { notFound } from 'next/navigation';
import PostListLayout from '@/components/layout/PostListLayout';
import { getUniqueTags, convertToPinyin } from '@/services/parsing/tagLinks';

// Generate static paths for all unique tags
export async function generateStaticParams() {
  const uniqueTags = await getUniqueTags();
  return uniqueTags.map((tag) => ({
    // Convert only Chinese tags to pinyin slug
    tagSlug: convertToPinyin(tag),
  }));
}

export default async function TagPage({
  params,
}: {
  params: { tagSlug: string };
}) {
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

      <PostListLayout posts={filteredPosts} />
    </div>
  );
}
