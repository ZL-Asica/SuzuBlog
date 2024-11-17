'use client';

import { nord } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import type { Prism as SyntaxHighlighterBase } from 'react-syntax-highlighter';

const SyntaxHighlighter = dynamic(
  () => import('react-syntax-highlighter').then((module_) => module_.Prism),
  {
    ssr: false,
  }
) as typeof SyntaxHighlighterBase;

interface CopyCodeBlockProperties {
  match: RegExpExecArray;
  translation: Translation;
  children: React.ReactNode;
}

const CopyCodeBlock = ({
  match,
  translation,
  children,
}: CopyCodeBlockProperties) => {
  const [isCopied, setIsCopied] = useState(false);
  const copyTranslation = translation.post.copy;
  const copiedTranslation = translation.post.copied;

  // Copy code block to clipboard
  const handleCopy = () => {
    if (isCopied) return;
    navigator.clipboard.writeText(String(children).replace(/\n$/, ''));
    setIsCopied(true);
    // Hide the 'Copied!' message after 3 seconds
    setTimeout(() => setIsCopied(false), 3000);
  };

  return (
    <div className='relative'>
      {/* Copy button */}
      <button
        onClick={handleCopy}
        className='absolute -top-7 right-2 rounded bg-[var(--skyblue)] px-2 py-1 text-xs hover:bg-opacity-80'
      >
        {isCopied ? copiedTranslation : copyTranslation}
      </button>

      {/* Code block */}
      <SyntaxHighlighter
        style={nord}
        language={match[1]}
        showLineNumbers
        lineNumberStyle={{
          color: '#88C0D0',
          fontSize: '0.8em',
          paddingRight: '10px',
        }}
        PreTag='div'
        className='scrollbar-custom rounded py-1 pl-2 font-mono hover:shadow-2xl'
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    </div>
  );
};

export default CopyCodeBlock;
