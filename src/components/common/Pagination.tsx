import React from 'react';

interface PaginationProperties {
  postsPerPage: number;
  totalPosts: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}

const Pagination = ({
  postsPerPage,
  totalPosts,
  paginate,
  currentPage,
}: PaginationProperties) => {
  const pageNumbers = Array.from(
    { length: Math.ceil(totalPosts / postsPerPage) },
    (_, index) => index + 1
  );

  return (
    <nav className='mt-4 flex justify-center'>
      <ul className='flex space-x-2'>
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={currentPage === number ? 'font-bold' : ''}
          >
            <button onClick={() => paginate(number)}>{number}</button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
