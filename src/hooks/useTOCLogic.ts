import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import {
  useIsMobile,
  useDebouncedResize,
  useDebouncedScroll,
  useOutsideClick,
  useTOCPosition,
} from '@/hooks';

function useTOCLogic(
  showThumbnail: boolean,
  onLinkClick?: (slug: string) => void
) {
  const [activeSlug, setActiveSlug] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const tocReference = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const { isMobile, isReady } = useIsMobile(768 + 96);
  const { position, updatePosition } = useTOCPosition(isMobile, showThumbnail);

  // update once on first render
  useEffect(() => {
    updatePosition();
    updateActiveSlug();
  }, []);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleLinkClick = (slug: string) => {
    const targetElement = document.querySelector(`#${CSS.escape(slug)}`);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
      setActiveSlug(slug);
      router.push(`#${slug}`, { scroll: false });
    }
    if (isMobile) setIsOpen(false);
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

  useDebouncedResize(updatePosition);
  useDebouncedScroll(() => {
    updatePosition();
    updateActiveSlug();
  });
  useOutsideClick(tocReference, () => setIsOpen(false));

  return {
    activeSlug,
    isOpen,
    handleToggle,
    handleLinkClick,
    tocReference,
    isMobile,
    position,
    isReady,
  };
}

export default useTOCLogic;
