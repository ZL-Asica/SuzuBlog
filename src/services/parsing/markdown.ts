import { renderLinks } from '@/services/parsing/friendsLinks';
import { Frontmatter } from '@/types';
import matter from 'gray-matter';
import hljs from 'highlight.js';
import { marked, Tokens } from 'marked';

function processPostAbstract(contentHtml: string): string {
  // Remove HTML tags and comments (before more if exist)
  const plainText = contentHtml
    .replace(/<!--more-->/g, '[[MORE_PLACEHOLDER]]')
    .replace(/<[^>]*>/g, '');

  const moreIndex = plainText.indexOf('[[MORE_PLACEHOLDER]]');

  const contentSliced =
    moreIndex > 0
      ? plainText.slice(0, moreIndex).replace('[[MORE_PLACEHOLDER]]', '')
      : plainText.slice(0, 150);

  // remove newlines and extra spaces
  return contentSliced.replace(/\s+/g, ' ').trim();
}

export async function parseMarkdown(content: string): Promise<{
  frontmatter: Frontmatter;
  postAbstract: string;
  contentHtml: string;
}> {
  const { data: frontmatterData, content: markdownContent } = matter(content);

  // Replace all comments but keep <!--more-->
  let contentSanitized = markdownContent.replace(/<!--[^>]*-->/g, (match) => {
    return match === '<!--more-->' ? match : '';
  });

  const renderer = new marked.Renderer();

  // Override the default `code` method
  renderer.code = function ({ text, lang }: { text: string; lang?: string }) {
    // Ensure code is a string and handle potential null or undefined lang
    const validCode = typeof text === 'string' ? text : '';

    // Check if the code contains the specific "link-card" HTML structure
    if (
      validCode.includes('<div class="friends-links">') &&
      validCode.includes('</div>')
    ) {
      // If it's a link card, return the HTML directly without highlighting
      return validCode;
    }

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

  // Custom handler to find and replace {% links %}...{% endlinks %} blocks with rendered HTML
  if (contentSanitized.includes('{% links %}')) {
    contentSanitized = contentSanitized.replace(
      /{% links %}([\s\S]*?){% endlinks %}/g,
      (_, jsonString) => renderLinks(jsonString.trim()),
    );
  }

  marked.use({
    async: true,
    pedantic: false,
    gfm: true,
    renderer,
  });

  // Process the sanitized content through marked
  const processedContent = await marked(contentSanitized);

  const postAbstract = processPostAbstract(processedContent);

  return {
    frontmatter: frontmatterData as Frontmatter,
    postAbstract: postAbstract,
    contentHtml: processedContent,
  };
}
