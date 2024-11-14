'use client';

import Link from 'next/link';
import { FaListUl } from 'react-icons/fa';

import { useTOCLogic } from '@/hooks';

interface TOCProperties {
  items: TocItems[];
  showThumbnail?: boolean;
}

const TOC = ({ items, showThumbnail = true }: TOCProperties) => {
  const {
    isReady,
    activeSlug,
    isOpen,
    handleToggle,
    handleLinkClick,
    tocReference,
    isMobile,
    position,
  } = useTOCLogic(showThumbnail);

  if (!isReady) return null;

  return (
    <>
      {isMobile && (
        <button
          onClick={handleToggle}
          aria-label='Toggle Table of Contents'
          className={`fixed bottom-28 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-sakuraPink p-3 text-white shadow-lg transition-transform duration-300 ease-in-out ${
            isOpen ? 'translate-y-2' : 'hover:scale-110'
          }`}
        >
          <FaListUl size={18} />
        </button>
      )}
      {(!isMobile || isOpen) && (
        <nav
          ref={tocReference}
          className={`fixed z-40 ${isMobile ? 'bottom-36' : ''} max-h-[70vh] w-48 overflow-auto rounded-lg bg-white p-3 shadow-md transition-transform duration-300 ease-in-out dark:bg-gray-800 ${
            isMobile ? 'translate-y-5' : 'opacity-100'
          }`}
          style={{
            top: isMobile ? 'auto' : position.top,
            right: position.right,
            transition: 'top 0.3s ease-in-out, right 0.3s ease-in-out',
          }}
        >
          <h2 className='mb-4 text-lg font-semibold text-sakuraPink'>
            Table of Contents
          </h2>
          {items.map((item) => (
            <div
              key={item.slug}
              style={{ marginLeft: `${(item.level - 2) * 1.01}em` }}
            >
              <Link
                href={`#${item.slug}`}
                scroll={false}
                onClick={(event) => {
                  event.preventDefault();
                  handleLinkClick(item.slug);
                }}
                className={`block py-1 text-sm no-underline transition-colors duration-200 ${
                  activeSlug === item.slug
                    ? 'font-bold text-sakuraPink'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                {item.title}
              </Link>
            </div>
          ))}
        </nav>
      )}
    </>
  );
};

export default TOC;
