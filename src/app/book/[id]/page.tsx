import React from 'react'
import axios from 'axios'
import config from '../../../config'
import Swiper from './Swiper'
import { toPersianNumber } from '@/convertNumberToPersion'
import Properties from './Properties'
import Nav from './ButtonBuy'
import TopFooter from '../../../components/Home/slider/Slider'

export default async function Page (props: { params: Promise<{ id: number }> }) {
  const { id } = await props.params
  const response = await axios.get(`${config.BASE_URL}/bookcase/books/${id}`)
  const topfooterData = await axios.get(
    `${config.BASE_URL}/bookcase/books?page_size=100`
  )

  const data: {
    title: string
    author: string
    sale_price: number
    category_title: string
    description: string
    province: string
    front_image: string
    back_image: string
    created_by: {
      last_name: string
      first_name: string
      eitaa_id: string
      phone_number: string
      show_phone_number: boolean
      telegram_id: string
    }
  } = response.data

  console.log(data)

  return (
    <div className='relative border-b-1 dark:bg-gray-700 bg-white dark:border-gray-600 border-gray-400 flex flex-col w-full gap-3 min-h-[1000px]'>
      <div className='w-full'>
        <Swiper data={data} />
      </div>

      {/* title author price */}
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
        category={data.category_title}
        description={data.description}
        province={data.province}
        first_name={data.created_by.first_name}
        last_name={data.created_by.last_name}
        eitaa_id={data.created_by.eitaa_id}
        phone_number={data.created_by.phone_number}
        show_phone_number={data.created_by.show_phone_number}
        telegram_id={data.created_by.telegram_id}
      />

      <TopFooter data={topfooterData.data.results} />

      <Nav />
    </div>
  )
}
