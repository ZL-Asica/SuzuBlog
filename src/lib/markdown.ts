import matter from 'gray-matter';
import { marked, Tokens } from 'marked';
import hljs from 'highlight.js';
import { Frontmatter } from '@/types';

export async function parseMarkdown(
  content: string,
): Promise<{ frontmatter: Frontmatter; contentHtml: string }> {
  const { data: frontmatterData, content: markdownContent } = matter(content);

  // Replace all comments but keep <!--more-->
  const contentSanitized = markdownContent.replace(/<!--[^>]*-->/g, (match) => {
    return match === '<!--more-->' ? match : '';
  });

  const renderer = new marked.Renderer();

  // Override the default `code` method
  renderer.code = function ({ text, lang }: { text: string; lang?: string }) {
    // Ensure code is a string and handle potential null or undefined lang
    const validCode = typeof text === 'string' ? text : '';
    const language = lang && hljs.getLanguage(lang) ? lang : 'plaintext';

    // Highlight the code using highlight.js
    const highlighted = hljs.highlight(validCode, { language }).value;

    // Return the formatted HTML with language class
    return `<pre><code class="hljs language-${language}">${highlighted}</code></pre>`;
  };

  // Override the default `link` method
  renderer.link = function ({ href, title, text }: Tokens.Link) {
    const linkTitle = title || text || 'undefined link title';
    // Return the formatted HTML with target blank and noreferrer
    return `<a href="${href}" class="post-content-link" target="_blank" title="${linkTitle}" rel="noopener noreferrer">${text}</a>`;
  };

  // Override the default `image` method
  renderer.image = function ({ href, title, text }: Tokens.Image) {
    const imgTitle = title || text || 'undefined image alt';
    // Return the formatted HTML with lazy loading
    return `<img src="${href}" class="post-content-img" alt="${text}" title="${imgTitle}" loading="lazy" />`;
  };

  marked.use({
    async: true,
    pedantic: false,
    gfm: true,
    renderer,
  });

  // Process the sanitized content through marked
  const processedContent = await marked(contentSanitized);

  return {
    frontmatter: frontmatterData as Frontmatter,
    contentHtml: processedContent,
  };
}
