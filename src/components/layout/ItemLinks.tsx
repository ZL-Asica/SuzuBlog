'use client';

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

  if (!items || items.length === 0) {
    return <>{type === 'category' ? '未分类' : '无标签'}</>;
  }

  return (
    <>
      {items.map((item, index) => (
        <span key={item}>
          <Link
            href={getLink(item, type, searchParameters)}
            target='_self'
            aria-label={`Navigate to ${type} ${item}`}
          >
            {item}
          </Link>
          {index < items.length - 1 && ', '}
        </span>
      ))}
    </>
  );
}
