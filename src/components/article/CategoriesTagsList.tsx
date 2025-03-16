'use client'

import { Folder, Tags } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

interface CategoriesTagsListProps {
  type: 'category' | 'tag'
  translation: Translation
  items?: string[]
}

// Avoid React infinite render loop
const defaultItems: never[] = []

const CategoriesTagsList = ({ type, translation, items = defaultItems }: CategoriesTagsListProps) => {
  const searchParameters = useSearchParams()

  // Handle no categories or tags
  if (items.length === 0) {
    return (
      <span>
        {type === 'category'
          ? translation.post.noCategories
          : translation.post.noTags}
      </span>
    )
  }

  // Precompute links to reduce inline computation
  const links = items.map((item) => {
    const newParameters = new URLSearchParams(searchParameters)
    newParameters.set(type, item)
    return {
      item,
      href: `/posts?${newParameters.toString()}`,
    }
  })

  const typeTranslation = type === 'category'
    ? translation.post.categories
    : translation.post.tags

  return (
    <span className="flex items-center">
      {/* Render Type icon */}
      {type === 'category'
        ? <Folder className="mr-1" size={20} strokeWidth={3} />
        : <Tags className="mr-1" size={20} strokeWidth={3} />}
      {/* List */}
      <span>
        {links.map(({ item, href }, index) => (
          <span key={item}>
            <a
              href={href}
              target="_self"
              title={`${translation.navigate} ${typeTranslation} ${item}`}
              aria-label={`${translation.navigate} ${typeTranslation} ${item}`}
              className="text-hover-primary transition-all-300 font-medium hover:underline hover:decoration-dotted hover:underline-offset-4"
            >
              {item}
            </a>
            {/* Add comma, except for the last item */}
            {index < items.length - 1 && ', '}
          </span>
        ))}
      </span>
    </span>
  )
}

export default CategoriesTagsList
