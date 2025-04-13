'use client'

import type { ChangeEvent } from 'react'
import { Select } from '@/components/ui'
import { useUpdateURL } from '@/hooks'
import { validateParameters } from '@/services/utils'
import { useClickOutside, useToggle } from '@zl-asica/react'
import { clsx } from 'clsx'
import Form from 'next/form'
import { useSearchParams } from 'next/navigation'
import { useRef, useState } from 'react'

interface SearchInputProps {
  categories: string[]
  tags: string[]
  translation: Translation
}

const SearchInput = ({
  categories,
  tags,
  translation,
}: SearchInputProps) => {
  const updateURL = useUpdateURL()

  const searchParameters = useSearchParams()
  const formReference = useRef<HTMLFormElement>(null)
  const { query, category, tag } = Object.fromEntries(validateParameters(searchParameters, categories, tags))

  const [searchQuery, setSearchQuery] = useState(query ?? '')
  const [selectedCategory, setSelectedCategory] = useState(category ?? '')
  const [selectedTag, setSelectedTag] = useState(tag ?? '')
  const [expanded, toggleExpanded] = useToggle()

  // Handle form submission
  const handleFormSubmit = (formData: FormData) => {
    updateURL({
      page: null,
      query: formData.get('query'),
      category: formData.get('category'),
      tag: formData.get('tag'),
    })
  }

  // Close the form when clicking outside
  useClickOutside(formReference, () => {
    if (expanded && !selectedCategory && !selectedTag) {
      toggleExpanded()
    }
  })

  const handleCategoryChange = (event_: ChangeEvent<HTMLSelectElement>) => {
    const newCategory = event_.target.value
    setSelectedCategory(newCategory)
    updateURL({ page: null, category: newCategory })
  }

  const handleTagChange = (event_: ChangeEvent<HTMLSelectElement>) => {
    const newTag = event_.target.value
    setSelectedTag(newTag)
    updateURL({ page: null, tag: newTag })
  }

  const handleReset = () => {
    setSearchQuery('')
    setSelectedCategory('')
    setSelectedTag('')
    updateURL({ query: null, category: null, tag: null })
  }

  return (
    <Form
      ref={formReference}
      action={handleFormSubmit}
      className="px-5 w-full max-w-lg space-y-4 rounded-lg p-4"
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
          <Select
            defaultValue={translation.search.allCategories}
            selectedOption={selectedCategory}
            options={categories}
            onChange={handleCategoryChange}
            ariaLabel={translation.search.categoriesAria}
          />
          <Select
            defaultValue={translation.search.allTags}
            selectedOption={selectedTag}
            options={tags}
            onChange={handleTagChange}
            ariaLabel={translation.search.tagsAria}
          />
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
