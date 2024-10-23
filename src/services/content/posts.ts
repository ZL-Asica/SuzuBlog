import { getConfig } from '@/services/config/getConfig';
import { Frontmatter, PostData } from '@/types';
import fs, { promises as fsPromises } from 'fs';
import path from 'path';
import { parseMarkdown } from '../parsing/markdown';

const postsDirectory = path.join(process.cwd(), 'src/posts');

// Helper function to check if the file is a Markdown file
function isMarkdownFile(fileName: string): boolean {
  return fileName.endsWith('.md');
}

// Helper function to validate and format date (yyyy-mm-dd hh:mm:ss)
function formatDateTime(dateTime: string): string {
  const [date, time] = dateTime.includes(' ')
    ? dateTime.split(' ')
    : [dateTime, ''];

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) {
    return '';
  }

  const timeRegex = /^\d{2}:\d{2}:\d{2}$/;
  const formattedTime = timeRegex.test(time) ? time : '00:00:00';

  return `${date} ${formattedTime}`;
}

// Helper function to check if the file exists (only for local paths)
async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fsPromises.access(filePath);
    return true;
  } catch {
    return false;
  }
}

// Helper function to process frontmatter
async function processFrontmatter(
  frontmatter: Frontmatter,
  fileName: string,
  fullPath: string,
  config: ReturnType<typeof getConfig>,
): Promise<Frontmatter> {
  // Limit title and author length
  frontmatter.title =
    frontmatter.title?.slice(0, 100) || fileName.replace(/\.md$/, '');
  frontmatter.author = frontmatter.author?.slice(0, 30) || config.author.name;

  // Handle thumbnail, check if it's a local file and if it exists
  if (frontmatter.thumbnail && !frontmatter.thumbnail.includes('://')) {
    const thumbnailPath = path.join(
      process.cwd(),
      'public',
      frontmatter.thumbnail,
    );
    const exists = await fileExists(thumbnailPath);
    if (!exists) {
      // Fallback to config background if file does not exist
      frontmatter.thumbnail = config.background;
    }
  } else {
    frontmatter.thumbnail = frontmatter.thumbnail || config.background;
  }

  // Format date, fallback to last modified date if invalid
  const formattedDate = frontmatter.date
    ? formatDateTime(frontmatter.date)
    : '';
  if (!formattedDate) {
    const stats = await fsPromises.stat(fullPath);
    const lastModifiedDate = stats.mtime.toISOString().split('T');
    // yyyy-mm-dd hh:mm:ss
    frontmatter.date = `${lastModifiedDate[0]} ${lastModifiedDate[1].split('.')[0]}`;
  } else {
    frontmatter.date = formattedDate;
  }

  return frontmatter;
}

// Get all posts data
export async function getAllPosts(): Promise<PostData[]> {
  const config = getConfig();
  const fileNames = await fsPromises.readdir(postsDirectory);

  // Filter to only include .md files
  const markdownFiles = fileNames.filter(isMarkdownFile);

  const allPosts = await Promise.all(
    markdownFiles.map(async (fileName) => {
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = await fsPromises.readFile(fullPath, 'utf8');

      const { frontmatter, postAbstract, contentHtml } =
        await parseMarkdown(fileContents);

      const processedFrontmatter = await processFrontmatter(
        frontmatter as Frontmatter,
        fileName,
        fullPath,
        config,
      );

      return {
        slug: fileName.replace(/\.md$/, ''),
        frontmatter: processedFrontmatter,
        postAbstract,
        contentHtml,
      };
    }),
  );

  // Sort posts by date (newest first)
  allPosts.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date);
    const dateB = new Date(b.frontmatter.date);
    return dateB.getTime() - dateA.getTime();
  });

  // Save posts to a JSON file for sitemap generation
  const filePath = path.join(process.cwd(), 'public', 'postsData.json');
  fs.writeFileSync(filePath, JSON.stringify(allPosts, null, 2), 'utf8');

  // Get all unique tags
  const allTags = allPosts.flatMap((post) => post.frontmatter.tags || []);
  const uniqueTags = Array.from(new Set(allTags));

  // Save tags to a JSON file for sitemap generation
  const tagsFilePath = path.join(process.cwd(), 'public', 'tagsData.json');
  fs.writeFileSync(tagsFilePath, JSON.stringify(uniqueTags, null, 2), 'utf8');

  return allPosts;
}

// Get single post data
export async function getPostData(
  slug: string,
  page?: string,
): Promise<PostData> {
  const config = getConfig();

  // If page is provided, get the page file
  const fullPath = page
    ? path.join(postsDirectory, '_pages', `${page}.md`)
    : path.join(postsDirectory, `${slug}.md`);

  const fileContents = await fsPromises.readFile(fullPath, 'utf8');

  const { frontmatter, postAbstract, contentHtml } =
    await parseMarkdown(fileContents);

  const processedFrontmatter = await processFrontmatter(
    frontmatter as Frontmatter,
    `${slug}.md`,
    fullPath,
    config,
  );

  return {
    slug,
    postAbstract,
    frontmatter: processedFrontmatter,
    contentHtml,
  };
}
