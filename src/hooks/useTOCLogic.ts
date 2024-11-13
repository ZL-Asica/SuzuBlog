import { useState, useRef } from 'react';
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
  const isMobile = useIsMobile(768 + 96);
  const { position, updatePosition } = useTOCPosition(isMobile, showThumbnail);

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

  useDebouncedResize(updatePosition);
  useDebouncedScroll(updatePosition);
  useOutsideClick(tocReference, () => setIsOpen(false));

  return {
    activeSlug,
    isOpen,
    handleToggle,
    handleLinkClick,
    tocReference,
    isMobile,
    position,
  };
}

export default useTOCLogic;
