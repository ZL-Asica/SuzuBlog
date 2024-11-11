'use server';

import { promises as fsPromise } from 'node:fs';
import path from 'node:path';

import { getPostFromFile } from '@/services/content/getPostFromFile';

const postsDirectory = path.join(process.cwd(), 'posts');

async function getAllPosts(): Promise<PostData[]> {
  const fileNames = await fsPromise.readdir(postsDirectory);
  const markdownFiles = fileNames.filter((fileName) =>
    fileName.endsWith('.md')
  );

  const allPosts = await Promise.all(
    markdownFiles.map(async (fileName) => {
      const fullPath = path.join(postsDirectory, fileName);
      return getPostFromFile(fullPath, fileName.replace(/\.md$/, ''));
    })
  );

  allPosts.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  );
  return allPosts;
}

async function getPostData(slug: string, page?: string): Promise<PostData> {
  const filePath = page
    ? path.join(postsDirectory, '_pages', `${page}.md`)
    : path.join(postsDirectory, `${slug}.md`);

  return getPostFromFile(filePath, slug);
}

export { getAllPosts, getPostData };
