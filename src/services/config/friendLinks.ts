import { readFileSync } from 'node:fs'
import path from 'node:path'
import process from 'node:process'

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
      const parsed = JSON.parse(json) as FriendLink[] | undefined
      if (parsed !== undefined && Array.isArray(parsed)) {
        links.push(...parsed)
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
