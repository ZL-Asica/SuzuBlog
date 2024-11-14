import { useDebouncedEvent } from '@/hooks';

const useOutsideClick = (
  reference: React.RefObject<HTMLElement | null>,
  callback: () => void
) => {
  const handleClickOutside = (event: MouseEvent) => {
    if (
      reference.current &&
      !reference.current.contains(event.target as Node)
    ) {
      callback();
    }
  };

  useDebouncedEvent(handleClickOutside, { events: ['mousedown'] });
};

export default useOutsideClick;
