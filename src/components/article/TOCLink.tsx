'use client'

import { slugPrefix } from '@/services/utils'

interface TOCLinkProps {
  item: TocItems
  activeSlug: string
  handleLinkClick: (slug: string) => void
  autoSlug: boolean
}

const TOCLink = ({ item, activeSlug, handleLinkClick, autoSlug }: TOCLinkProps) => {
  const isActive = activeSlug === item.slug
  const titleSlug = autoSlug ? slugPrefix(item.slug, item.level) : ''

  return (
    <li
      key={item.slug}
      className={`list-none py-1 text-base transition-all duration-200 ${
        isActive ? 'font-bold text-[var(--sakuraPink)]' : 'text-[var(--gray)]'
      } `}
      style={{ marginLeft: `${(item.level - 2) * 0.8}em` }}
    >
      <a
        href={`#${item.slug}`}
        onClick={(event) => {
          event.preventDefault()
          handleLinkClick(item.slug)
        }}
        className="block break-words no-underline transition-all duration-200 hover:text-[var(--sakuraPink)]"
      >
        {`${titleSlug}${item.title}`}
      </a>
    </li>
  )
}

export default TOCLink
