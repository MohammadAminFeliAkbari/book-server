import React from 'react'
import axios from 'axios'
import config from '../../../config'
import { Item } from '../page'
import Swiper from './Swiper'
import { toPersianNumber } from '@/convertNumberToPersion'

export default async function Page (props: any) {
  const { id } = await props.params
  const response = await axios.get(`${config.BASE_URL}/bookcase/books/${id}`)

  const data: Item = response.data
  return (
    <div className='border m-3 dark:bg-gray-700 bg-gray-100 dark:border-gray-600 rounded p-5 flex flex-col gap-5'>
      <div className='top gap-2 flex items-center dark:text-gray-300 mx-5'>
        <span style={{ fontSize: '16px' }}>نام کتاب:</span>
        <h2 style={{ fontSize: '20px' }}>{data.title}</h2>
      </div>
      <div className='flex justify-center items-center'>
        <div className='img w-[90%]'>
          <Swiper data={data} />
        </div>
      </div>
      <div className='border dark:border-gray-600'></div>
      <div className='description'>
        <h4 className='mb-3 mr-3'>توضیحات</h4>
        <div className='border dark:border-gray-600'></div>
        <div className='flex gap-1 items-center px-4 py-2'>
          <h1 style={{ fontSize: '12px' }} className='dark:text-gray-200'>
            شهر :
          </h1>
          <h2 style={{ fontSize: '15px' }} className='dark:text-gray-300'>
            {data.province}
          </h2>
        </div>

        <div className='flex gap-1 items-center px-4 py-2 '>
          <h1 style={{ fontSize: '12px' }} className='dark:text-gray-200'>
            دیگر توضیحات :
          </h1>
          <h2 style={{ fontSize: '15px' }} className='dark:text-gray-300'>
            {data.description}
          </h2>
        </div>
      </div>

      <button className='w-full bg-green-600 text-white p-2 rounded-lg'>
        {toPersianNumber(data.sale_price)} هزارتومان{' '}
      </button>
    </div>
  )
}
