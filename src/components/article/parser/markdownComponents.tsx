import type { ReactNode } from 'react'
import type { Components as MarkdownComponents } from 'react-markdown'

import { CustomImage, SakuraIcon } from '@/components/ui'
import { generateHierarchicalSlug, slugPrefix } from '@/services/utils'

import Link from 'next/link'
import { isValidElement } from 'react'

import { KEY_ICONS } from './keyboardIcons'
import CodeBlock from './renderCodeBlock'
import renderFriendLinks from './renderFriendLinks'

const createMarkdownComponents = (translation: Translation, autoSlug: boolean = true): MarkdownComponents => {
  // Set initial heading levels
  const headingLevels = {
    h2: 0,
    h3: 0,
    h4: 0,
    h5: 0,
    h6: 0,
  }

  const titleSlug = (slug: string, level: number) => autoSlug ? `${slugPrefix(slug, level)} ` : ''

  return {
    // Heading related
    h2: ({ children }) => {
      const slug = generateHierarchicalSlug('h2', headingLevels)
      return (
        <div className="group">
          <h2
            className="text-foreground relative mb-6 mt-6 border-b-2 pb-1 text-3xl font-extrabold leading-loose transition-colors duration-300 hover:text-[var(--sakuraPink)]"
            id={slug}
          >
            {titleSlug(slug, 2)}
            {children}
            <span className="absolute bottom-[-0.1em] left-0 w-[20%] rounded-md border-b-4 border-[var(--sakuraPink)] transition-all duration-300 ease-in-out group-hover:w-[35%]"></span>
          </h2>
        </div>
      )
    },

    h3: ({ children }) => {
      const slug = generateHierarchicalSlug('h3', headingLevels)
      return (
        <h3
          className="text-foreground my-5 border-l-4 border-[var(--sakuraPink)] pl-2 text-2xl font-bold leading-relaxed transition-colors duration-300 hover:text-[var(--sakuraPink)]"
          id={slug}
        >
          {titleSlug(slug, 3)}
          {children}
        </h3>
      )
    },

    h4: ({ children }) => {
      const slug = generateHierarchicalSlug('h4', headingLevels)
      return (
        <h4
          className="text-foreground my-4 border-l-4 border-[var(--skyblue)] pl-2 text-xl font-semibold leading-normal transition-colors duration-300 hover:text-[var(--sakuraPink)]"
          id={slug}
        >
          {titleSlug(slug, 4)}
          {children}
        </h4>
      )
    },

    h5: ({ children }) => {
      const slug = generateHierarchicalSlug('h5', headingLevels)
      return (
        <h5
          className="text-foreground my-3 text-lg font-medium leading-normal transition-colors duration-300 hover:text-[var(--sakuraPink)]"
          id={slug}
        >
          {titleSlug(slug, 5)}
          {children}
        </h5>
      )
    },

    h6: ({ children }) => {
      const slug = generateHierarchicalSlug('h6', headingLevels)
      return (
        <h6
          className="text-foreground my-2 text-base font-medium leading-normal transition-colors duration-300 hover:text-[var(--sakuraPink)]"
          id={slug}
        >
          {titleSlug(slug, 6)}
          {children}
        </h6>
      )
    },

    // Text related
    p: ({ children }) => (
      <p className="text-foreground my-6 text-base leading-relaxed">
        {children}
      </p>
    ),
    em: ({ children }) => (
      <em className="italic text-[var(--skyblueDark)] ml-0.5 mr-1">
        {children}
      </em>
    ),
    u: ({ children }) => (
      <u className="mx-0.5 underline font-medium underline-offset-2 decoration-[var(--sakuraPink)] transition-all duration-300 hover:decoration-dotted">
        {children}
      </u>
    ),
    strong: ({ children }) => (
      <strong className="font-extrabold text-[var(--sakuraPink)] mx-1">
        {children}
      </strong>
    ),
    del: ({ children }) => (
      <del className="line-through text-[var(--gray)]">
        {children}
      </del>
    ),
    sup: ({ children }) => <sup className="text-xs align-super">{children}</sup>,
    sub: ({ children }) => <sub className="text-xs align-sub">{children}</sub>,
    blockquote: ({ children }) => (
      <div className="my-3 flex justify-center">
        <blockquote className="w-[95%] rounded-md border-l-4 border-[var(--sakuraPink)] bg-[var(--lightGray)] py-0.5 pl-3 pr-2 italic">
          {children}
        </blockquote>
      </div>
    ),
    details: ({ children }) => (
      <details className="cursor-pointer rounded-lg border border-gray-300 bg-[var(--background)] p-3 open:bg-[var(--background)]">
        {children}
      </details>
    ),
    summary: ({ children }) => (
      <summary className="font-semibold text-[var(--sakuraPink)] cursor-pointer">
        {children}
      </summary>
    ),
    mark: ({ children }) => (
      <mark className="bg-yellow-200 px-1 py-0.5 rounded">
        {children}
      </mark>
    ),

    // List related
    ul: ({ children }) => (
      <div className="my-4 ml-2 rounded-lg border-2 border-dashed border-[var(--sakuraPink)] p-4">
        <ul className="list-disc list-inside">{children}</ul>
      </div>
    ),
    ol: ({ children }) => (
      <div className="my-4 ml-2 rounded-lg border-2 border-dashed border-[var(--skyblue)] p-4">
        <ol className="list-decimal list-inside">{children}</ol>
      </div>
    ),
    li: ({ children }) => (
      <li className="text-foreground leading-relaxed marker:text-[var(--sakuraPink)] list-outside pl-4 ml-4">
        {children}
      </li>
    ),

    // Link related
    a: ({ href = '#', children, ...props }: { href?: string, children?: ReactNode }) => {
      const isInternalLink = typeof href === 'string' && (href.startsWith('/') || href.startsWith('#'))
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
          prefetch={false}
          className="mx-1 break-words font-semibold text-[var(--skyBlue)] underline decoration-dashed underline-offset-2 transition-colors duration-200 ease-in-out hover:text-[var(--sakuraPink)] hover:underline hover:decoration-dotted"
          {...(props as Record<string, unknown>)}
        >
          {children}
        </Link>
      )
    },

    // Image related
    img: ({ src: source = '', alt = 'Image', ...props }: { src?: string, alt?: string }) => (
      <CustomImage
        src={source}
        alt={alt}
        width={500}
        height={700}
        priority={false}
        className="relative mx-auto my-6 h-auto max-h-[500px] min-h-[200px] w-auto min-w-[200px] max-w-full rounded-xs object-contain shadow-md lg:max-h-[700px] lg:min-h-[300px] lg:min-w-[300px] xl:max-h-[800px] xl:min-h-[400px] xl:min-w-[400px]"
        {...(props as Record<string, unknown>)}
      />
    ),

    // Code related
    code: ({ className, children, ...props }) => {
      const match = typeof className === 'string' ? /language-(\w+)/.exec(className) : null
      return match
        ? (
            <CodeBlock
              match={match}
              translation={translation}
            >
              {children}
            </CodeBlock>
          )
        : (
            <code
              className="rounded-sm bg-[var(--lightGray)] px-2 py-1 font-mono text-base"
              {...(props as Record<string, unknown>)}
            >
              {children}
            </code>
          )
    },

    pre: ({ children }: { children?: ReactNode }) => {
      if (
        // avoid className not exist
        isValidElement(children)
        && typeof (children.props as { className?: string }).className === 'string' && (children.props as { className?: string }).className !== null && (children.props as { className?: string }).className !== ''
        && (children.props as { className?: string }).className === 'language-Links'
      ) {
        return renderFriendLinks(
          (children.props as { children: string }).children,
          translation,
        )
      }

      const language
        = isValidElement(children) && (children.props as { className?: string }).className != null && (children.props as { className?: string }).className !== ''
          ? ((children.props as { className?: string })?.className ?? '')
              .replace('language-', '')
              .toUpperCase()
          : 'CODE'

      return (
        <pre className="relative overflow-hidden rounded-lg bg-gray-700 pt-8 shadow-md shadow-slate-950 transition-shadow duration-300 ease-in-out hover:shadow-lg dark:shadow-slate-700">
          {/* MacOS window buttons */}
          <div className="absolute left-3 top-2 flex space-x-2">
            {/* Red button */}
            <span className="h-3 w-3 rounded-full bg-red-500"></span>
            {/* Yellow button */}
            <span className="h-3 w-3 rounded-full bg-yellow-400"></span>
            {/* Green button */}
            <span className="h-3 w-3 rounded-full bg-green-500"></span>
          </div>

          {/* Language display */}
          <div className="absolute left-1/2 top-2 -translate-x-1/2 transform text-sm font-semibold text-gray-300">
            {language}
          </div>

          {children}
        </pre>
      )
    },
    kbd: ({ children }) => {
      const key = children?.toString().toLowerCase().replace(/\s+/g, '') ?? ''

      return (
        <kbd className="inline-fle items-center justify-center gap-1 rounded-md border border-gray-500 bg-gray-800 px-2 py-1 text-sm font-mono text-white shadow-md">
          {KEY_ICONS[key] ?? children}
        </kbd>
      )
    },

    // Table related
    table: ({ children }) => (
      <div className="my-6 w-full overflow-visible rounded-lg shadow-lg transition-shadow hover:shadow-xl">
        <table className="w-full border-separate border-spacing-0 bg-[var(--background)]">
          {children}
        </table>
      </div>
    ),
    th: ({ children, className }) => (
      <th
        className={`border border-[var(--gray)] bg-[var(--sakuraPink)] px-4 py-3 text-left font-semibold text-gray-100 dark:bg-[var(--sakuraPink-dark)] ${className}`}
      >
        {children}
      </th>
    ),
    td: ({ children, className }) => (
      <td
        className={`text-foreground border border-[var(--gray)] bg-[var(--lightGray)] px-4 py-3 text-left font-medium ${className}`}
      >
        {children}
      </td>
    ),
    tr: ({ children, className }) => (
      <tr className={`${className} odd:bg-[var(--background)] even:bg-[var(--gray)]`}>
        {children}
      </tr>
    ),

    hr: () => (
      <div className="relative my-12 flex items-center justify-center group">
        <hr className="h-0.5 w-2/5 bg-gradient-to-r from-transparent via-[var(--sakuraPink)] to-transparent transition-all duration-500 ease-in-out group-hover:w-1/2 group-hover:opacity-90" />

        <div className="relative mx-4 h-8 w-8 flex items-center justify-center transition-transform duration-[3s] ease-in-out group-hover:rotate-[720deg]">
          <div className="absolute inset-0 flex items-center justify-center">
            <SakuraIcon />
          </div>
        </div>

        <hr className="h-0.5 w-2/5 bg-gradient-to-l from-transparent via-[var(--sakuraPink)] to-transparent transition-all duration-500 ease-in-out group-hover:w-1/2 group-hover:opacity-90" />
      </div>
    ),
    br: () => (
      <div className="flex justify-center">
        <br className="my-4" />
      </div>
    ),
  }
}

export default createMarkdownComponents
