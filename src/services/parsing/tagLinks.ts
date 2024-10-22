import pinyin from 'pinyin';
import { getAllPosts } from '../content/posts';

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

// Helper function to get unique tags from all posts
export async function getUniqueTags() {
  const posts = await getAllPosts();
  const allTags = posts.flatMap((post) => post.frontmatter.tags || []);
  const uniqueTags = Array.from(new Set(allTags));
  return uniqueTags;
}
