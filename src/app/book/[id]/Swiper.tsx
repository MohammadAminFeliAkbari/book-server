'use client'
import React from 'react'
import { Swiper as SWIPER, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import Image from 'next/image'

type SwiperProps = {
  data: {
    front_image: string
    back_image: string
  }
}

export default function Swiper({ data }: SwiperProps) {
  if (!data || (!data.front_image && !data.back_image)) {
    return <div className='text-center p-4 text-gray-500'>تصویری موجود نیست</div>
  }

  return (
    <div className='w-full max-w-2xl mx-auto'>
      <SWIPER
        pagination={{
          dynamicBullets: true
        }}
        modules={[Pagination]}
        className='mySwiper'
      >
        {data.front_image && (
          <SwiperSlide>
            <div className='relative w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-lg overflow-hidden'>
              <Image
                src={data.front_image}
                alt='جلد جلو'
                fill
                className='object-contain'
              />
            </div>
          </SwiperSlide>
        )}

        {data.back_image && (
          <SwiperSlide>
            <div className='relative w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-lg overflow-hidden'>
              <Image
                src={data.back_image}
                alt='جلد پشت'
                fill
                className='object-contain'
              />
            </div>
          </SwiperSlide>
        )}
      </SWIPER>
    </div>
  )
}
