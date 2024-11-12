'use client';

import { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';

function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Handle visibility
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Handle bottom
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight
      ) {
        setIsAtBottom(true);
        // Add 3 seconds delay to remove the animation
        console.log('At bottom');
        setTimeout(() => setIsAtBottom(false), 3000);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={`${
        isVisible ? 'opacity-100' : 'opacity-0'
      } fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-sakuraPink text-white shadow-lg transition-all duration-200 hover:scale-125 ${
        isAtBottom ? 'animate-bounce' : ''
      } `}
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

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

export default BackToTop;
