import { useState, useEffect } from 'react';

import useDebouncedResize from '@/hooks/useDebouncedResize';

function useIsMobile(threshold: number) {
  const [isMobile, setIsMobile] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const updateIsMobile = () => {
    setIsMobile(window.innerWidth <= threshold);
  };

  useEffect(() => {
    updateIsMobile();
    setIsReady(true);
  }, []);

  useDebouncedResize(updateIsMobile); // Debounced resize listener

  return { isMobile, isReady };
}

export default useIsMobile;
