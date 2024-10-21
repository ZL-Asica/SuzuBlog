'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { FaBars, FaAngleUp } from 'react-icons/fa6';
import { Category } from '@/types';
import renderMenuItems from '@/components/common/MenuItems';
import '@/styles/header.css';

export default function Header({
  siteTitle,
  postCategories,
}: {
  siteTitle: string;
  postCategories: Category[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false); // Detect if in mobile view
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

  // Detect screen width and set mobile state
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Set to true if screen is less than or equal to 768px
    };

    handleResize(); // Set initial state on component mount
    window.addEventListener('resize', handleResize); // Update state on window resize

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <header
      className='relative z-50 shadow-md'
      style={{
        backgroundColor: 'var(--background)',
        color: 'var(--foreground)',
      }}
    >
      <nav className='mx-auto flex max-w-7xl items-center justify-between px-4 py-4'>
        <Link href='/'>
          <h1 className='text-2xl font-bold'>{siteTitle}</h1>
        </Link>

        {/* Display only in mobile */}
        {isMobile && (
          <>
            <button
              className='text-3xl md:hidden'
              onClick={toggleMenu}
              aria-label='Toggle menu'
              aria-expanded={isOpen}
              aria-controls='mobile-menu'
            >
              {isOpen ? <FaAngleUp /> : <FaBars />}
            </button>

            {/* Mobile Navigation */}
            {isOpen && (
              <div
                id='mobile-menu'
                ref={menuRef}
                tabIndex={-1}
                role='menu'
                aria-hidden={!isOpen}
                className='absolute left-0 top-16 z-50 w-full bg-lightBackground p-4 shadow-lg dark:bg-darkBackground'
                style={{ zIndex: 50 }}
              >
                <ul className='flex flex-col gap-2'>
                  {renderMenuItems({
                    postCategories: postCategories,
                    isMobile: true,
                    onClickHandler: toggleMenu,
                  })}
                </ul>
              </div>
            )}
          </>
        )}

        {/* Display only in desktop */}
        {!isMobile && (
          <ul className='hidden space-x-6 md:flex'>
            {renderMenuItems({ postCategories: postCategories })}
          </ul>
        )}
      </nav>
    </header>
  );
}
