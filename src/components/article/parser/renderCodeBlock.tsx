'use client'

import type { ReactNode } from 'react'
import { copyToClipboard, useToggle } from '@zl-asica/react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { nord } from 'react-syntax-highlighter/dist/esm/styles/hljs'

interface CodeBlockProps {
  match: RegExpExecArray
  translation: Translation
  children: ReactNode
}

const CodeBlock = ({ match, translation, children }: CodeBlockProps) => {
  const [isCopied, toggleCopied] = useToggle()
  const cleanedChildren = String(children).replace(/\n$/, '')

  const handleCopyClick = () => {
    void (async () => {
      await copyToClipboard(cleanedChildren, toggleCopied, 3000)
    })()
  }

  return (
    <div className="relative font-mono">
      {/* Copy button */}
      <button
        type="button"
        onClick={handleCopyClick}
        className={`bg-hover-primary transition-all-300 absolute -top-7 right-2 font-medium text-foreground rounded-sm
          ${isCopied ? 'bg-primary-300' : 'bg-secondary-300'}
          px-2 py-1 text-xs dark:text-background hover:scale-105 hover:rounded-md`}
      >
        {isCopied ? translation.post.copied : translation.post.copy}
      </button>

      {/* Code block */}
      <SyntaxHighlighter
      // eslint-disable-next-line ts/no-unsafe-assignment
        style={nord}
        language={match[1]}
        showLineNumbers
        lineNumberStyle={{
          color: '#88C0D0',
          fontSize: '0.95em',
          paddingRight: '1em',
        }}
        className="scrollbar-custom rounded-b-sm py-1"
      >
        {cleanedChildren}
      </SyntaxHighlighter>
    </div>
  )
}

export default CodeBlock
