'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import educaton from '../../assets/education.svg'

import 'swiper/css'
import 'swiper/css/pagination'
import { FreeMode, Pagination } from 'swiper/modules'
import Image from 'next/image'
import Link from 'next/link'

export default function Popular_Menu ({
  data
}: {
  data: [{ id: string; title: string }]
}) {
  return (
    <div className='w-full m-3 items-center justify-center'>
      <h1 className='mr-3'>دسته بندی محبوب</h1>
      <Swiper
        slidesPerView={5} // Default number of slides
        spaceBetween={30} // Space between slides
        freeMode={true} // Allows slides to be freely moved
        breakpoints={{
          640: {
            slidesPerView: 6, // Number of slides at 640px
            spaceBetween: 10 // Space between slides at 640px
          },
          768: {
            slidesPerView: 8, // Number of slides at 768px
            spaceBetween: 20 // Space between slides at 768px
          },
          1024: {
            slidesPerView: 12, // Number of slides at 1024px
            spaceBetween: 30 // Space between slides at 1024px
          }
        }}
        modules={[FreeMode, Pagination]}
        className='mySwiper'
      >
        {data.map(
          (
            item,
            index // Rendering multiple slides dynamically
          ) => (
            <SwiperSlide key={index}>
              <Link
                href={`/category/${item.id}`}
                className='flex flex-col justify-center items-center'
              >
                <Image className='w-12' src={educaton} alt='education icon' />
                <h3 className='text-[#9E9E9E] text-[10px] text-center'>
                  {item.title.length > 10
                    ? item.title.substring(0, 10) + '...'
                    : item.title}
                </h3>
              </Link>
            </SwiperSlide>
          )
        )}
      </Swiper>
    </div>
  )
}
