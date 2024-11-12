import fs from 'node:fs';
import path from 'node:path';

import { defaultTo } from 'es-toolkit/compat';
import matter from 'gray-matter';
import hljs from 'highlight.js';
import { marked } from 'marked';

import { getConfig } from '@/services/config';
import { fileExists, formatDateTime } from '@/services/utils/fileUtils';

const config = getConfig();

async function getPostFromFile(
  filePath: string,
  slug: string
): Promise<PostData> {
  const fileContents = await fs.promises.readFile(filePath, 'utf8');
  const { frontmatter, postAbstract, contentHtml } = await parseMarkdown(
    fileContents,
    filePath,
    slug
  );

  // Get last modified date
  const fileStats = await fs.promises.stat(filePath);
  const lastModified = fileStats.mtime.toISOString();

  return {
    slug,
    postAbstract,
    frontmatter,
    contentHtml,
    lastModified,
  };
}

async function parseMarkdown(
  fileContents: string,
  filePath: string,
  slug: string
): Promise<{
  frontmatter: Frontmatter;
  postAbstract: string;
  contentHtml: string;
}> {
  const { data, content: markdownContent } = matter(fileContents);
  const frontmatterData: Frontmatter = {
    title: (data.title as string)?.slice(0, 100) || slug,
    author: (data.author as string)?.slice(0, 30) || config.author.name,
    thumbnail: await resolveThumbnail(data.thumbnail),
    date: await resolveDate(data.date, filePath),
    tags: defaultTo(data.tags),
    categories: defaultTo(data.categories),
    redirect: defaultTo(data.redirect),
    showComments: defaultTo(data.showComments, true),
  };

  // Clean up HTML comments
  let contentSanitized = markdownContent.replaceAll(/<!--[^>]*-->/g, (match) =>
    match === '<!--more-->' ? match : ''
  );

  if (contentSanitized.includes('{% links %}')) {
    contentSanitized = contentSanitized.replaceAll(
      /{% links %}([\S\s]*?){% endlinks %}/g,
      (_, jsonString) => renderFriendLinks(jsonString.trim())
    );
  }

  // Custom renderer for marked
  const renderer = new marked.Renderer();
  renderer.code = ({ text, lang }) => highlightCodeBlock(text, lang);
  renderer.link = ({ href, title, text }) =>
    createLink(href, text, title ?? '');
  renderer.image = ({ href, title, text }) =>
    createImage(href, text, title ?? '');

  marked.use({ async: true, pedantic: false, gfm: true, renderer });
  const processedContent = await marked(contentSanitized);
  const postAbstract = processPostAbstract(processedContent);

  return {
    frontmatter: frontmatterData,
    postAbstract,
    contentHtml: processedContent,
  };
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
async function resolveDate(date?: string, fullPath?: string): Promise<string> {
  if (date) return formatDateTime(date);
  const stats = await fs.promises.stat(fullPath!);
  return stats.mtime.toISOString().replace('T', ' ').split('.')[0];
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
    return '<>Invalid JSON in links block</>';
  }
}

// Helper function for syntax highlighting
function highlightCodeBlock(text: string, lang?: string): string {
  if (text.includes('friend-link')) return text;
  const language = lang && hljs.getLanguage(lang) ? lang : 'plaintext';
  const highlighted = hljs.highlight(text, { language }).value;
  return `<pre><code class="hljs language-${language}">${highlighted}</code></pre>`;
}

// Helper function to create links with accessibility and external indication
function createLink(href: string, text: string, title: string): string {
  const target = href.includes('://') ? '_blank' : '_self';
  const ariaLabel = target === '_blank' ? ' (new tab)' : '';
  return `<a href="${href}" class="post-content-link" target="${target}" aria-label="${title || text} ${ariaLabel}" rel="noopener noreferrer">${text}</a>`;
}

// Helper function to create lazy-loaded images
function createImage(href: string, text: string, title: string): string {
  return `<img src="${href}" class="post-content-img" alt="${title || text}" loading="lazy" />`;
}

// Helper function to create post abstract
function processPostAbstract(contentHtml: string): string {
  const plainText = contentHtml
    .replaceAll('<!--more-->', '[[MORE_PLACEHOLDER]]')
    .replaceAll(/<[^>]*>/g, '');
  const moreIndex = plainText.indexOf('[[MORE_PLACEHOLDER]]');
  return (
    moreIndex > 0 ? plainText.slice(0, moreIndex) : plainText.slice(0, 150)
  )
    .replaceAll(/\s+/g, ' ')
    .trim();
}

export { getPostFromFile };
