import { useEffect, useState } from 'react';

import { useDebouncedEvent } from '@/hooks';

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

  useDebouncedEvent(() => requestAnimationFrame(updateScrollProgress), {});

  return scrollProgress;
};

export default useScrollProgress;
