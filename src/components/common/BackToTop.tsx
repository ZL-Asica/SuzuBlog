'use client'

import { backToTop, useIsBottom, useIsTop } from '@zl-asica/react'
import { usePathname } from 'next/navigation'
import { FaArrowUp } from 'react-icons/fa6'

function BackToTop() {
  const path = usePathname()
  const isVisible = !useIsTop(150) && path !== '/'
  const isBottom = useIsBottom(100)

  return (
    <button
      type="button"
      onClick={backToTop()}
      className={`${
        isVisible ? 'opacity-100' : 'opacity-0'
      } fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--sakuraPink)] text-white shadow-lg transition-all duration-200 hover:scale-125 md:right-16 lg:right-20 xl:right-[calc((100vw-1280px)/2+10px)] ${
        isBottom ? 'bottom-12 scale-125' : ''
      }`}
      aria-label="Back to Top"
      hidden={!isVisible}
      disabled={!isVisible}
      aria-hidden={!isVisible}
    >
      <FaArrowUp size={20} />
    </button>
  )
}

export default BackToTop
