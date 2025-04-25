'use client'
import React, { useState } from 'react'
import { toPersianNumber } from '@/convertNumberToPersion'
import Telegram_svg from './telegram.svg'
import Image from 'next/image'
import Eitaa_png from './eitaa-icon-colorful.png'

function Properties ({
  province,
  description,
  category,
  telegram_id,
  first_name,
  last_name,
  eitaa_id,
  phone_number,
  show_phone_number
}: {
  category: string
  description: string
  province: string
  telegram_id: string
  first_name: string
  last_name: string
  eitaa_id: string
  show_phone_number: boolean
  phone_number: string
}) {
  const [activePage, setActivePage] = useState<boolean>(false)

  return (
    <div>
      <div className='w-full flex items-center justify-center cursor-pointer'>
        <button
          onClick={() => setActivePage(true)}
          className={`w-[50%] cursor-pointer p-1 ${
            activePage
              ? 'text-[#52CC6D] border-b-[#77c488]'
              : 'border-gray-300 text-gray-400'
          } border-b-2`}
        >
          مشخصات صاحبش
        </button>
        <button
          onClick={() => setActivePage(false)}
          className={`w-[50%] cursor-pointer p-1 ${
            !activePage
              ? 'text-[#52CC6D] border-b-[#52CC6D]'
              : 'border-gray-300 text-gray-400'
          } border-b-2`}
        >
          مشخصات
        </button>
      </div>
      {activePage ? (
        <div className='flex flex-col w-full p-5 gap-3'>
          <div className='flex flex-col justify-between items-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='50'
              height='50'
              viewBox='0 0 100 100'
              fill='none'
              stroke='black'
              strokeWidth='2'
            >
              <circle cx='50' cy='30' r='20' fill='white' stroke='black' />
              <path
                d='M20 80 C30 60, 70 60, 80 80'
                fill='none'
                stroke='black'
              />
            </svg>
            <div className='flex gap-1 text-[#919191] dark:text-gray-400'>
              <h2>{first_name}</h2>
              <h2>{last_name}</h2>
            </div>
          </div>

          <div className='flex justify-center items-center w-full gap-2'>
            {telegram_id && (
              <a
                href={`tg://resolve?domain=${telegram_id}`}
                className='text-[#919191] dark:text-gray-400'
              >
                <Image width={20} src={Telegram_svg} alt='' className='' />
              </a>
            )}

            {eitaa_id && (
              <a
                href={`https://eitaa.com/${eitaa_id}`}
                className='text-[#919191] dark:text-gray-400'
              >
                <Image width={20} src={Eitaa_png} alt='' className='' />
              </a>
            )}
          </div>

          {eitaa_id && (
            <div className='flex justify-between items-center'>
              <h1 className='text-[#000000] dark:text-gray-200'>ایتا</h1>
              <h2 className='text-[#919191] dark:text-gray-400 hover:underline'>
                {eitaa_id}
              </h2>
            </div>
          )}

          {phone_number && (
            <div className='flex justify-between items-center'>
              <h1 className='text-[#000000] dark:text-gray-200'>شماره تلفن</h1>
              <h2 className='text-[#919191] dark:text-gray-400'>
                ۰{toPersianNumber(parseInt(phone_number)).split(',')}
              </h2>
            </div>
          )}
        </div>
      ) : (
        <div className='flex flex-col w-full p-5 gap-3'>
          <div className='flex justify-between items-center'>
            <h1 className='text-[#000000] dark:text-gray-200'>شهر</h1>
            <h2 className='text-[#919191] dark:text-gray-400'>{province}</h2>
          </div>
          <div className='flex justify-between items-center'>
            <h1 className='text-[#000000] dark:text-gray-200'>دسته بندی</h1>
            <h2 className='text-[#919191] dark:text-gray-400'>{category}</h2>
          </div>

          <h1 className='text-[#000000] dark:text-gray-200'>دیگرتوضیحات</h1>

          <p className='text-[#919191] mx-2 dark:text-gray-400'>
            {description}
          </p>
        </div>
      )}
    </div>
  )
}

export default Properties
