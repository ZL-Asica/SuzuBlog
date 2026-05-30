'use client'

import type {
  ComponentPropsWithoutRef,
  CSSProperties,
  FocusEvent,
  MouseEvent,
  ReactNode,
  RefObject,
} from 'react'
import { CornerUpLeft } from 'lucide-react'
import { useCallback, useEffect, useId, useRef, useState } from 'react'

/**
 * Inline tooltip primitives for Markdown-only affordances.
 *
 * Native `title` tooltips are intentionally avoided here because they are
 * delayed, cannot be styled, and do not provide predictable keyboard behavior.
 */

interface MarkdownAbbreviationProps extends ComponentPropsWithoutRef<'abbr'> {
  children?: ReactNode
  node?: unknown
}

interface MarkdownFootnoteReferenceProps extends ComponentPropsWithoutRef<'a'> {
  'children'?: ReactNode
  'data-footnote-preview'?: string
  'data-footnote-ref'?: boolean | string
  'node'?: unknown
}

interface MarkdownFootnoteBackReferenceProps extends ComponentPropsWithoutRef<'a'> {
  'children'?: ReactNode
  'data-footnote-backref'?: boolean | string
  'node'?: unknown
}

const cx = (...classes: Array<string | undefined | false | null>) => {
  return classes.filter(Boolean).join(' ')
}

const TOOLTIP_VIEWPORT_PADDING = 16
const TOOLTIP_GAP = 8
const COMPACT_TOOLTIP_BREAKPOINT = 640
const MINIMUM_TOP_SPACE_FOR_ABOVE_TOOLTIP = 96

interface TooltipPosition {
  left: number
  maxHeight?: number
  placement: 'above' | 'below'
  top: number
  width?: string
}

const decodeHashId = (hash: string): string => {
  const rawId = hash.replace(/^#/, '')

  try {
    return decodeURIComponent(rawId)
  }
  catch {
    return rawId
  }
}

const getFootnoteText = (hash: string): string => {
  const id = decodeHashId(hash)

  return document.getElementById(id)?.textContent?.replaceAll('↩', '').replaceAll(/\s+/g, ' ').trim() ?? ''
}

const getPreviewText = (
  href: string,
  fallback: string,
): string => {
  const domPreview = href.startsWith('#') ? getFootnoteText(href) : ''

  return domPreview !== '' ? domPreview : fallback
}

const scrollToHashTarget = (hash: string) => {
  const id = decodeHashId(hash)
  const target = document.getElementById(id)

  if (target == null) {
    return
  }

  target.setAttribute('tabindex', '-1')
  target.scrollIntoView({ block: 'start', behavior: 'smooth' })
  target.focus({ preventScroll: true })
  window.history.replaceState(null, '', `#${id}`)
}

const getTooltipPosition = (
  trigger: HTMLElement,
  tooltip: HTMLElement,
  maxWidth: number,
): TooltipPosition => {
  const rect = trigger.getBoundingClientRect()
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight
  const tooltipWidth = Math.min(maxWidth, viewportWidth - TOOLTIP_VIEWPORT_PADDING * 2)
  const tooltipHeight = tooltip.getBoundingClientRect().height

  if (viewportWidth < COMPACT_TOOLTIP_BREAKPOINT) {
    const maxHeight = viewportHeight - TOOLTIP_VIEWPORT_PADDING * 2

    return {
      left: TOOLTIP_VIEWPORT_PADDING,
      maxHeight,
      placement: 'below',
      top: Math.max(TOOLTIP_VIEWPORT_PADDING, viewportHeight - Math.min(tooltipHeight, maxHeight) - TOOLTIP_VIEWPORT_PADDING),
      width: `calc(100vw - ${TOOLTIP_VIEWPORT_PADDING * 2}px)`,
    }
  }

  const centeredLeft = rect.left + rect.width / 2 - tooltipWidth / 2
  const left = Math.min(
    Math.max(centeredLeft, TOOLTIP_VIEWPORT_PADDING),
    viewportWidth - tooltipWidth - TOOLTIP_VIEWPORT_PADDING,
  )
  const spaceAbove = rect.top - TOOLTIP_VIEWPORT_PADDING
  const spaceBelow = viewportHeight - rect.bottom - TOOLTIP_VIEWPORT_PADDING
  const canFitAbove = spaceAbove >= tooltipHeight + TOOLTIP_GAP
  const canFitBelow = spaceBelow >= tooltipHeight + TOOLTIP_GAP
  const placement = canFitAbove || (!canFitBelow && spaceAbove >= MINIMUM_TOP_SPACE_FOR_ABOVE_TOOLTIP)
    ? 'above'
    : 'below'
  const availableHeight = placement === 'above'
    ? rect.top - TOOLTIP_VIEWPORT_PADDING - TOOLTIP_GAP
    : viewportHeight - rect.bottom - TOOLTIP_VIEWPORT_PADDING - TOOLTIP_GAP
  const maxHeight = Math.max(availableHeight, 0)
  const renderedHeight = Math.min(tooltipHeight, maxHeight)
  const unclampedTop = placement === 'above'
    ? rect.top - renderedHeight - TOOLTIP_GAP
    : rect.bottom + TOOLTIP_GAP
  const top = Math.min(
    Math.max(unclampedTop, TOOLTIP_VIEWPORT_PADDING),
    viewportHeight - renderedHeight - TOOLTIP_VIEWPORT_PADDING,
  )

  return {
    left,
    maxHeight,
    placement,
    top,
  }
}

const getTooltipStyle = (
  position: TooltipPosition | null,
  maxWidth: number,
): CSSProperties => {
  const baseStyle: CSSProperties = {
    maxHeight: position?.maxHeight,
    maxWidth: `min(${maxWidth}px, calc(100vw - ${TOOLTIP_VIEWPORT_PADDING * 2}px))`,
    width: position?.width,
  }

  if (position == null) {
    return baseStyle
  }

  return {
    ...baseStyle,
    left: position.left,
    top: position.top,
  }
}

const useTooltipPosition = (
  triggerRef: RefObject<HTMLElement | null>,
  tooltipRef: RefObject<HTMLElement | null>,
  maxWidth: number,
) => {
  const [position, setPosition] = useState<TooltipPosition | null>(null)

  const updatePosition = useCallback(() => {
    const trigger = triggerRef.current
    const tooltip = tooltipRef.current

    if (trigger == null || tooltip == null) {
      return
    }

    setPosition(getTooltipPosition(trigger, tooltip, maxWidth))
  }, [maxWidth, tooltipRef, triggerRef])

  useEffect(() => {
    let frame = 0

    const schedulePositionUpdate = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(updatePosition)
    }

    updatePosition()
    window.addEventListener('resize', schedulePositionUpdate)
    window.addEventListener('scroll', schedulePositionUpdate, true)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', schedulePositionUpdate)
      window.removeEventListener('scroll', schedulePositionUpdate, true)
    }
  }, [updatePosition])

  return {
    position,
    updatePosition,
  }
}

