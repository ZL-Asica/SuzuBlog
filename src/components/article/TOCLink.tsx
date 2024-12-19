'use client'

import { slugPrefix } from '@/services/utils'

interface TOCLinkProperties {
  item: TocItems
  activeSlug: string
  handleLinkClick: (slug: string) => void
  autoSlug: boolean
}

function TOCLink({ item, activeSlug, handleLinkClick, autoSlug }: TOCLinkProperties) {
  const isActive = activeSlug === item.slug
  const titleSlug = autoSlug ? `${slugPrefix(item.slug, item.level)} ` : ''

  return (
    <li
      key={item.slug}
      className={`list-none py-1 text-base transition-colors duration-200 ${
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
        className="block break-words no-underline"
      >
        {`${titleSlug}${item.title}`}
      </a>
    </li>
  )
}

export default TOCLink
