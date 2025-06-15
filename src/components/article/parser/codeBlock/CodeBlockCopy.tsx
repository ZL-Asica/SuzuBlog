'use client'

import { useToggle } from '@zl-asica/react'
import { copyToClipboard } from '@zl-asica/react/utils'

interface CodeBlockCopyProps {
  cleanedCode: string
  translation: Translation
}

const CodeBlockCopy = ({
  cleanedCode,
  translation,
}: CodeBlockCopyProps) => {
  const [isCopied, toggleCopied] = useToggle()
  const handleCopyClick = () => {
    void (async () => {
      await copyToClipboard(cleanedCode, toggleCopied, 3000)
    })()
  }

  return (
    <button
      type="button"
      onClick={handleCopyClick}
      className={`bg-hover-primary transition-all-300 absolute -top-7 right-2 font-medium text-foreground rounded-sm
          ${isCopied ? 'bg-primary-300' : 'bg-secondary-300'}
          px-2 py-1 text-xs dark:text-background hover:scale-105 hover:rounded-md`}
    >
      {isCopied ? translation.post.copied : translation.post.copy}
    </button>
  )
}

export default CodeBlockCopy
