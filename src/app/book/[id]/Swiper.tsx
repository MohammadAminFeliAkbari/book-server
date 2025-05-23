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

export default function Swiper ({ data }: SwiperProps) {
  // Check for images availability
  if (!data || (!data.front_image && !data.back_image)) {
    return <div>No images available.</div>
  }

  return (
    <SWIPER
      pagination={{
        dynamicBullets: true // You can enable this if needed
      }}
      modules={[Pagination]}
      className='mySwiper'
    >
      {data.front_image && (
        <SwiperSlide>
          <div className='p-10'>
            <Image
              src={data.front_image}
              width={10000}
              height={100000}
              alt='Front cover'
              className='w-full h-full object-cover'
            />
          </div>
        </SwiperSlide>
      )}
      {data.back_image && (
        
        <SwiperSlide>
          <div className='p-10'>
            <Image
              src={data.back_image}
              width={10000}
              height={10000}
              alt='Front cover'
              className='w-full h-full object-cover'
            />
          </div>
        </SwiperSlide>
      )}
    </SWIPER>
  )
}
