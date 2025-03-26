'use client'
import React from 'react'
import { Swiper as SwiperComponent, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

type SwiperProps = {
  data: {
    front_image: string
    back_image: string
  }
}

export default function Swiper ({ data }: SwiperProps) {
  if (!data) {
    return <div>No images available.</div>
  }

  return (
    <SwiperComponent
      pagination={{
        dynamicBullets: true
      }}
      navigation={true} // Enable navigation arrows
      modules={[Navigation]} // Register the Navigation module
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