export function MarkdownAbbreviation({
  children,
  className,
  node: _node,
  title,
  ...props
}: MarkdownAbbreviationProps) {
  const explanation = typeof title === 'string' ? title : undefined
  const label = children?.toString() ?? ''
  const tooltipId = useId()
  const triggerRef = useRef<HTMLElement>(null)
  const tooltipRef = useRef<HTMLSpanElement>(null)
  const { position, updatePosition } = useTooltipPosition(triggerRef, tooltipRef, 256)

  return (
    <span className="group/abbr relative inline-flex items-baseline">
      <abbr
        {...props}
        ref={triggerRef}
        className={cx(
          'cursor-help rounded px-0.5 font-semibold text-primary underline decoration-primary-300/70 decoration-dotted underline-offset-4',
          'outline-none transition-colors hover:bg-primary-300/10 focus-visible:bg-primary-300/10 focus-visible:ring-2 focus-visible:ring-primary-300',
          'dark:decoration-primary-200/70 dark:hover:bg-primary-200/10 dark:focus-visible:bg-primary-200/10',
          className,
        )}
        aria-label={explanation != null ? `${label}: ${explanation}` : label}
        aria-describedby={explanation != null ? tooltipId : undefined}
        onFocus={(event) => {
          updatePosition()
          props.onFocus?.(event)
        }}
        onClick={(event) => {
          updatePosition()
          props.onClick?.(event)
        }}
        onMouseEnter={(event) => {
          updatePosition()
          props.onMouseEnter?.(event)
        }}
        onPointerEnter={(event) => {
          updatePosition()
          props.onPointerEnter?.(event)
        }}
        tabIndex={0}
      >
        {children}
      </abbr>
      {explanation != null && (
        <span
          className="ml-0.5 align-super text-[0.6em] font-bold leading-none text-primary-500/80 dark:text-primary-200/80"
          aria-hidden="true"
        >
          ?
        </span>
      )}

      {explanation != null && (
        <span
          id={tooltipId}
          ref={tooltipRef}
          data-ready={position != null}
          data-placement={position?.placement ?? 'above'}
          className={cx(
            'markdown-tooltip-surface',
            'pointer-events-none z-40 w-max rounded-md border border-primary-300/40',
            position == null ? 'absolute bottom-full left-0 mb-2' : 'fixed',
            'bg-background px-3 py-2 text-xs font-medium leading-relaxed text-gray-800 shadow-lg shadow-primary-950/10',
            'dark:border-primary-200/40 dark:text-gray-100',
          )}
          role="tooltip"
          style={getTooltipStyle(position, 256)}
        >
          {explanation}
        </span>
      )}
    </span>
  )
}

