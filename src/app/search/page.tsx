'use client'
import TopFooter from '@/components/Home/slider/Slider'
import type React from 'react'

import { toPersianNumber } from '../../convertNumberToPersion'
import axios, { AxiosError } from 'axios'
import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import config from '../../config'
import { motion } from 'framer-motion'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { useDebounce } from 'use-debounce'

interface Post {
  id: number
  title: string
  author: string
  province: string
  sale_price: number
  front_image: string
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 }
}

const Infinite = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [footerData, setFooterData] = useState([])
  const controllerRef = useRef<AbortController | null>(null)

  const [debouncedSearch] = useDebounce(searchTerm, 500)

  const ClientOnlyLottie = dynamic(() => import('./ClientOnlyLottie'), {
    ssr: false
  })

  const fetchPosts = async (pageNum: number, search?: string) => {
    setLoading(true)

    // لغو درخواست قبلی
    if (controllerRef.current) controllerRef.current.abort()

    const newController = new AbortController()
    controllerRef.current = newController

    try {
      const { data } = await axios.get(
        `${config.BASE_URL}/bookcase/books/?page=${pageNum}&page_size=10&search=${search || ''}`,
        { signal: newController.signal }
      )

      console.log(data)

      if (search && pageNum === 1) {
        setPosts(data.results)
      } else {
        setPosts(prevPosts => [...prevPosts, ...data.results])
      }

      setHasMore(data.results.length === 10)
    } catch (err) {
      const error = err as AxiosError<{ name: string }>;
      if (error.name === 'CanceledError' || error.name === 'AbortError') {
        console.log('درخواست لغو شد')
      } else {
        console.error(err)
        setHasMore(false)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts(page, debouncedSearch)
  }, [page, debouncedSearch])

  useEffect(() => {
    const fetch_footerData = async () => {
      try {
        const data = await axios.get(`${config.BASE_URL}/api/v1/bookcase/books/?page_size=100`)
        setFooterData(data.data.results)
      } catch (error) {
        console.error('Failed to fetch footer data:', error)
        setFooterData([])
      }
    }

    fetch_footerData()
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTerm.length > 0) {
      setPosts([])
      setHasMore(true)
      setPage(1)
    }
  }

  return (
    <div className='px-4'>
      {/* Search Input */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className='relative my-4'
      >
        <input
          type='text'
          placeholder='جستجو...'
          className='w-full px-4 py-3 rounded-lg border dark:border-gray-600 border-gray-300 focus:border-blue-500 focus:outline-none shadow-sm dark:bg-gray-900 dark:text-white'
          value={searchTerm}
          onChange={e => {
            setSearchTerm(e.target.value)
            if (e.target.value === '') {
              setPosts([])
              setHasMore(true)
              setPage(1)
            }
          }}
          onKeyDown={handleKeyDown}
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className='absolute top-3 left-3 text-xl text-gray-500 hover:text-red-500'
          >
            ×
          </button>
        )}
      </motion.div>

      {/* Posts Grid */}
      <InfiniteScroll
        dataLength={posts.length}
        next={() => setPage(prev => prev + 1)}
        hasMore={hasMore}
        loader={<LoadingSkeleton />}
        endMessage={
          <div className='text-center py-4 text-gray-400'>پایان لیست</div>
        }
      >
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              variants={cardVariants}
              initial='hidden'
              animate='visible'
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Link
                href={`/book/${post.id}`}
                className='bg-white dark:bg-gray-800 rounded-xl shadow-md p-3 flex gap-3 hover:shadow-xl transition duration-300'
              >
                <Image
                  src={post.front_image}
                  alt={post.title}
                  width={10000}
                  height={1400000}
                  className='w-[100px] h-[140px] object-cover rounded-lg'
                />
                <div className='flex flex-col justify-between flex-grow'>
                  <div>
                    <h2 className='text-lg font-semibold text-gray-800 dark:text-white'>
                      {post.title}
                    </h2>
                    <h3 className='text-sm text-gray-500 dark:text-gray-400'>
                      {post.author}
                    </h3>
                  </div>
                  <div className='flex justify-between items-end mt-2'>
                    <span className='text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-full'>
                      {post.province}
                    </span>
                    <span className='text-sm text-gray-700 dark:text-gray-300'>
                      {toPersianNumber(post.sale_price)}{' '}
                      <span className='text-xs'>تومان</span>
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </InfiniteScroll>

      {/* Empty State */}
      {posts.length === 0 && !loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className='flex justify-center items-center mt-12'
        >
          <ClientOnlyLottie />
        </motion.div>
      )}

      {/* Footer */}
      {footerData.length > 0 && (
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
          <TopFooter data={footerData} />
        </motion.div>
      )}
    </div>
  )
}

export default Infinite

const LoadingSkeleton = () => (
  <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-4'>
    {Array.from({ length: 2 }).map((_, index) => (
      <div
        key={index}
        className='bg-white dark:bg-gray-800 rounded-xl p-3 flex gap-3 shadow animate-pulse'
      >
        <div className='w-[100px] h-[140px] bg-gray-300 dark:bg-gray-700 rounded-lg'></div>
        <div className='flex flex-col justify-between flex-grow space-y-2'>
          <div className='h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4'></div>
          <div className='h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2'></div>
          <div className='h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/4'></div>
        </div>
      </div>
    ))}
  </div>
)
