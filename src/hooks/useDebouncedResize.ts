import { useEffect } from 'react';
import { debounce } from 'es-toolkit/compat';

const useDebouncedResize = (callback: () => void, delay: number = 100) => {
  useEffect(() => {
    if (typeof globalThis === 'undefined') return; // Skip in SSR

    const handleResize = debounce(callback, delay);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [callback, delay]);
};

export default useDebouncedResize;
