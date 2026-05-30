import type { PhrasingContent } from 'mdast'
import type {
  ExtendedMarkdownMark,
  ExtendedMarkdownSub,
  ExtendedMarkdownSup,
  PhrasingParent,
} from './types'
import { createTextNode } from './utils'

/**
 * Parses compact inline formatting syntax that is common in forums and wikis.
 *
 * The transform intentionally operates on mdast children instead of raw source
 * text so markers can wrap existing inline nodes, for example
 * `==**important**==`.
 */

type InlineFormatKind = 'mark' | 'sub' | 'sup'

interface InlineFormatSpec {
  kind: InlineFormatKind
  delimiter: string
  isDelimiterAt?: (value: string, index: number) => boolean
}

const INLINE_FORMAT_SPECS: InlineFormatSpec[] = [
  {
    kind: 'mark',
    delimiter: '==',
  },
  {
    kind: 'sub',
    delimiter: '~',
    isDelimiterAt: (value, index) => (
      value[index - 1] !== '~'
      && value[index + 1] !== '~'
    ),
  },
  {
    kind: 'sup',
    delimiter: '^',
  },
]

const createInlineFormatNode = (
  kind: InlineFormatKind,
  children: PhrasingContent[],
): ExtendedMarkdownMark | ExtendedMarkdownSub | ExtendedMarkdownSup => {
  if (kind === 'mark') {
    return {
      type: 'extendedMarkdownMark',
      data: {
        hName: 'mark',
        hProperties: {
          className: 'discourse-mark',
        },
      },
      children,
    }
  }

  if (kind === 'sub') {
    return {
      type: 'extendedMarkdownSub',
      data: {
        hName: 'sub',
        hProperties: {
          className: 'discourse-sub',
        },
      },
      children,
    }
  }

  return {
    type: 'extendedMarkdownSup',
    data: {
      hName: 'sup',
      hProperties: {
        className: 'discourse-sup',
      },
    },
    children,
  }
}

const pushText = (
  nodes: PhrasingContent[],
  value: string,
) => {
  if (value !== '') {
    nodes.push(createTextNode(value))
  }
}

const findDelimiter = (
  value: string,
  spec: InlineFormatSpec,
  fromIndex: number,
): number => {
  let cursor = value.indexOf(spec.delimiter, fromIndex)

  while (cursor >= 0) {
    if (spec.isDelimiterAt == null || spec.isDelimiterAt(value, cursor)) {
      return cursor
    }

    cursor = value.indexOf(spec.delimiter, cursor + spec.delimiter.length)
  }

  return -1
}

const transformInlineFormat = (
  children: PhrasingContent[],
  spec: InlineFormatSpec,
): { children: PhrasingContent[], changed: boolean } => {
  const nextChildren: PhrasingContent[] = []
  let formatChildren: PhrasingContent[] | null = null
  let changed = false

  const pushNode = (node: PhrasingContent) => {
    if (formatChildren !== null) {
      formatChildren.push(node)
    }
    else {
      nextChildren.push(node)
    }
  }

  for (const child of children) {
    if (child.type !== 'text') {
      pushNode(child)
      continue
    }

    let cursor = 0
    let delimiterIndex = findDelimiter(child.value, spec, cursor)

    if (delimiterIndex === -1) {
      pushNode(child)
      continue
    }

    while (delimiterIndex >= 0) {
      pushText(
        formatChildren ?? nextChildren,
        child.value.slice(cursor, delimiterIndex),
      )

      if (formatChildren === null) {
        formatChildren = []
      }
      else if (formatChildren.length === 0) {
        pushText(nextChildren, spec.delimiter)
        pushText(nextChildren, spec.delimiter)
        formatChildren = null
      }
      else {
        nextChildren.push(createInlineFormatNode(spec.kind, formatChildren))
        formatChildren = null
        changed = true
      }

      cursor = delimiterIndex + spec.delimiter.length
      delimiterIndex = findDelimiter(child.value, spec, cursor)
    }

    pushText(
      formatChildren ?? nextChildren,
      child.value.slice(cursor),
    )
  }

  if (formatChildren !== null) {
    nextChildren.push(createTextNode(spec.delimiter))
    nextChildren.push(...formatChildren)
  }

  return {
    children: changed ? nextChildren : children,
    changed,
  }
}

const transformInlineFormatChildren = (
  children: PhrasingContent[],
): { children: PhrasingContent[], changed: boolean } => {
  let nextChildren = children
  let changed = false

  for (const spec of INLINE_FORMAT_SPECS) {
    const result = transformInlineFormat(nextChildren, spec)

    nextChildren = result.children
    changed ||= result.changed
  }

  for (const child of nextChildren) {
    if ('children' in child && Array.isArray(child.children)) {
      const result = transformInlineFormatChildren(child.children)

      if (result.changed) {
        child.children = result.children
        changed = true
      }
    }
  }

  return {
    children: nextChildren,
    changed,
  }
}

export const transformInlineFormats = (parent: PhrasingParent) => {
  const result = transformInlineFormatChildren(parent.children)

  if (result.changed) {
    parent.children = result.children
  }
}
