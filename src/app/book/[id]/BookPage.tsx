// app/book/BookPage.tsx
'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import config from '../../../config'
import Swiper from './Swiper'
import { toPersianNumber } from '@/convertNumberToPersion'
import Properties from './Properties'
import Nav from './Nav'
import TopFooter from '../../../components/Home/slider/Slider'

export type Tdata = {
  id: number
  title: string
  author: string
  sale_price: number
  category_title: string
  description: string
  province: string
  front_image: string
  back_image: string
  condition: string
  page_number: string
  publish_year: string
  publisher: string
  real_price: number
  traslator: string
  user_anonymous: boolean
  is_mine: boolean
  created_by: {
    last_name: string
    first_name: string
    eitaa_id: string
    phone_number: string
    telegram_id: string
    id: number
  }
}

export default function BookPage({ id }: { id: number }) {
  const [data, setData] = useState<Tdata>()
  const [topFooterData, setTopFooterData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const access = localStorage.getItem('access')

        const response = await axios.get(`${config.BASE_URL}/bookcase/books/${id}`, {
          headers: {
            ...(access && { Authorization: `Bearer ${access}` })
          }
        })

        const topFooterResponse = await axios.get(`${config.BASE_URL}/bookcase/featured-categories/`)

        console.log(response.data);

        setData(response.data)
        setTopFooterData(topFooterResponse.data)
      } catch (error) {
        console.error('خطا در دریافت داده', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  if (loading) return <SkeletonLoader />

  if (!data) return <div>کتاب پیدا نشد</div>

  return (
    <div className='relative border-b dark:bg-gray-700 bg-white dark:border-gray-600 border-gray-400 flex flex-col w-full gap-3 min-h-[1000px] p-4'>
      <div className='w-full'>
        <Swiper data={data} />
      </div>

      <div className='w-full p-3 flex flex-col sm:flex-row justify-between gap-4'>
        <div className='flex flex-col'>
          <h1 className='text-[18px] text-black dark:text-gray-300'>{data.title}</h1>
          <h3 className='text-[14px] text-gray-500 dark:text-gray-400'>{data.author}</h3>
        </div>
        <button className='text-[#52CC6D] dark:text-green-500 text-xl/relaxed'>
          {toPersianNumber(data.sale_price)} تومان
        </button>
      </div>

      <Properties
        id_book={id}
        id_person={data.created_by.id}
        category={data.category_title}
        description={data.description}
        province={data.province}
        first_name={data.created_by.first_name}
        last_name={data.created_by.last_name}
        eitaa_id={data.created_by.eitaa_id}
        phone_number={data.created_by.phone_number}
        telegram_id={data.created_by.telegram_id}
        page_number={data.page_number}
        user_anonymous={data.user_anonymous}
        publisher_year={data.publish_year}
        publisher={data.publisher}
        real_price={data.real_price}
        translator={data.traslator}
      />

      <TopFooter data={topFooterData} />

      <Nav isMine={data.is_mine} book_id={data.id} />
    </div>
  )
}


const SkeletonLoader = () => (
  <div className="flex flex-col gap-6 p-4 animate-pulse">

    {/* Image Skeleton */}
    <div className="w-full h-[300px] bg-gray-300 dark:bg-gray-700 rounded-xl" />

    {/* Title & Button Skeleton */}
    <div className="flex flex-col sm:flex-row justify-between gap-4">

      <div className="flex flex-col gap-2">
        <div className="w-[200px] h-[24px] bg-gray-300 dark:bg-gray-700 rounded" />
        <div className="w-[150px] h-[20px] bg-gray-300 dark:bg-gray-700 rounded" />
      </div>

      <div className="w-[100px] h-[40px] bg-gray-300 dark:bg-gray-700 rounded" />
    </div>

    {/* First Text Block Skeleton */}
    <div className="flex flex-col gap-2">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="w-full h-[20px] bg-gray-300 dark:bg-gray-700 rounded" />
      ))}
    </div>

    {/* Second Text Block Skeleton */}
    <div className="flex flex-col gap-2">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="w-full h-[20px] bg-gray-300 dark:bg-gray-700 rounded" />
      ))}
    </div>

    {/* Final Section Skeleton */}
    <div className="w-full h-[200px] bg-gray-300 dark:bg-gray-700 rounded-xl" />
  </div>
)
