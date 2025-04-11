import React from 'react'
import axios from 'axios'
import config from '../../../config'
import { Item } from '../page'
import Swiper from './Swiper'
import { toPersianNumber } from '@/convertNumberToPersion'
import Properties from './Properties'
import Cards from '../../../components/Home/slider/Slider'
import Nav from './ButtonBuy'

export default async function Page(props: { params: Promise<{ id: number }> }) {
  console.log(props)
  const { id } = await props.params
  const response = await axios.get(`${config.BASE_URL}/bookcase/books/${id}`)

  const data: Item = response.data
  return (
    <div className='relative border-b-1 dark:bg-gray-700 bg-white dark:border-gray-600 border-gray-400 flex flex-col w-full gap-3 min-h-[1000px]'>
      {/* image slider */}
      <div className='w-full'>
        <Swiper data={data} />
      </div>

      {/* title author price */}
      <div className='w-full p-3 flex justify-between'>
        <div className='flex flex-col'>
          <h1 className='text-[18px] text-[#000000]'>{data.title}</h1>
          <h3 className='text-[14px] text-[#919191]'>{data.author}</h3>
        </div>
        <button className='text-[#52CC6D] text-xl/relaxed'>{toPersianNumber(data.sale_price)} تومان</button>
      </div>

      <Properties category={data.category} description={data.description} province={data.province} />

      {/* offer */}
      <div className='flex flex-col gap-3'>
        <div className='m-3'>
          <h2 className='my-1 dark:text-gray-300 text-[#121212] text-[16px]'>موردعلاقه</h2>
          <Cards />
        </div>

        <div className='m-3'>
          <h2 className='my-1 dark:text-gray-300  text-[#121212] text-[16px]' >موردعلاقه</h2>
          <Cards />
        </div>

        <div className='m-3'>
          <h2 className='my-1 dark:text-gray-300 text-[#121212] text-[16px]'>بیشترین فروش</h2>
          <Cards />
        </div>
      </div>

      <Nav/>
    </div >
  )
}
