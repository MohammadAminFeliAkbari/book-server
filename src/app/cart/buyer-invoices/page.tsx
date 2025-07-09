'use client'

import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import config from '../../../config'
import { AppContext } from '../../../../context/AppContext'
import Image from 'next/image'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { toPersianNumber } from '@/convertNumberToPersion'
import { Navigation } from 'swiper/modules'
// import { useRouter } from 'next/navigation'

// Define Order type if not imported
interface Order {
  id: number
  total_price: number
  buyer: {
    first_name: string
    last_name: string
  }
  status: number
  status_display: string
  cart: {
    items: {
      id: number
      book: {
        id: number
        title: string
        author: string
        sale_price: number
        front_image: string
      }
    }[]
  }
}

function Page() {
  const { access } = useContext(AppContext)
  const [loading, setLoading] = useState<boolean>(true)
  const [data, setData] = useState<Order[]>([])
  // const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`${config.BASE_URL}/payment/buyer-invoices/`, {
        headers: {
          ...(access && { Authorization: `Bearer ${access}` })
        }
      }).then((res) => {
        setData(res.data)
      }).catch((err) => {
        console.log(err);
      }).finally(() => {
        setLoading(false)
      })
    }
    fetchData()
  }, [])
  return (
    <div className="w-full max-w-4xl mx-auto p-4 flex flex-col gap-6">
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="p-4 border rounded-2xl shadow animate-pulse dark:bg-gray-800 bg-white flex gap-4"
            >
              <div className="w-24 h-32 bg-gray-300 dark:bg-gray-700 rounded-xl" />
              <div className="flex-1 space-y-2">
                <div className="w-1/2 h-4 bg-gray-300 dark:bg-gray-600 rounded" />
                <div className="w-1/3 h-3 bg-gray-200 dark:bg-gray-500 rounded" />
                <div className="w-1/4 h-3 bg-gray-200 dark:bg-gray-500 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : data.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-300 mt-10">
          سبد خرید شما خالی است.
        </p>
      ) : (
        data.map((order) => (
          <div
            key={order.id}
            className="dark:bg-gray-800 dark:border-gray-700 border rounded-2xl p-6 shadow-xl bg-white space-y-4 transition-all duration-300"
          >
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 sm:p-6 transition-all duration-300">
              <Link href={`/cart/buyer-invoices/${order.id}`} className="flex flex-col space-y-2">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                  مبلغ کل:{' '}
                  <span className="text-green-600">
                    {toPersianNumber(order.total_price).toLocaleString()}
                  </span>{' '}
                  تومان
                </h2>
                <h3 className="text-sm text-gray-600 dark:text-gray-300">
                  خریدار: {order.buyer.first_name} {order.buyer.last_name}
                </h3>
              </Link>
              <Link href={`/cart/buyer-invoices/${order.id}`} className="absolute left-0 top-3 bg-green-700 px-2 py-1 rounded-2xl text-[12px]">
                مشاهده جزییات
              </Link>
            </div>


            <Swiper
              modules={[Navigation]}
              navigation={{
                nextEl: `.next-${order.id}`,
                prevEl: `.prev-${order.id}`,
              }}
              dir="rtl"
              spaceBetween={16}
              slidesPerView={1.1}
              breakpoints={{
                640: { slidesPerView: 1.1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="relative"
            >
              {order.cart.items.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className="group flex flex-col gap-4 items-start p-4 rounded relative bg-white dark:bg-gray-900 shadow-md hover:shadow-xl transition-all duration-300">
                    <Link href={`/book/${item.book.id}`}>
                      <div className="w-full flex gap-4">
                        <div className="w-24 h-32 relative rounded-xl overflow-hidden shrink-0 border border-gray-300 dark:border-gray-700 shadow-sm group-hover:scale-105 transition-transform duration-300">
                          <Image
                            src={item.book.front_image}
                            alt={item.book.title}
                            fill
                            className="object-cover rounded-xl"
                          />
                        </div>
                        <div className="flex flex-col text-right justify-between">
                          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-1">
                            {item.book.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            ✍ نویسنده: {item.book.author}
                          </p>
                          <p className="text-sm text-green-600 dark:text-green-400 font-semibold">
                            💰 قیمت:{' '}
                            {toPersianNumber(item.book.sale_price).toLocaleString()} تومان
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ))
      )}
    </div>
  )
}

export default Page
