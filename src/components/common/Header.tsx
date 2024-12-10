'use client';

import { usePathname } from 'next/navigation';
import { useRef } from 'react';
import { FaBars } from 'react-icons/fa6';
import Link from 'next/link';
import { useClickOutside, useToggle, useScrollPosition } from '@zl-asica/react';

import HeaderMenu from './HeaderMenu';

interface HeaderProperties {
  config: Config;
}

const Header = ({ config }: HeaderProperties) => {
  const [isOpen, toggleOpen] = useToggle();
  const siteTitle = config.title;
  const scrollProgress = useScrollPosition(undefined, true);
  const menuReference = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useClickOutside(menuReference, () => {
    if (isOpen) toggleOpen();
  });

  return (
    <header className='relative z-50 w-full bg-[var(--background)] shadow-md'>
      {/* Progress Scroll Bar */}
      <div
        className='fixed left-0 top-0 h-[3px] w-full bg-[var(--sakuraPink)] transition-all duration-500 ease-out'
        style={{ width: `${scrollProgress}%` }}
        aria-hidden
      />

      {/* Navigation Menu */}
      <nav className='mx-auto flex max-w-7xl items-center justify-between px-4 py-4'>
        {/* Logo */}
        <Link
          href='/'
          aria-label={`Navigate to Home Page of ${siteTitle}`}
          className='text-2xl font-bold text-[var(--foreground)] no-underline transition-all duration-300 hover:text-[var(--sakuraPink)]'
        >
          {isHomePage ? <h1>{siteTitle}</h1> : <p>{siteTitle}</p>}
        </Link>

        {/* Mobile Menu Button */}
        <button
          className={`z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--foreground)] text-2xl text-[var(--background)] shadow-md transition-transform duration-300 hover:scale-110 md:hidden`}
          onClick={toggleOpen}
          aria-label='Toggle menu'
          aria-expanded={isOpen}
          aria-controls='mobile-menu'
        >
          {!isOpen && <FaBars />}
        </button>

        {/* Mobile Menu */}
        <div
          id='mobile-menu'
          ref={menuReference}
          className={`fixed right-0 top-0 z-50 h-full w-1/2 bg-[var(--background)] shadow-lg transition-all duration-300 ease-out md:hidden ${
            isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
          }`}
        >
          <HeaderMenu
            config={config}
            isMobile
            ulClassName='flex flex-col items-start gap-4 p-6'
            onClickHandler={toggleOpen}
          />
        </div>

        {/* Backdrop */}
        {isOpen && (
          <div
            className='fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-300'
            onClick={(event_) => {
              event_.preventDefault();
              event_.stopPropagation();
              toggleOpen();
            }}
            aria-hidden
          />
        )}

        {/* Desktop Menu */}
        <HeaderMenu
          config={config}
          isMobile={false}
          ulClassName='hidden md:flex md:gap-6'
        />
      </nav>
    </header>
  );
};

export default Header;
