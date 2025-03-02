const AnimeListSkeleton = () => {
  return (
    <div className="container mx-auto animate-fadeInDown p-6 pb-2 mt-5">
      {/* Header */}
      <div className="h-10 w-48 bg-gray-700 rounded-md animate-pulse mb-2"></div>
      <div className="h-6 w-72 bg-gray-700 rounded-md animate-pulse mb-4"></div>

      {/* Sections */}
      {['Watching', 'Completed', 'Paused', 'Dropped', 'Planning'].map(section => (
        <div key={section} className="mt-10">
          {/* Section Title */}
          <div className="h-8 w-64 bg-gray-700 rounded-md animate-pulse mb-4"></div>

          {/* Anime Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-6 mt-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="relative bg-gray-800 rounded-lg overflow-hidden shadow-md animate-pulse">
                {/* Cover Image Placeholder */}
                <div className="w-full aspect-[9/16] bg-gray-700"></div>

                {/* Title & Progress Placeholder */}
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 to-transparent p-2">
                  <div className="h-6 w-32 bg-gray-700 rounded-md animate-pulse mb-1"></div>
                  <div className="h-4 w-20 bg-gray-700 rounded-md animate-pulse"></div>
                </div>

                {/* Rating Placeholder */}
                <div className="absolute bottom-2 right-2 flex items-center bg-black/60 px-2 py-1 rounded-lg">
                  <div className="h-4 w-4 bg-gray-700 rounded-full animate-pulse"></div>
                  <div className="h-4 w-8 bg-gray-700 rounded-md animate-pulse ml-1"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnimeListSkeleton
