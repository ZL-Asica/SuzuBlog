import Link from 'next/link';
import { getUniqueTags, convertToPinyin } from '@/services/parsing/tagLinks';

export default async function TagLinks({
  tags,
}: {
  tags: string[] | undefined;
}) {
  const uniqueTags = await getUniqueTags();

  return tags && tags.length > 0 ? (
    <>
      {tags.map((tag, index) => {
        // Convert Chinese tags to pinyin
        const tagSlug = uniqueTags.includes(tag) ? convertToPinyin(tag) : tag;

        // Check if tag exists in uniqueTags
        const tagExists = uniqueTags.includes(tag);

        return (
          <span key={tag}>
            {tagExists ? (
              <Link href={`/tags/${tagSlug}`}>{tag}</Link>
            ) : (
              <span>{tag}</span>
            )}
            {/* Add comma after each tag except the last one */}
            {index < tags.length - 1 && ', '}
          </span>
        );
      })}
    </>
  ) : (
    '无标签'
  );
}
