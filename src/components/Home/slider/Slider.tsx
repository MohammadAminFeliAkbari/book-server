'use client'
import { Pagination, FreeMode } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import Card from './Card'
import CardSkeleton from './CardSkeleton'
import 'swiper/css'
import 'swiper/css/pagination'
import Link from 'next/link'
import { Tdata } from '@/app/book/[id]/BookPage'

interface Item {
  id: string
  title: string
  books: Tdata[]
}

export default function TopFooter({ data }: { data: Item[] }) {
  return (
    <div className='flex flex-col gap-3'>
      {data.length === 0 ? (
        Array.from({ length: 2 }).map((_, index) => (
          <div key={index} className='p-4 flex flex-col gap-2 animate-pulse'>
            <div className='flex items-center justify-between'>
              <div className='h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded'></div>
              <div className='h-3 w-16 bg-gray-200 dark:bg-gray-600 rounded'></div>
            </div>
            <div className='flex gap-3 overflow-x-auto'>
              {Array.from({ length: 3 }).map((_, idx) => (
                <CardSkeleton key={idx} /> // 👈 Replaced with styled skeleton
              ))}
            </div>
          </div>
        ))
      ) : (
        data.map((item, index) => (
          <div key={index} className='p-4 flex flex-col gap-0.5'>
            <div className='flex items-center justify-between'>
              <h2 className='my-1 dark:text-gray-400 text-[#2b2a2a] text-[16px] font-bold'>
                {item.title}
              </h2>
              <Link
                href={`/category/${item.id}`}
                className='light:text-gray-600 text-[12px] cursor-pointer hover:text-blue-500 text-[#02b1b1] dark:text-[#02c0c0] transition-all duration-200'
              >
                مشاهده همه {'>'}
              </Link>
            </div>
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
                {item.books.map(book => (
                  <SwiperSlide key={book.id}>
                    <Card
                      id={book.id}
                      title={book.title}
                      front_image={book.front_image}
                      sale_price={book.sale_price}
                      author={book.author}
                      province={book.province}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
