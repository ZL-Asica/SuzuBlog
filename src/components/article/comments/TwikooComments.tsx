'use client';

import { useEffect } from 'react';

interface TwikooCommentsProperties {
  environmentId: string;
}

const TwikooComments = ({ environmentId }: TwikooCommentsProperties) => {
  useEffect(() => {
    import('twikoo').then((twikoo) => {
      twikoo.init({
        envId: environmentId,
        el: '#twikoo-comments'
      });
    });
  }, []);

  return (
    <div
      id='twikoo-comments'
      className='font-sans'
    />
  );
};

export default TwikooComments;
