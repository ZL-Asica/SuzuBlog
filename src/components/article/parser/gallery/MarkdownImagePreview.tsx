'use client'

import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { CustomImage } from '@/components/ui'

const CLOSE_ANIMATION_MS = 320
const MIN_ZOOM = 1
const MAX_ZOOM = 4

interface PreviewItem {
  alt: string
  height: number
  src: string
  width: number
}

interface PreviewState {
  direction: 'next' | 'previous'
  index: number
  items: PreviewItem[]
}

const wrapIndex = (index: number, total: number): number => {
  return (index + total) % total
}

const getGalleryItems = (button: HTMLButtonElement): { index: number, items: PreviewItem[] } => {
  const gallery = button.closest<HTMLElement>('[data-gallery-mode]')
  const buttons = Array.from(
    gallery?.querySelectorAll<HTMLButtonElement>('button[data-markdown-image-preview]') ?? [button],
  ).sort((first, second) => {
    const firstIndex = Number(first.closest<HTMLElement>('[data-gallery-index]')?.dataset.galleryIndex)
    const secondIndex = Number(second.closest<HTMLElement>('[data-gallery-index]')?.dataset.galleryIndex)
    return (Number.isNaN(firstIndex) ? 0 : firstIndex) - (Number.isNaN(secondIndex) ? 0 : secondIndex)
  })

  const items = buttons.map((item) => {
    const image = item.querySelector<HTMLImageElement>('img')
    return {
      src: item.dataset.markdownImageSrc ?? image?.currentSrc ?? image?.src ?? '',
      alt: image?.alt == null || image.alt === '' ? 'Image preview' : image.alt,
      width: Math.max(image?.naturalWidth ?? 0, Number(image?.getAttribute('width') ?? 1200), 1),
      height: Math.max(image?.naturalHeight ?? 0, Number(image?.getAttribute('height') ?? 800), 1),
    }
  })

  return {
    index: Math.max(0, buttons.indexOf(button)),
    items,
  }
}

