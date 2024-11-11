'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';
import { useFormStatus } from 'react-dom';

interface SearchInputProperties {
  initialValue?: string;
}

const SearchInput = ({ initialValue = '' }: SearchInputProperties) => {
  const pathname = usePathname();
  const searchParameters = useSearchParams();
  const { pending, data } = useFormStatus();

  const [searchQuery, setSearchQuery] = useState(initialValue);

  useEffect(() => {
    setSearchQuery(initialValue);
  }, [initialValue]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const params = new URLSearchParams(searchParameters);
    params.set('query', searchQuery);

    globalThis.history.pushState(null, '', `${pathname}?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearchSubmit}
      className='mb-6 flex flex-col items-center'
    >
      <input
        type='text'
        placeholder='Search posts...'
        value={searchQuery}
        onChange={handleSearchChange}
        disabled={pending} // Disable input during submission
        className='mx-auto w-full max-w-lg rounded-md border border-gray-300 p-2'
      />
      <p className='mt-2 text-sm text-gray-500'>
        {data ? `Searching for "${data.get('query')}"...` : ''}
      </p>
    </form>
  );
};

export default SearchInput;
