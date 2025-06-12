// app/book/BookPage.tsx
'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import config from '../../../config'
import Swiper from './Swiper'
import { toPersianNumber } from '@/convertNumberToPersion'
import Properties from './Properties'
import Nav from './ButtonBuy'
import TopFooter from '../../../components/Home/slider/Slider'

type Tdata =
  {
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

  useEffect(() => {
    const fetchData = async () => {
      const access = localStorage.getItem('access')

      const response = await axios.get(`${config.BASE_URL}/bookcase/books/${id}`, {
        headers: {
          Authorization: access ? `Bearer ${access}` : ''
        }
      })

      const topFooterResponse = await axios.get(`${config.BASE_URL}/bookcase/books?page_size=100`)

      setData(response.data)
      setTopFooterData(topFooterResponse.data.results)
    }

    fetchData()
  }, [id])

  if (!data) return <div>Loading...</div>

  console.log(data);


  return (
    <div className='relative border-b-1 dark:bg-gray-700 bg-white dark:border-gray-600 border-gray-400 flex flex-col w-full gap-3 min-h-[1000px]'>
      <div className='w-full'>
        <Swiper data={data} />
      </div>

      <div className='w-full p-3 flex justify-between'>
        <div className='flex flex-col'>
          <h1 className='text-[18px] text-[#000000] dark:text-gray-300'>
            {data.title}
          </h1>
          <h3 className='text-[14px] text-[#919191] dark:text-gray-400'>
            {data.author}
          </h3>
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

      <Nav isMine={data.is_mine} />
    </div>
  )
}
