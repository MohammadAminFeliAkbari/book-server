'use client'
import React, { useState } from 'react'

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const recentSearches = ['Altin Sut', 'Kucuk Prens', 'Kirmizi Baslikli Kiz']

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      console.log(searchTerm)
      setSearchTerm('')
    }
  }

  return (
    <div className='w-full'>
      <div className='relative'>
        <input
          type='text'
          className='w-full px-4 py-3 border-b-2 dark:border-gray-500 border-gray-400 outline-none'
          placeholder='جستجو..'
          onChange={e => setSearchTerm(e.target.value)}
          value={searchTerm}
          onKeyDown={handleKeyDown} // Add the keydown handler
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className='left-0 absolute mt-[13px] ml-4 text-2xl text-gray-600'
          >
            ×
          </button>
        )}
      </div>
      <div className='w-full flex justify-between'>
        <h3>اخیرا</h3>
      </div>
    </div>
  )
}

export default SearchComponent
