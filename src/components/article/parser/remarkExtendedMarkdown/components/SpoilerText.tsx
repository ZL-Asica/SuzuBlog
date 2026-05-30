'use client'

import type { ComponentPropsWithoutRef, KeyboardEvent } from 'react'
import { useState } from 'react'

type SpoilerTextProps = ComponentPropsWithoutRef<'span'>

const SpoilerText = ({
  children,
  className = '',
  onClick,
  onKeyDown,
  ...props
}: SpoilerTextProps) => {
  const [revealed, setRevealed] = useState(false)

  const toggle = () => {
    setRevealed(value => !value)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLSpanElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      toggle()
    }

    onKeyDown?.(event)
  }

  return (
    <span
      {...props}
      role="button"
      tabIndex={0}
      aria-pressed={revealed}
      aria-label={revealed ? 'Hide spoiler' : 'Reveal spoiler'}
      onClick={(event) => {
        toggle()
        onClick?.(event)
      }}
      onKeyDown={handleKeyDown}
      className={[
        'mx-0.5 inline cursor-pointer rounded px-1 transition-all duration-200',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        revealed
          ? 'select-text bg-primary-300/15 text-inherit hover:bg-primary-300/25 dark:bg-primary-200/10 dark:hover:bg-primary-200/20'
          : 'select-none bg-slate-400/35 text-transparent hover:bg-primary-300/45 dark:bg-slate-200/20 dark:hover:bg-primary-200/30',
        className,
      ].join(' ')}
    >
      <span aria-hidden={!revealed}>
        {children}
      </span>
    </span>
  )
}

export default SpoilerText
