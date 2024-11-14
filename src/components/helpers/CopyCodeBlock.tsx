'use client';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { nord } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useState } from 'react';

interface CopyCodeBlockProperties {
  match: RegExpExecArray;
  children: React.ReactNode;
}

const CopyCodeBlock = ({ match, children }: CopyCodeBlockProperties) => {
  const [isCopied, setIsCopied] = useState(false);

  // Copy code block to clipboard
  const handleCopy = () => {
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
        className='absolute right-2 top-2 rounded bg-[var(--skyblue)] px-2 py-1 text-xs text-white hover:bg-opacity-80'
      >
        {isCopied ? 'Copied!' : 'Copy'}
      </button>

      {/* Code block */}
      <SyntaxHighlighter
        style={nord}
        language={match[1]}
        PreTag='div'
        className='scrollbar-custom rounded py-1 pl-2 font-mono hover:shadow-2xl'
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    </div>
  );
};

export default CopyCodeBlock;
