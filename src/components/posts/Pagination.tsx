import { ceil } from 'es-toolkit/compat'

interface PaginationProps {
  postsPerPage: number
  totalPosts: number
  setCurrentPage: (pageNumber: number) => void
  currentPage: number
}

const Pagination = ({
  postsPerPage,
  totalPosts,
  currentPage,
  setCurrentPage,
}: PaginationProps) => {
  // TODO: handle more than 5 pages condition.
  const pageNumbers = Array.from(
    { length: ceil(totalPosts / postsPerPage) },
    (_, index) => index + 1,
  )

  // If there is only one page, don't show pagination
  if (pageNumbers.length === 1) {
    return null
  }

  return (
    <nav className="mt-4 flex justify-center">
      <ul className="flex space-x-2">
        {pageNumbers.map(number => (
          <li
            key={number}
            className={currentPage === number ? 'font-extrabold' : 'font-medium'}
          >
            <button
              type="button"
              onClick={() => setCurrentPage(number)}
              className={`px-4 py-2
                ${currentPage === number ? 'bg-primary-300' : 'bg-secondary-300'}
                text-lg rounded-4xl transition-all-300 hover:scale-110 bg-hover-primary text-gray-light`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Pagination
