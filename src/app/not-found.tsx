import React from 'react'

export default function NotFound () {
  // Change function name to NotFound
  return (
    <div className='flex items-center justify-center h-svh bg-red-100 text-red-800 dark:text-red-300 dark:bg-red-950'>
      <div className='text-center'>
        <h1 className='text-4xl font-bold'>404 - صفحه مورد نظر پیدا نشد</h1>
        <p className='mt-4'>.با عرض پوزش، صفحه مورد نظر شما وجود ندارد</p>
      </div>
    </div>
  )
}
