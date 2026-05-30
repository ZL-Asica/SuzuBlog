import type { RootContent } from 'mdast'
import type {
  ExtendedMarkdownDetails,
  ExtendedMarkdownSummary,
} from './types'
import { getParagraphText } from './utils'

/**
 * Converts Discourse-style disclosure blocks into native `<details>` nodes.
 *
 * Supported syntax:
 * `[details="Title"] ... [/details]`
 */

const DETAILS_OPEN_RE
  = /^\s*\[details(?:=(?:"([^"]*)"|'([^']*)'|([^\]]*)))?\]\s*$/i

const DETAILS_CLOSE_RE = /^\s*\[\/details\]\s*$/i

export const FLOW_PARENT_TYPES: ReadonlySet<string> = new Set([
  'root',
  'blockquote',
  'extendedMarkdownAdmonition',
  'extendedMarkdownDetails',
  'extendedMarkdownImageGallery',
  'listItem',
])

const createSummaryNode = (title: string): ExtendedMarkdownSummary => ({
  type: 'extendedMarkdownSummary',
  data: {
    hName: 'summary',
    hProperties: {
      className: 'discourse-details-summary',
    },
  },
  children: [
    {
      type: 'text',
      value: title,
    },
  ],
})

const createDetailsNode = (
  title: string,
  children: RootContent[],
): ExtendedMarkdownDetails => ({
  type: 'extendedMarkdownDetails',
  data: {
    hName: 'details',
    hProperties: {
      className: 'discourse-details',
    },
  },
  children: [
    createSummaryNode(title),
    ...children,
  ],
})

/** Extract the optional title from a `[details]` opener paragraph. */
const parseDetailsOpenTitle = (
  node: RootContent,
): string | null => {
  const text = getParagraphText(node)

  if (text == null) {
    return null
  }

  const match = DETAILS_OPEN_RE.exec(text)

  if (match == null) {
    return null
  }

  const title = match[1] ?? match[2] ?? match[3] ?? 'Details'

  return title.trim() === '' ? 'Details' : title.trim()
}

/** Detect a `[/details]` closer paragraph. */
const isDetailsClose = (node: RootContent): boolean => {
  const text = getParagraphText(node)

  return text != null && DETAILS_CLOSE_RE.test(text)
}

/** Transform complete details blocks and leave malformed blocks untouched. */
export const transformExtendedDetails = (
  children: RootContent[],
): RootContent[] => {
  const nextChildren: RootContent[] = []
  let index = 0

  while (index < children.length) {
    const child = children[index]
    const title = parseDetailsOpenTitle(child)

    if (title == null) {
      nextChildren.push(child)
      index += 1
      continue
    }

    const detailsChildren: RootContent[] = []
    let depth = 1
    let closeIndex = -1

    for (let cursor = index + 1; cursor < children.length; cursor += 1) {
      const current = children[cursor]

      if (parseDetailsOpenTitle(current) != null) {
        depth += 1
        detailsChildren.push(current)
        continue
      }

      if (isDetailsClose(current)) {
        depth -= 1

        if (depth === 0) {
          closeIndex = cursor
          break
        }

        detailsChildren.push(current)
        continue
      }

      detailsChildren.push(current)
    }

    if (closeIndex === -1) {
      nextChildren.push(child)
      index += 1
      continue
    }

    nextChildren.push(
      createDetailsNode(
        title,
        transformExtendedDetails(detailsChildren),
      ),
    )

    index = closeIndex + 1
  }

  return nextChildren
}
