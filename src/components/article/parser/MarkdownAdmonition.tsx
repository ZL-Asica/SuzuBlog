import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import {
  AlertTriangle,
  CheckCircle2,
  Info,
  Lightbulb,
  OctagonAlert,
  StickyNote,
} from 'lucide-react'

type MarkdownAdmonitionProps = ComponentPropsWithoutRef<'aside'> & {
  'children'?: ReactNode
  'data-admonition-kind'?: string
  'data-admonition-title'?: string
  'node'?: unknown
}

interface AdmonitionVariant {
  icon: typeof Info
  label: string
  className: string
  iconClassName: string
}

const cx = (...classes: Array<string | undefined | false | null>) => {
  return classes.filter(Boolean).join(' ')
}

const ADMONITION_VARIANTS: Record<string, AdmonitionVariant> = {
  caution: {
    icon: AlertTriangle,
    label: 'Caution',
    className: 'border-orange-300 bg-orange-50/80 text-orange-950 dark:border-orange-300/50 dark:bg-orange-300/10 dark:text-orange-100',
    iconClassName: 'text-orange-600 dark:text-orange-300',
  },
  danger: {
    icon: OctagonAlert,
    label: 'Danger',
    className: 'border-rose-300 bg-rose-50/80 text-rose-950 dark:border-rose-300/50 dark:bg-rose-300/10 dark:text-rose-100',
    iconClassName: 'text-rose-600 dark:text-rose-300',
  },
  info: {
    icon: Info,
    label: 'Info',
    className: 'border-sky-300 bg-sky-50/80 text-sky-950 dark:border-sky-300/50 dark:bg-sky-300/10 dark:text-sky-100',
    iconClassName: 'text-sky-600 dark:text-sky-300',
  },
  note: {
    icon: StickyNote,
    label: 'Note',
    className: 'border-violet-300 bg-violet-50/80 text-violet-950 dark:border-violet-300/50 dark:bg-violet-300/10 dark:text-violet-100',
    iconClassName: 'text-violet-600 dark:text-violet-300',
  },
  success: {
    icon: CheckCircle2,
    label: 'Success',
    className: 'border-emerald-300 bg-emerald-50/80 text-emerald-950 dark:border-emerald-300/50 dark:bg-emerald-300/10 dark:text-emerald-100',
    iconClassName: 'text-emerald-600 dark:text-emerald-300',
  },
  tip: {
    icon: Lightbulb,
    label: 'Tip',
    className: 'border-teal-300 bg-teal-50/80 text-teal-950 dark:border-teal-300/50 dark:bg-teal-300/10 dark:text-teal-100',
    iconClassName: 'text-teal-600 dark:text-teal-300',
  },
  warning: {
    icon: AlertTriangle,
    label: 'Warning',
    className: 'border-amber-300 bg-amber-50/80 text-amber-950 dark:border-amber-300/50 dark:bg-amber-300/10 dark:text-amber-100',
    iconClassName: 'text-amber-600 dark:text-amber-300',
  },
}

const readDataAttribute = (
  props: MarkdownAdmonitionProps,
  name: 'data-admonition-kind' | 'data-admonition-title',
): string | undefined => {
  const value = props[name]

  return typeof value === 'string' ? value : undefined
}

export function MarkdownAdmonition({
  children,
  className,
  node: _node,
  ...props
}: MarkdownAdmonitionProps) {
  const isAdmonition = className?.split(/\s+/).includes('extended-admonition') === true

  if (!isAdmonition) {
    return (
      <aside className={className} {...props}>
        {children}
      </aside>
    )
  }

  const kind = readDataAttribute(props, 'data-admonition-kind') ?? 'note'
  const title = readDataAttribute(props, 'data-admonition-title')
  const variant = ADMONITION_VARIANTS[kind] ?? ADMONITION_VARIANTS.note
  const Icon = variant.icon

  return (
    <aside
      {...props}
      className={cx(
        'my-6 overflow-hidden rounded-lg border px-4 py-4 shadow-sm',
        'break-words transition-colors',
        variant.className,
        className,
      )}
      aria-label={title ?? variant.label}
    >
      <div className="mb-2 flex items-center gap-2 font-semibold">
        <Icon className={cx('h-5 w-5 shrink-0', variant.iconClassName)} aria-hidden="true" />
        <span>{title ?? variant.label}</span>
      </div>

      <div
        className={cx(
          'pl-7 leading-relaxed',
          '[&>*:first-child]:mt-0',
          '[&>*:last-child]:mb-0',
          '[&_p]:my-3',
          '[&_ul]:my-3',
          '[&_ol]:my-3',
          '[&_pre]:my-4',
          '[&_blockquote]:my-4',
        )}
      >
        {children}
      </div>
    </aside>
  )
}
