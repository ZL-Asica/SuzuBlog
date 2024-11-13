import { useEffect } from 'react';
import { debounce } from 'es-toolkit/compat';

const useDebouncedScroll = (callback: () => void, delay: number = 100) => {
  useEffect(() => {
    if (typeof globalThis === 'undefined') return; // Skip in SSR

    const handleScroll = debounce(callback, delay);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [callback, delay]);
};

export default useDebouncedScroll;
