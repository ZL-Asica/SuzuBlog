import type { Paragraph, PhrasingContent, RootContent, Text } from 'mdast'
import type { ExtendedMarkdownImageGallery } from './types'
import { getParagraphText } from './utils'

/**
 * Converts Discourse-style image grid blocks into gallery container nodes.
 *
 * Supported syntax:
 *
 * ```md
 * [grid]
 * ![First](/a.jpg)
 * ![Second](/b.jpg)
 * [/grid]
 * ```
 */

interface GalleryOpen {
  mode: 'grid'
}

const GRID_OPEN_RE = /^\s*\[grid\]\s*$/i

const GRID_CLOSE_RE = /^\s*\[\/grid\]\s*$/i

const parseGalleryOpenText = (text: string): GalleryOpen | null => {
  if (!GRID_OPEN_RE.test(text)) {
    return null
  }

  return {
    mode: 'grid',
  }
}

const parseGalleryOpen = (node: RootContent): GalleryOpen | null => {
  const text = getParagraphText(node)

  return text == null ? null : parseGalleryOpenText(text)
}

const isGalleryCloseText = (text: string): boolean => GRID_CLOSE_RE.test(text)

const isGalleryClose = (node: RootContent): boolean => {
  const text = getParagraphText(node)

  if (text == null) {
    return false
  }

  return isGalleryCloseText(text)
}

const createGalleryNode = (
  open: GalleryOpen,
  children: RootContent[],
): ExtendedMarkdownImageGallery => ({
  type: 'extendedMarkdownImageGallery',
  data: {
    hName: 'div',
    hProperties: {
      'className': 'discourse-image-gallery',
      'data-gallery-mode': open.mode,
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

const hasMeaningfulPhrasing = (
  children: PhrasingContent[],
): boolean => {
  return children.some((child) => {
    return child.type !== 'text' || child.value.trim() !== ''
  })
}

const splitPhrasingLinesIntoBlocks = (
  children: PhrasingContent[],
): RootContent[] => {
  const blocks: RootContent[] = []
  let currentLine: PhrasingContent[] = []

  const flushLine = () => {
    if (hasMeaningfulPhrasing(currentLine)) {
      blocks.push(createParagraphNode(
        currentLine.filter((child) => {
          return child.type !== 'text' || child.value !== ''
        }),
      ))
    }

    currentLine = []
  }

  for (const child of children) {
    if (!isTextNode(child)) {
      currentLine.push(child)
      continue
    }

    const parts = child.value.split('\n')

    for (const [partIndex, part] of parts.entries()) {
      if (part !== '') {
        currentLine.push({
          ...child,
          value: part,
        })
      }

      if (partIndex < parts.length - 1) {
        flushLine()
      }
    }
  }

  flushLine()

  return blocks
}

const transformSingleParagraphGallery = (
  node: RootContent,
): ExtendedMarkdownImageGallery | null => {
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

  const open = parseGalleryOpenText(firstChild.value.slice(0, firstLineEnd))

  if (
    open == null
    || !isGalleryCloseText(lastChild.value.slice(lastLineStart + 1))
  ) {
    return null
  }

  const galleryChildren = node.children.map((child, index) => {
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
  })

  return createGalleryNode(open, splitPhrasingLinesIntoBlocks(galleryChildren))
}

/** Transform complete gallery blocks and leave malformed blocks untouched. */
export const transformExtendedGalleries = (
  children: RootContent[],
): RootContent[] => {
  const nextChildren: RootContent[] = []
  let index = 0

  while (index < children.length) {
    const child = children[index]
    const singleParagraphGallery = transformSingleParagraphGallery(child)

    if (singleParagraphGallery != null) {
      nextChildren.push(singleParagraphGallery)
      index += 1
      continue
    }

    const open = parseGalleryOpen(child)

    if (open == null) {
      nextChildren.push(child)
      index += 1
      continue
    }

    const galleryChildren: RootContent[] = []
    let closeIndex = -1

    for (let cursor = index + 1; cursor < children.length; cursor += 1) {
      const current = children[cursor]

      if (isGalleryClose(current)) {
        closeIndex = cursor
        break
      }

      galleryChildren.push(current)
    }

    if (closeIndex === -1) {
      nextChildren.push(child)
      index += 1
      continue
    }

    nextChildren.push(createGalleryNode(open, galleryChildren))
    index = closeIndex + 1
  }

  return nextChildren
}
