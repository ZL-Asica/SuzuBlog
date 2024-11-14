import Link from 'next/link';

import { slugPrefix } from '@/services/utils';

interface TOCLinkProperties {
  item: TocItems;
  activeSlug: string;
  handleLinkClick: (slug: string) => void;
}

const TOCLink = ({ item, activeSlug, handleLinkClick }: TOCLinkProperties) => {
  const indentationLevel = (item.level - 2) * 0.9;
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
          isActive ? 'font-bold text-[var(--sakuraPink)]' : 'text-[var(--gray)]'
        } break-words`}
      >
        {`${slugPrefix(item.slug, item.level)} ${item.title}`}
      </Link>
    </div>
  );
};

export default TOCLink;
