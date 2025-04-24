'use server'

import { promises as fs } from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { getPostData } from '../content'

// Utility to clean frontmatter delimiters and adjust heading levels
const cleanFrontmatter = (raw: string): string =>
  raw.trim().replace(/---\n/g, '').replace(/\n## /g, '\n### ')

// Build the About section for both markdown and llms-full contents
const buildAboutSection = async (): Promise<string> => {
  let llms = '---\n/about\n---\n\n'

  try {
    const data = await getPostData('About')
    if (data !== null) {
      const content = cleanFrontmatter(data.contentRaw)
      llms += `# About\n\n${content}`
      return llms
    }
  }
  catch {
    // Fallback content
  }

  const fallback = 'This is a personal blog with technical articles and thoughts.'
  llms += `# About\n\n${fallback}`
  return llms
}

// Build the Posts section
const buildPostsSection = (
  posts: PostListData[],
  siteUrl: string,
): { md: string, llms: string } => {
  const mdLines: string[] = ['## Posts', '']
  const llmsParts: string[] = []

  posts.forEach((post) => {
    const url = `${siteUrl}/${post.slug}`
    const { title, date, redirect } = post.frontmatter
    const abstract = post.postAbstract?.replace(/\n/g, ' ') ?? ''

    mdLines.push(`- [${title}](${url}): ${abstract} (${date})`)
    llmsParts.push(`---\n${url}\n---\n`)

    const redirected = Boolean(redirect?.trim())

    if (redirected) {
      llmsParts.push(
        `# ${title} (Redirect)\n\nThis post is a redirect to ${redirect}`,
      )
    }
    else {
      const content = post.contentRaw.trim().replace(/---\n/g, '')
      llmsParts.push(`#${title}\n\n${content}`)
    }
  })

  return { md: mdLines.join('\n'), llms: llmsParts.join('\n') }
}

// Build Friends & Posts archive section
const buildFriendsSection = async (
  siteUrl: string,
  author: string,
): Promise<{ md: string, llms: string }> => {
  const md = [
    `- [About](${siteUrl}/about): About page with personal information for ${author}`,
    `- [Friends](${siteUrl}/friends): A curated list of linked blogs and friend sites`,
    `- [All Posts](${siteUrl}/posts): Chronological listing of all blog entries`,
  ].join('\n')

  let llms = '---\n/friends\n---\n\n'
  try {
    const data = await getPostData('Friends')
    if (data !== null) {
      const content = data.contentRaw.trim().replace(/---\n/g, '')
      llms += `# Friends\n\n${content}`
      return { md, llms }
    }
  }
  catch {
    // Fallback
  }

  llms += '# Friends\n\nA curated list of linked blogs and friend sites.'
  return { md, llms }
}

// Main function to generate llms.txt and llms-full.txt
const generateLLMsTXTs = async (
  posts: PostListData[],
  config: Config,
): Promise<void> => {
  const { siteUrl, title, subTitle, description, author, slogan, anilist_username } = config
  const showAnime = Boolean(anilist_username?.trim())

  // Header
  const headerMd = [
    `# ${title} - ${subTitle}`,
    '',
    `> ${description ?? 'Another SuzuBlog based personal blog.'} - ${author.name}. Personal slogan: ${slogan}`,
    '',
    `This website is using SuzuBlog, which is developed by [ZL Asica](https://zla.pub/) (she/her) based on Next.js.`,
    '',
  ].join('\n')

  let markdownContent = `${headerMd}\n`
  const llmsContents: string[] = []

  // About
  const about = await buildAboutSection()
  llmsContents.push(about)

  // Posts
  const postsSection = buildPostsSection(posts, siteUrl)
  markdownContent += `\n${postsSection.md}\n`
  llmsContents.push(postsSection.llms)

  // Friends & archive
  const friendsSection = await buildFriendsSection(siteUrl, config.author.name)
  markdownContent += `\n## Optional\n\n${friendsSection.md}\n`
  llmsContents.push(friendsSection.llms)

  // Archive
  llmsContents.push(
    ['---', '/posts', '---', '', '# Posts', '', 'Chronological listing of all blog entries'].join('\n'),
  )

  // Anime
  if (showAnime) {
    markdownContent += `- [Anime](${siteUrl}/about/anime): Automatically updated anime watch list from AniList\n`
    llmsContents.push(
      ['---', '/about/anime', '---', '', '# Anime', '', 'Automatically updated anime watch list from AniList'].join('\n'),
    )
  }

  // Write to disk
  try {
    const outputDir = path.join(process.cwd(), 'public')
    await fs.mkdir(outputDir, { recursive: true })
    await fs.writeFile(path.join(outputDir, 'llms.txt'), markdownContent, 'utf8')
    await fs.writeFile(
      path.join(outputDir, 'llms-full.txt'),
      llmsContents.join('\n\n'),
      'utf8',
    )
    // eslint-disable-next-line no-console
    console.info('llms.txt & llms-full.txt generated in /public 🎉')
  }
  catch (err) {
    console.error(
      'Failed to write LLMs files:',
      err instanceof Error ? err.message : err,
    )
  }
}

export default generateLLMsTXTs
