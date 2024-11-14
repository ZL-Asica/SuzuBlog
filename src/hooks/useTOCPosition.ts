import { useEffect, useState } from 'react';

import useFixedPosition from '@/hooks/useFixedPosition';

const useTOCPosition = (isMobile: boolean, showThumbnail: boolean) => {
  const { position: fixedPosition, updatePosition: updateRightPosition } =
    useFixedPosition();
  const [top, setTop] = useState(20);

  const updatePosition = () => {
    updateRightPosition();
    setTop(
      isMobile
        ? 20
        : showThumbnail && window.scrollY >= 420
          ? 20
          : 500 - window.scrollY
    );
  };

  useEffect(() => {
    updatePosition();
  }, []);

  return { position: { ...fixedPosition, top }, updatePosition };
};

export default useTOCPosition;
