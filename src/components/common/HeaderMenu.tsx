'use client'

import type { ReactElement } from 'react'
import type { Config } from '@/schemas'
import { useTheme } from '@zl-asica/react'
import { isEmpty } from '@zl-asica/react/utils'
import { clsx } from 'clsx'
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
  className?: string
  onClickHandler?: () => void
}

const HeaderMenu = ({ config, isMobile, className, onClickHandler }: HeaderMenuProps) => {
  const translation = config.translation
  const currentPath = usePathname()
  const { isDarkTheme, toggleTheme } = useTheme('suzu-theme-color', 7)

  const menuItems: MenuItem[] = [
    { href: '/', label: translation.home.title, icon: <House aria-hidden /> },
    { href: '/posts', label: translation.posts.title, icon: <Newspaper aria-hidden /> },
    { href: '/friends', label: translation.friends.title, icon: <UsersRound aria-hidden /> },
    {
      href: '/about',
      label: translation.about.title,
      icon: <Info aria-hidden />,
      children: isEmpty(config.anilist_username)
        ? undefined
        : [
            { href: '/about/anime', label: translation.anime.title, icon: <TvMinimalPlay aria-hidden /> },
          ],
    },
  ]

  const blurActive = () => {
    const el = document.activeElement
    if (el instanceof HTMLElement) {
      el.blur()
    }
  }

  return (
    <ul className={clsx('gap-4', className)}>
      {menuItems.map((item) => {
        const isActive
          = item.href === '/'
            ? currentPath === '/'
            : currentPath === item.href || currentPath.startsWith(`${item.href}/`)

        const hasSubMenu = item.children !== undefined && item.children.length > 0

        return (
          <Fragment key={item.href}>
            <li className="group relative flex w-full items-center justify-center rounded-lg hover:bg-gray-light">
              <Link
                href={item.href}
                title={item.label}
                className={`relative flex w-full items-center gap-4 px-4 py-3 text-lg font-medium no-underline transition-all-300 group-hover:scale-110 group-hover:text-primary
                  ${isActive ? 'text-primary' : 'text-foreground/90'}
                  ${isMobile ? 'text-xl font-semibold' : 'text-lg'}
                `}
                onClick={() => {
                  onClickHandler?.()
                  !isMobile && hasSubMenu && blurActive()
                }}
                aria-label={`${translation.navigate} ${item.label}`}
                aria-current={isActive ? 'page' : undefined}
              >
                <span
                  className={`inline-block transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:text-primary
                  ${isActive ? 'text-primary' : 'text-foreground/90'}
                `}
                  aria-hidden
                >
                  {item.icon}
                </span>
                {item.label}
              </Link>

              {/* Desktop Hover - sub menu */}
              {item.children !== undefined && !isMobile && (
                <ul
                  className="
                    absolute left-0 top-full w-36 rounded-lg shadow-lg
                    opacity-0 scale-95 pointer-events-none
                    transition-all-300
                    group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto
                    group-focus-within:opacity-100 group-focus-within:scale-100 group-focus-within:pointer-events-auto
                  "
                >
                  {item.children.map((subItem, index) => (
                    <Fragment key={subItem.href}>
                      <li className={`p-2 rounded-md bg-background transition-colors duration-300 hover:text-primary dark:bg-background
                    ${currentPath.startsWith(subItem.href) ? 'text-primary' : ''}
                      `}
                      >
                        <Link
                          href={subItem.href}
                          className="flex items-center justify-center px-4 py-2 text-base"
                          aria-current={currentPath.startsWith(subItem.href) ? 'page' : undefined}
                          onClick={() => {
                            blurActive()
                          }}
                        >
                          <span className="pr-2">{subItem.icon}</span>
                          {subItem.label}
                        </Link>
                      </li>

                      {item.children !== undefined && index < item.children.length - 1 && (
                        <li className="w-full" aria-hidden>
                          <div className="h-px w-full bg-linear-to-r from-gray-light via-primary-300 to-gray-light" />
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
                        aria-current={currentPath.startsWith(subItem.href) ? 'page' : undefined}
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
                <div className="h-px w-full rounded-full bg-linear-to-r from-gray-light via-primary-300 to-gray-light" />
              </li>
            )}
          </Fragment>
        )
      })}

      {/* Theme Switch & Travelling */}
      <li className={`${isMobile ? 'mt-4 flex w-full justify-around' : 'flex justify-center gap-4'}`}>
        {config.travellings && (
          <Link
            className="text-hover-primary transition-all-300 group flex h-12 w-12 items-center justify-center rounded-full backdrop-blur-md bg-white/30 dark:bg-black/30 shadow-md hover:cursor-pointer"
            title={translation.aria.travellings}
            aria-label={translation.aria.travellings}
            href="https://www.travellings.cn/go.html"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="flex h-6 w-6 items-center justify-center transition-all-300 group-hover:scale-120 ">
              <TrainFront aria-hidden className="h-full w-full" />
            </span>
          </Link>
        )}
        <button
          type="button"
          className="text-hover-primary transition-all-300 group flex h-12 w-12 items-center justify-center rounded-full backdrop-blur-md bg-white/30 dark:bg-black/30 shadow-md hover:cursor-pointer"
          aria-label={isDarkTheme ? translation.aria.theme.light : translation.aria.theme.dark}
          aria-pressed={isDarkTheme}
          onClick={() => {
            toggleTheme()
            onClickHandler?.()
          }}
        >
          <span className="flex h-6 w-6 items-center justify-center transition-all-300 group-hover:scale-110">
            {isDarkTheme ? <Sun aria-hidden className="h-full w-full" /> : <Moon aria-hidden className="h-full w-full" />}
          </span>
        </button>
      </li>
    </ul>
  )
}

export default HeaderMenu
