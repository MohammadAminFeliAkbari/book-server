'use client'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import Card from './Card'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { useEffect, useState } from 'react'

// Define a type for the book data
interface Book {
  title: string
  front_image: string
  sale_price: number // Adjust type based on actual API response
  author: string
  province: string
}

export default function TopFooter () {
  const [data, setData] = useState<Book[]>([]) // State to hold array of Book

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://141.11.21.237:8000/api/v1/bookcase/books/`
        )
        if (!response.ok) throw new Error('Network response was not OK')
        const data: Book[] = await response.json() // Parse JSON with type assertion
        setData(data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])

  return (
    <div
      className='w-auto flex items-center justify-center'
      style={{ margin: '50px', direction: 'ltr' }}
    >
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={200}
        centeredSlides={true}
        breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 100 },
          850: { slidesPerView: 2, spaceBetween: 100 },
          1024: { slidesPerView: 3, spaceBetween: 50 }
        }}
        navigation
        pagination={{ clickable: true }}
      >
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            <Card
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
  )
}
