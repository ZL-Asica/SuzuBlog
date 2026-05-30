import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from 'react'
import { ChevronRight } from 'lucide-react'
import { Children, isValidElement } from 'react'

type MarkdownDetailsProps = ComponentPropsWithoutRef<'details'> & {
  children?: ReactNode
  node?: unknown
}

type MarkdownSummaryProps = ComponentPropsWithoutRef<'summary'> & {
  children?: ReactNode
  node?: unknown
}

interface NodeProp {
  node?: {
    tagName?: string
  }
}

const cx = (...classes: Array<string | undefined | false | null>) => {
  return classes.filter(Boolean).join(' ')
}

const hasSummaryNode = (child: ReactElement): boolean => {
  const props = child.props as NodeProp

  return props.node?.tagName === 'summary'
}

const isSummaryElement = (child: ReactNode): child is ReactElement => {
  return isValidElement(child)
    && (
      child.type === MarkdownSummary
      || child.type === 'summary'
      || hasSummaryNode(child)
    )
}

export function MarkdownDetails({
  children,
  className,
  node: _node,
  ...props
}: MarkdownDetailsProps) {
  const childArray = Children.toArray(children)
  const summaryIndex = childArray.findIndex(isSummaryElement)

  const summary = summaryIndex >= 0
    ? childArray[summaryIndex]
    : <MarkdownSummary>Details</MarkdownSummary>

  const bodyChildren = summaryIndex >= 0
    ? childArray.filter((_, index) => index !== summaryIndex)
    : childArray

  return (
    <details
      {...props}
      className={cx(
        'group my-6 overflow-hidden rounded-2xl border border-primary-300/40 bg-background shadow-sm',
        'transition-colors open:border-primary-300/70 open:bg-primary-300/5',
        'dark:border-primary-200/35 dark:open:border-primary-200/60 dark:open:bg-primary-200/5',
        className,
      )}
    >
      {summary}

      {bodyChildren.length > 0 && (
        <div
          className={cx(
            'px-5 pb-5 pt-1',
            '[&>*:first-child]:mt-0',
            '[&>*:last-child]:mb-0',
            '[&_p]:my-3',
            '[&_ul]:my-3',
            '[&_ol]:my-3',
            '[&_pre]:my-4',
            '[&_blockquote]:my-4',
          )}
        >
          {bodyChildren}
        </div>
      )}
    </details>
  )
}

export function MarkdownSummary({
  children,
  className,
  node: _node,
  ...props
}: MarkdownSummaryProps) {
  return (
    <summary
      {...props}
      className={cx(
        'flex cursor-pointer list-none items-center gap-3 px-5 py-4',
        'font-semibold text-primary transition-colors',
        'hover:bg-primary-300/10',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        'dark:hover:bg-primary-200/10',
        '[&::-webkit-details-marker]:hidden',
        '[&::marker]:content-none',
        className,
      )}
    >
      <span
        className={cx(
          'inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full',
          'border border-primary-300/60',
          'transition-transform duration-200 group-open:rotate-90',
          'dark:border-primary-200/60',
        )}
        aria-hidden="true"
      >
        <ChevronRight className="h-4 w-4 stroke-[2.5]" />
      </span>
      <span className="leading-relaxed">
        {children}
      </span>
    </summary>
  )
}
