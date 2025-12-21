import process from 'node:process'

const isProd = process.env.NODE_ENV === 'production'

const allowDrafts = process.env.ALLOW_DRAFTS === 'true'
const allowHidden = process.env.ALLOW_HIDDEN === 'true'

export function resolveStatus(raw?: unknown): PostStatus {
  if (raw === 'published' || raw === 'unlisted' || raw === 'draft' || raw === 'hidden') {
    return raw
  }
  return 'published'
}

export function canUsePost(status: PostStatus, usage: PostUsage): boolean {
  switch (usage) {
    case 'page': {
      // Whether to render the post on static params
      if (status === 'published' || status === 'unlisted') {
        return true
      }
      if (status === 'draft') {
        return !isProd || allowDrafts
      }
      if (status === 'hidden') {
        // Only show hidden posts in development mode and if ALLOW_HIDDEN is set to true
        return (!isProd && allowHidden)
      }
      return false
    }
    case 'list': {
      // Whether to include the post in post lists
      if (status === 'published') {
        return true
      }
      if (status === 'draft') {
        return !isProd || allowDrafts
      }
      return false
    }
    case 'track': {
      // "crawler track" entry: RSS/LLMs/sitemap/internal crawling
      return status === 'published'
    }
    default:
      return false
  }
}

export function isIndexable(status: PostStatus): boolean {
  // Even the page exists, it doesn't mean we want search engines to index it
  return status === 'published'
}

export function isFollowable(status: PostStatus): boolean {
  // Even the page exists, it doesn't mean we want search engines to follow its links
  return status === 'published' || status === 'unlisted'
}
