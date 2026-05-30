import type { PhrasingContent } from 'mdast'
import type { PhrasingParent } from './types'
import { createTextNode } from './utils'

/**
 * Applies safe smart punctuation to plain text nodes.
 *
 * The transform intentionally skips inline code because code is represented by
 * a separate mdast node and never reaches this text-only path.
 */

const replaceDashes = (value: string): string => {
  return value
    .replaceAll('---', '\u2014')
    .replaceAll('--', '\u2013')
}

/** Convert `--` to en dash and `---` to em dash in text nodes. */
export const transformSmartPunctuation = (parent: PhrasingParent) => {
  const nextChildren: PhrasingContent[] = []
  let changed = false

  for (const child of parent.children) {
    if (child.type !== 'text') {
      if ('children' in child && Array.isArray(child.children)) {
        transformSmartPunctuation(child)
      }

      nextChildren.push(child)
      continue
    }

    const value = replaceDashes(child.value)

    if (value === child.value) {
      nextChildren.push(child)
      continue
    }

    nextChildren.push(createTextNode(value))
    changed = true
  }

  if (changed) {
    parent.children = nextChildren
  }
}
