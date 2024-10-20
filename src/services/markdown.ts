import matter from 'gray-matter';
import { marked, Tokens } from 'marked';
import hljs from 'highlight.js';
import { Frontmatter } from '@/types';
import { renderLinks } from '@/services/friendsLinks';

export async function parseMarkdown(
  content: string,
): Promise<{ frontmatter: Frontmatter; contentHtml: string }> {
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

  return {
    frontmatter: frontmatterData as Frontmatter,
    contentHtml: processedContent,
  };
}
