'use client'

import type { Config } from '@/schemas'
import { useClickOutside, useHideOnScrollDown, useToggle } from '@zl-asica/react'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import HeaderMenu from './HeaderMenu'

interface HeaderProps {
  config: Config
}

const Header = ({ config }: HeaderProps) => {
  const [isOpen, toggleOpen] = useToggle()
  const menuReference = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const isHeaderVisible = useHideOnScrollDown(headerRef)
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  useClickOutside(menuReference, () => {
    if (isOpen) {
      toggleOpen()
    }
  })

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const firstLink = menuReference.current?.querySelector<HTMLAnchorElement>('a')
    firstLink?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        toggleOpen()
        buttonRef.current?.focus()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen, toggleOpen])

  // Avoid scrolling when the menu is open (mobile)
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    }
    else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 z-50 w-full backdrop-blur-xl bg-background shadow-md transition-transform-300
        ${isHeaderVisible ? 'translate-y-0' : '-translate-y-full'}
      `}
    >
      <a
        href="#main-content"
        className="
          sr-only focus:not-sr-only
          focus:fixed focus:left-4 focus:top-4 focus:z-60
          focus:rounded-md focus:bg-background focus:px-3 focus:py-2
          focus:text-sm focus:font-semibold focus:text-foreground
          focus:shadow-lg focus:ring-2 focus:ring-primary-300
          focus:outline-none
        "
        onClick={(e) => {
          e.preventDefault()
          const el = document.getElementById('main-content')
          el?.focus()
        }}
      >
        {config.translation.aria.skipToContent}
      </a>

      {/* Navigation Menu */}
      <nav
        className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-4 bg-background"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          aria-label={`${config.translation.navigate} ${config.title}`}
          className="transition-all-300 text-hover-primary text-2xl font-bold text-foreground no-underline"
        >
          {isHomePage ? <h1>{config.title}</h1> : config.title}
        </Link>

        {/* Mobile Menu Button */}
        <button
          type="button"
          ref={buttonRef}
          className="transition-transform-300 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-2xl text-background shadow-md hover:scale-110 md:hidden"
          onClick={toggleOpen}
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-pressed={isOpen}
        >
          {isOpen ? <X aria-hidden strokeWidth={2.5} /> : <Menu aria-hidden strokeWidth={2.5} />}
        </button>

        {/* Mobile Menu */}
        <div
          id="mobile-menu"
          ref={menuReference}
          aria-hidden={!isOpen}
          className={`transition-all-300 fixed right-0 top-0 z-50 h-screen w-1/2 min-w-52 max-w-64 backdrop-blur-xl bg-background/95 shadow-2xl md:hidden
            ${isOpen
      ? 'translate-x-0 opacity-100 visible pointer-events-auto'
      : 'translate-x-full opacity-0 invisible pointer-events-none'
    }
          `}
        >
          <HeaderMenu
            config={config}
            isMobile
            className="flex flex-col items-start gap-4 p-6"
            onClickHandler={toggleOpen}
          />
        </div>

        {/* Backdrop */}
        {isOpen && (
          <div
            className="fixed inset-0 z-40 h-screen w-screen bg-black/70 transition-opacity-300 md:hidden"
            onClick={toggleOpen}
            aria-hidden="true"
          />
        )}

        {/* Desktop Menu */}
        <HeaderMenu
          config={config}
          isMobile={false}
          className="hidden md:flex md:gap-6"
        />
      </nav>
    </header>
  )
}

export default Header
