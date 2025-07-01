import React from 'react'

const CardSkeleton = () => {
  return (
    <div className="w-36 flex flex-col gap-1 p-3 rounded-lg h-[320px] bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 animate-pulse">
      {/* Image Placeholder */}
      <div className="relative w-full h-40 rounded-md overflow-hidden bg-gray-200 dark:bg-gray-700" />

      {/* Title */}
      <div className="flex flex-col flex-1 pt-2 gap-1">
        <div className="h-4 w-full bg-gray-200 dark:bg-gray-600 rounded" />
        <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-600 rounded" />

        {/* Price */}
        <div className="mt-auto pt-3">
          <div className="h-5 w-1/2 bg-gray-300 dark:bg-gray-500 rounded" />
        </div>
      </div>
    </div>
  )
}

export default CardSkeleton
