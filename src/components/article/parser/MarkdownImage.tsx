'use client'

import type { CSSProperties, KeyboardEvent, MouseEvent } from 'react'
import { X, ZoomIn } from 'lucide-react'
import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { CustomImage } from '@/components/ui'

/**
 * Markdown image renderer with Discourse-style layout metadata.
 *
 * Alt text may include a metadata suffix, for example:
 * `![Alt text|640x360, wide](/image.jpg)`.
 */

type ImageLayout = 'center' | 'full' | 'left' | 'right' | 'thumbnail' | 'wide'

interface ImageMeta {
  alt: string
  height: number
  layout: ImageLayout
  width: number
  widthPercent?: number
}

interface MarkdownImageProps {
  alt?: string
  src?: string | Blob
}

const DEFAULT_IMAGE_META: ImageMeta = {
  alt: 'Image',
  height: 700,
  layout: 'center',
  width: 500,
}

const IMAGE_LAYOUTS = new Set<ImageLayout>([
  'center',
  'full',
  'left',
  'right',
  'thumbnail',
  'wide',
])

const parseImageMeta = (rawAlt: string): ImageMeta => {
  const [label = '', rawMeta = ''] = rawAlt.split('|', 2)
  const meta: ImageMeta = {
    ...DEFAULT_IMAGE_META,
    alt: label.trim() || DEFAULT_IMAGE_META.alt,
  }

  if (rawMeta.trim() === '') {
    return meta
  }

  for (const token of rawMeta.split(',')) {
    const value = token.trim().toLowerCase()
    const dimensionMatch = /^(\d{1,5})x(\d{1,5})$/.exec(value)
    const percentMatch = /^(\d{1,3})%$/.exec(value)

    if (dimensionMatch != null) {
      meta.width = Number(dimensionMatch[1])
      meta.height = Number(dimensionMatch[2])
      continue
    }

    if (percentMatch != null) {
      meta.widthPercent = Math.min(Number(percentMatch[1]), 100)
      continue
    }

    if (IMAGE_LAYOUTS.has(value as ImageLayout)) {
      meta.layout = value as ImageLayout
    }
  }

  return meta
}

const getWrapperClassName = (layout: ImageLayout): string => {
  const baseClassName = 'my-6 block max-w-full break-words'

  switch (layout) {
    case 'full':
      return `${baseClassName} relative left-1/2 -ml-[50vw] w-screen px-4 sm:px-6`
    case 'left':
      return `${baseClassName} mb-4 max-w-full sm:float-left sm:mr-4 sm:max-w-[50%]`
    case 'right':
      return `${baseClassName} mb-4 max-w-full sm:float-right sm:ml-4 sm:max-w-[50%]`
    case 'thumbnail':
      return `${baseClassName} inline-block max-w-48 align-middle`
    case 'wide':
      return `${baseClassName} mx-auto w-full max-w-5xl`
    case 'center':
    default:
      return `${baseClassName} mx-auto text-center`
  }
}

const getImageClassName = (layout: ImageLayout): string => {
  const baseClassName
    = 'relative h-auto max-h-[500px] max-w-full rounded-md object-contain shadow-md transition duration-200 group-hover/image:scale-[1.01] group-hover/image:shadow-lg lg:max-h-[700px] xl:max-h-[800px]'

  if (layout === 'thumbnail') {
    return `${baseClassName} w-full min-w-0`
  }

  if (layout === 'full' || layout === 'wide') {
    return `${baseClassName} mx-auto w-full`
  }

  return `${baseClassName} mx-auto w-auto min-w-[200px] lg:min-w-[300px] xl:min-w-[400px]`
}

const getButtonClassName = (layout: ImageLayout): string => {
  const baseClassName
    = 'group/image relative inline-flex max-w-full cursor-zoom-in overflow-hidden rounded-md align-middle outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2 focus-visible:ring-offset-background'

  if (layout === 'full' || layout === 'wide') {
    return `${baseClassName} w-full justify-center`
  }

  return `${baseClassName} justify-center`
}

const getWrapperStyle = (meta: ImageMeta): CSSProperties | undefined => {
  if (meta.widthPercent == null) {
    return undefined
  }

  return {
    width: `${meta.widthPercent}%`,
  }
}

