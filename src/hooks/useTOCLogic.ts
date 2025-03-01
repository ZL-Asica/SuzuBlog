'use client'

import { useClickOutside, useToggle } from '@zl-asica/react'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'

const useTOCLogic = () => {
  const [activeSlug, setActiveSlug] = useState('')
  const [isOpen, toggleOpen] = useToggle()
  const tocReference = useRef<HTMLElement>(null)
  const router = useRouter()

  const handleLinkClick = (slug: string) => {
    const targetElement = document.querySelector(`#${CSS.escape(slug)}`)
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
      setActiveSlug(slug)
      router.push(`#${slug}`, { scroll: false })
    }
    if (isOpen) {
      toggleOpen()
    }
  }

  const updateActiveSlug = useCallback(() => {
    const headings = document.querySelectorAll('h2, h3, h4, h5, h6')
    let currentSlug = ''
    for (const heading of headings) {
      if (heading.getBoundingClientRect().top <= 10) {
        currentSlug = heading.id
      }
    }
    if (currentSlug !== activeSlug) {
      setActiveSlug(currentSlug)
    }
  }, [activeSlug])

  useEffect(() => {
    if (tocReference.current && activeSlug) {
      const activeLink = tocReference.current.querySelector(
        `a[href="#${CSS.escape(activeSlug)}"]`,
      )
      if (activeLink) {
        const container = tocReference.current
        const { offsetTop: linkTop } = activeLink as HTMLElement
        const containerScroll = container.scrollTop
        const containerHeight = container.clientHeight

        // Ensure the active link is visible and vertically centered
        const offset = linkTop - containerHeight / 2
        if (containerScroll !== offset) {
          container.scrollTo({
            top: offset,
            behavior: 'smooth',
          })
        }
      }
    }
  }, [activeSlug, updateActiveSlug])

  useEffect(() => {
    const handleScroll = () => updateActiveSlug()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [activeSlug, updateActiveSlug])

  useClickOutside(tocReference, () => {
    if (isOpen) {
      toggleOpen()
    }
  })

  return {
    activeSlug,
    isOpen,
    toggleOpen,
    handleLinkClick,
    tocReference,
  }
}

export default useTOCLogic
