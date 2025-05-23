import React from 'react'

export default function Loading() {
  return (
    <div className='relative border-b-1 dark:bg-gray-700 bg-white dark:border-gray-600 border-gray-400 flex flex-col w-full gap-3 min-h-[1000px]'>
      {/* Image Swiper Skeleton */}
      <div className='w-full h-[400px] bg-gray-200 dark:bg-gray-600 animate-pulse'></div>

      {/* Title, Author, Price Skeleton */}
      <div className='w-full p-3 flex justify-between'>
        <div className='flex flex-col gap-2'>
          <div className='h-6 w-48 bg-gray-300 dark:bg-gray-500 rounded animate-pulse'></div>
          <div className='h-4 w-32 bg-gray-200 dark:bg-gray-400 rounded animate-pulse'></div>
        </div>
        <div className='h-8 w-24 bg-gray-300 dark:bg-gray-500 rounded animate-pulse'></div>
      </div>

      {/* Properties Skeleton */}
      <div className='p-3 space-y-4'>
        <div className='space-y-2'>
          <div className='h-5 w-20 bg-gray-300 dark:bg-gray-500 rounded animate-pulse'></div>
          <div className='h-4 bg-gray-200 dark:bg-gray-400 rounded animate-pulse w-full'></div>
          <div className='h-4 bg-gray-200 dark:bg-gray-400 rounded animate-pulse w-3/4'></div>
        </div>
        
        <div className='space-y-2'>
          <div className='h-5 w-20 bg-gray-300 dark:bg-gray-500 rounded animate-pulse'></div>
          <div className='h-4 bg-gray-200 dark:bg-gray-400 rounded animate-pulse w-full'></div>
          <div className='h-4 bg-gray-200 dark:bg-gray-400 rounded animate-pulse w-3/4'></div>
        </div>

        <div className='space-y-3'>
          <div className='h-5 w-28 bg-gray-300 dark:bg-gray-500 rounded animate-pulse'></div>
          <div className='flex items-center gap-3'>
            <div className='h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-500 animate-pulse'></div>
            <div className='flex-1 space-y-2'>
              <div className='h-4 bg-gray-200 dark:bg-gray-400 rounded animate-pulse w-32'></div>
              <div className='h-3 bg-gray-200 dark:bg-gray-400 rounded animate-pulse w-24'></div>
            </div>
          </div>
          <div className='flex gap-3'>
            <div className='h-8 w-24 bg-gray-300 dark:bg-gray-500 rounded animate-pulse'></div>
            <div className='h-8 w-24 bg-gray-300 dark:bg-gray-500 rounded animate-pulse'></div>
          </div>
        </div>
      </div>

      {/* Top Footer Skeleton */}
      <div className='p-3'>
        <div className='h-6 w-32 bg-gray-300 dark:bg-gray-500 rounded animate-pulse mb-4'></div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className='flex flex-col gap-2'>
              <div className='h-40 bg-gray-200 dark:bg-gray-400 rounded animate-pulse'></div>
              <div className='h-4 bg-gray-200 dark:bg-gray-400 rounded animate-pulse w-3/4'></div>
              <div className='h-4 bg-gray-200 dark:bg-gray-400 rounded animate-pulse w-1/2'></div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Button Skeleton */}
      <div className='sticky bottom-0 p-3 bg-white dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600'>
        <div className='h-12 w-full bg-gray-300 dark:bg-gray-500 rounded-lg animate-pulse'></div>
      </div>
    </div>
  )
}