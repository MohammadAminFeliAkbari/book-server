'use client'
import { Pagination, FreeMode } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import Card from './Card'
import 'swiper/css'
import 'swiper/css/pagination'
import Link from 'next/link'

interface Item {
  id: string
  category: number
  title: string
  front_image: string
  sale_price: number
  author: string
  province: string
  category_title: string
}

export default function TopFooter ({ data }: { data: Item[] }) {
  console.log('top footer ')

  console.log(data)

  const filteredData = data.filter(
    item => item.category === 14 || item.category === 8 || item.category === 9
  )

  console.log(filteredData)

  // Create a map to store items by their category
  const categories = filteredData.reduce(
    (acc: Record<number, Item[]>, item) => {
      const categoryId = item.category
      if (!acc[categoryId]) {
        acc[categoryId] = []
      }
      acc[categoryId].push(item)
      return acc
    },
    {}
  )

  return (
    <div className='flex flex-col gap-3'>
      {Object.entries(categories).map(([categoryId, items]) => (
        <div key={categoryId} className='p-4 flex flex-col gap-0.5'>
          <div className='flex items-center justify-between'>
            <h2 className='my-1 dark:text-gray-400 text-[#2b2a2a] text-[16px] font-bold'>
              {items[0].category_title}
            </h2>
            <Link
              href={`/category/${categoryId}`}
              className='light:text-gray-600 cursor-pointer hover:text-blue-500 text-[#02b1b1] dark:text-[#02c0c0] transition-all duration-200'
            >
              مشاهده همه{' >'}
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
              {items.map(item => (
                <SwiperSlide key={item.id}>
                  <Card
                    id={item.id}
                    title={item.title}
                    front_image={item.front_image}
                    sale_price={item.sale_price}
                    author={item.author}
                    province={item.province}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      ))}
    </div>
  )
}
