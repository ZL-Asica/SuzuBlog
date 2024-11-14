import { useEffect } from 'react';
import { debounce } from 'es-toolkit/compat';

interface UseDebouncedEventOptions {
  events?: Array<'resize' | 'scroll' | 'mousedown'>;
  delay?: number;
}

const useDebouncedEvent = <T extends Event>(
  callback: (event: T) => void,
  { events = ['scroll'], delay = 100 }: UseDebouncedEventOptions
) => {
  useEffect(() => {
    if (typeof globalThis === 'undefined') return; // Skip in SSR

    // Use a debounced callback
    const debouncedCallback = debounce(
      (event: Event) => callback(event as T),
      delay
    );

    // Add event listeners
    for (const event of events)
      globalThis.addEventListener(event, debouncedCallback as EventListener);

    // Remove event listeners
    return () => {
      for (const event of events)
        globalThis.removeEventListener(
          event,
          debouncedCallback as EventListener
        );
    };
  }, [callback, events, delay]);
};

export default useDebouncedEvent;
