'use client'

import { updateURL, validateParameters } from '@/services/utils'
import { useClickOutside, useToggle } from '@zl-asica/react'
import { clsx } from 'clsx'
import { ArrowDown } from 'lucide-react'
import Form from 'next/form'
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

interface SearchInputProps {
  categories: string[]
  tags: string[]
  translation: Translation
  searchQueries: { query: string, category: string, tag: string }
}

// Handle form submission
const handleFormSubmit = (event_: React.FormEvent<HTMLFormElement>) => {
  event_.preventDefault()

  const formData = new FormData(event_.currentTarget)
  const params = new URLSearchParams()

  for (const [key, value] of formData.entries()) {
    if (value !== null && value !== '') {
      params.append(key, value.toString())
    }
  }

  updateURL(new URL(globalThis.location.href), params)
}

const SearchInput = ({
  categories,
  tags,
  translation,
  searchQueries,
}: SearchInputProps) => {
  const searchParameters = useSearchParams()
  const formReference = useRef<HTMLFormElement>(null)

  const [searchQuery, setSearchQuery] = useState(searchQueries.query)
  const [selectedCategory, setSelectedCategory] = useState(searchQueries.category)
  const [selectedTag, setSelectedTag] = useState(searchQueries.tag)
  const [expanded, toggleExpanded] = useToggle()

  // Initialize search parameters
  useEffect(() => {
    const sanitizedParameters = validateParameters(searchParameters, categories, tags)
    const currentUrl = new URL(globalThis.location.href)
    updateURL(currentUrl, sanitizedParameters)
  }, [searchParameters, searchQueries, categories, tags])

  // Close the form when clicking outside
  useClickOutside(formReference, () => {
    if (expanded && !selectedCategory && !selectedTag) {
      toggleExpanded()
    }
  })

  const handleCategoryChange = (event_: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = event_.target.value
    setSelectedCategory(newCategory)
    const params = new URLSearchParams()
    params.append('category', newCategory.toString())
    updateURL(new URL(globalThis.location.href), params)
  }

  const handleTagChange = (event_: React.ChangeEvent<HTMLSelectElement>) => {
    const newTag = event_.target.value
    setSelectedTag(newTag)
    const params = new URLSearchParams()
    params.append('tag', newTag.toString())
    updateURL(new URL(globalThis.location.href), params)
  }

  const handleReset = () => {
    setSearchQuery('')
    setSelectedCategory('')
    setSelectedTag('')
    updateURL(new URL(globalThis.location.href), new URLSearchParams())
  }

  return (
    <Form
      ref={formReference}
      action="/posts"
      className="px-5 w-full max-w-lg space-y-4 rounded-lg p-4"
      replace
      onSubmit={handleFormSubmit}
    >
      {/* Search Input with Submit Button */}
      <div className="relative w-full transition-transform-300 hover:scale-105">
        <div className="relative flex items-center">
          <input
            type="text"
            name="query"
            placeholder={`🔍 ${translation.search.prompt}`}
            value={searchQuery}
            onChange={event_ => setSearchQuery(event_.target.value)}
            onFocus={toggleExpanded}
            className="w-full rounded-full border border-gray-300 px-4 py-2 pr-16 text-gray-dark"
          />
          <button
            type="submit"
            className="bg-hover-primary absolute right-2 rounded-full px-4 py-1 transition-colors-300 bg-secondary-300 dark:text-background font-medium"
          >
            {translation.search.submit}
          </button>
        </div>
      </div>

      {/* Expandable Filters */}
      <div
        className={clsx(
          'pb-2 flex flex-col items-center space-y-4 overflow-hidden transition-all duration-300',
          {
            'max-h-0 opacity-0': !expanded,
            'max-h-96 opacity-100': expanded,
          },
        )}
      >
        <div className="mt-1 flex w-full space-x-10 px-2">
          <div className="relative flex-1">
            <select
              name="category"
              value={selectedCategory}
              aria-label={translation.search.categoriesAria}
              onChange={handleCategoryChange}
              className={`w-full appearance-none rounded-full border border-gray-300 px-4 py-2 transition-transform-300 hover:scale-105
                ${selectedCategory || 'text-gray-400'}
              `}
            >
              <option
                value=""
                className="text-gray-400"
              >
                {translation.search.allCategories}
              </option>
              {categories.map(category => (
                <option
                  key={category}
                  value={category}
                  className="text-gray-700"
                >
                  {category}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
              <ArrowDown size={18} />
            </span>
          </div>

          <div className="relative flex-1">
            <select
              name="tag"
              value={selectedTag}
              aria-label={translation.search.tagsAria}
              onChange={handleTagChange}
              className={`w-full appearance-none rounded-full border border-gray-300 px-4 py-2 transition-transform-300 hover:scale-105
                ${selectedTag || 'text-gray-400'}
              `}
            >
              <option
                value=""
                className="text-gray-400"
              >
                {translation.search.allTags}
              </option>
              {tags.map(tag => (
                <option
                  key={tag}
                  value={tag}
                  className="text-gray-700"
                >
                  {tag}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
              <ArrowDown size={18} />
            </span>
          </div>
        </div>

        {/* Clear Filters Button */}
        <button
          type="reset"
          onClick={handleReset}
          className="mt-2 rounded-full px-4 py-2 transition-all-300 bg-secondary-300 bg-hover-primary hover:scale-105 dark:text-background font-medium"
        >
          {translation.search.clear}
        </button>
      </div>
    </Form>
  )
}

export default SearchInput
