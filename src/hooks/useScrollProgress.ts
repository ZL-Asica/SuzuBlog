import { useEffect, useState } from 'react';

import useDebouncedScroll from '@/hooks/useDebouncedScroll';

const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  const updateScrollProgress = () => {
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    setScrollProgress(progress);
  };

  useEffect(() => {
    updateScrollProgress();
  }, []);

  useDebouncedScroll(() => requestAnimationFrame(updateScrollProgress));

  return scrollProgress;
};

export default useScrollProgress;
