'use client'

import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

const MAX_CAROUSEL_DOTS = 10

interface MarkdownCarouselProps extends ComponentPropsWithoutRef<'div'> {
  items: ReactNode[]
}

const wrapIndex = (index: number, total: number): number => {
  return (index + total) % total
}

export function MarkdownCarousel({ items, className, ...props }: MarkdownCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const total = items.length

  if (total === 0) {
    return null
  }

  const moveTo = (index: number | ((current: number) => number)) => {
    setActiveIndex((current) => {
      const nextIndex = typeof index === 'function' ? index(current) : index
      return wrapIndex(nextIndex, total)
    })
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
      return
    }

    event.preventDefault()
    moveTo(current => current + (event.key === 'ArrowRight' ? 1 : -1))
  }

  return (
    <div
      {...props}
      className={['markdown-gallery-carousel clear-both my-8 max-w-full', className].filter(Boolean).join(' ')}
      data-gallery-mode="carousel"
      data-carousel-current-index={activeIndex}
      role="region"
      aria-roledescription="carousel"
      aria-label="Image carousel"
    >
      <div
        className="markdown-gallery-carousel-track"
        tabIndex={total > 1 ? 0 : undefined}
        data-carousel-track=""
        onKeyDown={handleKeyDown}
      >
        <div
          className="markdown-gallery-carousel-track-inner"
          data-carousel-track-inner=""
          style={{ transform: `translate3d(-${activeIndex * 100}%, 0, 0)` }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className="markdown-gallery-carousel-slide [&>p]:m-0!"
              data-carousel-slide=""
              data-gallery-index={index}
              aria-hidden={index !== activeIndex}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {total > 1 && (
        <div className="markdown-gallery-carousel-controls">
          <button
            type="button"
            className="markdown-gallery-carousel-nav"
            aria-label="Previous image"
            onClick={() => moveTo(current => current - 1)}
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          {total <= MAX_CAROUSEL_DOTS
            ? (
                <div className="markdown-gallery-carousel-dots" aria-label="Choose image">
                  {items.map((_item, index) => (
                    <button
                      key={index}
                      type="button"
                      className="markdown-gallery-carousel-dot"
                      aria-label={`Show image ${index + 1}`}
                      aria-current={index === activeIndex ? 'true' : undefined}
                      onClick={() => moveTo(index)}
                    />
                  ))}
                </div>
              )
            : (
                <span className="markdown-gallery-carousel-counter" aria-live="polite">
                  {`${activeIndex + 1} / ${total}`}
                </span>
              )}
          <button
            type="button"
            className="markdown-gallery-carousel-nav"
            aria-label="Next image"
            onClick={() => moveTo(current => current + 1)}
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  )
}
