import { useState } from 'react';

const useTOCPosition = (isMobile: boolean, showThumbnail: boolean) => {
  const [position, setPosition] = useState({ top: 20, right: '10px' });

  const updatePosition = () => {
    setPosition((previous) => ({
      ...previous,
      right:
        window.innerWidth > 1400 ? `calc((100vw - 1400px) / 2 + 10px)` : '10px',
      top: isMobile
        ? 20
        : showThumbnail && window.scrollY >= 420
          ? 20
          : 500 - window.scrollY,
    }));
  };

  return { position, updatePosition };
};

export default useTOCPosition;
