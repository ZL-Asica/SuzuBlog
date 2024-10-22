import PostListLayout from '@/components/layout/PostListLayout';
import { getConfig } from '@/services/config/getConfig';
import { getAllPosts } from '@/services/content/posts';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const config = getConfig();
  return config.postCategories.map((category) => ({
    categorySlug: category.slug,
  }));
}

type Props = {
  params: Promise<{ categorySlug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read post slug
  const category = (await params).categorySlug;

  const config = getConfig();

  // Find the category based on the slug from params
  const categoryData = config.postCategories.find(
    (cat) => cat.slug === category,
  ) || { name: 'Not Found' };
  return {
    title: `分类：${categoryData.name} - ${config.title}`,
    openGraph: {
      title: categoryData.name,
    },
  };
}

export default async function CategoryPage(props: {
  params: Promise<{ categorySlug: string }>;
}) {
  const params = await props.params;
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
