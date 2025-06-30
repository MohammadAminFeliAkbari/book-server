'use client'

import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { AppContext } from "../../../context/AppContext"
import Image from "next/image"
import { toPersianNumber } from "@/convertNumberToPersion"
import { Trash2 } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from "swiper/modules"
import config from '../../config'

export interface CartItem {
    id: number;
    book: Book;
}

export interface Book {
    id: number;
    created_by: User;
    title: string;
    author: string;
    sale_price: number;
    province: string;
    front_image: string;
    back_image: string;
    description: string;
    created_at: string;
    updated_at: string;
    publisher: string | null;
    publish_year: number | null;
    real_price: number | null;
    condition: string | null;
    translator: string | null;
    page_number: number | null;
    user_anonymous: boolean;
    status: number;
    category: number;
}

export interface User {
    id: number;
    first_name: string;
    last_name: string;
    phone_number: string;
    eitaa_id: string | null;
    telegram_id: string | null;
}

export interface Order {
    id: number;
    buyer: number;
    created_at: string;
    total_price: number;
    items: CartItem[];
    seller: {
        first_name: string,
        last_name: string
    },
    is_invoiced: boolean;
}

function Cart() {
    const { access } = useContext(AppContext)
    const [data, setData] = useState<Order[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${config.BASE_URL}/cart/`, {
                    headers: {
                        'Content-Type': 'application/json',
                        ...(access && { Authorization: `Bearer ${access}` })
                    }
                });
                setData(response.data)
                console.log(response.data);

            } catch (error) {
                console.log("خطا در گرفتن اطلاعات:", error)
            }
        }

        fetchData()
    }, [])

    const delete_cart = async (cart_item_id: number) => {
        try {
            await axios.post(`${config.BASE_URL}/cart/remove/`, {
                cart_item_id
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    ...(access && { Authorization: `Bearer ${access}` })
                }
            })
            setData(prevData =>
                prevData.map(order => {
                    const filteredItems = order.items.filter(item => item.id !== cart_item_id);

                    // If the item was in this order, subtract its price
                    const removedItem = order.items.find(item => item.id === cart_item_id);
                    const newTotalPrice = removedItem
                        ? order.total_price - removedItem.book.sale_price
                        : order.total_price;

                    return {
                        ...order,
                        items: filteredItems,
                        total_price: newTotalPrice
                    };
                }))
        } catch {
            console.log('خطا در حذف آیتم');
        }
    }

    return (
        <div className="w-full max-w-4xl mx-auto p-4 flex flex-col gap-6">
            {data.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-300 mt-10">سبد خرید شما خالی است.</p>
            ) : data.map((order, index) => (
                <div key={index} className="dark:bg-gray-800 dark:border-gray-700 border rounded-2xl p-6 shadow-xl bg-white space-y-4 transition-all duration-300">

                    <div className="flex flex-col justify-between w-full">
                        <h2 className="dark:text-gray-200 text-xl font-bold text-gray-800">
                            مبلغ کل: {toPersianNumber(order.total_price).toLocaleString()} تومان
                        </h2>
                        <h3>فروشنده: {order.seller.first_name} {order.seller.last_name}</h3>
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
                        {order.items.map((item) => (
                            <SwiperSlide key={item.id}>
                                <div className="group flex flex-col gap-4 items-start p-4 rounded relative bg-white dark:bg-gray-900 shadow-md hover:shadow-xl transition-all duration-300">
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
                                            <p className="text-sm text-gray-600 dark:text-gray-400">✍ نویسنده: {item.book.author}</p>
                                            <p className="text-sm text-green-600 dark:text-green-400 font-semibold">
                                                💰 قیمت: {toPersianNumber(item.book.sale_price).toLocaleString()} تومان
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => delete_cart(item.id)}
                                        className="absolute top-2 right-2 text-red-500 hover:text-red-700 transition-colors duration-200 p-2 rounded-full bg-red-50 dark:bg-red-900 hover:bg-red-100 dark:hover:bg-red-800"
                                        title="حذف از سبد خرید"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </SwiperSlide>
                        ))}

                        {/* <button className={`prev-${order.id} absolute top-1/2 -left-4 z-10 transform -translate-y-1/2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white p-2 rounded-full shadow hover:bg-gray-200 dark:hover:bg-gray-600 transition`}>
                            ❮
                        </button>
                        <button className={`next-${order.id} absolute top-1/2 -right-4 z-10 transform -translate-y-1/2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white p-2 rounded-full shadow hover:bg-gray-200 dark:hover:bg-gray-600 transition`}>
                            ❯
                        </button> */}
                    </Swiper>

                </div>
            ))}
        </div>
    )
}

export default Cart
