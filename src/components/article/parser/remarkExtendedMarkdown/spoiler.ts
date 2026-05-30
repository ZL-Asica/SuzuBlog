import type { PhrasingContent } from 'mdast'
import type { ExtendedMarkdownSpoiler, PhrasingParent } from './types'
import { createTextNode } from './utils'

/**
 * Converts Discourse-style inline spoiler tags into a focusable spoiler span.
 */

const SPOILER_MARKER_RE = /(\[spoiler\]|\[\/spoiler\])/i

export const PHRASING_PARENT_TYPES: ReadonlySet<string> = new Set([
  'paragraph',
  'heading',
  'emphasis',
  'strong',
  'delete',
  'link',
  'tableCell',
  'extendedMarkdownSummary',
])

const createSpoilerNode = (
  children: PhrasingContent[],
): ExtendedMarkdownSpoiler => ({
  type: 'extendedMarkdownSpoiler',
  data: {
    hName: 'span',
    hProperties: {
      className: 'discourse-spoiler',
    },
  },
  children,
})

/** Transform complete `[spoiler]` pairs and preserve malformed markers. */
export const transformInlineSpoilers = (parent: PhrasingParent) => {
  const nextChildren: PhrasingContent[] = []
  let spoilerChildren: PhrasingContent[] | null = null
  let changed = false

  const pushNode = (node: PhrasingContent) => {
    if (spoilerChildren !== null) {
      spoilerChildren.push(node)
    }
    else {
      nextChildren.push(node)
    }
  }

  for (const child of parent.children) {
    if (child.type !== 'text') {
      pushNode(child)
      continue
    }

    const parts = child.value.split(SPOILER_MARKER_RE)

    if (parts.length === 1) {
      pushNode(child)
      continue
    }

    changed = true

    for (const part of parts) {
      if (part === '') {
        continue
      }

      const normalized = part.toLowerCase()

      if (normalized === '[spoiler]') {
        if (spoilerChildren === null) {
          spoilerChildren = []
        }
        else {
          spoilerChildren.push(createTextNode(part))
        }

        continue
      }

      if (normalized === '[/spoiler]') {
        if (spoilerChildren !== null) {
          nextChildren.push(createSpoilerNode(spoilerChildren))
          spoilerChildren = null
        }
        else {
          nextChildren.push(createTextNode(part))
        }

        continue
      }

      pushNode(createTextNode(part))
    }
  }

  if (spoilerChildren !== null) {
    nextChildren.push(createTextNode('[spoiler]'))
    nextChildren.push(...spoilerChildren)
  }

  if (changed) {
    parent.children = nextChildren
  }
}
