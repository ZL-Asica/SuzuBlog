'use client';

import { usePathname } from 'next/navigation';
import { useRef, useState } from 'react';
import { FaAngleUp, FaBars } from 'react-icons/fa6';
import Link from 'next/link';

import { useOutsideClick, useScrollProgress } from '@/hooks';

import renderMenuItems from '@/components/helpers/renderMenuItems';

interface HeaderProperties {
  siteTitle: string;
}

function Header({ siteTitle }: HeaderProperties) {
  const [isOpen, setIsOpen] = useState(false);
  const scrollProgress = useScrollProgress();
  const menuReference = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const toggleMenu = () => setIsOpen((previous) => !previous);

  useOutsideClick(menuReference, () => {
    if (isOpen) setIsOpen(false);
  });

  return (
    <header className='relative z-50 w-full shadow-md'>
      {/* Progress Scroll Bar */}
      <div
        className='z-100 fixed left-0 top-0 z-40 h-[3px] w-full bg-sakuraPink transition-all duration-500 ease-out'
        style={{ width: `${scrollProgress}%` }}
        aria-hidden
      />

      {/* Navigation Menu */}
      <nav className='z-50 mx-auto flex max-w-7xl items-center justify-between px-4 py-4'>
        <Link
          href='/'
          target='_self'
          aria-label={`Navigate to Home Page of ${siteTitle}`}
          className='relative z-50 inline-flex items-center no-underline transition-colors duration-300 ease-in-out hover:scale-x-105'
        >
          {isHomePage ? (
            <h1 className='text-2xl font-bold'>{siteTitle}</h1>
          ) : (
            <p className='text-2xl font-bold'>{siteTitle}</p>
          )}
        </Link>

        <button
          className='z-50 bg-darkBackground text-3xl text-darkForeground transition-transform duration-300 hover:scale-110 dark:bg-lightBackground dark:text-lightForeground md:hidden'
          onClick={toggleMenu}
          aria-label='Toggle menu'
          aria-expanded={isOpen}
          aria-controls='mobile-menu'
        >
          {isOpen ? <FaAngleUp /> : <FaBars />}
        </button>

        <div
          id='mobile-menu'
          ref={menuReference}
          tabIndex={-1}
          role='menu'
          aria-hidden={!isOpen}
          inert={!isOpen}
          className={`absolute left-0 top-20 z-50 w-full bg-lightBackground p-4 shadow-lg transition-all duration-300 ease-out dark:bg-darkBackground md:hidden ${
            isOpen
              ? 'max-h-screen scale-y-100 transform opacity-100'
              : 'max-h-0 scale-y-0 transform opacity-0'
          }`}
          style={{ transformOrigin: 'top' }}
        >
          <ul className='flex flex-col gap-2'>
            {renderMenuItems(true, toggleMenu)}
          </ul>
        </div>
        {isOpen && (
          <div
            className='fixed inset-0 -z-20 bg-black bg-opacity-50 transition-opacity duration-300'
            aria-hidden
          />
        )}
        <ul className='hidden space-x-6 md:flex'>{renderMenuItems(false)}</ul>
      </nav>
    </header>
  );
}

export default Header;
