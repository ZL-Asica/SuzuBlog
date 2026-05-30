import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { Children } from 'react'

interface MarkdownGalleryProps extends ComponentPropsWithoutRef<'div'> {
  'children'?: ReactNode
  'data-gallery-mode'?: 'grid'
  'node'?: unknown
}

const cx = (...classes: Array<string | undefined | false | null>) => {
  return classes.filter(Boolean).join(' ')
}

/**
 * Renders Discourse-style image grids from extended Markdown `[grid]` blocks.
 */
export function MarkdownGallery({
  children,
  className,
  node: _node,
  'data-gallery-mode': _mode = 'grid',
  ...props
}: MarkdownGalleryProps) {
  const items = Children.toArray(children).filter(Boolean)

  return (
    <div
      {...props}
      className={cx(
        'markdown-gallery-grid clear-both my-8 max-w-full',
        className,
      )}
      data-gallery-mode="grid"
    >
      {items.map((item, index) => (
        // Markdown children do not expose stable keys, so source order is the
        // canonical identity inside a static post.
        <div key={index} className="markdown-gallery-item [&>p]:!m-0">
          {item}
        </div>
      ))}
    </div>
  )
}
