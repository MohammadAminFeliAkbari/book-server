'use client'
import { Autoplay, EffectCreative } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import head1 from '../assets/head1.jpg'
import head2 from '../assets/head2.jpg'
import head3 from '../assets/head3.jpg'
import Image from 'next/image'

export default function Loading () {
  return (
    <div className='w-full flex flex-col gap-8 dark:bg-gray-900 dark:text-gray-100 min-h-screen p-4 md:p-8'>
      {/* Main Hero Slider */}
      <div className='relative group'>
        <Swiper
          dir='rtl'
          grabCursor={true}
          effect='creative'
          creativeEffect={{
            prev: {
              shadow: true,
              translate: [0, 0, -400]
            },
            next: {
              translate: ['100%', 0, 0]
            }
          }}
          modules={[EffectCreative, Autoplay]}
          className='mySwiper rounded-xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700'
          autoplay={{
            delay: 3000,
            disableOnInteraction: false
          }}
        >
          <SwiperSlide>
            <div className='relative w-full h-[200px] md:h-[400px]'>
              <Image
                src={head1}
                alt='Slide 1'
                fill
                className='object-cover'
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                priority
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className='relative w-full h-[200px] md:h-[400px]'>
              <Image
                src={head2}
                alt='Slide 2'
                fill
                className='object-cover'
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className='relative w-full h-[200px] md:h-[400px]'>
              <Image
                src={head3}
                alt='Slide 3'
                fill
                className='object-cover'
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              />
            </div>
          </SwiperSlide>
        </Swiper>
        <div className='absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl'></div>
      </div>

      {/* Additional Loading Section */}
      <div className='mt-12 flex flex-col gap-10'>
        {new Array(2).fill(null).map((_, index) => (
          <div key={index} className=''>
            <div className='animate-pulse h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-6'></div>
            <div className='flex justify-between sm:grid-cols-2 lg:grid-cols-3 gap-6'>
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className='relative w-1/3'>
                  <div className='flex flex-col gap-1 p-3 rounded-lg h-[320px] bg-white dark:bg-gray-800 shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700'>
                    {/* Image Skeleton */}
                    <div className='relative w-full h-40 rounded-md overflow-hidden bg-gray-200 dark:bg-gray-700 animate-pulse'>
                      {/* Province Badge Skeleton */}
                      <div className='absolute top-2 right-2 bg-gray-300 dark:bg-gray-600 px-2 py-1 rounded-md text-xs font-medium text-transparent backdrop-blur-sm'>
                        {'>'} ...
                      </div>
                    </div>

                    {/* Content Skeleton */}
                    <div className='flex flex-col flex-1 pt-2 space-y-2'>
                      {/* Title Skeleton */}
                      <div className='space-y-1'>
                        <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-4/5'></div>
                        <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/5'></div>
                        {/* Price Skeleton */}
                      </div>

                      <div className='mt-auto pt-3'>
                        <div className='h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-24'></div>
                        <div className='h-3 mt-1 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-16'></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
