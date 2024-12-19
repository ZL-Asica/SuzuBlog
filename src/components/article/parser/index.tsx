import Markdown from 'react-markdown'
import rehypeKatex from 'rehype-katex'
import rehypeRaw from 'rehype-raw'
import remarkGemoji from 'remark-gemoji'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

import createMarkdownComponents from './markdownComponents'

import 'katex/dist/katex.min.css'

interface MarkdownContentProps {
  post: FullPostData
  translation: Translation
}

function MarkdownContent({ post, translation }: MarkdownContentProps) {
  const markdownComponents = createMarkdownComponents(
    translation,
    post.frontmatter.autoSlug,
  )
  return (
    <Markdown
      remarkPlugins={[remarkGfm, remarkMath, remarkGemoji]}
      rehypePlugins={[rehypeRaw, rehypeKatex]}
      components={markdownComponents}
      className="mt-5"
    >
      {post.contentRaw}
    </Markdown>
  )
}

export default MarkdownContent
