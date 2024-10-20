'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Custom404() {
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    // Set up a countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    // Redirect after 10 seconds
    const redirectTimer = setTimeout(() => {
      window.location.href = '/';
    }, 10000);

    // Clean up both timers on component unmount
    return () => {
      clearTimeout(redirectTimer);
      clearInterval(timer);
    };
  }, []);

  return (
    <main className='grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8'>
      <div className='text-center'>
        <p className='text-base font-semibold'>404</p>
        <h1 className='mt-4 text-3xl font-bold tracking-tight sm:text-5xl'>
          Page not found
        </h1>
        <p className='mt-6 text-base leading-7'>
          Sorry, we couldn’t find the page you’re looking for.
          <br />
          You will be redirected to the home page in{' '}
          <span className='font-bold'>{countdown}</span> seconds.
        </p>
        <div className='mt-10 flex items-center justify-center gap-x-6'>
          <Link
            href='/'
            className='hover:bg-sakuraPink-dark rounded-md bg-sakuraPink px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          >
            Go back home
          </Link>
        </div>
      </div>
    </main>
  );
}