export function MarkdownImage({
  alt = 'Image',
  src = '',
}: MarkdownImageProps) {
  const meta = parseImageMeta(alt)
  const imageSrc = typeof src === 'string' ? src : ''
  const dialogTitleId = useId()
  const triggerButtonRef = useRef<HTMLButtonElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const shouldRestoreFocusRef = useRef(false)
  const [canUsePortal, setCanUsePortal] = useState(false)
  const [isPreviewMounted, setIsPreviewMounted] = useState(false)
  const [isPreviewVisible, setIsPreviewVisible] = useState(false)
  const showCaption = meta.alt !== DEFAULT_IMAGE_META.alt

  useEffect(() => {
    setCanUsePortal(true)
  }, [])

  const closePreview = useCallback(() => {
    if (closeTimerRef.current != null) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }

    setIsPreviewVisible(false)
    shouldRestoreFocusRef.current = true

    closeTimerRef.current = setTimeout(() => {
      setIsPreviewMounted(false)
      closeTimerRef.current = null
    }, 220)
  }, [])

  const openPreview = () => {
    if (closeTimerRef.current != null) {
      clearTimeout(closeTimerRef.current)
    }

    setIsPreviewMounted(true)
    window.requestAnimationFrame(() => setIsPreviewVisible(true))
  }

  const handleCloseButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    closePreview()
  }

  useEffect(() => {
    return () => {
      if (closeTimerRef.current != null) {
        clearTimeout(closeTimerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (isPreviewMounted || !shouldRestoreFocusRef.current) {
      return
    }

    shouldRestoreFocusRef.current = false
    triggerButtonRef.current?.focus({ preventScroll: true })
  }, [isPreviewMounted])

  useEffect(() => {
    if (!isPreviewMounted) {
      return
    }

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        closePreview()
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus({ preventScroll: true })
    })

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [closePreview, isPreviewMounted])

  const handleImageKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      openPreview()
    }
  }

  const previewOverlay = isPreviewMounted
    ? (
        <span
          className={[
            'fixed inset-0 z-[9999] flex min-h-dvh items-center justify-center bg-black/80 p-4 backdrop-blur-sm transition-opacity duration-200 sm:p-6',
            isPreviewVisible ? 'opacity-100' : 'opacity-0',
          ].join(' ')}
          role="dialog"
          aria-modal="true"
          aria-labelledby={dialogTitleId}
          onClick={closePreview}
        >
          <span
            className={[
              'relative flex max-h-full w-full max-w-6xl flex-col items-center gap-3 transition-transform duration-300 ease-out',
              isPreviewVisible ? 'scale-100' : 'scale-95',
            ].join(' ')}
            onClick={event => event.stopPropagation()}
          >
            <span id={dialogTitleId} className="sr-only">
              Image preview:
              {' '}
              {meta.alt}
            </span>
            <button
              ref={closeButtonRef}
              type="button"
              className="absolute right-2 top-2 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/65 text-white transition-colors hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Close image preview"
              onClick={handleCloseButtonClick}
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
            <span
              className="flex max-h-[85dvh] max-w-full items-center justify-center"
              onClick={event => event.stopPropagation()}
            >
              <CustomImage
                src={imageSrc}
                alt={meta.alt}
                width={meta.width}
                height={meta.height}
                priority={false}
                className="max-h-[85dvh] max-w-full rounded-md object-contain shadow-2xl"
              />
            </span>
            {showCaption && (
              <span className="max-w-3xl text-center text-sm leading-relaxed text-white/85">
                {meta.alt}
              </span>
            )}
          </span>
        </span>
      )
    : null

  return (
    <span
      className={getWrapperClassName(meta.layout)}
      data-markdown-image=""
      data-markdown-image-layout={meta.layout}
      role="figure"
      aria-label={showCaption ? meta.alt : undefined}
      style={getWrapperStyle(meta)}
    >
      <button
        ref={triggerButtonRef}
        type="button"
        className={getButtonClassName(meta.layout)}
        data-markdown-image-preview=""
        data-markdown-image-hydrated={canUsePortal ? '' : undefined}
        aria-label={`Open image preview: ${meta.alt}`}
        onClick={openPreview}
        onKeyDown={handleImageKeyDown}
      >
        <CustomImage
          src={imageSrc}
          alt={meta.alt}
          width={meta.width}
          height={meta.height}
          priority={false}
          className={getImageClassName(meta.layout)}
        />
        <span
          className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/55 text-white opacity-0 shadow-sm transition-opacity group-hover/image:opacity-100 group-focus-visible/image:opacity-100"
          aria-hidden="true"
        >
          <ZoomIn className="h-4 w-4" />
        </span>
      </button>

      {showCaption && (
        <span className="mt-2 block text-center text-sm leading-relaxed text-gray-500 dark:text-gray-400">
          {meta.alt}
        </span>
      )}

      {canUsePortal && previewOverlay != null
        ? createPortal(previewOverlay, document.body)
        : null}
    </span>
  )
}
