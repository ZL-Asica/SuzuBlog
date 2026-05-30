import type { Root } from 'mdast'
import type { FlowParent, PhrasingParent } from './types'
import { visit } from 'unist-util-visit'
import {
  collectAbbreviationDefinitions,
  transformAbbreviations,
} from './abbreviation'
import { transformExtendedAdmonitions } from './admonition'
import {
  FLOW_PARENT_TYPES,
  transformExtendedDetails,
} from './details'
import { transformExtendedGalleries } from './gallery'
import {
  transformInlineFormats,
} from './inlineFormat'
import { transformSmartPunctuation } from './smartPunctuation'
import {
  PHRASING_PARENT_TYPES,
  transformInlineSpoilers,
} from './spoiler'

/**
 * Remark plugin for project-local Markdown extensions.
 *
 * This plugin keeps non-standard Markdown support in one mdast pass before
 * `react-markdown` converts nodes to React components.
 */
const remarkExtendedMarkdown = () => {
  return (tree: Root) => {
    const abbreviationDefinitions = collectAbbreviationDefinitions(tree)

    visit(tree, (node) => {
      if (
        FLOW_PARENT_TYPES.has(node.type)
        && 'children' in node
        && Array.isArray(node.children)
      ) {
        const parent = node as FlowParent
        parent.children = transformExtendedAdmonitions(
          transformExtendedDetails(
            transformExtendedGalleries(parent.children),
          ),
        )
      }
    })

    visit(tree, (node) => {
      if (
        PHRASING_PARENT_TYPES.has(node.type)
        && 'children' in node
        && Array.isArray(node.children)
      ) {
        const parent = node as PhrasingParent

        transformInlineSpoilers(parent)
        transformInlineFormats(parent)
        transformAbbreviations(parent, abbreviationDefinitions)
        transformSmartPunctuation(parent)
      }
    })
  }
}

export {
  collectAbbreviationDefinitions,
  transformAbbreviations,
  transformExtendedAdmonitions,
  transformExtendedDetails,
  transformExtendedGalleries,
  transformInlineFormats,
  transformInlineSpoilers,
  transformSmartPunctuation,
}

export default remarkExtendedMarkdown
