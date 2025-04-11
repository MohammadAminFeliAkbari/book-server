'use client'
import React, { useState } from 'react'
import { toPersianNumber } from '@/convertNumberToPersion'

function Properties({ province, description, category }: { category: string, description: string, province: string }) {
    const [activePage, setActivePage] = useState<boolean>(false)

    return (
        <div>
            <div className='w-full flex items-center justify-center cursor-pointer'>
                <button onClick={() => setActivePage(true)} className={`w-[50%]   p-1 ${activePage ? 'text-[#52CC6D] border-b-[#77c488]' : 'border-gray-300 text-gray-400'} border-b-2`}>
                    مشخصات صاحبش
                </button>
                <button onClick={() => setActivePage(false)} className={`w-[50%]  p-1 ${!activePage ? 'text-[#52CC6D] border-b-[#52CC6D]' : 'border-gray-300 text-gray-400'} border-b-2`}>
                    مشخصات
                </button>
            </div>
            {activePage ? <div>ho</div>
                :
                <div className='flex flex-col w-full p-5 gap-3'>
                    <div className='flex justify-between items-center'>
                        <h1 className='text-[#000000] dark:text-gray-200'>تعدادصفحات</h1>
                        {/* <h2 className='text-[#919191]'>{toPersianNumber(210)}</h2> */}
                        <h2 className='text-[#919191] dark:text-gray-400'>unknown</h2>
                    </div>
                    <div className='flex justify-between items-center'>
                        <h1 className='text-[#000000] dark:text-gray-200'>منتشرکننده</h1>
                        <h2 className='text-[#919191] dark:text-gray-400'>unknown</h2>
                    </div>
                    <div className='flex justify-between items-center'>
                        <h1 className='text-[#000000] dark:text-gray-200'>زبان کتاب</h1>
                        <h2 className='text-[#919191] dark:text-gray-400'>unknown</h2>
                    </div>

                    <div className='flex justify-between items-center'>
                        <h1 className='text-[#000000] dark:text-gray-200'>شهر</h1>
                        <h2 className='text-[#919191] dark:text-gray-400'>{province}</h2>
                    </div>

                    <div className='flex justify-between items-center'>
                        <h1 className='text-[#000000] dark:text-gray-200'>دسته بندی</h1>
                        <h2 className='text-[#919191] dark:text-gray-400'>{category}</h2>
                    </div>

                    <h1 className='text-[#000000] dark:text-gray-200'>دیگرتوضیحات</h1>

                    <p className='text-[#919191] mx-2 dark:text-gray-400'>{description}</p>
                </div>
            }
        </div>
    )
}

export default Properties