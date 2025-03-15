const PostsLoading = () => {
  return (
    <div className="mt-5 mb-10 grid grid-cols-1 gap-10 animate-pulse">
      {Array.from({ length: 4 }).map((_, index) => (
        <article
          key={index}
          className={`mx-auto flex h-[500px] w-11/12 max-w-[850px] flex-col overflow-hidden rounded-lg shadow-lg md:h-[300px] md:w-full md:flex-row ${
            index % 2 === 0 ? 'md:flex-row-reverse' : ''
          } bg-gray-200 dark:bg-gray-700 shadow-gray-light drop-shadow-xs`}
        >
          {/* Thumbnail Skeleton */}
          <div
            className={`relative w-full rounded-lg ${
              index % 2 === 0 ? 'md:rounded-r-lg' : 'md:rounded-l-lg'
            } h-1/2 overflow-hidden md:h-full md:w-7/12 bg-gray-300 dark:bg-gray-600`}
          >
            <div className="absolute inset-0 bg-black/20"></div>
          </div>

          {/* Content Skeleton */}
          <div className="m-6 flex h-1/2 flex-col justify-between md:h-auto md:w-5/12">
            <div>
              {/* Date of Publish Skeleton */}
              <div className="mb-1 flex items-center">
                <div className="mr-2 h-5 w-5 bg-gray-400 dark:bg-gray-500 rounded-full"></div>
                <div className="h-4 w-20 bg-gray-400 dark:bg-gray-500 rounded"></div>
              </div>
              {/* Title in Frontmatter Skeleton */}
              <div className="mb-2 h-6 w-3/4 bg-gray-400 dark:bg-gray-500 rounded"></div>
              {/* Abstract Skeleton */}
              <div className="space-y-2">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="h-4 w-full bg-gray-300 dark:bg-gray-600 rounded"
                  />
                ))}
              </div>
            </div>

            {/* Category and Tag Skeleton */}
            <div className="text-gray-450 mt-3 flex items-center justify-between text-sm">
              <div className="h-6 w-12 bg-gray-400 dark:bg-gray-500 rounded"></div>
              <div className="h-6 w-12 bg-gray-400 dark:bg-gray-500 rounded"></div>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}

export default PostsLoading
