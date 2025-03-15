'use client'

import { useEffect, useRef, useState } from 'react'

interface NotesProps {
  text: string
  isMobile: boolean
  showNotes: boolean
}

const Notes = ({ text, isMobile, showNotes }: NotesProps) => {
  const [offsetX, setOffsetX] = useState<string>('-translate-x-1/2')
  const [triangleOffset, setTriangleOffset] = useState<string>('left-1/2 -ml-2') // Default center
  const noteRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updatePosition = () => {
      if (noteRef.current) {
        const rect = noteRef.current.getBoundingClientRect()
        const screenWidth = window.innerWidth

        if (rect.right > screenWidth) { // Overflow on the right
          setOffsetX(`-translate-x-full`)
          setTriangleOffset('right-4')
        }
        else if (rect.left < 0) { // Overflow on the left
          setOffsetX(`translate-x-0`)
          setTriangleOffset('left-4')
        }
        else {
          setOffsetX('-translate-x-1/2')
          setTriangleOffset('left-1/2 -ml-2')
        }
      }
    }

    updatePosition()

    window.addEventListener('resize', updatePosition)
    return () => {
      window.removeEventListener('resize', updatePosition)
    }
  }, [])

  return (
    <div
      ref={noteRef}
      className={`absolute left-1/2 top-0 z-50 w-max max-w-[300px] ${offsetX} 
                  -translate-y-full rounded-xl bg-black/90 p-4 text-white shadow-lg 
                  transition-opacity-300 ${
    isMobile ? 'opacity-0 pointer-events-auto' : 'opacity-0 group-hover:opacity-100 pointer-events-none'
    }`}
      style={{ opacity: isMobile && showNotes ? 1 : undefined }}
    >
      <p className="text-base font-medium text-left whitespace-pre-wrap">
        {text}
      </p>
      <div className={`absolute ${triangleOffset} top-full w-4 h-4 rotate-45 bg-black/90`} />
    </div>
  )
}

export default Notes
