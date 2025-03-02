'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Fragment, useEffect, useState } from 'react'
import {
  FaHouse,
  FaInfo,
  FaMoon,
  FaPeopleGroup,
  FaRegNewspaper,
  FaRegSun,
  FaTrainSubway,
  FaTv,
} from 'react-icons/fa6'

interface MenuItem {
  href: string
  label: string
  icon: React.ReactElement | undefined
  children?: MenuItem[]
}

interface HeaderMenuProps {
  config: Config
  isMobile: boolean
  ulClassName?: string
  onClickHandler?: () => void
}

const HeaderMenu = ({ config, isMobile, ulClassName, onClickHandler }: HeaderMenuProps) => {
  const translation = config.translation
  const currentPath = usePathname()

  const menuItems: MenuItem[] = [
    { href: '/', label: translation.home.title, icon: <FaHouse /> },
    { href: '/posts', label: translation.posts.title, icon: <FaRegNewspaper /> },
    { href: '/friends', label: translation.friends.title, icon: <FaPeopleGroup /> },
    { href: '/about', label: translation.about.title, icon: <FaInfo /> },
  ]

  if (config.anilist_username !== null && config.anilist_username !== '') {
    menuItems[3].children = [{ href: '/about/anime', label: translation.anime.title, icon: <FaTv /> }]
  }

  const [isDarkTheme, setIsDarkTheme] = useState(false)

  useEffect(() => {
    const themeColor = localStorage.getItem('suzu-color-theme') ?? null
    const systemPrefersDark = globalThis.matchMedia('(prefers-color-scheme: dark)').matches

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
    localStorage.setItem('suzu-color-theme', newTheme)
  }

  return (
    <ul className={`gap-4 ${ulClassName}`}>
      {menuItems.map(item => (
        <Fragment key={item.href}>
          <li
            className={`group relative flex w-full items-center justify-center rounded-lg hover:bg-[var(--lightGray)] ${
              item.children ? 'hover:cursor-pointer' : ''
            }`}
          >
            <Link
              href={item.href}
              title={item.label}
              className={`relative flex w-full items-center gap-4 px-4 py-3 text-lg font-medium no-underline transition-all duration-300 ease-in-out group-hover:text-[var(--sakuraPink)]
                ${item.href !== '/' && currentPath.startsWith(item.href) ? 'text-[var(--sakuraPink)]' : ''}
                `}
              onClick={onClickHandler}
              aria-label={`${translation.navigate} ${item.label}`}
            >
              <span className="inline-block transition-transform duration-300 ease-in-out group-hover:scale-125">
                {item.icon}
              </span>
              {item.label}
            </Link>

            {/* Desktop Hover - sub menu */}
            {item.children !== undefined && !isMobile && (
              <ul className="absolute left-0 top-full hidden w-36 shadow-lg rounded-lg opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 group-hover:block transition-all duration-300 ease-in-out">
                {item.children.map((subItem, index) => (
                  <Fragment key={subItem.href}>
                    <li className={`p-2 rounded-md bg-[var(--background)] transition-colors duration-300 hover:text-[var(--sakuraPink)] dark:bg-[var(--background)]
                    ${currentPath.startsWith(subItem.href) ? 'text-[var(--sakuraPink)]' : ''}
                      `}
                    >
                      <Link href={subItem.href} className="flex items-center justify-center px-4 py-2 text-base">
                        <span className="pr-2">{subItem.icon}</span>
                        {subItem.label}
                      </Link>
                    </li>

                    {item.children !== undefined && index < item.children.length - 1 && (
                      <li className="w-full" aria-hidden>
                        <div className="h-[1px] w-full bg-gradient-to-r from-[var(--lightGray)] via-[var(--sakuraPink)] to-[var(--lightGray)]" />
                      </li>

                    )}
                  </Fragment>
                ))}
              </ul>
            )}
          </li>

          {/* Mobile - sub menu */}
          {isMobile && item.children && (
            <ul className="ml-6 border-l-2 border-gray-600 pl-3">
              {item.children.map(subItem => (
                <li key={subItem.href}>
                  <Link
                    href={subItem.href}
                    className={`flex items-center gap-2 py-2 text-base hover:text-[var(--sakuraPink)]
                      ${currentPath.startsWith(subItem.href) ? 'text-[var(--sakuraPink)]' : ''}
                      `}
                  >
                    {subItem.icon}
                    <span className="whitespace-nowrap">{subItem.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {/* Mobile - Divider */}
          {isMobile && (
            <li className="w-full" aria-hidden>
              <div className="h-[1px] w-full bg-gradient-to-r from-[var(--lightGray)] via-[var(--sakuraPink)] to-[var(--lightGray)]" />
            </li>
          )}
        </Fragment>
      ))}

      {/* Theme Switch & Travelling */}
      <li className={`${isMobile ? 'mt-4 flex w-full justify-around' : 'flex justify-center gap-4'}`}>
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
            {isDarkTheme ? <FaRegSun className="h-full w-full" /> : <FaMoon className="h-full w-full" />}
          </span>
        </button>
      </li>
    </ul>
  )
}

export default HeaderMenu
