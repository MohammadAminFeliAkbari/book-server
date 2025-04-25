'use client'
import { FreeMode, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

export default function loading () {
  return (
    <div className='w-full flex items-center justify-center'>
      <Swiper
        slidesPerView={3}
        spaceBetween={20}
        freeMode={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 10
          },
          768: {
            slidesPerView: 5,
            spaceBetween: 20
          },
          1024: {
            slidesPerView: 7,
            spaceBetween: 30
          }
        }}
        modules={[FreeMode, Pagination]}
        className='mySwiper'
      >
        {Array.from({ length: 5 }).map((_, index) => (
          <SwiperSlide key={index}>
            <div className='flex flex-col items-center p-4 bg-gray-200 rounded shadow'>
              <div className='animate-pulse bg-gray-300 h-40 w-full rounded-md mb-2'></div>
              <div className='w-full h-4 bg-gray-300 rounded mb-1'></div>
              <div className='w-3/4 h-4 bg-gray-300 rounded mb-1'></div>
              <div className='w-1/2 h-4 bg-gray-300 rounded'></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
