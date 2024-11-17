'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';
import { useFormStatus } from 'react-dom';
import { defaultTo, debounce } from 'es-toolkit/compat';
import { clsx } from 'clsx';

import { useOutsideClick } from '@/hooks';
import { sanitizeQuery } from '@/services/utils';

interface SearchInputProperties {
  initialValue?: string;
  categories: string[];
  tags: string[];
  translation: Translation;
}

const SearchInput = ({
  initialValue = '',
  categories,
  tags,
  translation,
}: SearchInputProperties) => {
  const pathname = usePathname();
  const searchParameters = useSearchParams();
  const { pending } = useFormStatus();

  const [searchQuery, setSearchQuery] = useState(initialValue);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [expanded, setExpanded] = useState(false);

  const formReference = useRef<HTMLFormElement>(null);

  useEffect(() => {
    setSearchQuery(defaultTo(searchParameters.get('query'), initialValue));
    setSelectedCategory(searchParameters.get('category') || '');
    setSelectedTag(searchParameters.get('tag') || '');
  }, [searchParameters, initialValue]);

  useOutsideClick(formReference, () => {
    if (expanded) setExpanded(false);
  });

  // Debounced URL update function to reduce excessive URL updates
  const debouncedUpdateURL = debounce(
    (newQuery: string, category: string, tag: string) => {
      const params = new URLSearchParams(searchParameters);
      if (newQuery) params.set('query', newQuery);
      else params.delete('query');
      if (category) params.set('category', category);
      else params.delete('category');
      if (tag) params.set('tag', tag);
      else params.delete('tag');
      globalThis.history.pushState(
        null,
        '',
        `${pathname}?${params.toString()}`
      );
    },
    30
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = sanitizeQuery(event.target.value);
    setSearchQuery(newQuery);
    setExpanded(true); // Let the user see the filters when searching
    debouncedUpdateURL(newQuery, selectedCategory, selectedTag);
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value);
    debouncedUpdateURL(searchQuery, event.target.value, selectedTag);
  };

  const handleTagChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTag(event.target.value);
    debouncedUpdateURL(searchQuery, selectedCategory, event.target.value);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedTag('');
    debouncedUpdateURL('', '', '');
  };

  return (
    <form
      ref={formReference}
      onSubmit={(event) => event.preventDefault()}
      className='mb-6 w-full max-w-lg space-y-4 rounded-lg p-4'
    >
      {/* Search Input */}
      <div className='relative w-full'>
        <input
          type='text'
          placeholder={`🔍 ${translation.search.prompt}`}
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={() => setExpanded(true)}
          disabled={pending}
          className='w-full rounded-full border border-gray-300 px-4 py-2 transition-all duration-300 focus:ring-2'
        />
      </div>

      {/* Expandable Filters */}
      <div
        className={clsx(
          'flex flex-col items-center space-y-4 overflow-hidden transition-all duration-300',
          {
            'max-h-0 opacity-0': !expanded,
            'max-h-96 opacity-100': expanded,
          }
        )}
      >
        <div className='mt-1 flex w-full space-x-10 px-2'>
          <div className='relative flex-1'>
            <select
              value={selectedCategory}
              aria-label={translation.search.categoriesAria}
              onChange={handleCategoryChange}
              disabled={pending}
              className={`w-full appearance-none rounded-full border border-gray-300 px-4 py-2 focus:ring-2 ${
                selectedCategory || 'text-gray-400'
              }`}
            >
              <option
                value=''
                className='text-gray-400'
                disabled={!selectedCategory}
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
            {/* Custom down arrow */}
            <span className='pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500'>
              ▼
            </span>
          </div>

          <div className='relative flex-1'>
            <select
              value={selectedTag}
              aria-label={translation.search.tagsAria}
              onChange={handleTagChange}
              disabled={pending}
              className={`w-full appearance-none rounded-full border border-gray-300 px-4 py-2 focus:ring-2 ${
                selectedTag || 'text-gray-400'
              }`}
            >
              <option
                value=''
                className='text-gray-400'
                disabled={!selectedTag}
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
            {/* Custom down arrow */}
            <span className='pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500'>
              ▼
            </span>
          </div>
        </div>

        {/* Clear Filters Button */}
        <button
          type='button'
          onClick={clearFilters}
          disabled={pending}
          className='mt-2 rounded-full px-4 py-2 transition'
        >
          {translation.search.clear}
        </button>

        {pending && (
          <p className='animate-pulse text-sm'>{translation.search.loading}</p>
        )}
      </div>
    </form>
  );
};

export default SearchInput;
