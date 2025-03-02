'use client'

import { useScrollPosition } from '@zl-asica/react'

const ScrollPositionBar = () => {
  const scrollProgress = useScrollPosition(undefined, true)
  return (
    <div
      className="fixed left-0 top-0 z-60 h-[3px] w-full bg-[var(--sakuraPink)] transition-all duration-500 ease-out"
      style={{ width: `${scrollProgress}%` }}
      aria-hidden
    />
  )
}

export default ScrollPositionBar
