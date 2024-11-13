import { useEffect } from 'react';
import { debounce } from 'es-toolkit/compat';

const useOutsideClick = (
  reference: React.RefObject<HTMLElement | null>,
  callback: () => void
) => {
  useEffect(() => {
    const handleClickOutside = debounce((event: MouseEvent) => {
      if (
        reference.current &&
        !reference.current.contains(event.target as Node)
      ) {
        callback();
      }
    }, 100); // 100ms debounce delay for click

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      handleClickOutside.cancel();
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [reference, callback]);
};

export default useOutsideClick;
