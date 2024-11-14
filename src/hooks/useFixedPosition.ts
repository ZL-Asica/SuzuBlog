import { useEffect, useState } from 'react';

const useFixedPosition = () => {
  const [position, setPosition] = useState({ right: '10px' });

  const updatePosition = () => {
    setPosition({
      right:
        window.innerWidth > 1400 ? `calc((100vw - 1400px) / 2 + 10px)` : '32px',
    });
  };

  useEffect(() => {
    updatePosition();
  }, []);

  return { position, updatePosition };
};

export default useFixedPosition;
