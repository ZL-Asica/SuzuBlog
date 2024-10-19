import { promises as fsPromises } from 'fs';
import path from 'path';
import { parseMarkdown } from './markdown';
import { PostData, Frontmatter } from '@/types';

const postsDirectory = path.join(process.cwd(), 'src/posts');

// Helper function to validate and format date (yyyy-mm-dd hh:mm:ss)
function formatDateTime(dateTime: string): string {
  const [date, time] = dateTime.includes(' ')
    ? dateTime.split(' ')
    : [dateTime, ''];

  // Validate date, if invalid return empty string (used to trigger fallback)
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) {
    return '';
  }

  // Validate time, default to '00:00:00' if missing or invalid
  const timeRegex = /^\d{2}:\d{2}:\d{2}$/;
  const formattedTime = timeRegex.test(time) ? time : '00:00:00';

  return `${date} ${formattedTime}`;
}

// Get all posts data
export async function getAllPosts(): Promise<PostData[]> {
  const fileNames = await fsPromises.readdir(postsDirectory);

  const allPosts = await Promise.all(
    fileNames.map(async (fileName) => {
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = await fsPromises.readFile(fullPath, 'utf8');

      // Asynchronously parse markdown file
      const { frontmatter, contentHtml } = await parseMarkdown(fileContents);

      // Ensure mandatory fields have default values

      // Limit title and author length to prevent overflow
      frontmatter.title =
        frontmatter.title?.slice(0, 100) || fileName.replace(/\.md$/, '');
      frontmatter.author = frontmatter.author?.slice(0, 30) || 'ZL Asica';

      // TODO: Add default thumbnail

      // Format date, if date is invalid or missing, use last modified date as fallback
      const formattedDate = frontmatter.date
        ? formatDateTime(frontmatter.date)
        : '';

      if (!formattedDate) {
        const stats = await fsPromises.stat(fullPath);
        const lastModifiedDate = stats.mtime.toISOString().split('T');
        const fallbackDate = `${lastModifiedDate[0]} ${lastModifiedDate[1].split('.')[0]}`; // yyyy-mm-dd hh:mm:ss
        frontmatter.date = fallbackDate;
      } else {
        frontmatter.date = formattedDate;
      }

      return {
        slug: fileName.replace(/\.md$/, ''), // Use file name as slug (without .md)
        // Use assert to tell TypeScript that frontmatter is Frontmatter type
        frontmatter: frontmatter as Frontmatter,
        contentHtml,
      };
    }),
  );

  // Sort posts by date (newest first)
  allPosts.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date);
    const dateB = new Date(b.frontmatter.date);
    return dateB.getTime() - dateA.getTime(); // Sort descending (newest first)
  });

  return allPosts;
}

// Get single post data
export async function getPostData(slug: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = await fsPromises.readFile(fullPath, 'utf8');

  const { frontmatter, contentHtml } = await parseMarkdown(fileContents);

  return {
    slug,
    frontmatter,
    contentHtml,
  };
}
