'use client'

import { slugPrefix } from '@/services/utils'

interface TOCLinkProps {
  item: TocItems
  activeSlug: string
  handleLinkClick: (slug: string) => void
  autoSlug: boolean
}

const TOCLink = ({
  item,
  activeSlug,
  handleLinkClick,
  autoSlug,
}: TOCLinkProps) => {
  const isActive = activeSlug === item.slug

  return (
    <li
      className={`list-none py-1 text-base transition-all ${
        isActive ? 'font-bold text-primary' : 'text-gray-dark'
      } `}
      style={{ marginLeft: `${(item.level - 2) * 0.7}em` }}
    >
      <a
        href={`#${item.slug}`}
        onClick={(event_) => {
          event_.preventDefault()
          handleLinkClick(item.slug)
        }}
        className="block break-words no-underline transition-all text-hover-primary"
      >
        {`${autoSlug ? slugPrefix(item.slug, item.level) : ''}${item.title}`}
      </a>
    </li>
  )
}

export default TOCLink
