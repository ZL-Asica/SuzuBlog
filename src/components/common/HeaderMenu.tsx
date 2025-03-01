'use client'

import Link from 'next/link'
import { Fragment, useEffect, useState } from 'react'
import {
  FaHouse,
  FaInfo,
  FaMoon,
  FaPeopleGroup,
  FaRegNewspaper,
  FaRegSun,
  FaTrainSubway,
} from 'react-icons/fa6'

interface MenuItem {
  href: string
  label: string
  icon: React.ReactElement
}

interface HeaderMenuProps {
  config: Config
  isMobile: boolean
  ulClassName?: string
  onClickHandler?: () => void
}

const HeaderMenu = ({ config, isMobile, ulClassName, onClickHandler }: HeaderMenuProps) => {
  const translation = config.translation

  const menuItems: MenuItem[] = [
    { href: '/', label: translation.home.title, icon: <FaHouse /> },
    { href: '/posts', label: translation.posts.title, icon: <FaRegNewspaper /> },
    { href: '/friends', label: translation.friends.title, icon: <FaPeopleGroup /> },
    { href: '/about', label: translation.about.title, icon: <FaInfo /> },
  ]

  const [isDarkTheme, setIsDarkTheme] = useState(false)

  useEffect(() => {
    const themeColor = localStorage.getItem('suzu-color-theme') ?? null
    const systemPrefersDark = globalThis.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches

    if (themeColor !== null) {
      setIsDarkTheme(themeColor === 'dark')
      document.documentElement.classList.toggle('dark', themeColor === 'dark')
    }
    else {
      setIsDarkTheme(systemPrefersDark)
      document.documentElement.classList.toggle('dark', systemPrefersDark)
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = isDarkTheme ? 'light' : 'dark'

    setIsDarkTheme(newTheme === 'dark')
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
    localStorage.setItem('suzu-color-theme', newTheme === 'dark' ? 'dark' : 'light')
  }

  return (
    <ul className={`gap-4 ${ulClassName}`}>
      {menuItems.map(item => (
        <Fragment key={item.href}>
          <li className="group relative flex w-full items-center justify-center rounded-lg hover:bg-[var(--lightGray)]">
            <Link
              href={item.href}
              title={item.label}
              className="relative flex w-full items-center gap-4 px-4 py-3 text-lg font-medium no-underline transition-all duration-300 ease-in-out group-hover:text-[var(--sakuraPink)]"
              onClick={onClickHandler}
              aria-label={`${translation.navigate} ${item.label}`}
            >
              <span className="inline-block transition-transform duration-300 ease-in-out group-hover:scale-125">
                {item.icon}
              </span>
              {item.label}
            </Link>
          </li>
          {isMobile && (
            <li
              className="w-full"
              aria-hidden
            >
              <div className="h-[1px] w-full bg-linear-to-r from-[var(--lightGray)] via-[var(--sakuraPink)] to-[var(--lightGray)]" />
            </li>
          )}
        </Fragment>
      ))}

      <li
        className={`${isMobile ? 'mt-4 flex w-full justify-around' : 'flex justify-center gap-4'}`}
      >
        {config.travellings && (
          <Link
            className="group flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 transition-all duration-300 ease-in-out hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
            title={translation.aria.travellings}
            href="https://www.travellings.cn/go.html"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="flex h-6 w-6 items-center justify-center text-gray-600 transition-transform duration-300 ease-in-out hover:text-[var(--sakuraPink)] group-hover:scale-125 dark:text-gray-300 dark:hover:text-[var(--sakuraPink)]">
              <FaTrainSubway className="h-full w-full" />
            </span>
          </Link>
        )}
        <button
          type="button"
          className="group flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 transition-all duration-300 ease-in-out hover:bg-gray-200 hover:cursor-pointer dark:bg-gray-800 dark:hover:bg-gray-700"
          aria-label={translation.aria.theme}
          onClick={() => {
            toggleTheme()
            if (onClickHandler) {
              onClickHandler()
            }
          }}
        >
          <span className="flex h-6 w-6 items-center justify-center text-gray-600 transition-transform duration-300 ease-in-out hover:text-[var(--sakuraPink)] group-hover:scale-125 dark:text-gray-300 dark:hover:text-[var(--sakuraPink)]">
            {isDarkTheme
              ? (<FaRegSun className="h-full w-full" />)
              : (<FaMoon className="h-full w-full" />)}
          </span>
        </button>
      </li>
    </ul>
  )
}

export default HeaderMenu
