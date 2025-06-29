'use client'

import axios from "axios"
import config from '../../config'
import { useContext, useEffect, useState } from "react"
import { AppContext } from "../../../context/AppContext"
import Image from "next/image"
import { toPersianNumber } from "@/convertNumberToPersion"
import { Trash2 } from 'lucide-react'
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
  seller: number;
  created_at: string;
  total_price: number;
  items: CartItem[];
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
            } catch (error) {
                console.log("خطا در گرفتن اطلاعات:", error)
            }
        }

        fetchData()
    }, [])

    const delete_cart = async (cart_item_id: number) => {
        try {
            await axios.post(`http://141.11.21.237:8000/api/v1/cart/remove/`, {
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
                    <h2 className="dark:text-gray-200 text-2xl font-bold text-gray-800 mb-2">
                        مبلغ کل: {toPersianNumber(order.total_price).toLocaleString()} تومان
                    </h2>

                    <div className="flex flex-col gap-6">
                        {order.items.map((item) => (
                            <div key={item.id} className="flex flex-col md:flex-row gap-4 items-center justify-between border-b pb-4 relative">
                                <div className="flex items-center gap-4 w-full">
                                    <div className="w-24 h-32 relative rounded overflow-hidden shadow-sm shrink-0">
                                        <Image
                                            src={item.book.front_image}
                                            alt={item.book.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex flex-col text-right">
                                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{item.book.title}</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">✍ نویسنده: {item.book.author}</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">💰 قیمت فروش: {toPersianNumber(item.book.sale_price).toLocaleString()} تومان</p>
                                        {item.book.publisher && (
                                            <p className="text-sm text-gray-600 dark:text-gray-300">📘 ناشر: {item.book.publisher}</p>
                                        )}
                                        {item.book.publish_year && (
                                            <p className="text-sm text-gray-600 dark:text-gray-300">📅 سال انتشار: {toPersianNumber(item.book.publish_year)}</p>
                                        )}
                                    </div>
                                </div>

                                <button
                                    onClick={() => delete_cart(item.id)}
                                    className="text-red-500 absolute left-0 top-1 hover:text-red-700 transition-colors duration-200 p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-800"
                                    title="حذف از سبد خرید"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Cart
