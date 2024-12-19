'use server'

import { promises as fsPromise } from 'node:fs'
import path from 'node:path'
import process from 'node:process'

import getPostFromFile from '@/services/content/getPostFromFile'

import { filter, lowerCase, replace } from 'es-toolkit/compat'

const postsDirectory = path.join(process.cwd(), 'posts')

async function getAllPosts(): Promise<PostListData[]> {
  const fileNames = await fsPromise.readdir(postsDirectory)
  const markdownFiles = filter(fileNames, fileName => fileName.endsWith('.md'))

  const allPosts = await Promise.all(
    markdownFiles.map(async (fileName) => {
      const { slug, postAbstract, frontmatter, lastModified } = getPostFromFile(
        path.join(postsDirectory, fileName),
        replace(fileName, /\.md$/, ''),
        false, // Fetch only partial data for list view
      )
      return { slug, postAbstract, frontmatter, lastModified }
    }),
  )

  return allPosts.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime(),
  )
}

async function getPostData(slug: string): Promise<FullPostData | null> {
  const filePath
    = lowerCase(slug) === 'about' || lowerCase(slug) === 'friends'
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
