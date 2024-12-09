'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Form from 'next/form';
import { clsx } from 'clsx';
import { useClickOutside, useToggle } from '@zl-asica/react';

import { validateParameters, updateURL } from '@/services/utils';

interface SearchInputProperties {
  categories: string[];
  tags: string[];
  translation: Translation;
  initialValue: string;
}

const SearchInput = ({
  categories,
  tags,
  translation,
  initialValue
}: SearchInputProperties) => {
  const searchParameters = useSearchParams();
  const formReference = useRef<HTMLFormElement>(null);

  const [searchQuery, setSearchQuery] = useState(initialValue);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [expanded, toggleExpanded] = useToggle();

  // Initialize search parameters
  useEffect(() => {
    const sanitizedParameters = validateParameters(searchParameters, categories, tags);
    const currentUrl = new URL(globalThis.location.href);
    updateURL(currentUrl, sanitizedParameters);
  }, [searchParameters, initialValue]);

  // Close the form when clicking outside
  useClickOutside(formReference, () => {
    if (expanded && !selectedCategory && !selectedTag) {
      toggleExpanded();
    }
  });

  // Handle form submission
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const params = new URLSearchParams();

    for (const [key, value] of formData.entries()) {
      if (value) params.append(key, value.toString());
    }

    updateURL(new URL(globalThis.location.href), params);
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  const handleTagChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTag(event.target.value);
  };

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedTag('');
    updateURL(new URL(globalThis.location.href), new URLSearchParams());
  };

  return (
    <Form
      ref={formReference}
      action='/posts'
      className='mb-6 w-full max-w-lg space-y-4 rounded-lg p-4'
      replace
      onSubmit={handleFormSubmit}
    >
      {/* Search Input with Submit Button */}
      <div className='relative w-full'>
        <div className='relative flex items-center'>
          <input
            type='text'
            name='query'
            placeholder={`🔍 ${translation.search.prompt}`}
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            onFocus={toggleExpanded}
            className='w-full rounded-full border border-gray-300 px-4 py-2 pr-16 transition-all duration-300 focus:ring-2'
          />
          <button
            type='submit'
            className='absolute right-2 rounded-full px-4 py-1 transition'
          >
            {translation.search.submit}
          </button>
        </div>
      </div>

      {/* Expandable Filters */}
      <div
        className={clsx(
          'flex flex-col items-center space-y-4 overflow-hidden transition-all duration-300',
          {
            'max-h-0 opacity-0': !expanded,
            'max-h-96 opacity-100': expanded
          }
        )}
      >
        <div className='mt-1 flex w-full space-x-10 px-2'>
          <div className='relative flex-1'>
            <select
              name='category'
              value={selectedCategory}
              aria-label={translation.search.categoriesAria}
              onChange={handleCategoryChange}
              className={`w-full appearance-none rounded-full border border-gray-300 px-4 py-2 focus:ring-2 ${
                selectedCategory || 'text-gray-400'
              }`}
            >
              <option
                value=''
                className='text-gray-400'
              >
                {translation.search.allCategories}
              </option>
              {categories.map((category) => (
                <option
                  key={category}
                  value={category}
                  className='text-gray-700'
                >
                  {category}
                </option>
              ))}
            </select>
            <span className='pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500'>
              ▼
            </span>
          </div>

          <div className='relative flex-1'>
            <select
              name='tag'
              value={selectedTag}
              aria-label={translation.search.tagsAria}
              onChange={handleTagChange}
              className={`w-full appearance-none rounded-full border border-gray-300 px-4 py-2 focus:ring-2 ${
                selectedTag || 'text-gray-400'
              }`}
            >
              <option
                value=''
                className='text-gray-400'
              >
                {translation.search.allTags}
              </option>
              {tags.map((tag) => (
                <option
                  key={tag}
                  value={tag}
                  className='text-gray-700'
                >
                  {tag}
                </option>
              ))}
            </select>
            <span className='pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500'>
              ▼
            </span>
          </div>
        </div>

        {/* Clear Filters Button */}
        <button
          type='reset'
          onClick={handleReset}
          className='mt-2 rounded-full px-4 py-2 transition'
        >
          {translation.search.clear}
        </button>
      </div>
    </Form>
  );
};

export default SearchInput;
