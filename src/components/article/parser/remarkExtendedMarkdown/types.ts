import type {
  PhrasingContent,
  RootContent,
} from 'mdast'

/**
 * Custom mdast node definitions emitted by the local extended Markdown plugin.
 *
 * Each node uses `data.hName` and `data.hProperties` so `react-markdown`
 * can render it through the normal component map without a separate rehype
 * bridge.
 */

interface HtmlNodeData<
  TagName extends string,
  Properties extends object = object,
> {
  hName: TagName
  hProperties: {
    className: string
  } & Properties
}

export const EXTENDED_MARKDOWN_ADMONITION_KINDS = [
  'note',
  'info',
  'tip',
  'success',
  'warning',
  'danger',
  'caution',
] as const

export type ExtendedMarkdownAdmonitionKind
  = typeof EXTENDED_MARKDOWN_ADMONITION_KINDS[number]

/** Inline spoiler content written as `[spoiler]hidden[/spoiler]`. */
export interface ExtendedMarkdownSpoiler {
  type: 'extendedMarkdownSpoiler'
  children: PhrasingContent[]
  data: HtmlNodeData<'span'>
}

/** Block disclosure content written with Discourse-style `[details]` tags. */
export interface ExtendedMarkdownDetails {
  type: 'extendedMarkdownDetails'
  children: RootContent[]
  data: HtmlNodeData<'details'>
}

/** Callout content written as `::: warning Optional title ... :::`. */
export interface ExtendedMarkdownAdmonition {
  type: 'extendedMarkdownAdmonition'
  children: RootContent[]
  data: HtmlNodeData<
    'aside',
    {
      'data-admonition-kind': ExtendedMarkdownAdmonitionKind
      'data-admonition-title': string
    }
  >
}

/** Discourse-style image gallery written with `[grid]` tags. */
export interface ExtendedMarkdownImageGallery {
  type: 'extendedMarkdownImageGallery'
  children: RootContent[]
  data: HtmlNodeData<
    'div',
    {
      'data-gallery-mode': 'grid'
    }
  >
}

/** Summary node injected as the first child of extended details blocks. */
export interface ExtendedMarkdownSummary {
  type: 'extendedMarkdownSummary'
  children: PhrasingContent[]
  data: HtmlNodeData<'summary'>
}

/** Highlight content written as `==marked==`. */
export interface ExtendedMarkdownMark {
  type: 'extendedMarkdownMark'
  children: PhrasingContent[]
  data: HtmlNodeData<'mark'>
}

/** Subscript content written as `~sub~`. */
export interface ExtendedMarkdownSub {
  type: 'extendedMarkdownSub'
  children: PhrasingContent[]
  data: HtmlNodeData<'sub'>
}

/** Superscript content written as `^sup^`. */
export interface ExtendedMarkdownSup {
  type: 'extendedMarkdownSup'
  children: PhrasingContent[]
  data: HtmlNodeData<'sup'>
}

/** Abbreviation text defined by Markdown Extra-style `*[HTML]: ...`. */
export interface ExtendedMarkdownAbbreviation {
  type: 'extendedMarkdownAbbreviation'
  children: PhrasingContent[]
  data: HtmlNodeData<
    'abbr',
    {
      title: string
    }
  >
}

/** Minimal mdast parent shape for nodes that can contain inline phrasing. */
export interface PhrasingParent {
  type: string
  children: PhrasingContent[]
}

/** Minimal mdast parent shape for nodes that can contain block content. */
export interface FlowParent {
  type: string
  children: RootContent[]
}

declare module 'mdast' {
  interface PhrasingContentMap {
    extendedMarkdownSpoiler: ExtendedMarkdownSpoiler
    extendedMarkdownMark: ExtendedMarkdownMark
    extendedMarkdownSub: ExtendedMarkdownSub
    extendedMarkdownSup: ExtendedMarkdownSup
    extendedMarkdownAbbreviation: ExtendedMarkdownAbbreviation
  }

  interface RootContentMap {
    extendedMarkdownDetails: ExtendedMarkdownDetails
    extendedMarkdownSummary: ExtendedMarkdownSummary
    extendedMarkdownAdmonition: ExtendedMarkdownAdmonition
    extendedMarkdownImageGallery: ExtendedMarkdownImageGallery
  }
}
