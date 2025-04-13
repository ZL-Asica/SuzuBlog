'use client'

interface PaginationProps {
  totalPages: number
  setCurrentPage: (pageNumber: number) => void
  currentPage: number
  translation: Translation
}

const Pagination = ({
  totalPages,
  currentPage,
  setCurrentPage,
  translation,
}: PaginationProps) => {
  if (totalPages <= 1) {
    return null
  }

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const getPageNumbers = () => {
    const maxButtons = 4
    const pages: (number | '...')[] = []

    if (totalPages <= maxButtons + 2) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    if (currentPage <= maxButtons - 1) {
      pages.push(...Array.from({ length: maxButtons }, (_, i) => i + 1), '...', totalPages)
    }
    else if (currentPage >= totalPages - (maxButtons - 2)) {
      pages.push(1, '...', ...Array.from({ length: maxButtons }, (_, i) => totalPages - maxButtons + 1 + i))
    }
    else {
      pages.push(1, '...')
      const start = currentPage - Math.floor(maxButtons / 2)
      const end = start + maxButtons - 1
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      pages.push('...', totalPages)
    }

    return pages
  }

  const pageNumbers = getPageNumbers()

  return (
    <nav
      className="mt-4 flex justify-center"
      role="navigation"
      aria-label={translation.aria.pagination.label}
    >
      {/* Mobile version (Prev / current / Next) */}
      <div className="flex items-center gap-4 sm:hidden text-sm">
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-4 py-3 rounded-full font-medium bg-secondary-300 text-gray-700 hover:scale-105 disabled:opacity-40"
        >
          {translation.aria.pagination.prev}
        </button>

        <span
          className="text-gray-dark font-semibold text-md"
          aria-live="polite"
          aria-atomic="true"
        >
          {currentPage}
          {' '}
          /
          {' '}
          {totalPages}
        </span>

        <button
          type="button"
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-3 rounded-full font-medium bg-secondary-300 text-gray-700 hover:scale-105 disabled:opacity-40"
        >
          {translation.aria.pagination.next}
        </button>
      </div>

      {/* Desktop version (full page buttons) */}
      <ul
        className="hidden sm:flex space-x-2 items-center"
        role="list"
      >
        {pageNumbers.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={index}>
            {item === '...'
              ? (
                  <span className="px-2 text-gray-dark cursor-default" aria-hidden>…</span>
                )
              : (
                  <button
                    type="button"
                    onClick={() => setCurrentPage(item)}
                    aria-current={item === currentPage ? 'page' : undefined}
                    aria-label={
                      item === currentPage
                        ? `${translation.aria.pagination.current}${item}`
                        : `${translation.aria.pagination.goTo}${item}`
                    }
                    className={`px-4 py-2 rounded-full text-lg sm:text-base
                  ${item === currentPage
                    ? 'bg-primary-300 text-white font-bold scale-110'
                    : 'bg-secondary-300 text-gray-700 hover:scale-110'}
                  cursor-pointer transition-transform-300`}
                  >
                    {item}
                  </button>
                )}
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Pagination
