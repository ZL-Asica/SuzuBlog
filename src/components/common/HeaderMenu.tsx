'use client'

import type { ReactElement } from 'react'
import type { Config } from '@/schemas'
import { useTheme } from '@zl-asica/react'
import { isEmpty } from '@zl-asica/react/utils'
import { House, Info, Moon, Newspaper, Sun, TrainFront, TvMinimalPlay, UsersRound } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Fragment } from 'react'

interface MenuItem {
  href: string
  label: string
  icon: ReactElement | undefined
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
  const { isDarkTheme, toggleTheme } = useTheme('suzu-theme-color', 7)

  const menuItems: MenuItem[] = [
    { href: '/', label: translation.home.title, icon: <House /> },
    { href: '/posts', label: translation.posts.title, icon: <Newspaper /> },
    { href: '/friends', label: translation.friends.title, icon: <UsersRound /> },
    { href: '/about', label: translation.about.title, icon: <Info /> },
  ]

  if (!isEmpty(config.anilist_username)) {
    menuItems[3].children = [{ href: '/about/anime', label: translation.anime.title, icon: <TvMinimalPlay /> }]
  }

  return (
    <ul className={`gap-4 ${ulClassName}`}>
      {menuItems.map(item => (
        <Fragment key={item.href}>
          <li className="group relative flex w-full items-center justify-center rounded-lg hover:bg-gray-light">
            <Link
              href={item.href}
              title={item.label}
              className={`relative flex w-full items-center gap-4 px-4 py-3 text-lg font-medium no-underline transition-all-300 group-hover:scale-110 group-hover:text-primary
                ${item.href !== '/' && currentPath.startsWith(item.href) ? 'text-primary' : 'text-foreground/90'}
              `}
              onClick={onClickHandler}
              aria-label={`${translation.navigate} ${item.label}`}
            >
              <span
                className={`inline-block transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:text-primary
                  ${item.href !== '/' && currentPath.startsWith(item.href) ? 'text-primary' : 'text-foreground/90'}
                `}
                aria-hidden
              >
                {item.icon}
              </span>
              {item.label}
            </Link>

            {/* Desktop Hover - sub menu */}
            {item.children !== undefined && !isMobile && (
              <ul className="absolute left-0 top-full hidden w-36 shadow-lg rounded-lg opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 group-hover:block transition-all-300">
                {item.children.map((subItem, index) => (
                  <Fragment key={subItem.href}>
                    <li className={`p-2 rounded-md bg-background transition-colors duration-300 hover:text-primary dark:bg-background
                    ${currentPath.startsWith(subItem.href) ? 'text-primary' : ''}
                      `}
                    >
                      <Link href={subItem.href} className="flex items-center justify-center px-4 py-2 text-base">
                        <span className="pr-2">{subItem.icon}</span>
                        {subItem.label}
                      </Link>
                    </li>

                    {item.children !== undefined && index < item.children.length - 1 && (
                      <li className="w-full" aria-hidden>
                        <div className="h-[1px] w-full bg-gradient-to-r from-gray-light via-primary-300 to-gray-light" />
                      </li>
                    )}
                  </Fragment>
                ))}
              </ul>
            )}
          </li>

          {/* Mobile - sub menu */}
          {isMobile && item.children && (
            <li>
              <ul className="ml-6 border-l-2 border-gray-600 pl-3">
                {item.children.map(subItem => (
                  <li key={subItem.href}>
                    <Link
                      href={subItem.href}
                      title={subItem.label}
                      onClick={onClickHandler}
                      className={`flex items-center gap-2 py-2 text-base text-hover-primary
                      ${currentPath.startsWith(subItem.href) ? 'text-primary' : ''}
                      `}
                    >
                      {subItem.icon}
                      <span className="whitespace-nowrap">{subItem.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          )}

          {/* Mobile - Divider */}
          {isMobile && (
            <li className="w-full" aria-hidden>
              <div className="h-[1px] w-full rounded-full bg-gradient-to-r from-gray-light via-primary-300 to-gray-light" />
            </li>
          )}
        </Fragment>
      ))}

      {/* Theme Switch & Travelling */}
      <li className={`${isMobile ? 'mt-4 flex w-full justify-around' : 'flex justify-center gap-4'}`}>
        {config.travellings && (
          <Link
            className="text-hover-primary transition-all-300 group flex h-12 w-12 items-center justify-center rounded-full backdrop-blur-md bg-white/30 dark:bg-black/30 shadow-md hover:cursor-pointer"
            title={translation.aria.travellings}
            href="https://www.travellings.cn/go.html"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="flex h-6 w-6 items-center justify-center transition-all-300 group-hover:scale-120 ">
              <TrainFront className="h-full w-full" />
            </span>
          </Link>
        )}
        <button
          type="button"
          className="text-hover-primary transition-all-300 group flex h-12 w-12 items-center justify-center rounded-full backdrop-blur-md bg-white/30 dark:bg-black/30 shadow-md hover:cursor-pointer"
          aria-label={translation.aria.theme}
          onClick={() => {
            toggleTheme()
            onClickHandler && onClickHandler()
          }}
        >
          <span className="flex h-6 w-6 items-center justify-center transition-all-300 group-hover:scale-120 ">
            {isDarkTheme ? <Sun className="h-full w-full" /> : <Moon className="h-full w-full" />}
          </span>
        </button>
      </li>
    </ul>
  )
}

export default HeaderMenu
