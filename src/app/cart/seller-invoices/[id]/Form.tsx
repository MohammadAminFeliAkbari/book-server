'use client'

import React, { useContext, useEffect, useState } from 'react'
import config from '../../../../config'
import axios from 'axios'
import { AppContext } from '../../../../../context/AppContext'
import { toPersianNumber } from '@/convertNumberToPersion'
import Link from 'next/link'
import toast from 'react-hot-toast'

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

function Form({ id }: { id: number }) {
    const { access } = useContext(AppContext)
    const [data, setData] = useState<Order>()
    const [loading, setLoading] = useState(true)
    const [shipping_cost, setShipping] = useState<number>()


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${config.BASE_URL}/payment/seller-invoices/${id}/`, {
                    headers: { ...(access && { Authorization: `Bearer ${access}` }) }
                })
                setData(res.data)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [access, id])


    const finish_buy = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const res = await axios.post(
                `${config.BASE_URL}/payment/invoices/${id}/action/`,
                {
                    action: 'approve',
                    shipping_cost: shipping_cost,
                },
                {
                    headers: {
                        ...(access && { Authorization: `Bearer ${access}` }),
                    },
                }
            )
            console.log(res)

            setData((pre) => pre ? { ...pre, status: 2, status_display: 'تایید پیش فاکتور' } : pre)

            toast.success(`پیش‌فاکتور برای ${data?.buyer.first_name} ${data?.buyer.last_name} تایید شد. لطفاً منتظر پرداخت خریدار بمانید.`)
        } catch (err) {
            console.error(err)
        }
    }


    if (loading) {
        return (
            <div className="max-w-4xl mx-auto p-4 space-y-4 animate-pulse">
                {[1, 2].map(i => (
                    <div
                        key={i}
                        className="flex gap-4 p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-md border dark:border-gray-700"
                    >
                        <div className="w-24 h-32 bg-gray-300 dark:bg-gray-700 rounded-lg" />
                        <div className="flex-1 space-y-3">
                            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/3" />
                            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/3" />
                            <div className="h-4 bg-gray-200 dark:bg-gray-500 rounded w-1/4" />
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    if (!data) {
        return (
            <div className="text-center text-gray-600 dark:text-gray-300 mt-10">
                اطلاعات فاکتور پیدا نشد.
            </div>
        )
    }

    return (
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-md p-8 print:p-4 print:shadow-none print:border-none">
            <header className="mb-6 border-b pb-4 text-center">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">پیش‌فاکتور فروش</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">شماره: #{data.id}</p>
            </header>

            <section className="mb-6 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <p>🧍 خریدار: <strong>{data.buyer.first_name} {data.buyer.last_name}</strong></p>
                <p>📦 وضعیت فاکتور: <span className="font-semibold">{data.status_display}</span></p>
                <p>💰 مبلغ کل: <strong className="text-green-600 dark:text-green-400">
                    {toPersianNumber(data.total_price).toLocaleString()} تومان
                </strong></p>
            </section>

            <table className="w-full text-sm border-t border-gray-300 dark:border-gray-600">
                <thead>
                    <tr className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white">
                        <th className="py-2 px-3 text-right font-medium border-b border-gray-300 dark:border-gray-700">کتاب</th>
                        <th className="py-2 px-3 text-right font-medium border-b border-gray-300 dark:border-gray-700">نویسنده</th>
                        <th className="py-2 px-3 text-right font-medium border-b border-gray-300 dark:border-gray-700">قیمت</th>
                    </tr>
                </thead>
                <tbody>
                    {data.cart.items.map(item => (
                        <tr key={item.id} className="border-b last:border-b-0 border-gray-200 dark:border-gray-700">
                            <td className="py-2 px-3 text-right">
                                <Link href={`/book/${item.id}`}>
                                    {item.book.title}
                                </Link>
                            </td>

                            <td className="py-2 px-3 text-right">
                                <Link href={`/book/${item.id}`}>
                                    {item.book.author}
                                </Link>
                            </td>

                            <td className="py-2 px-3 text-right text-green-700 dark:text-green-400">
                                {toPersianNumber(item.book.sale_price).toLocaleString()} تومان
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {data.status === 1 && (
                <form onSubmit={finish_buy} className="mt-6 space-y-4 print:hidden">
                    <label htmlFor="shipping" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        هزینه حمل و نقل:
                    </label>
                    <input
                        id="shipping"
                        type="number"
                        onChange={(e) => setShipping(Number(e.target.value))}
                        value={shipping_cost}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-800 dark:text-white"
                        placeholder="به تومان"
                    />
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition"
                    >
                        تایید نهایی
                    </button>
                </form>
            )}
        </div>

    )
}

export default Form
