import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useDebouncedResize, useOutsideClick } from '@/hooks';

function useTOCLogic(onLinkClick?: (slug: string) => void) {
  const [activeSlug, setActiveSlug] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const tocReference = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  // update once on first render
  useEffect(() => {
    updateActiveSlug();
  }, []);

  const handleToggle = () => setIsOpen((previous) => !previous);

  const handleLinkClick = (slug: string) => {
    const targetElement = document.querySelector(`#${CSS.escape(slug)}`);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
      setActiveSlug(slug);
      router.push(`#${slug}`, { scroll: false });
    }
    setIsOpen(false);
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
  useDebouncedResize(updateActiveSlug, { delay: 20 });

  // Close TOC when clicking outside
  useOutsideClick(tocReference, () => {
    if (isOpen) setIsOpen(false);
  });

  return {
    activeSlug,
    isOpen,
    handleToggle,
    handleLinkClick,
    tocReference,
  };
}

export default useTOCLogic;
