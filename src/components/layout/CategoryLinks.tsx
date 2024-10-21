import Link from 'next/link';
import { getConfig } from '@/services/config/getConfig';

export default function CategoryLinks({
  categories,
}: {
  categories: string[];
}) {
  const config = getConfig();

  return categories && categories.length > 0 ? (
    <>
      {categories.map((category, index) => {
        // Check if the category link exists in the config
        const categoryLink = config.postCategories.find(
          (cat) => cat.name === category && cat.slug,
        );

        return (
          <span key={category}>
            {categoryLink ? (
              <Link href={`/categories/${categoryLink.slug}`}>{category}</Link>
            ) : (
              <span>{category}</span>
            )}
            {/* Add comma after each category except the last one */}
            {index < categories.length - 1 && ', '}
          </span>
        );
      })}
    </>
  ) : (
    '未分类'
  );
}
