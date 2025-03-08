import { statSync } from 'node:fs'

import { getConfig } from '@/services/config'
import { generateHierarchicalSlug } from '@/services/utils'

import { defaultTo, forEach, replace, trim } from 'es-toolkit/compat'
import { read as matterRead } from 'gray-matter'

const config = getConfig()

// Formats date and time to 'YYYY-MM-DD HH:mm:ss'
const formatDateTime = (dateTime: string): string => {
  const [date, time = '00:00:00'] = dateTime.split(/[ T]/)
  return `${/^\d{4}-\d{2}-\d{2}$/.test(date) ? date : ''} ${/^\d{2}:\d{2}:\d{2}$/.test(time) ? time : '00:00:00'}`
}

// Helper function to resolve and format dates
const resolveDate = (
  originalDate?: string,
  fullPath?: string,
): { date: string, lastModified: string } => {
  const stats = statSync(fullPath!)
  const useOriginalDate = originalDate != null && originalDate.trim() !== ''
  const date = useOriginalDate
    ? formatDateTime(originalDate)
    : formatDateTime(stats.mtime.toISOString())
  return { date, lastModified: stats.mtime.toISOString() }
}

// Function to generate TOC from markdown content
const generateTOC = (content: string): TocItems[] => {
  const headingRegex = /^(#{2,6})\s+(\S.*)$/gm
  const toc: TocItems[] = []
  const headingLevels = { h2: 0, h3: 0, h4: 0, h5: 0, h6: 0 }

  let match: RegExpExecArray | null
  while (true) {
    match = headingRegex.exec(content)
    if (match === null) {
      break
    }
    const [, hashes, rawTitle] = match
    const level = `h${hashes.length}` as keyof typeof headingLevels

    // Remove markdown formatting from title and trim whitespace
    const title = rawTitle.replace(/[*`]/g, '').trim()
    const slug = generateHierarchicalSlug(level, headingLevels)

    toc.push({ slug, title, level: Number.parseInt(level.slice(1), 10) })
  }

  return toc
}

// Helper function to create post abstract
const processPostAbstract = (contentRaw: string, excerpt: string): string => {
  let contentStripped = excerpt.length > 0 ? excerpt : contentRaw
  contentStripped = trim(contentStripped).slice(0, 150)

  const patterns: [RegExp, string][] = [
    [/#* (.*)/g, '$1'], // Headings
    [/!\[.*?\]\(.*?\)/g, ''], // Images
    [/\[(.*?)\]\(.*?\)/g, '$1'], // Links
    [/`([^`]+)`/g, '$1'], // Inline code
    [/(\*\*|__)(.*?)\1/g, '$2'], // Bold formatting
    [/(\*|_)(.*?)\1/g, '$2'], // Italic formatting
    [/(\r?\n)+/g, ' '], // Line breaks
    [/^-{3,}$/gm, ''], // Horizontal rules
    [/>\s?/g, ''], // Blockquotes
    [/([*+-])\s/g, ''], // Unordered list markers
    [/^\d+\.\s+/g, ''], // Ordered list markers
  ]

  forEach(patterns, ([pattern, replacement]) => {
    contentStripped = replace(contentStripped, pattern, replacement)
  })

  return contentStripped
}

const getPostFromFile = (filePath: string, slug: string, fullData: boolean = true): FullPostData => {
  const {
    data,
    content: contentRaw,
    excerpt,
  } = matterRead(filePath, { excerpt_separator: '<!--more-->' })

  const { date, lastModified } = resolveDate(data.date as string, filePath)

  const frontmatter: Frontmatter = {
    title: (data.title as string)?.slice(0, 100) || slug,
    author: (data.author as string)?.slice(0, 30) || config.author.name,
    thumbnail: (data.thumbnail ?? config.background) as string,
    date,
    tags: defaultTo(data.tags) as string[],
    categories: defaultTo(data.categories) as string[],
    redirect: defaultTo(data.redirect) as string,
    showComments: defaultTo(data.showComments, true) as boolean,
    showLicense: defaultTo(data.showLicense, true) as boolean,
    showThumbnail: defaultTo(data.showThumbnail, true) as boolean,
    autoSlug: defaultTo(data.autoSlug, true) as boolean,
  }

  let toc: TocItems[] = []
  if (fullData && frontmatter.redirect !== null) {
    toc = generateTOC(contentRaw)
  }

  return {
    slug,
    postAbstract: processPostAbstract(contentRaw, defaultTo(excerpt, '')),
    frontmatter,
    contentRaw: fullData ? contentRaw : '',
    lastModified,
    toc,
  }
}

export default getPostFromFile
