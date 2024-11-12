'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import {
  FaAngleUp,
  FaBars,
  FaHouse,
  FaInfo,
  FaPeopleGroup,
  FaRegNewspaper,
} from 'react-icons/fa6';

interface HeaderProperties {
  siteTitle: string;
}

function Header({ siteTitle }: HeaderProperties) {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  const menuReference = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const toggleMenu = () => setIsOpen((previous) => !previous);

  // Detect clicks outside of the menu to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        menuReference.current &&
        !menuReference.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <header className='relative z-50 shadow-md'>
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

        {isMobile ? (
          // Mobile View
          <>
            <button
              className='z-50 bg-darkBackground text-3xl transition-transform duration-300 hover:scale-110 dark:bg-lightBackground'
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
              className={`absolute left-0 top-20 z-50 w-full bg-lightBackground p-4 shadow-lg transition-all duration-300 ease-out dark:bg-darkBackground ${
                isOpen
                  ? 'max-h-screen scale-y-100 transform opacity-100'
                  : 'max-h-0 scale-y-0 transform opacity-0'
              }`}
              style={{ transformOrigin: 'top' }}
            >
              <ul className='flex flex-col gap-2'>
                {renderMenuItems(isMobile, toggleMenu)}
              </ul>
            </div>
            {isOpen && (
              // Overlay when menu is open
              <div
                className='fixed inset-0 -z-20 bg-black bg-opacity-50 transition-opacity duration-300'
                aria-hidden={true}
              />
            )}
          </>
        ) : (
          // Desktop View
          <ul className='hidden space-x-6 md:flex'>
            {renderMenuItems(isMobile)}
          </ul>
        )}
      </nav>
    </header>
  );
}

// Hook to check if the screen is mobile size
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    // Only set up the listener on the client side
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
}

function renderMenuItems(isMobile: boolean, onClickHandler?: () => void) {
  const menuItems = [
    { href: '/', label: 'Home', icon: <FaHouse /> },
    { href: '/posts', label: 'Posts', icon: <FaRegNewspaper /> },
    { href: '/friends', label: 'Friends', icon: <FaPeopleGroup /> },
    { href: '/about', label: 'About', icon: <FaInfo /> },
  ];

  return menuItems.map((item) => (
    <li
      key={item.href}
      className='group relative'
    >
      <Link
        href={item.href}
        className='relative inline-flex items-center gap-2 p-2 no-underline transition-all duration-300 ease-in-out hover:scale-110'
        onClick={onClickHandler}
        aria-label={`Navigate to ${item.label}`}
      >
        {item.icon}
        {item.label}
        {/* Underline animation */}
        {!isMobile && (
          <span className='absolute bottom-0 left-0 h-0.5 w-0 bg-sakuraPink transition-all duration-300 group-hover:w-full'></span>
        )}
      </Link>
    </li>
  ));
}

export default Header;
