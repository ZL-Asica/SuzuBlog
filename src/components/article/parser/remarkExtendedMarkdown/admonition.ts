import type { Paragraph, PhrasingContent, RootContent, Text } from 'mdast'
import type {
  ExtendedMarkdownAdmonition,
  ExtendedMarkdownAdmonitionKind,
} from './types'
import { getParagraphText } from './utils'

/**
 * Converts fenced admonition blocks into semantic `<aside>` nodes.
 *
 * Supported syntax:
 *
 * ```md
 * ::: warning Optional title
 * Markdown content
 * :::
 * ```
 */

const ADMONITION_CLOSE_RE = /^\s*:::\s*$/

const ADMONITION_KIND_ALIASES: Record<string, ExtendedMarkdownAdmonitionKind> = {
  caution: 'caution',
  danger: 'danger',
  error: 'danger',
  info: 'info',
  note: 'note',
  success: 'success',
  tip: 'tip',
  warning: 'warning',
}

const DEFAULT_TITLES: Record<ExtendedMarkdownAdmonitionKind, string> = {
  caution: 'Caution',
  danger: 'Danger',
  info: 'Info',
  note: 'Note',
  success: 'Success',
  tip: 'Tip',
  warning: 'Warning',
}

interface AdmonitionOpen {
  kind: ExtendedMarkdownAdmonitionKind
  title: string
}

const normalizeTitle = (
  rawTitle: string,
  fallback: string,
): string => {
  const trimmed = rawTitle.trim()
  const quotedTitle
    = (trimmed.startsWith('"') && trimmed.endsWith('"'))
      || (trimmed.startsWith('\'') && trimmed.endsWith('\''))
      ? trimmed.slice(1, -1).trim()
      : trimmed

  return quotedTitle === '' ? fallback : quotedTitle
}

const parseAdmonitionOpenText = (text: string): AdmonitionOpen | null => {
  const markerText = text.trimStart()

  if (!markerText.startsWith(':::')) {
    return null
  }

  const markerBody = markerText.slice(3).trimStart()
  const kindMatch = /^[A-Z]+/i.exec(markerBody)

  if (kindMatch == null) {
    return null
  }

  const kind = ADMONITION_KIND_ALIASES[kindMatch[0].toLowerCase()]

  if (kind == null) {
    return null
  }

  const title = normalizeTitle(
    markerBody.slice(kindMatch[0].length),
    DEFAULT_TITLES[kind],
  )

  return {
    kind,
    title: title === '' ? DEFAULT_TITLES[kind] : title,
  }
}

const parseAdmonitionOpen = (node: RootContent): AdmonitionOpen | null => {
  const text = getParagraphText(node)

  return text == null ? null : parseAdmonitionOpenText(text)
}

const isAdmonitionCloseText = (text: string): boolean => {
  return ADMONITION_CLOSE_RE.test(text)
}

const isAdmonitionClose = (node: RootContent): boolean => {
  const text = getParagraphText(node)

  return text != null && isAdmonitionCloseText(text)
}

const createAdmonitionNode = (
  open: AdmonitionOpen,
  children: RootContent[],
): ExtendedMarkdownAdmonition => ({
  type: 'extendedMarkdownAdmonition',
  data: {
    hName: 'aside',
    hProperties: {
      'className': `extended-admonition extended-admonition-${open.kind}`,
      'data-admonition-kind': open.kind,
      'data-admonition-title': open.title,
    },
  },
  children,
})

const isTextNode = (node: PhrasingContent): node is Text => {
  return node.type === 'text'
}

const createParagraphNode = (
  children: PhrasingContent[],
): Paragraph => ({
  type: 'paragraph',
  children,
})

const compactTextChildren = (
  children: PhrasingContent[],
): PhrasingContent[] => {
  return children.filter((child) => {
    return child.type !== 'text' || child.value !== ''
  })
}

const transformSingleParagraphAdmonition = (
  node: RootContent,
): ExtendedMarkdownAdmonition | null => {
  if (node.type !== 'paragraph' || node.children.length === 0) {
    return null
  }

  const firstChild = node.children[0]
  const lastChild = node.children[node.children.length - 1]

  if (!isTextNode(firstChild) || !isTextNode(lastChild)) {
    return null
  }

  const firstLineEnd = firstChild.value.indexOf('\n')
  const lastLineStart = lastChild.value.lastIndexOf('\n')

  if (firstLineEnd === -1 || lastLineStart === -1) {
    return null
  }

  const open = parseAdmonitionOpenText(firstChild.value.slice(0, firstLineEnd))
  const closeLine = lastChild.value.slice(lastLineStart + 1)

  if (open == null || !isAdmonitionCloseText(closeLine)) {
    return null
  }

  if (firstChild === lastChild) {
    const innerText = firstChild.value.slice(firstLineEnd + 1, lastLineStart)
    const paragraphChildren = compactTextChildren([
      {
        ...firstChild,
        value: innerText,
      },
    ])

    return createAdmonitionNode(
      open,
      paragraphChildren.length > 0 ? [createParagraphNode(paragraphChildren)] : [],
    )
  }

  const paragraphChildren = compactTextChildren(
    node.children.map((child, index) => {
      if (index === 0 && isTextNode(child)) {
        return {
          ...child,
          value: child.value.slice(firstLineEnd + 1),
        }
      }

      if (index === node.children.length - 1 && isTextNode(child)) {
        return {
          ...child,
          value: child.value.slice(0, lastLineStart),
        }
      }

      return child
    }),
  )

  return createAdmonitionNode(
    open,
    paragraphChildren.length > 0 ? [createParagraphNode(paragraphChildren)] : [],
  )
}

/** Transform complete admonition fences and leave malformed fences untouched. */
export const transformExtendedAdmonitions = (
  children: RootContent[],
): RootContent[] => {
  const nextChildren: RootContent[] = []
  let index = 0

  while (index < children.length) {
    const child = children[index]
    const singleParagraphAdmonition = transformSingleParagraphAdmonition(child)

    if (singleParagraphAdmonition != null) {
      nextChildren.push(singleParagraphAdmonition)
      index += 1
      continue
    }

    const open = parseAdmonitionOpen(child)

    if (open == null) {
      nextChildren.push(child)
      index += 1
      continue
    }

    const admonitionChildren: RootContent[] = []
    let depth = 1
    let closeIndex = -1

    for (let cursor = index + 1; cursor < children.length; cursor += 1) {
      const current = children[cursor]

      if (parseAdmonitionOpen(current) != null) {
        depth += 1
        admonitionChildren.push(current)
        continue
      }

      if (isAdmonitionClose(current)) {
        depth -= 1

        if (depth === 0) {
          closeIndex = cursor
          break
        }

        admonitionChildren.push(current)
        continue
      }

      admonitionChildren.push(current)
    }

    if (closeIndex === -1) {
      nextChildren.push(child)
      index += 1
      continue
    }

    nextChildren.push(
      createAdmonitionNode(
        open,
        transformExtendedAdmonitions(admonitionChildren),
      ),
    )

    index = closeIndex + 1
  }

  return nextChildren
}
