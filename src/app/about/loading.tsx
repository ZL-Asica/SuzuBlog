const LoadingPlaceholder = () => {
  return (
    <div className="container mx-auto p-6 pb-2 animate-pulse max-w-3xl">
      {/* Thumbnail Skeleton */}
      <div className="relative h-96 w-full bg-gray-200 dark:bg-gray-700 rounded-lg shadow-lg">
        <div className="absolute inset-0 bg-black/20 rounded-lg"></div>
      </div>

      {/* Title Skeleton */}
      <div className="mx-auto my-6 w-full max-w-3xl">
        <div className="h-8 w-3/4 bg-gray-300 dark:bg-gray-600 rounded"></div>
      </div>

      {/* Meta Info Skeleton */}
      <div className="mx-auto my-2 w-full max-w-3xl flex items-center gap-3">
        <div className="h-5 w-24 bg-gray-300 dark:bg-gray-600 rounded"></div>
        <span className="text-2xl text-gray-400">•</span>
        <div className="h-5 w-20 bg-gray-300 dark:bg-gray-600 rounded"></div>
      </div>

      {/* Categories/Tags Skeleton */}
      <div className="mx-auto my-4 w-full max-w-3xl flex flex-wrap gap-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-6 w-16 bg-gray-300 dark:bg-gray-600 rounded"
          />
        ))}
      </div>

      {/* Post Content Skeleton */}
      <div className="mx-auto my-6 w-full max-w-3xl space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="h-6 w-full bg-gray-300 dark:bg-gray-600 rounded"
          />
        ))}
      </div>

      {/* Review Skeleton */}
      <div className="mx-auto mt-10 w-full max-w-3xl h-32 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
    </div>
  )
}

export default LoadingPlaceholder
