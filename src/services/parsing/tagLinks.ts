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
  const filePath = path.join(process.cwd(), 'public', 'tagsData.json');
  const tags = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  return tags; // return Array of unique tags
}
