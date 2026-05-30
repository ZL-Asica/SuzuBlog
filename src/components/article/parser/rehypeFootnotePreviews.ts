/**
 * Rehype plugin that copies rendered footnote text onto each footnote ref.
 *
 * `remark-gfm` renders footnote references before React components receive
 * props, so attaching the preview in the hast tree gives the tooltip stable
 * SSR content instead of waiting for client-side DOM lookup on hover.
 */

interface HastParent {
  children?: HastNode[]
  type: string
}

interface HastRoot extends HastParent {
  type: 'root'
}

type HastNode = HastElement | HastParent | HastText

interface HastElement extends HastParent {
  properties?: Record<string, unknown>
  tagName: string
  type: 'element'
}

interface HastText {
  type: 'text'
  value: string
}

const FOOTNOTE_ID_PREFIX = 'user-content-fn-'

const isElement = (node: HastNode): node is HastElement => {
  return node.type === 'element'
}

const isText = (node: HastNode): node is HastText => {
  return node.type === 'text'
}

const getChildren = (node: HastNode): HastNode[] => {
  return 'children' in node && Array.isArray(node.children) ? node.children : []
}

const getProperty = (node: HastElement, key: string): unknown => {
  return node.properties?.[key]
}

const getStringProperty = (node: HastElement, key: string): string | undefined => {
  const value = getProperty(node, key)

  return typeof value === 'string' ? value : undefined
}

const hasProperty = (node: HastElement, key: string): boolean => {
  return getProperty(node, key) != null
}

const visitElements = (
  node: HastNode,
  visitor: (element: HastElement) => void,
) => {
  if (isElement(node)) {
    visitor(node)
  }

  for (const child of getChildren(node)) {
    visitElements(child, visitor)
  }
}

const normalizePreviewText = (value: string): string => {
  return value.replace(/\s+/g, ' ').trim()
}

const getFootnotePreviewText = (node: HastNode): string => {
  if (isText(node)) {
    return node.value
  }

  if (isElement(node) && hasProperty(node, 'dataFootnoteBackref')) {
    return ''
  }

  return getChildren(node).map(getFootnotePreviewText).join('')
}

const collectFootnotePreviews = (tree: HastRoot): Map<string, string> => {
  const previews = new Map<string, string>()

  visitElements(tree, (element) => {
    if (element.tagName !== 'li') {
      return
    }

    const id = getStringProperty(element, 'id')

    if (id?.startsWith(FOOTNOTE_ID_PREFIX) !== true) {
      return
    }

    const preview = normalizePreviewText(getFootnotePreviewText(element))

    if (preview !== '') {
      previews.set(`#${id}`, preview)
    }
  })

  return previews
}

const attachFootnotePreviews = (
  tree: HastRoot,
  previews: Map<string, string>,
) => {
  visitElements(tree, (element) => {
    if (element.tagName !== 'a' || !hasProperty(element, 'dataFootnoteRef')) {
      return
    }

    const href = getStringProperty(element, 'href')
    const preview = href == null ? undefined : previews.get(href)

    if (preview == null) {
      return
    }

    element.properties = {
      ...element.properties,
      'data-footnote-preview': preview,
    }
  })
}

const rehypeFootnotePreviews = () => {
  return (tree: HastRoot) => {
    attachFootnotePreviews(tree, collectFootnotePreviews(tree))
  }
}

export default rehypeFootnotePreviews
