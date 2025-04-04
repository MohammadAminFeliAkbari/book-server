'use client'
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import educaton from '../../assets/education.svg'

import 'swiper/css';
import 'swiper/css/pagination';

import { FreeMode, Pagination } from 'swiper/modules';
import Image from 'next/image';

export default function Popular_Menu() {
    return (
        <div className='w-full my-3 items-center justify-center'>
            <h1 className='mr-3 '>دسته بندی محبوب</h1>
            <Swiper
                slidesPerView={5}
                spaceBetween={30}
                freeMode={true}
                breakpoints={{
                    640: {
                        slidesPerView: 5,
                        spaceBetween: 0,
                    },
                    768: {
                        slidesPerView: 5,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 5,
                        spaceBetween: 30,
                    },
                }}
                modules={[FreeMode, Pagination]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div className='flex flex-col justify-center items-center'>
                        <Image className='w-12' src={educaton} alt='' />
                        <h3 style={{ color: '#9E9E9E', fontSize: '13px' }}>آموزشی</h3>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className='flex flex-col justify-center items-center'>
                        <Image className='w-12' src={educaton} alt='' />
                        <h3 style={{ color: '#9E9E9E', fontSize: '13px' }}>آموزشی</h3>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className='flex flex-col justify-center items-center'>
                        <Image className='w-12' src={educaton} alt='' />
                        <h3 style={{ color: '#9E9E9E', fontSize: '13px' }}>آموزشی</h3>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className='flex flex-col justify-center items-center'>
                        <Image className='w-12' src={educaton} alt='' />
                        <h3 style={{ color: '#9E9E9E', fontSize: '13px' }}>آموزشی</h3>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className='flex flex-col justify-center items-center'>
                        <Image className='w-12' src={educaton} alt='' />
                        <h3 style={{ color: '#9E9E9E', fontSize: '13px' }}>آموزشی</h3>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
}  