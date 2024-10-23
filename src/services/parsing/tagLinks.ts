import { PostData } from '@/types';
import fs from 'fs';
import path from 'path';
import pinyin from 'pinyin';

// Helper function to check if a string contains Chinese characters
function containsChinese(text: string): boolean {
  return /[\u4e00-\u9fa5]/.test(text);
}

// Helper function to convert Chinese tags to pinyin with underscores
export function convertToPinyin(tag: string): string {
  if (containsChinese(tag)) {
    return pinyin(tag, { style: pinyin.STYLE_NORMAL }).flat().join('_');
  }
  return tag; // If not Chinese, return the original tag
}

// Helper function to get unique tags from local tags
export function getUniqueTags() {
  const filePath = path.join(process.cwd(), 'public', 'postsData.json');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const posts: PostData[] = JSON.parse(fileContent);

  // Get all tags from all posts and remove duplicates
  const allTags = posts.flatMap((post) => post.frontmatter.tags || []);
  const uniqueTags = Array.from(new Set(allTags));

  return uniqueTags;
}