export function MarkdownImagePreview() {
  const [preview, setPreview] = useState<PreviewState | null>(null)
  const [portalReady, setPortalReady] = useState(false)
  const [visible, setVisible] = useState(false)
  const [zoom, setZoom] = useState(MIN_ZOOM)
  const closeTimerRef = useRef<number | null>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setPortalReady(true)
  }, [])

  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.post-content')
    if (root == null) {
      return
    }

    const handleClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null
      const button = target?.closest<HTMLButtonElement>('button[data-markdown-image-preview]')

      if (button == null || !root.contains(button)) {
        return
      }

      event.preventDefault()
      event.stopPropagation()
      if (closeTimerRef.current != null) {
        window.clearTimeout(closeTimerRef.current)
        closeTimerRef.current = null
      }
      const gallery = getGalleryItems(button)
      triggerRef.current = button
      setVisible(false)
      setZoom(MIN_ZOOM)
      setPreview({ ...gallery, direction: 'next' })
    }

    document.addEventListener('click', handleClick, true)
    return () => document.removeEventListener('click', handleClick, true)
  }, [])

  useEffect(() => {
    if (preview == null) {
      return
    }

    const frame = requestAnimationFrame(() => setVisible(true))

    return () => cancelAnimationFrame(frame)
  }, [preview?.items])

  useEffect(() => {
    setZoom(MIN_ZOOM)
  }, [preview?.index])

  useEffect(() => {
    if (preview == null) {
      return
    }

    const scrollX = window.scrollX
    const scrollY = window.scrollY
    const restorePagePosition = () => {
      if (window.scrollX !== scrollX || window.scrollY !== scrollY) {
        window.scrollTo({ left: scrollX, top: scrollY, behavior: 'auto' })
      }
    }

    window.addEventListener('scroll', restorePagePosition, { passive: true })
    return () => window.removeEventListener('scroll', restorePagePosition)
  }, [preview])

  useEffect(() => {
    if (!visible) {
      return
    }

    closeButtonRef.current?.focus({ preventScroll: true })
  }, [visible])

  useEffect(() => {
    return () => {
      if (closeTimerRef.current != null) {
        window.clearTimeout(closeTimerRef.current)
      }
    }
  }, [])

  if (preview == null || !portalReady) {
    return null
  }

  const item = preview.items[preview.index]
  const hasNavigation = preview.items.length > 1

  const closePreview = () => {
    setVisible(false)
    if (closeTimerRef.current != null) {
      window.clearTimeout(closeTimerRef.current)
    }

    closeTimerRef.current = window.setTimeout(() => {
      setPreview(null)
      triggerRef.current?.focus({ preventScroll: true })
      triggerRef.current = null
      closeTimerRef.current = null
    }, CLOSE_ANIMATION_MS)
  }

  const move = (delta: number) => {
    setPreview(current => current == null
      ? current
      : {
          ...current,
          direction: delta > 0 ? 'next' : 'previous',
          index: wrapIndex(current.index + delta, current.items.length),
        })
  }

  const changeZoom = (delta: number) => {
    setZoom(current => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, current + delta)))
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      closePreview()
      return
    }

    if (hasNavigation && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
      event.preventDefault()
      move(event.key === 'ArrowRight' ? 1 : -1)
      return
    }

    if (event.key === '+' || event.key === '=') {
      event.preventDefault()
      changeZoom(0.25)
      return
    }

    if (event.key === '-') {
      event.preventDefault()
      changeZoom(-0.25)
      return
    }

    if (event.key === '0') {
      event.preventDefault()
      setZoom(MIN_ZOOM)
    }
  }

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    event.preventDefault()
    changeZoom(-event.deltaY * 0.002)
  }

  const overlay = (
    <div
      className="markdown-image-preview fixed inset-0 z-[2147483647] flex min-h-dvh items-center justify-center bg-black/80 p-4 backdrop-blur-sm sm:p-6"
      data-visible={visible}
      role="dialog"
      aria-modal="true"
      aria-label={`Image preview: ${item.alt}`}
      onClick={event => event.target === event.currentTarget && closePreview()}
      onKeyDown={handleKeyDown}
      onWheelCapture={event => event.preventDefault()}
    >
      <button
        ref={closeButtonRef}
        type="button"
        className="fixed right-4 top-4 z-20 inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-primary-300 text-secondary-900 shadow-lg transition duration-150 ease-[var(--markdown-ease)] hover:scale-105 hover:bg-primary-400 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-200 sm:right-6 sm:top-6"
        aria-label="Close image preview"
        onClick={closePreview}
      >
        <X className="h-5 w-5" aria-hidden="true" />
      </button>

      <div className="markdown-image-preview-frame relative flex h-full w-full max-w-6xl items-center justify-center">
        {hasNavigation && (
          <>
            <button
              type="button"
              className="markdown-image-preview-nav left-2 sm:-left-14"
              aria-label="Previous image"
              onClick={() => move(-1)}
            >
              <ChevronLeft className="h-6 w-6" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="markdown-image-preview-nav right-2 sm:-right-14"
              aria-label="Next image"
              onClick={() => move(1)}
            >
              <ChevronRight className="h-6 w-6" aria-hidden="true" />
            </button>
          </>
        )}

        <div
          className="markdown-image-preview-image-shell"
          data-visible={visible}
          onWheel={handleWheel}
          onDoubleClick={() => setZoom(current => current === MIN_ZOOM ? 2 : MIN_ZOOM)}
        >
          <div
            className="markdown-image-preview-image-zoom"
            data-zoom={zoom}
            style={{ transform: `scale(${zoom})` }}
          >
            <CustomImage
              key={`${preview.index}-${item.src}`}
              className={`markdown-image-preview-image max-h-[calc(100dvh-7rem)] max-w-full rounded-md object-contain shadow-2xl${preview.direction === 'previous' ? ' markdown-image-preview-image--previous' : ''}`}
              src={item.src}
              alt={item.alt}
              width={item.width}
              height={item.height}
              priority={false}
            />
          </div>
        </div>
        <div className="markdown-image-preview-caption" aria-live="polite">
          <span className="max-w-3xl text-center text-sm leading-relaxed text-white/85">{item.alt}</span>
          {hasNavigation && (
            <span className="text-xs tabular-nums text-white/70">
              {preview.index + 1}
              {' / '}
              {preview.items.length}
            </span>
          )}
        </div>
      </div>
    </div>
  )

  return createPortal(overlay, document.body)
}
