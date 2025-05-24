import type { FriendLink } from '@/schemas'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { friendLinkSchema } from '@/schemas'

const FRIEND_LINKS_FILE_PATH = path.join(
  process.cwd(),
  'posts',
  '_pages',
  'Friends.md',
)

const parseFriendLinks = (markdown: string): FriendLink[] => {
  const blocks = markdown.match(/```Links[\s\S]*?```/g)
  if (!blocks) {
    console.warn('No `Links` blocks found.')
    return []
  }

  const links: FriendLink[] = []

  for (const block of blocks) {
    const json = block.replace(/```Links|```/g, '').trim()

    try {
      const rawJson = JSON.parse(json) as unknown[]
      for (const item of rawJson) {
        const parsed = friendLinkSchema.safeParse(item)
        if (parsed.success) {
          links.push(parsed.data)
        }
        else {
          console.error('Invalid JSON in Links block:', { err: parsed.error, block: json })
        }
      }
    }
    catch (err) {
      console.error('Invalid JSON in Links block:', { err, block: json })
    }
  }

  return links
}

export const loadFriendLinks = (): FriendLink[] => {
  try {
    const content = readFileSync(FRIEND_LINKS_FILE_PATH, 'utf8')
    return parseFriendLinks(content)
  }
  catch {
    console.warn('Failed to read friend links file')
    return []
  }
}
