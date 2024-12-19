'use client'

import type { ReactNode } from 'react'
import { copyToClipboard, useToggle } from '@zl-asica/react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { nord } from 'react-syntax-highlighter/dist/esm/styles/hljs'

interface CodeBlockProperties {
  match: RegExpExecArray
  translation: Translation
  children: ReactNode
}

function CodeBlock({ match, translation, children }: CodeBlockProperties) {
  const [isCopied, toggleCopied] = useToggle()
  const cleanedChildren = String(children).replace(/\n$/, '')

  const handleCopyClick = () => {
    void (async () => {
      await copyToClipboard(cleanedChildren, toggleCopied, 3000)
    })()
  }

  return (
    <div className="relative">
      {/* Copy button */}
      <button
        type="button"
        onClick={handleCopyClick}
        className="absolute -top-7 right-2 rounded bg-[var(--skyblue)] px-2 py-1 text-xs hover:bg-opacity-80"
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
          fontSize: '0.8em',
          paddingRight: '10px',
        }}
        PreTag="div"
        className="scrollbar-custom rounded py-1 pl-2 font-mono hover:shadow-2xl"
      >
        {cleanedChildren}
      </SyntaxHighlighter>
    </div>
  )
}

export default CodeBlock
