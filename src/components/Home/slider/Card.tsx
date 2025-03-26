import Image from 'next/image'
import { toPersianNumber } from '../../../convertNumberToPersion'
import React from 'react'

interface CardProps {
  title: string
  front_image: string
  author: string
  province: string
  sale_price: number
}

const Card: React.FC<CardProps> = ({
  title,
  front_image,
  author,
  province,
  sale_price
}) => {
  return (
    <div className='flex flex-col items-center justify-center relative gap-4 dark:bg-gray-900 dark:hover:bg-gray-900 transition duration-300 ease-in-out p-6 rounded-lg cursor-pointer rtl:text'>
      <div className='w-full flex items-center justify-center h-64 overflow-hidden rounded-lg'>
        <Image
          className='h-full object-cover transition-transform duration-300 hover:scale-105'
          src={front_image}
          alt={title}
        />
      </div>
      <div className='flex-1 flex flex-col justify-between w-full mt-4'>
        <div className='flex flex-col items-end justify-end'>
          <h2 className='text-gray-300 text-lg font-semibold'>{author}</h2>
          <h3 className='text-gray-400 text-sm font-medium truncate'>
            {title}
          </h3>
        </div>
        <button className='mt-2 bg-green-600 hover:bg-green-700 transition duration-150 ease-in-out py-2 px-4 rounded-md text-white text-sm font-semibold'>
          <div className='flex justify-center gap-1'>
            <span>تومان</span>
            <span>{toPersianNumber(sale_price)}</span>
          </div>
        </button>
      </div>
      <h4 className='absolute top-3 right-3 bg-gray-500 px-2 py-1 rounded-md text-xs font-medium text-white'>
        {'>'} {province}
      </h4>
    </div>
  )
}

export default Card
