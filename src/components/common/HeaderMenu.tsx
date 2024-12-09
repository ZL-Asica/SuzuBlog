'use client';

import Link from 'next/link';
import type { ReactElement } from 'react';
import { Fragment, useEffect, useState } from 'react';
import {
  FaHouse,
  FaRegNewspaper,
  FaPeopleGroup,
  FaInfo,
  FaRegSun,
  FaMoon
} from 'react-icons/fa6';

interface MenuItem {
  href: string;
  label: string;
  icon: ReactElement;
}

interface HeaderMenuProperties {
  translation: Translation;
  isMobile: boolean;
  ulClassName?: string;
  onClickHandler?: () => void;
}

const HeaderMenu = ({
  translation,
  isMobile,
  ulClassName = '',
  onClickHandler
}: HeaderMenuProperties) => {
  const menuItems: MenuItem[] = [
    { href: '/', label: translation.home.title, icon: <FaHouse /> },
    {
      href: '/posts',
      label: translation.posts.title,
      icon: <FaRegNewspaper />
    },
    {
      href: '/friends',
      label: translation.friends.title,
      icon: <FaPeopleGroup />
    },
    { href: '/about', label: translation.about.title, icon: <FaInfo /> }
  ];

  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const userPreferredTheme = localStorage.getItem('suzu-color-theme');
    const systemPrefersDark = globalThis.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;

    // Determine initial theme
    const initialTheme = userPreferredTheme
      ? userPreferredTheme === 'dark'
      : systemPrefersDark;
    setIsDarkTheme(initialTheme);

    // Update the HTML class based on the initial theme
    document.documentElement.classList.toggle('dark', initialTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);

    // Update HTML class and localStorage
    document.documentElement.classList.toggle('dark', newTheme);
    localStorage.setItem('suzu-color-theme', newTheme ? 'dark' : 'light');
  };

  return (
    <ul className={`gap-4 ${ulClassName}`}>
      {menuItems.map((item, index) => (
        <Fragment key={index}>
          {/* Link as Full Width */}
          <li
            key={index}
            className='group relative flex w-full items-center justify-center rounded-lg hover:bg-[var(--lightGray)]'
          >
            <Link
              href={item.href}
              title={item.label}
              className={`relative flex w-full items-center gap-4 px-4 py-3 text-lg font-medium no-underline transition-all duration-300 ease-in-out group-hover:text-[var(--sakuraPink)]`}
              onClick={onClickHandler}
              aria-label={`${translation.navigate} ${item.label}`}
            >
              <span className='inline-block transition-transform duration-300 ease-in-out group-hover:scale-125'>
                {item.icon}
              </span>
              {item.label}
            </Link>
          </li>

          {/* Divider */}
          {isMobile && (
            <li className='w-full'>
              <div className='h-[1px] w-full bg-gradient-to-r from-[var(--lightGray)] via-[var(--sakuraPink)] to-[var(--lightGray)]'></div>
            </li>
          )}
        </Fragment>
      ))}
      <li className='group mx-auto flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800'>
        <button
          className='flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 transition-all duration-300 ease-in-out hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700'
          aria-label="$t('aria.theme')"
          onClick={() => {
            toggleTheme();
            if (onClickHandler) onClickHandler();
          }}
        >
          <span className='flex h-6 w-6 items-center justify-center text-gray-600 transition-transform duration-300 ease-in-out hover:text-[var(--sakuraPink)] group-hover:scale-125 dark:text-gray-300 dark:hover:text-[var(--sakuraPink)]'>
            {isDarkTheme ? (
              <FaRegSun className='h-full w-full' />
            ) : (
              <FaMoon className='h-full w-full' />
            )}
          </span>
        </button>
      </li>
    </ul>
  );
};

export default HeaderMenu;
