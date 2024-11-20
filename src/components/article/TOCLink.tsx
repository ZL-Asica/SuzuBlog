import Link from 'next/link';

import { slugPrefix } from '@/services/utils';

interface TOCLinkProperties {
  item: TocItems;
  activeSlug: string;
  handleLinkClick: (slug: string) => void;
  autoSlug: boolean;
}

const TOCLink = ({
  item,
  activeSlug,
  handleLinkClick,
  autoSlug,
}: TOCLinkProperties) => {
  const isActive = activeSlug === item.slug;
  const titleSlug = autoSlug ? `${slugPrefix(item.slug, item.level)} ` : '';

  return (
    <div
      key={item.slug}
      style={{ marginLeft: `${(item.level - 2) * 0.8}em` }}
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
        {`${titleSlug}${item.title}`}
      </Link>
    </div>
  );
};

export default TOCLink;
