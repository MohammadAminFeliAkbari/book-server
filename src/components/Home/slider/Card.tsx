import Image from 'next/image'
import { toPersianNumber } from '../../../convertNumberToPersion'
import React from 'react'
import Link from 'next/link'

interface CardProps {
  title: string
  front_image: string
  author: string
  province: string
  sale_price: number
  id: string
}

const Card: React.FC<CardProps> = ({
  id,
  title,
  front_image,
  author,
  province,
  sale_price
}) => {
  return (
    <Link href={`/book/${id}`} className='relative flex flex-col gap-1 p-2 m-0.5 shadow-md rounded h-[300px]'>
      {/* <Image src={front_image} alt='' width={152} height={0} /> */}
      <img src={front_image} className='h-[200px] w-[150px]' />
      <h4 className='absolute top-3 right-3 bg-gray-500 p\x-2 p-1 rounded-md text-xs font-medium text-white'>
        {'>'} {province}
      </h4>
      <h2 className='mt-1 text-[15px]'>{title}</h2>

      <h3 className=' mt-3'>
        {toPersianNumber(sale_price)}
        <span className='text-gray-400'> تومان</span>
      </h3>
    </Link>
  )
}

export default Card
