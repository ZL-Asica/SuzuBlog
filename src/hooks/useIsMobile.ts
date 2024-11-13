import { useState } from 'react';

import useDebouncedResize from '@/hooks/useDebouncedResize';

function useIsMobile(threshold: number) {
  const [isMobile, setIsMobile] = useState(false);

  const updateIsMobile = () => {
    setIsMobile(window.innerWidth <= threshold);
  };

  useDebouncedResize(updateIsMobile); // Debounced resize listener

  return isMobile;
}

export default useIsMobile;
