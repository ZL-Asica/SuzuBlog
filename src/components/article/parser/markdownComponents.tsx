import { isValidElement, type ReactNode } from 'react';
import type { Components } from 'react-markdown';
import Image from 'next/image';
import Link from 'next/link';

import CodeBlock from './renderCodeBlock';
import renderFriendLinks from './renderFriendLinks';

import { slugPrefix, generateHierarchicalSlug } from '@/services/utils';

const createMarkdownComponents = (
  translation: Translation,
  autoSlug: boolean = true
): Components => {
  // Set initial heading levels
  const headingLevels = {
    h2: 0,
    h3: 0,
    h4: 0,
    h5: 0,
    h6: 0,
  };

  const headingLink = (slug: string, level: number, children: ReactNode) => {
    const titleSlug = autoSlug ? `${slugPrefix(slug, level)} ` : '';
    return (
      <Link
        href={`#${slug}`}
        className='no-underline'
      >
        {`${titleSlug}${children}`}
      </Link>
    );
  };

  return {
    h2: ({ children }) => {
      const slug = generateHierarchicalSlug(
        children as ReactNode,
        'h2',
        headingLevels
      );
      return (
        <div className='group'>
          <h2
            className='text-foreground relative mb-6 mt-6 border-b-2 pb-1 text-3xl font-extrabold leading-loose'
            id={slug}
          >
            {headingLink(slug, 2, children as ReactNode)}
            <span className='absolute bottom-[-0.1em] left-0 w-[20%] rounded-md border-b-4 border-[var(--sakuraPink)] transition-all duration-300 ease-in-out group-hover:w-[35%]'></span>
          </h2>
        </div>
      );
    },

    h3: ({ children }) => {
      const slug = generateHierarchicalSlug(
        children as ReactNode,
        'h3',
        headingLevels
      );
      return (
        <h3
          className='text-foreground my-5 border-l-4 border-[var(--sakuraPink)] pl-2 text-2xl font-bold leading-relaxed'
          id={slug}
        >
          {headingLink(slug, 3, children as ReactNode)}
        </h3>
      );
    },

    h4: ({ children }) => {
      const slug = generateHierarchicalSlug(
        children as ReactNode,
        'h4',
        headingLevels
      );
      return (
        <h4
          className='text-foreground my-4 border-l-4 border-[var(--skyblue)] pl-2 text-xl font-semibold leading-normal'
          id={slug}
        >
          {headingLink(slug, 4, children as ReactNode)}
        </h4>
      );
    },

    h5: ({ children }) => {
      const slug = generateHierarchicalSlug(
        children as ReactNode,
        'h5',
        headingLevels
      );
      return (
        <h5
          className='text-foreground my-3 text-lg font-medium leading-normal'
          id={slug}
        >
          {headingLink(slug, 5, children as ReactNode)}
        </h5>
      );
    },

    h6: ({ children }) => {
      const slug = generateHierarchicalSlug(
        children as ReactNode,
        'h6',
        headingLevels
      );
      return (
        <h6
          className='text-foreground my-2 text-base font-medium leading-normal'
          id={slug}
        >
          {headingLink(slug, 6, children as ReactNode)}
        </h6>
      );
    },

    p: ({ children }) => (
      <p className='text-foreground my-6 text-base leading-relaxed'>
        {children as ReactNode}
      </p>
    ),

    blockquote: ({ children }) => (
      <div className='my-3 flex justify-center'>
        <blockquote className='w-[95%] rounded-md border-l-4 border-[var(--sakuraPink)] bg-[var(--lightGray)] py-0.5 pl-3 pr-2 italic'>
          {children as ReactNode}
        </blockquote>
      </div>
    ),

    ul: ({ children }) => (
      <div className='my-4 ml-2 rounded-lg border-2 border-dashed border-[var(--sakuraPink)] p-4'>
        <ul className='list-inside list-disc space-y-2'>
          {children as ReactNode}
        </ul>
      </div>
    ),
    ol: ({ children }) => (
      <div className='my-4 ml-2 rounded-lg border-2 border-dashed border-[var(--skyblue)] p-4'>
        <ol className='list-inside list-decimal space-y-2'>
          {children as ReactNode}
        </ol>
      </div>
    ),
    li: ({ children }) => (
      <li className='text-foreground mb-1 leading-relaxed marker:text-[var(--sakuraPink)]'>
        {children as ReactNode}
      </li>
    ),

    code: ({ className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || '');
      return match ? (
        <CodeBlock
          match={match}
          translation={translation}
        >
          {children as ReactNode}
        </CodeBlock>
      ) : (
        <code
          className='rounded bg-[var(--lightGray)] px-2 py-1 font-mono text-base'
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
              : `${translation.newTab}${children?.toString() ?? 'link'}`
          }
          className='mx-1 break-words font-semibold text-[var(--skyBlue)] decoration-dashed underline-offset-2 transition-colors duration-200 ease-in-out hover:text-[var(--sakuraPink)] hover:underline hover:decoration-dotted'
          {...(props as Record<string, unknown>)}
        >
          {children as ReactNode}
        </Link>
      );
    },

    img: ({ src: source = '', alt = 'Image', ...props }) => (
      <Image
        src={source}
        alt={alt}
        width={500}
        height={780}
        priority={false}
        className='relative mx-auto my-6 w-full max-w-full rounded-md'
        {...(props as Record<string, unknown>)}
      />
    ),

    pre: ({ children }) => {
      if (
        isValidElement(children) &&
        children.props?.className === 'language-Links'
      ) {
        return renderFriendLinks(children.props?.children as string);
      }

      const language =
        isValidElement(children) && children.props?.className
          ? children.props.className.replace('language-', '').toUpperCase()
          : 'CODE';

      return (
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

          {/* Language display */}
          <div className='absolute left-1/2 top-2 -translate-x-1/2 transform text-sm font-semibold text-gray-300'>
            {language}
          </div>

          {children as ReactNode}
        </pre>
      );
    },

    table: ({ children }) => (
      <div className='my-6 w-full overflow-visible rounded-lg shadow-lg transition-shadow hover:shadow-xl'>
        <table className='w-full border-separate border-spacing-0 bg-[var(--background)]'>
          {children as ReactNode}
        </table>
      </div>
    ),
    th: ({ children, className }) => (
      <th
        className={`border border-[var(--gray)] bg-[var(--sakuraPink)] px-4 py-3 text-left font-semibold text-gray-100 dark:bg-[var(--sakuraPink-dark)] ${className}`}
      >
        {children as ReactNode}
      </th>
    ),
    td: ({ children, className }) => (
      <td
        className={`text-foreground border border-[var(--gray)] bg-[var(--lightGray)] px-4 py-3 text-left font-medium ${className}`}
      >
        {children as ReactNode}
      </td>
    ),
    tr: ({ children, className }) => (
      <tr
        className={`${className} odd:bg-[var(--background)] even:bg-[var(--gray)]`}
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
