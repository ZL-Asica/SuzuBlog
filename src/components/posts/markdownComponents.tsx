import type { Components } from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import Image from 'next/image';
import type { ReactNode } from 'react';
import { nord } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Link from 'next/link';
import slugify from 'slugify';

const createMarkdownComponents = (): Components => {
  // Set initial heading levels
  const headingLevels = {
    h2: 0,
    h3: 0,
    h4: 0,
    h5: 0,
    h6: 0,
  };

  const resetLowerLevels = (level: keyof typeof headingLevels) => {
    const levels = Object.keys(headingLevels) as (keyof typeof headingLevels)[];
    const startIndex = levels.indexOf(level) + 1;
    for (const key of levels.slice(startIndex)) {
      headingLevels[key] = 0;
    }
  };

  const generateHierarchicalSlug = (
    children: ReactNode,
    level: keyof typeof headingLevels
  ) => {
    headingLevels[level] += 1;
    resetLowerLevels(level);
    const hierarchicalSlug = Object.values(headingLevels)
      .slice(0, Object.keys(headingLevels).indexOf(level) + 1)
      .join('-');
    const baseSlug = slugify(String(children), { lower: true });
    const slug = `${hierarchicalSlug}-${baseSlug}`;

    return slug;
  };

  const headingLink = (slug: string, children: ReactNode) => (
    <Link
      href={`#${slug}`}
      className='no-underline'
    >
      {children}
    </Link>
  );

  return {
    h2: ({ children }) => {
      const slug = generateHierarchicalSlug(children as ReactNode, 'h2');
      return (
        <div className='group'>
          <h2
            className='border-foreground text-foreground relative mb-4 mt-4 border-b-2 pb-1 text-3xl font-extrabold leading-loose'
            id={slug}
          >
            {headingLink(slug, children as ReactNode)}
            <span className='absolute bottom-[-0.1em] left-0 w-[15%] rounded-md border-b-4 border-sakuraPink transition-all duration-300 ease-in-out group-hover:w-[30%]'></span>
          </h2>
        </div>
      );
    },

    h3: ({ children }) => {
      const slug = generateHierarchicalSlug(children as ReactNode, 'h3');
      return (
        <h3
          className='my-4 text-2xl font-bold leading-relaxed'
          id={slug}
        >
          {headingLink(slug, children as ReactNode)}
        </h3>
      );
    },

    h4: ({ children }) => {
      const slug = generateHierarchicalSlug(children as ReactNode, 'h4');
      return (
        <h4
          className='my-3 text-xl font-semibold leading-normal'
          id={slug}
        >
          {headingLink(slug, children as ReactNode)}
        </h4>
      );
    },

    h5: ({ children }) => {
      const slug = generateHierarchicalSlug(children as ReactNode, 'h5');
      return (
        <h5
          className='my-2 text-lg font-medium leading-normal'
          id={slug}
        >
          {headingLink(slug, children as ReactNode)}
        </h5>
      );
    },

    h6: ({ children }) => {
      const slug = generateHierarchicalSlug(children as ReactNode, 'h6');
      return (
        <h6
          className='my-1 text-base font-normal leading-snug'
          id={slug}
        >
          {headingLink(slug, children as ReactNode)}
        </h6>
      );
    },
    p: ({ children }) => (
      <p className='my-4 text-base leading-tight'>{children as ReactNode}</p>
    ),
    blockquote: ({ children }) => (
      <div className='flex justify-center'>
        <blockquote className='my-1 w-[95%] rounded-md border-l-4 border-sakuraPink bg-gray-50 py-0.5 pl-3 pr-2 italic dark:bg-gray-800'>
          {children as ReactNode}
        </blockquote>
      </div>
    ),
    ul: ({ children }) => (
      <ul className='my-4 list-inside list-disc pl-4'>
        {children as ReactNode}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className='my-4 list-inside list-decimal pl-4'>
        {children as ReactNode}
      </ol>
    ),
    li: ({ children }) => <li className='mb-2'>{children as ReactNode}</li>,
    code: ({ className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || '');
      return match ? (
        // <pre>
        <SyntaxHighlighter
          style={nord}
          language={match[1]}
          PreTag='div'
          className='rounded py-1 pl-2 font-mono hover:shadow-2xl'
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        // </pre>
        <code
          className='rounded bg-gray-100 px-2 py-1 font-mono text-base dark:bg-gray-800'
          {...(props as Record<string, unknown>)}
        >
          {children as ReactNode}
        </code>
      );
    },
    a: ({ href = '#', children, ...props }) => {
      const isInternalLink = href.startsWith('/') || href.startsWith('#');
      return (
        <Link
          href={href}
          target={isInternalLink ? undefined : '_blank'}
          rel={isInternalLink ? undefined : 'noopener noreferrer'}
          aria-label={
            isInternalLink
              ? undefined
              : `Open ${children?.toString() ?? 'link'} in a new tab`
          }
          className='mx-1 font-semibold text-darkSkyBlue decoration-dashed underline-offset-2 transition-colors duration-200 ease-in-out hover:text-darkSakuraPink hover:underline hover:decoration-dotted'
          {...(props as Record<string, unknown>)}
        >
          {children as ReactNode}
        </Link>
      );
    },
    img: ({ src: source = '', alt = '', ...props }) => (
      <div className='flex justify-center'>
        <Image
          src={source}
          alt={alt}
          width={600}
          height={400}
          priority={false}
          className='my-6 max-w-full rounded-md'
          {...(props as Record<string, unknown>)}
        />
      </div>
    ),
    pre: ({ children }) => (
      <pre className='relative overflow-hidden rounded-lg bg-gray-700 pt-8 shadow-md shadow-slate-950 hover:shadow-xl dark:shadow-slate-700'>
        {/* MacOS window buttons */}
        <div className='absolute left-3 top-2 flex space-x-2'>
          {/* Red button */}
          <span className='h-3 w-3 rounded-full bg-red-500'></span>
          {/* Yellow button */}
          <span className='h-3 w-3 rounded-full bg-yellow-400'></span>
          {/* Green button */}
          <span className='h-3 w-3 rounded-full bg-green-500'></span>
        </div>

        {children as ReactNode}
      </pre>
    ),
    table: ({ children }) => (
      <table className='my-6 w-full border-collapse overflow-auto rounded-lg font-medium shadow-lg transition-shadow hover:shadow-xl dark:bg-darkBackground'>
        {children as ReactNode}
      </table>
    ),
    th: ({ children }) => (
      <th className='dark:bg-sakuraPink-dark border border-slate-300 bg-darkSakuraPink px-4 py-3 text-left text-gray-200'>
        {children as ReactNode}
      </th>
    ),
    td: ({ children }) => (
      <td className='border border-slate-200 px-4 py-3 text-left font-medium dark:border-darkForeground dark:bg-gray-800'>
        {children as ReactNode}
      </td>
    ),
    tr: ({ children, className }) => (
      <tr
        className={`${className} font-medium even:bg-gray-50 dark:even:bg-gray-700`}
      >
        {children as ReactNode}
      </tr>
    ),
    hr: () => (
      <div className='flex justify-center'>
        <hr className='mx-auto my-8 max-w-[75%] border-t-2 border-lightForeground' />
      </div>
    ),
  };
};

export default createMarkdownComponents;
