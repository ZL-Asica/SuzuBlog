'use client';
// src/components/DisqusComments.tsx
import { useEffect } from 'react';

export default function DisqusComments({
  disqusShortname,
}: {
  disqusShortname: string;
}) {
  useEffect(() => {
    const disqusScript = document.createElement('script');
    disqusScript.src = `https://${disqusShortname}.disqus.com/embed.js`;
    disqusScript.setAttribute('data-timestamp', `${+new Date()}`);
    (document.head || document.body).appendChild(disqusScript);

    return () => {
      // Clean up the script if the component is unmounted
      if (disqusScript.parentNode) {
        disqusScript.parentNode.removeChild(disqusScript);
      }
    };
  }, []);

  return (
    <div id='disqus_thread' className='mx-auto mt-10 w-full max-w-3xl'></div>
  );
}
