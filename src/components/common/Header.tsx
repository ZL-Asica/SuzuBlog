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

import '@/styles/header.css';

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
    <header className='header-container relative z-50 shadow-md'>
      <nav
        className={
          'mx-auto flex max-w-7xl items-center justify-between px-4 py-4'
        }
      >
        <Link
          href='/'
          target='_self'
          aria-label={`Navigate to Home Page of ${siteTitle}`}
        >
          {isHomePage ? (
            <h1 className='text-2xl font-bold'>{siteTitle}</h1>
          ) : (
            <p className='text-2xl font-bold'>{siteTitle}</p>
          )}
        </Link>

        {/* Mobile View */}
        {isMobile ? (
          <>
            <button
              className='transform text-2xl transition-transform duration-300'
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
              inert={!isOpen} // Add inert to prevent focus when menu is closed
              className={`absolute left-0 top-20 w-full p-4 transition-all duration-300 ease-out ${
                isOpen
                  ? 'max-h-screen scale-y-100 opacity-100'
                  : 'max-h-0 scale-y-0 opacity-0'
              } bg-lightBackground shadow-lg dark:bg-darkBackground`}
            >
              <ul className='flex flex-col gap-2'>
                {renderMenuItems(toggleMenu)}
              </ul>
            </div>
          </>
        ) : (
          /* Desktop View */
          <ul className='hidden space-x-6 md:flex'>{renderMenuItems()}</ul>
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

function renderMenuItems(onClickHandler?: () => void) {
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
        className='flex items-center gap-2 p-2'
        onClick={onClickHandler}
        aria-label={`Navigate to ${item.label}`}
      >
        {item.icon}
        {item.label}
      </Link>
    </li>
  ));
}

export default Header;
