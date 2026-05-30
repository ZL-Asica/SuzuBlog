import type { Paragraph, RootContent, Text } from 'mdast'

/**
 * Shared helpers for small mdast transforms in `remarkExtendedMarkdown`.
 */

/** Create a plain mdast text node. */
export const createTextNode = (value: string): Text => ({
  type: 'text',
  value,
})

/**
 * Narrow root content to a paragraph that only contains text nodes.
 *
 * Block transforms use this to detect control markers such as `[details]`
 * without accidentally consuming paragraphs that already contain inline markup.
 */
export const isTextOnlyParagraph = (
  node: RootContent,
): node is Paragraph & { children: Text[] } => {
  return node.type === 'paragraph'
    && node.children.every(child => child.type === 'text')
}

/** Return the concatenated text for a text-only paragraph. */
export const getParagraphText = (
  node: RootContent,
): string | null => {
  if (!isTextOnlyParagraph(node)) {
    return null
  }

  const textChildren = node.children as Text[]

  return textChildren.map(child => child.value).join('')
}
