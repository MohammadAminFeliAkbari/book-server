'use client'
import React from 'react';
import { Swiper as SWIPER, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

// Import Swiper styles  
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

type SwiperProps = {
  data: {
    front_image: string;
    back_image: string;
  };
};

export default function Swiper({ data }: SwiperProps) {
  // Check for images availability  
  if (!data || (!data.front_image && !data.back_image)) {
    return <div>No images available.</div>;
  }

  return (
    <SWIPER
      pagination={{
        dynamicBullets: true, // You can enable this if needed  
      }}
      modules={[Pagination]}
      className="mySwiper"
    >
      {data.front_image && (
        <SwiperSlide>
          <img
            src={data.front_image}
            alt='Front cover'
            className='w-full h-[344px] object-cover'
          />
        </SwiperSlide>
      )}
      {data.back_image && (
        <SwiperSlide>
          <img
            src={data.back_image}
            alt='Back cover'
            className='w-full h-[344px] object-cover'
          />
        </SwiperSlide>
      )}
    </SWIPER>
  );
}  