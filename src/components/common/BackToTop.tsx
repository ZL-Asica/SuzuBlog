'use client';

import { FaArrowUp } from 'react-icons/fa';

import { useVisibilityOnScroll } from '@/hooks';

function BackToTop() {
  const { isVisible, isAtBottom } = useVisibilityOnScroll(100);

  return (
    <button
      onClick={() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      className={`${
        isVisible ? 'opacity-100' : 'opacity-0'
      } fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-sakuraPink text-white shadow-lg transition-all duration-200 hover:scale-125 ${
        isAtBottom ? 'animate-bounce' : ''
      }`}
      aria-label='Back to Top'
      hidden={!isVisible}
      disabled={!isVisible}
      aria-hidden={!isVisible}
      style={{ transition: 'opacity 0.3s, transform 0.3s ease-in-out' }}
    >
      <FaArrowUp size={20} />
    </button>
  );
}

export default BackToTop;
