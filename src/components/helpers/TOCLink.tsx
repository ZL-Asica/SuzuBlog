import { join, slice } from 'es-toolkit/compat';
import Link from 'next/link';

interface TOCLinkProperties {
  item: TocItems;
  activeSlug: string;
  handleLinkClick: (slug: string) => void;
}

const TOCLink = ({ item, activeSlug, handleLinkClick }: TOCLinkProperties) => {
  const indentationLevel = (item.level - 2) * 0.9;
  const slugPrefix = join(slice(item.slug.split('-'), 0, item.level - 1), '.');
  const isActive = activeSlug === item.slug;

  return (
    <div
      key={item.slug}
      style={{ marginLeft: `${indentationLevel}em` }}
    >
      <Link
        href={`#${item.slug}`}
        scroll={false}
        onClick={(event) => {
          event.preventDefault();
          handleLinkClick(item.slug);
        }}
        className={`block py-1 text-base no-underline transition-colors duration-200 ${
          isActive
            ? 'font-bold text-sakuraPink'
            : 'text-gray-600 dark:text-gray-400'
        } break-words`}
      >
        {`${slugPrefix}. ${item.title}`}
      </Link>
    </div>
  );
};

export default TOCLink;
