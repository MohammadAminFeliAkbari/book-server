'use client'
import React, { useState } from 'react'
import { toPersianNumber } from '@/convertNumberToPersion'
import Link from 'next/link'

function Properties({
  province,
  description,
  category,
  first_name,
  last_name,
  phone_number,
  translator,
  page_number,
  publisher,
  publisher_year,
  real_price,
  id_book,
  id_person
}: {
  first_name: string
  category: string
  description: string
  province: string
  last_name: string
  phone_number: string
  publisher_year: string
  publisher: string
  real_price: number
  translator: string
  page_number: string
  id_book: number
  id_person: number
}) {
  const [activePage, setActivePage] = useState<boolean>(false)

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Switch Tabs */}
      <div className="flex items-center justify-center cursor-pointer">
        <button
          onClick={() => setActivePage(true)}
          className={`w-1/2 cursor-pointer p-2 sm:p-3 text-center ${activePage
            ? 'text-[#52CC6D] border-b-2 border-b-[#77c488]'
            : 'border-b-2 border-gray-300 text-gray-400'
            }`}
        >
          مشخصات صاحبش
        </button>
        <button
          onClick={() => setActivePage(false)}
          className={`w-1/2 cursor-pointer p-2 sm:p-3 text-center ${!activePage
            ? 'text-[#52CC6D] border-b-2 border-b-[#52CC6D]'
            : 'border-b-2 border-gray-300 text-gray-400'
            }`}
        >
          مشخصات
        </button>
      </div>

      {/* Owner Info */}
      {activePage ? (
        <div className="flex flex-col w-full p-5 gap-4 sm:gap-6">
          <Link href={{ pathname: `/book/${id_book}/${id_person}`, query: { first_name, last_name } }} className="flex flex-col justify-between items-center gap-2">
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='60'
              height='60'
              viewBox='0 0 100 100'
              fill='none'
              stroke='black'
              strokeWidth='2'
            >
              <circle cx='50' cy='30' r='20' fill='white' stroke='black' />
              <path d='M20 80 C30 60, 70 60, 80 80' fill='none' stroke='black' />
            </svg>
            <div className="flex gap-1 text-[#919191] dark:text-gray-400 text-lg sm:text-xl">
              <h2>{first_name}</h2>
              <h2>{last_name}</h2>
            </div>
          </Link>

          <div className="flex justify-between items-center text-base sm:text-lg">
            <h1 className="text-[#000000] dark:text-gray-200">شماره تلفن</h1>
            <h2 className="text-[#919191] dark:text-gray-400">
              ۰{toPersianNumber(parseInt(phone_number)).split(',')}
            </h2>
          </div>
        </div>
      ) : (
        // Book Info
        <div className="flex flex-col w-full p-5 gap-4 sm:gap-6">
          {province && (
            <Item title="شهر" value={province} />
          )}

          {category && (
            <Item title="دسته بندی" value={category} />
          )}

          {translator && (
            <Item title="مترجم" value={translator} />
          )}

          {page_number && (
            <Item title="تعداد صفحات" value={page_number} />
          )}

          {publisher && (
            <Item title="منتشرکننده" value={publisher} />
          )}

          {real_price && (
            <Item title="قیمت روی جلد" value={toPersianNumber(real_price)} />
          )}

          {publisher_year && (
            <Item title="سال انتشار" value={publisher_year} />
          )}

          {description && (
            <>
              <h1 className="text-[#000000] dark:text-gray-200 text-lg sm:text-xl">دیگر توضیحات</h1>
              <p className="text-[#919191] mx-2 dark:text-gray-400 text-base sm:text-lg leading-relaxed">{description}</p>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default Properties

// 🔹 کامپوننت نمایش اطلاعات هر آیتم
const Item = ({ title, value }: { title: string, value: string | number }) => (
  <div className="flex justify-between items-center text-base sm:text-lg">
    <h1 className="text-[#000000] dark:text-gray-200">{title}</h1>
    <h2 className="text-[#919191] dark:text-gray-400">{value}</h2>
  </div>
)
