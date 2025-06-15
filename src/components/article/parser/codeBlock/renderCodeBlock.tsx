import type { ReactNode } from 'react'
import {
  transformerMetaHighlight,
  transformerNotationErrorLevel,
  transformerNotationFocus,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from '@shikijs/transformers'
import { createHighlighter } from 'shiki'
import CodeBlockCopy from './CodeBlockCopy'

import './shiki.css'

interface CodeBlockProps {
  matchedLang: string
  translation: Translation
  children: ReactNode
}

const CodeBlock = async ({
  matchedLang,
  translation,
  children,
}: CodeBlockProps) => {
  const cleanedChildren = String(children).replace(/\n$/, '')
  const matchedLangLo = matchedLang.toLowerCase()

  const highlighter = await createHighlighter({
    themes: ['nord'],
    langs: [matchedLangLo],
  })

  const code = highlighter.codeToHtml(cleanedChildren, {
    lang: matchedLangLo,
    theme: 'nord',
    transformers: [
      transformerMetaHighlight(),
      transformerNotationErrorLevel(),
      transformerNotationFocus(),
      transformerNotationHighlight(),
      transformerNotationWordHighlight(),
    ],
  })

  highlighter.dispose()

  return (
    <div className="relative font-mono">
      <CodeBlockCopy
        cleanedCode={cleanedChildren}
        translation={translation}
      />
      <div className="scrollbar-custom">
        <code dangerouslySetInnerHTML={{ __html: code }} />
      </div>
    </div>
  )
}

export default CodeBlock
