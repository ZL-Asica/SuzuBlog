'use client';

import { defaultTo } from 'es-toolkit/compat';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface ItemLinksProperties {
  items?: string[];
  type: 'category' | 'tag';
}

const getLink = (
  item: string,
  type: 'category' | 'tag',
  searchParameters: URLSearchParams
) => {
  const newParameters = new URLSearchParams(searchParameters);
  newParameters.set(type, item);
  return `/posts?${newParameters.toString()}`;
};

export default function ItemLinks({ items, type }: ItemLinksProperties) {
  const searchParameters = useSearchParams();
  const displayItems = defaultTo(items, []);
  const displayItemsLength = displayItems.length;

  if (displayItemsLength === 0) {
    return <>{type === 'category' ? '未分类' : '无标签'}</>;
  }

  return (
    <>
      {displayItems.map((item, index) => (
        <span key={item}>
          <Link
            href={getLink(item, type, searchParameters)}
            target='_self'
            aria-label={`Navigate to ${type} ${item}`}
            className='no-underline'
          >
            {item}
          </Link>
          {index < displayItemsLength - 1 && ', '}
        </span>
      ))}
    </>
  );
}
