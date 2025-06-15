import { useClickOutside, useToggle } from '@zl-asica/react'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { centerActiveLink, findClosestSlug, scrollToSlug } from '@/lib'

/**
 * Hook for controlling Table of Contents (TOC) logic, including:
 * - active slug detection by scroll
 * - smooth scrolling to sections
 * - responsive sidebar toggling
 *
 * @param items The table of content items will be shown
 * @param visibleOffset The fixed header height to offset when scrolling
 */
const useTOCLogic = (
  items: TocItems[],
  visibleOffset: number = 10,
) => {
  const [activeSlug, setActiveSlug] = useState('')
  const [isOpen, toggleOpen] = useToggle()
  const tocReference = useRef<HTMLElement>(null)
  const headingsRef = useRef<HTMLElement[]>([])
  const activeSlugRef = useRef('')
  const ignoreNextUpdate = useRef(false)
  const router = useRouter()

  const handleLinkClick = (slug: string) => {
    ignoreNextUpdate.current = true
    scrollToSlug(slug, visibleOffset)

    setTimeout(() => {
      activeSlugRef.current = slug
      setActiveSlug(slug)
      ignoreNextUpdate.current = false
    }, 100)

    router.push(`#${slug}`, { scroll: false })
    if (isOpen) {
      toggleOpen()
    }
  }

  const updateActiveSlug = useCallback(() => {
    if (ignoreNextUpdate.current) {
      return
    }

    const slug = findClosestSlug(headingsRef.current, visibleOffset)

    if (slug !== null && slug !== activeSlugRef.current) {
      activeSlugRef.current = slug
      setActiveSlug(slug)
    }
  }, [visibleOffset])

  // Update TOC scroll position to center active link
  useEffect(() => {
    if (!tocReference.current || !activeSlug) {
      return
    }

    requestAnimationFrame(() => {
      centerActiveLink(tocReference.current!, activeSlug)
    })
  }, [activeSlug])

  // Scroll listener (with rAF throttling)
  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActiveSlug()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [updateActiveSlug])

  // Initialize headings
  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    headingsRef.current = items
      .map(({ slug }) =>
        document.querySelector<HTMLElement>(`#${CSS.escape(slug)}`))
      .filter((el): el is HTMLElement => !!el)
  }, [items])

  // Click outside to close on mobile
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
