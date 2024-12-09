import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useClickOutside, useEventListener, useToggle } from '@zl-asica/react';

function useTOCLogic(onLinkClick?: (slug: string) => void) {
  const [activeSlug, setActiveSlug] = useState('');
  const [isOpen, toggleOpen] = useToggle();
  const tocReference = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const handleLinkClick = (slug: string) => {
    const targetElement = document.querySelector(`#${CSS.escape(slug)}`);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
      setActiveSlug(slug);
      router.push(`#${slug}`, { scroll: false });
    }
    if (isOpen) toggleOpen();
    if (onLinkClick) onLinkClick(slug);
  };

  // Helper function to update activeSlug based on current scroll position
  const updateActiveSlug = () => {
    const headings = document.querySelectorAll('h2, h3, h4, h5, h6');
    let currentSlug = '';
    for (const heading of headings) {
      if (heading.getBoundingClientRect().top <= 10) {
        currentSlug = heading.id;
      }
    }
    setActiveSlug(currentSlug);
  };

  // Update activeSlug on scroll
  useEventListener(
    'scroll',
    updateActiveSlug,
    { current: globalThis },
    { passive: true },
    100
  );

  // Close TOC when clicking outside
  useClickOutside(tocReference, () => {
    if (isOpen) toggleOpen();
  });

  return {
    activeSlug,
    isOpen,
    toggleOpen,
    handleLinkClick,
    tocReference
  };
}

export default useTOCLogic;
