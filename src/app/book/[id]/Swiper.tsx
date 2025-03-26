'use client'
import React from 'react'
import { Swiper as SwiperComponent, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

type SwiperProps = {
  data: {
    front_image: string
    back_image: string
  }
}

export default function Swiper ({ data }: SwiperProps) {
  if (!data) {
    return <div>No images available.</div> // Handle case where data is undefined
  }

  return (
    <SwiperComponent
      pagination={{
        dynamicBullets: true
      }}
    >
      {data.front_image && (
        <SwiperSlide>
          <img src={data.front_image} alt='Front cover' />
        </SwiperSlide>
      )}
      {data.back_image && (
        <SwiperSlide>
          <img src={data.back_image} alt='Back cover' />
        </SwiperSlide>
      )}
    </SwiperComponent>
  )
}
