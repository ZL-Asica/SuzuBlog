import type { ReactNode } from 'react'
import {
  transformerMetaHighlight,
  transformerNotationErrorLevel,
  transformerNotationFocus,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from '@shikijs/transformers'
import { codeToHtml } from 'shiki'
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
  const lang = matchedLang.toLowerCase()

  const html = await codeToHtml(cleanedChildren, {
    lang,
    theme: 'nord',
    transformers: [
      transformerMetaHighlight(),
      transformerNotationErrorLevel(),
      transformerNotationFocus(),
      transformerNotationHighlight(),
      transformerNotationWordHighlight(),
    ],
  })

  return (
    <div className="relative font-mono">
      <CodeBlockCopy cleanedCode={cleanedChildren} translation={translation} />
      <div
        className="scrollbar-custom"
        tabIndex={0}
        aria-label={`Code block (${lang})`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}

export default CodeBlock
