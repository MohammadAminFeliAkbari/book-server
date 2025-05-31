'use client'
import Image from 'next/image'
import { toPersianNumber } from '../../../../convertNumberToPersion'
import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import config from '../../../../config'
import { useSearchParams } from 'next/navigation'

type Post = {
    id: string
    front_image: string
    title: string
    author: string
    province: string
    sale_price: number
}

const Infinite = ({ id_person }: { id_person: number }) => {
    const searchParams = useSearchParams();
    const first_name = searchParams.get('first_name')
    const last_name = searchParams.get('last_name')
    const [posts, setPosts] = useState<Post[]>([])
    const [hasMore, setHasMore] = useState(true)
    const [page, setPage] = useState(1)

    const fetchPosts = async (pageNum: number) => {
        try {
            const { data } = await axios.get(
                `${config.BASE_URL}/bookcase/books/?created_by=${id_person}&page=${pageNum}&page_size=10`
            )

            setPosts(prevPosts => [...prevPosts, ...data.results])

            if (data.results.length < 10) {
                setHasMore(false)
            }
        } catch (err) {
            console.error('Failed to fetch posts:', err)
        }
    }

    useEffect(() => {
        fetchPosts(page)
    }, [page])

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {first_name && last_name && (
                <div className="mb-10 text-center">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                        کتاب های {first_name} {last_name}                    </h1>
                    <div className="w-24 h-1 bg-indigo-500 mx-auto rounded-full"></div>
                </div>
            )}

            <InfiniteScroll
                dataLength={posts.length}
                next={() => setPage(prevPage => prevPage + 1)}
                hasMore={hasMore}
                loader={
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {Array.from({ length: 3 }).map((_, index) => (
                            <div
                                key={index}
                                className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden animate-pulse"
                            >
                                <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
                                <div className="p-4">
                                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
                                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                }
                endMessage={
                    null
                }
            >
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {posts.map((post, index) => (
                        <Link
                            key={index}
                            className="group bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                            href={`/book/${post.id}`}
                        >
                            <div className="relative h-48 overflow-hidden">
                                <Image
                                    width={300}
                                    height={192}
                                    src={post.front_image}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    alt={`Cover of ${post.title}`}
                                    priority={false}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                                <span className="absolute top-3 right-3 bg-white/90 dark:bg-gray-900/80 text-xs font-medium px-2 py-1 rounded-full text-gray-800 dark:text-gray-200">
                                    {post.province}
                                </span>
                            </div>
                            <div className="p-4">
                                <h2 className="text-xl font-semibold text-gray-800 dark:text-white line-clamp-2 mb-1">
                                    {post.title}
                                </h2>
                                <h3 className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                                    {post.author}
                                </h3>
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                                        {toPersianNumber(post.sale_price)} تومان
                                    </span>
                                    <button className="text-sm bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors">
                                        مشاهده جزئیات
                                    </button>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </InfiniteScroll>
        </div>
    )
}

export default Infinite