export function MarkdownFootnoteReference({
  children,
  className,
  'data-footnote-preview': staticPreview = '',
  href = '#',
  node: _node,
  ...props
}: MarkdownFootnoteReferenceProps) {
  const label = children?.toString() ?? ''
  const tooltipId = useId()
  const triggerRef = useRef<HTMLAnchorElement>(null)
  const tooltipRef = useRef<HTMLSpanElement>(null)
  const [preview, setPreview] = useState(staticPreview)
  const { position, updatePosition } = useTooltipPosition(triggerRef, tooltipRef, 288)
  const hasPreview = preview !== ''

  useEffect(() => {
    if (href.startsWith('#')) {
      setPreview(getPreviewText(href, staticPreview))
    }
  }, [href, staticPreview])

  const updatePreview = () => {
    setPreview(getPreviewText(href, staticPreview))
    updatePosition()
    requestAnimationFrame(updatePosition)
  }

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith('#')) {
      event.preventDefault()
      scrollToHashTarget(href)
    }
  }

  const handleFocus = (_event: FocusEvent<HTMLAnchorElement>) => {
    updatePreview()
  }

  return (
    <span className="group/footnote relative inline-flex items-center align-super">
      <a
        {...props}
        ref={triggerRef}
        href={href}
        className={cx(
          'mx-0.5 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-primary-300/20 px-1.5 text-xs font-semibold text-primary-500',
          'transition-colors hover:bg-primary-300/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
          'dark:bg-primary-200/15 dark:text-primary-200 dark:hover:bg-primary-200/25',
          className,
        )}
        aria-label={`Jump to footnote ${label}`}
        aria-describedby={hasPreview ? tooltipId : undefined}
        onClick={handleClick}
        onFocus={handleFocus}
        onMouseEnter={updatePreview}
        onPointerEnter={updatePreview}
      >
        {children}
      </a>

      {hasPreview && (
        <span
          id={tooltipId}
          ref={tooltipRef}
          data-ready={position != null}
          data-placement={position?.placement ?? 'above'}
          className={cx(
            'markdown-tooltip-surface',
            'pointer-events-none z-40 w-max rounded-md border border-primary-300/40',
            position == null ? 'absolute bottom-full left-0 mb-2' : 'fixed',
            'bg-background px-3 py-2 text-left text-xs font-medium leading-relaxed text-gray-800 shadow-lg shadow-primary-950/10',
            'dark:border-primary-200/40 dark:text-gray-100',
          )}
          role="tooltip"
          style={getTooltipStyle(position, 288)}
        >
          {preview}
        </span>
      )}
    </span>
  )
}

export function MarkdownFootnoteBackReference({
  children: _children,
  className,
  href = '#',
  node: _node,
  ...props
}: MarkdownFootnoteBackReferenceProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith('#')) {
      event.preventDefault()
      scrollToHashTarget(href)
    }
  }

  return (
    <a
      {...props}
      href={href}
      className={cx(
        'ml-2 inline-flex min-h-7 min-w-7 items-center justify-center rounded-full border border-primary-300/30 bg-primary-300/10 text-primary',
        'transition-colors hover:bg-primary-300/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        'dark:border-primary-200/30 dark:bg-primary-200/10 dark:hover:bg-primary-200/20',
        className,
      )}
      aria-label="Back to footnote reference"
      onClick={handleClick}
    >
      <CornerUpLeft className="h-4 w-4" aria-hidden="true" />
    </a>
  )
}
