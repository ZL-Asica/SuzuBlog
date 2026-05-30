import type { PhrasingContent, Root, RootContent } from 'mdast'
import type {
  ExtendedMarkdownAbbreviation,
  PhrasingParent,
} from './types'
import { createTextNode, getParagraphText } from './utils'

/**
 * Adds Markdown Extra-style abbreviation definitions.
 *
 * Definitions are written as `*[HTML]: HyperText Markup Language` and removed
 * from the rendered document. Matching text nodes are converted to `<abbr>`.
 */

export interface AbbreviationDefinition {
  label: string
  title: string
}

const isWordCharacter = (value: string | undefined): boolean => {
  return value != null && /^[\p{L}\p{N}_]$/u.test(value)
}

const isBoundaryMatch = (
  value: string,
  label: string,
  start: number,
): boolean => {
  return value.startsWith(label, start)
    && !isWordCharacter(value[start - 1])
    && !isWordCharacter(value[start + label.length])
}

const findDefinition = (node: RootContent): AbbreviationDefinition | null => {
  const text = getParagraphText(node)

  if (text == null) {
    return null
  }

  const markerText = text.trim()

  if (!markerText.startsWith('*[')) {
    return null
  }

  const closeIndex = markerText.indexOf(']:', 2)

  if (closeIndex === -1) {
    return null
  }

  const label = markerText.slice(2, closeIndex).trim()
  const title = markerText.slice(closeIndex + 2).trim()

  if (label === '' || title === '') {
    return null
  }

  return { label, title }
}

const createAbbreviationNode = (
  definition: AbbreviationDefinition,
): ExtendedMarkdownAbbreviation => ({
  type: 'extendedMarkdownAbbreviation',
  data: {
    hName: 'abbr',
    hProperties: {
      className: 'extended-abbr',
      title: definition.title,
    },
  },
  children: [createTextNode(definition.label)],
})

const findNextAbbreviation = (
  value: string,
  definitions: AbbreviationDefinition[],
  fromIndex: number,
): { definition: AbbreviationDefinition, start: number } | null => {
  for (let index = fromIndex; index < value.length; index += 1) {
    const definition = definitions.find(({ label }) => (
      isBoundaryMatch(value, label, index)
    ))

    if (definition != null) {
      return {
        definition,
        start: index,
      }
    }
  }

  return null
}

/** Collect abbreviation definitions from top-level paragraphs. */
export const collectAbbreviationDefinitions = (
  tree: Root,
): AbbreviationDefinition[] => {
  const definitions: AbbreviationDefinition[] = []
  const nextChildren: RootContent[] = []

  for (const child of tree.children) {
    const definition = findDefinition(child)

    if (definition == null) {
      nextChildren.push(child)
      continue
    }

    definitions.push(definition)
  }

  if (definitions.length > 0) {
    tree.children = nextChildren
  }

  return definitions.sort((a, b) => b.label.length - a.label.length)
}

const transformTextAbbreviations = (
  value: string,
  definitions: AbbreviationDefinition[],
): PhrasingContent[] | null => {
  const nodes: PhrasingContent[] = []
  let cursor = 0
  let changed = false

  while (cursor < value.length) {
    const match = findNextAbbreviation(value, definitions, cursor)

    if (match == null) {
      nodes.push(createTextNode(value.slice(cursor)))
      break
    }

    if (match.start > cursor) {
      nodes.push(createTextNode(value.slice(cursor, match.start)))
    }

    nodes.push(createAbbreviationNode(match.definition))
    changed = true
    cursor = match.start + match.definition.label.length
  }

  return changed ? nodes : null
}

/** Transform matching text nodes into abbreviation nodes. */
export const transformAbbreviations = (
  parent: PhrasingParent,
  definitions: AbbreviationDefinition[],
) => {
  if (definitions.length === 0) {
    return
  }

  const nextChildren: PhrasingContent[] = []
  let changed = false

  for (const child of parent.children) {
    if (child.type === 'extendedMarkdownAbbreviation') {
      nextChildren.push(child)
      continue
    }

    if (child.type !== 'text') {
      if ('children' in child && Array.isArray(child.children)) {
        transformAbbreviations(child, definitions)
      }

      nextChildren.push(child)
      continue
    }

    const transformed = transformTextAbbreviations(child.value, definitions)

    if (transformed == null) {
      nextChildren.push(child)
      continue
    }

    nextChildren.push(...transformed)
    changed = true
  }

  if (changed) {
    parent.children = nextChildren
  }
}
