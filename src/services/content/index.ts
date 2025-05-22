'use server'

import { promises as fsPromise } from 'node:fs'
import path from 'node:path'
import process from 'node:process'

import getPostFromFile from '@/services/content/getPostFromFile'

const postsDirectory = path.join(process.cwd(), 'posts')

const getAllPosts = async (): Promise<PostListData[]> => {
  const fileNames = await fsPromise.readdir(postsDirectory)
  const markdownFiles = fileNames.filter(fileName => fileName.endsWith('.md'))

  const allPosts = await Promise.all(
    markdownFiles.map(async (fileName) => {
      const { slug, postAbstract, frontmatter, lastModified, contentRaw } = getPostFromFile(
        path.join(postsDirectory, fileName),
        fileName.replace(/\.md$/, ''),
        false, // Fetch only partial data for list view
      )
      return { slug, postAbstract, frontmatter, lastModified, contentRaw }
    }),
  )

  return allPosts.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime(),
  )
}

const getPostData = async (slug: string): Promise<FullPostData | null> => {
  const filePath
    = slug.toLowerCase() === 'about' || slug.toLowerCase() === 'friends'
      ? path.join(postsDirectory, '_pages', `${slug}.md`)
      : path.join(postsDirectory, `${slug}.md`)

  // check file existence
  try {
    await fsPromise.access(filePath)
  }
  catch {
    return null
  }

  return getPostFromFile(filePath, slug)
}

export { getAllPosts, getPostData }
