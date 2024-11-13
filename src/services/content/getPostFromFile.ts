import { promises as fsPromises } from 'node:fs';
import path from 'node:path';

import { defaultTo, forEach, replace, trim } from 'es-toolkit/compat';
import matter from 'gray-matter';

import { getConfig } from '@/services/config';
import { fileExists, formatDateTime } from '@/services/utils/fileUtils';

const config = getConfig();

async function getPostFromFile(
  filePath: string,
  slug: string
): Promise<PostData> {
  const { frontmatter, postAbstract, contentRaw, lastModified } =
    await parseMarkdown(filePath, slug);

  return {
    slug,
    postAbstract,
    frontmatter,
    contentRaw,
    lastModified,
  };
}

async function parseMarkdown(
  filePath: string,
  slug: string
): Promise<{
  frontmatter: Frontmatter;
  postAbstract: string;
  contentRaw: string;
  lastModified: string;
}> {
  const fileContents = await fsPromises.readFile(filePath, 'utf8');
  const { data, content: markdownContent } = matter(fileContents);

  const [thumbnail, { date, lastModified }] = await Promise.all([
    resolveThumbnail(data.thumbnail),
    resolveDate(data.date, filePath),
  ]);

  const frontmatterData: Frontmatter = {
    title: (data.title as string)?.slice(0, 100) || slug,
    author: (data.author as string)?.slice(0, 30) || config.author.name,
    thumbnail,
    date,
    tags: defaultTo(data.tags),
    categories: defaultTo(data.categories),
    redirect: defaultTo(data.redirect),
    showComments: defaultTo(data.showComments, true),
  };

  // Clean up HTML comments and render friend links
  let contentSanitized = removeHtmlComments(markdownContent);
  if (contentSanitized.includes('{% links %}')) {
    contentSanitized = replace(
      contentSanitized,
      /{% links %}([\S\s]*?){% endlinks %}/g,
      (_, jsonString) => renderFriendLinks(trim(jsonString))
    );
  }

  const postAbstract = processPostAbstract(
    contentSanitized.split('<!--more-->')[0]
  );

  return {
    frontmatter: frontmatterData,
    postAbstract,
    contentRaw: markdownContent,
    lastModified,
  };
}

function removeHtmlComments(input) {
  let previous;
  do {
    previous = input;
    replace(input, /<!--[^>]*-->/g, (match) =>
      match === '<!--more-->' ? match : ''
    );
  } while (input !== previous);
  return input;
}

// Helper function to resolve thumbnail
async function resolveThumbnail(thumbnail?: string): Promise<string> {
  if (thumbnail && !thumbnail.includes('://')) {
    const thumbnailPath = path.join(process.cwd(), 'public', thumbnail);
    return (await fileExists(thumbnailPath)) ? thumbnail : config.background;
  }
  return thumbnail || config.background;
}

// Helper function to resolve date
async function resolveDate(
  originalDate?: string,
  fullPath?: string
): Promise<{
  date: string;
  lastModified: string;
}> {
  const stats = await fsPromises.stat(fullPath!);
  const date = originalDate
    ? formatDateTime(originalDate)
    : replace(stats.mtime.toISOString(), 'T', ' ').split('.')[0];
  const lastModified = stats.mtime.toISOString();
  return { date, lastModified };
}

// Helper function to render friend links
function renderFriendLinks(jsonString: string): string {
  try {
    const links = JSON.parse(jsonString);
    const linksHtml = links
      .map(
        (link: {
          title?: string;
          link?: string;
          img?: string;
          des?: string;
        }) => `
        <li class="friend-link-item" data-description="${link.des || ''}" role="listitem">
          <a href="${link.link || ''}" target="_blank" rel="noopener noreferrer" class="friend-link">
            <img src="${link.img || ''}" alt="Avatar of ${link.title || ''}" class="friend-link-img" loading="lazy" />
            <div class="friend-link-content"><p class="friend-link-title">${link.title || ''}</p></div>
          </a>
        </li>
      `
      )
      .join('');
    return `<div class="friends-links"><ul class="friends-links-list" role="list">${linksHtml}</ul></div>`;
  } catch {
    return '<div>Invalid JSON in links block</div>';
  }
}

// Helper function to create post abstract
function processPostAbstract(contentRaw: string): string {
  let contentStripped = contentRaw;
  const replacements: [RegExp, string][] = [
    [/#* (.*)/g, '$1'], // Remove headings
    [/!\[.*?]\(.*?\)/g, ''], // Remove images
    [/\[(.*?)]\(.*?\)/g, '$1'], // Remove links but keep text
    [/`([^`]+)`/g, '$1'], // Remove inline code backticks
    [/(\*\*|__)(.*?)\1/g, '$2'], // Remove bold formatting
    [/(\*|_)(.*?)\1/g, '$2'], // Remove italic formatting
    [/(\r?\n)+/g, ' '], // Replace line breaks with spaces
    [/^-{3,}$/gm, ''], // Remove horizontal rules
    [/>\s?/g, ''], // Remove blockquote '>' symbols
    [/([*+-])\s/g, ''], // Remove unordered list markers
    [/^\d+\.\s+/g, ''], // Remove ordered list markers
  ];
  forEach(replacements, ([pattern, replacement]) => {
    contentStripped = replace(contentStripped, pattern, replacement);
  });

  return trim(contentStripped).slice(0, 150);
}

export default getPostFromFile;
