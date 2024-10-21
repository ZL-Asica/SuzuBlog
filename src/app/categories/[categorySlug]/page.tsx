import { getAllPosts } from '@/services/content/posts';
import { getConfig } from '@/services/config/getConfig';
import { notFound } from 'next/navigation';
import PostListLayout from '@/components/layout/PostListLayout';

export async function generateStaticParams() {
  const config = getConfig();
  return config.postCategories.map((category) => ({
    categorySlug: category.slug,
  }));
}

export default async function CategoryPage({
  params,
}: {
  params: { categorySlug: string };
}) {
  const posts = await getAllPosts();
  const config = getConfig();

  // Find the category based on the slug from params
  const category = config.postCategories.find(
    (cat) => cat.slug === params.categorySlug,
  );

  if (!category) {
    // If the category doesn't exist, show 404
    notFound();
  }

  // Filter posts by the category name
  const filteredPosts = posts.filter((post) =>
    post.frontmatter.categories?.includes(category.name),
  );

  return (
    <div className='container mx-auto p-4'>
      <h1 className='mb-6 text-center text-4xl font-bold'>{category.name}</h1>

      <PostListLayout posts={filteredPosts} />
    </div>
  );
}
