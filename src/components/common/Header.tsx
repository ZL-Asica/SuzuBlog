'use client';

import Link from 'next/link';
import {
  FaHouse,
  FaInfo,
  FaRegNewspaper,
  FaBars,
  FaAngleUp,
  FaPeopleGroup,
} from 'react-icons/fa6';
import { useState, useRef, useEffect } from 'react';

export default function Header({ siteTitle }: { siteTitle: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Ensure focus is managed when the menu is open for accessibility
  useEffect(() => {
    if (isOpen && menuRef.current) {
      menuRef.current.focus();
    }
  }, [isOpen]);

  // Menu items array to avoid repetition
  const menuItems = [
    { href: '/', label: 'Home', icon: <FaHouse /> },
    { href: '/posts', label: 'Posts', icon: <FaRegNewspaper /> },
    { href: '/friends', label: 'Friends', icon: <FaPeopleGroup /> },
    { href: '/about', label: 'About', icon: <FaInfo /> },
  ];

  // Function to generate menu items for both mobile and desktop
  const renderMenuItems = (onClickHandler?: () => void) =>
    menuItems.map((item) => (
      <li key={item.href}>
        <Link
          href={item.href}
          className='flex items-center gap-2 p-2'
          onClick={onClickHandler}
        >
          {item.icon}
          {item.label}
        </Link>
      </li>
    ));

  return (
    <header
      // Z-50: Ensure the header is positioned above other content
      className='relative z-50 shadow-md'
      style={{
        backgroundColor: 'var(--background)',
        color: 'var(--foreground)',
      }}
    >
      <div className='mx-auto max-w-7xl px-4 py-4'>
        <nav className='flex items-center justify-between'>
          <Link href='/'>
            <h1 className='text-2xl font-bold'>{siteTitle}</h1>
          </Link>

          {/* Hamburger Menu Button */}
          <button
            className='text-3xl md:hidden'
            onClick={toggleMenu}
            aria-label='Toggle menu'
            aria-expanded={isOpen}
            aria-controls='mobile-menu'
          >
            {isOpen ? <FaAngleUp /> : <FaBars />}
          </button>

          {/* Full Navigation - Hidden on small screens */}
          <ul className='hidden space-x-6 md:flex'>{renderMenuItems()}</ul>

          {/* Mobile Navigation - Visible on small screens */}
          {isOpen && (
            <div
              id='mobile-menu'
              ref={menuRef}
              tabIndex={-1}
              role='menu'
              aria-hidden={!isOpen}
              // Z-50: Big enough to ensure the menu is above other content
              className='absolute left-0 top-16 z-50 w-full bg-lightBackground p-4 shadow-lg dark:bg-darkBackground md:hidden'
              style={{ zIndex: 50 }}
            >
              <ul className='flex flex-col gap-2'>
                {renderMenuItems(toggleMenu)}
              </ul>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
