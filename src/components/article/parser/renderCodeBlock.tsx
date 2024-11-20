'use client';

import { nord } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';

interface CodeBlockProperties {
  match: RegExpExecArray;
  translation: Translation;
  children: React.ReactNode;
}

const CodeBlock = ({ match, translation, children }: CodeBlockProperties) => {
  const [isCopied, setIsCopied] = useState(false);
  const cleanedChildren = String(children).replace(/\n$/, '');

  // Copy code block to clipboard
  const handleCopy = () => {
    if (isCopied) return;
      navigator.clipboard.writeText(cleanedChildren);
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
        {isCopied ? translation.post.copied : translation.post.copy}
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
        {cleanedChildren}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
