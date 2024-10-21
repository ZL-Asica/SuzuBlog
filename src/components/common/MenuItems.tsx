import React from 'react';
import {
  FaHouse,
  FaRegNewspaper,
  FaPeopleGroup,
  FaInfo,
} from 'react-icons/fa6';
import * as Fa6 from 'react-icons/fa6';
import Link from 'next/link';
import { Category } from '@/types';

interface DropdownItem {
  href: string;
  label: string;
  icon: React.ReactNode | null;
}

// Function to generate menu items for both mobile and desktop
const renderMenuItems = ({
  postCategories,
  isMobile,
  onClickHandler,
}: {
  postCategories: Category[];
  isMobile?: boolean;
  onClickHandler?: () => void;
}) =>
  [
    { href: '/', label: 'Home', icon: <FaHouse /> },
    {
      href: '/posts',
      label: 'Posts',
      icon: <FaRegNewspaper />,
      isDropdown: true,
      dropdownItems: postCategories.map((category: Category) => ({
        href: `/categories/${category.slug}`,
        label: category.name,
        icon:
          category.icon && Fa6[category.icon as keyof typeof Fa6]
            ? React.createElement(Fa6[category.icon as keyof typeof Fa6])
            : null, // If icon is defined, try to render it.
      })),
    },
    { href: '/friends', label: 'Friends', icon: <FaPeopleGroup /> },
    { href: '/about', label: 'About', icon: <FaInfo /> },
  ].map((item) => (
    <li key={item.href} className='group relative'>
      {item.isDropdown ? (
        isMobile ? (
          <>
            <Link
              href={item.href}
              className='flex items-center gap-2 p-2'
              onClick={onClickHandler}
            >
              {item.icon}
              {item.label}
            </Link>
            {/* Mobile dropdown menu indentation*/}
            <div className='ml-4'>
              {item.dropdownItems?.map((dropdownItem: DropdownItem) => (
                <Link
                  key={dropdownItem.href}
                  href={dropdownItem.href}
                  className='flex items-center gap-2 p-2'
                  onClick={onClickHandler}
                >
                  {dropdownItem.icon}
                  {dropdownItem.label}
                </Link>
              ))}
            </div>
          </>
        ) : (
          // Desktop dropdown menu
          <div className='relative'>
            <Link
              href={item.href}
              aria-haspopup='true'
              className='flex items-center gap-2 p-2'
              onClick={onClickHandler}
            >
              {item.icon}
              {item.label}
            </Link>
            {/* Dropdown menu */}
            <ul className='absolute left-0 top-full hidden w-40 space-y-2 bg-lightBackground p-2 shadow-lg group-hover:block dark:bg-darkBackground'>
              {item.dropdownItems?.map((dropdownItem: DropdownItem) => (
                <li key={dropdownItem.href}>
                  <Link
                    href={dropdownItem.href}
                    className='flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800'
                    onClick={onClickHandler}
                  >
                    {dropdownItem.icon}
                    {dropdownItem.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )
      ) : (
        <Link
          href={item.href}
          className='flex items-center gap-2 p-2'
          onClick={onClickHandler}
        >
          {item.icon}
          {item.label}
        </Link>
      )}
    </li>
  ));

export default renderMenuItems;
