import { useEffect, useState } from 'react';

import useDebouncedScroll from '@/hooks/useDebouncedScroll';

const useVisibilityOnScroll = (threshold: number = 100) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);

  const updateVisibility = () => {
    setIsVisible(window.scrollY > threshold);

    const isBottomReached =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight;

    if (isBottomReached) {
      setIsAtBottom(true);
      setTimeout(() => setIsAtBottom(false), 3000); // Reset after delay
    }
  };

  useEffect(() => {
    updateVisibility();
  }, []);

  useDebouncedScroll(updateVisibility);

  return { isVisible, isAtBottom };
};

export default useVisibilityOnScroll;
