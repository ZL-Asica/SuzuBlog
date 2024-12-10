'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useClickOutside, useToggle } from '@zl-asica/react';

const useTOCLogic = () => {
  const [activeSlug, setActiveSlug] = useState('');
  const [isOpen, toggleOpen] = useToggle();
  const tocReference = useRef<HTMLElement>(null);
  const router = useRouter();

  const handleLinkClick = (slug: string) => {
    const targetElement = document.querySelector(`#${CSS.escape(slug)}`);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
      setActiveSlug(slug);
      router.push(`#${slug}`, { scroll: false });
    }
    if (isOpen) toggleOpen();
  };

  const updateActiveSlug = () => {
    const headings = document.querySelectorAll('h2, h3, h4, h5, h6');
    let currentSlug = '';
    for (const heading of headings) {
      if (heading.getBoundingClientRect().top <= 10) {
        currentSlug = heading.id;
      }
    }
    if (currentSlug !== activeSlug) {
      setActiveSlug(currentSlug);
    }
  };

  useEffect(() => {
    if (tocReference.current && activeSlug) {
      const activeLink = tocReference.current.querySelector(
        `a[href="#${CSS.escape(activeSlug)}"]`
      ) as HTMLElement | null;
      if (activeLink) {
        const container = tocReference.current;
        const { offsetTop: linkTop } = activeLink;
        const containerScroll = container.scrollTop;
        const containerHeight = container.clientHeight;

        // Ensure the active link is visible and vertically centered
        const offset = linkTop - containerHeight / 2;
        if (containerScroll !== offset) {
          container.scrollTo({
            top: offset,
            behavior: 'smooth'
          });
        }
      }
    }
  }, [activeSlug]);

  useEffect(() => {
    const handleScroll = () => updateActiveSlug();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSlug]);

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
};

export default useTOCLogic;
