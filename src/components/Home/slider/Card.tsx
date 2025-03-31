import Image from 'next/image';
import { toPersianNumber } from '../../../convertNumberToPersion';
import React from 'react';

interface CardProps {
  title: string;
  front_image: string;
  author: string;
  province: string;
  sale_price: number;
}

const Card: React.FC<CardProps> = ({
  title,
  front_image,
  author,
  province,
  sale_price
}) => {
  return (
    <div className='flex flex-col items-center justify-center relative gap-4 bg-white shadow-lg rounded-lg overflow-hidden transition transform hover:shadow-2xl dark:bg-gray-800 dark:hover:bg-gray-700 sm:p-6 cursor-pointer'>
      <div className='flex flex-col items-center justify-center relative gap-4 dark:bg-gray-900 dark:hover:bg-gray-900 transition duration-300 ease-in-out p-3 sm:p-6 rounded-lg cursor-pointer rtl:text'>
        <div className='w-full h-44 flex items-center justify-center sm:h-64 overflow-hidden rounded-lg'>
          <Image
            className='h-full rounded object-cover transition-transform duration-300 hover:scale-105'
            src={front_image}
            alt={title || 'Image of ' + title}
            layout="responsive" // This works for responsive layout  
            width={640} // Specify the width that's proportional  
            height={360} // Specify the height that's proportional  
          />
        </div>
        <div className='flex-1 flex flex-col justify-between w-full'>
          <div className='flex flex-col items-center justify-end'>
            <h2 className='text-gray-800 dark:text-gray-300 text-lg sm:text-xl text-[15px] font-semibold'>
              {title}
            </h2>
            {/* <h3 className='text-gray-600 dark:text-gray-400 text-sm sm:text-base font-medium truncate'>
              {author}
            </h3> */}
          </div>
          {/* <button className='mt-2 p-1 bg-green-600 hover:bg-green-700 transition duration-150 ease-in-out sm:py-2 sm:px-4 rounded-md text-white text-sm font-semibold shadow'>
            <div className='flex justify-center gap-1'>
              <span>تومان</span>
              <span>{toPersianNumber(parseInt(+sale_price))}</span>
            </div>
          </button> */}
        </div>
        <h4 className='absolute top-3 right-3 bg-gray-500 px-2 py-1 rounded-md text-xs font-medium text-white'>
          {'>'} {province}
        </h4>
      </div>
    </div>
  );
}

export default Card;    