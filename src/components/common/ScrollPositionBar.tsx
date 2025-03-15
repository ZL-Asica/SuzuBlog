'use client'

import { useScrollPosition } from '@zl-asica/react'

const ScrollPositionBar = () => {
  const scrollProgress = useScrollPosition(undefined, true)
  return (
    <div
      className="fixed left-0 top-0 z-60 h-1.5 w-full bg-primary-300 transition-transform-500 dark:bg-primary-400 rounded-r-lg lg:h-1"
      style={{ width: `${scrollProgress}%` }}
      aria-hidden
    />
  )
}

export default ScrollPositionBar
