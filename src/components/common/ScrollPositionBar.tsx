'use client'

import { useScrollPosition } from '@zl-asica/react'
import { useEffect, useState } from 'react'

const ScrollPositionBar = () => {
  const [isClient, setIsClient] = useState(false)
  const scrollProgress = useScrollPosition(undefined, true)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // 服务器端渲染时不显示进度条，避免hydration不匹配
  if (!isClient) {
    return null
  }

  return (
    <div
      className="fixed left-0 top-0 z-60 h-1.5 w-full bg-primary transition-transform-500 rounded-r-lg lg:h-1"
      style={{ width: `${scrollProgress}%` }}
      aria-hidden
    />
  )
}

export default ScrollPositionBar
