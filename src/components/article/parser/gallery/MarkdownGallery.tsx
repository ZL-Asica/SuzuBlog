import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { Children, isValidElement } from 'react'
import { MarkdownCarousel } from './MarkdownCarousel'
import { MarkdownGrid } from './MarkdownGrid'

type GalleryMode = 'carousel' | 'grid'

interface MarkdownGalleryProps extends ComponentPropsWithoutRef<'div'> {
  'children'?: ReactNode
  'data-gallery-mode'?: GalleryMode
  'node'?: unknown
}

const cx = (...classes: Array<string | undefined | false | null>) => {
  return classes.filter(Boolean).join(' ')
}

const collectGalleryItems = (children: ReactNode): ReactNode[] => {
  const items: ReactNode[] = []

  const collect = (node: ReactNode) => {
    for (const child of Children.toArray(node)) {
      if (!isValidElement(child)) {
        continue
      }

      const elementProps = child.props as {
        'children'?: ReactNode
        'data-markdown-image'?: string
      }

      if (elementProps['data-markdown-image'] != null) {
        items.push(child)
        continue
      }

      // ReactMarkdown wraps adjacent image renderers in a paragraph.
      if (elementProps.children == null) {
        items.push(child)
        continue
      }

      collect(elementProps.children)
    }
  }

  collect(children)

  return items
}

const getGridColumnCount = (itemCount: number): number => {
  if (itemCount < 2) {
    return 1
  }

  return itemCount <= 5 ? 2 : 3
}

export function MarkdownGallery({
  children,
  className,
  node: _node,
  'data-gallery-mode': mode = 'grid',
  ...props
}: MarkdownGalleryProps) {
  const items = collectGalleryItems(children)

  if (mode === 'carousel') {
    return <MarkdownCarousel {...props} className={cx(className)} items={items} />
  }

  const columnCount = getGridColumnCount(items.length)

  return <MarkdownGrid {...props} className={cx(className)} items={items} columnCount={columnCount} />
}
