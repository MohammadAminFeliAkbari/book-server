'use client'
import TopFooter from '@/components/Home/slider/Slider'
import { toPersianNumber } from '../../convertNumberToPersion'
import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import config from '../../config'
import Empty from './empty.json'
import Lottie from 'lottie-react'

interface Post {
  id: number
  title: string
  author: string
  province: string
  sale_price: number
  front_image: string
}

const Infinite = ({ categoryNumber }: { categoryNumber: number }) => {
  const [posts, setPosts] = useState<Post[]>([])
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [footerData, setFooterData] = useState([])

  // Function to fetch posts
  const fetchPosts = async (pageNum: number, search?: string) => {
    setLoading(true)
    setError(null)

    try {
      const { data } = await axios.get(
        `http://141.11.21.237:8000/api/v1/bookcase/books/?page=${pageNum}&page_size=10&search=${
          search || ''
        }`
      )
      // On search, reset posts to the new data
      if (search && pageNum === 1) {
        setPosts(data.results)
      } else {
        setPosts(prevPosts => [...prevPosts, ...data.results])
      }

      // Simulate end of data
      setHasMore(data.results.length === 10)
    } catch (err) {
      console.error(err) // Log actual error for debugging
      // setError('Failed to load posts. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setLoading(true)
    fetchPosts(page, searchTerm)
    setLoading(false)
  }, [page, searchTerm])

  useEffect(() => {
    const fetch_footerData = async () => {
      const data = await axios.get(
        `${config.BASE_URL}/bookcase/books/?page_size=100`
      )

      console.log(data.data.results)

      setFooterData(data.data.results)
    }

    fetch_footerData()
  }, [])

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTerm.length > 0) {
      // Reset for a new search
      setPosts([])
      setHasMore(true)
      setPage(1) // Reset to page 1 for search
      // await fetchPosts(1, searchTerm)
      setSearchTerm('') // Clear the search input after search
    }
  }

  return (
    <div>
      <InfiniteScroll
        dataLength={posts.length}
        next={() => setPage(prevPage => prevPage + 1)}
        hasMore={hasMore}
        loader={
          <div className='grid grid-cols-1 md:grid-cols-3 gap-0.5 m-2'>
            {new Array(6).fill(null).map((_, index) => (
              <div
                key={index}
                className='flex m-1 bg-white relative p-2 shadow-md rounded-md dark:bg-gray-800 animate-pulse'
              >
                <div className='flex-shrink-0'>
                  <div className='rounded w-[100px] h-[140px] dark:bg-gray-500 bg-gray-300'></div>
                </div>
                <div className='p-3 flex flex-col justify-between w-full'>
                  <div className='flex flex-col'>
                    <div className='h-4 w-3/4 dark:bg-gray-500 bg-gray-300 rounded mb-2'></div>
                    <div className='h-3 w-1/2 dark:bg-gray-500 bg-gray-300 rounded'></div>
                  </div>
                  <div className='absolute flex gap-3 right-3 px-2 py-1 bottom-3 rounded-full dark:bg-gray-500 bg-gray-300 opacity-50'>
                    <div className='h-3 w-1/3 dark:bg-gray-500 bg-gray-300 rounded'></div>
                  </div>
                </div>
                <h3 className='absolute bottom-4 left-4'>
                  <div className='h-4 w-1/2 dark:bg-gray-500 bg-gray-300 rounded'></div>
                </h3>
              </div>
            ))}
          </div>
        }
        endMessage={<div className='text-center text-gray-500'></div>}
      >
        <div className='relative m-2'>
          <input
            type='text'
            className='w-full px-4 py-3 border-b-2 dark:border-gray-600 border-gray-300 outline-none focus:border-blue-500 transition duration-200'
            placeholder='جستجو..'
            onChange={e => setSearchTerm(e.target.value)}
            value={searchTerm}
            onKeyDown={handleKeyDown}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className='absolute top-3 left-3 text-xl text-gray-600 hover:text-gray-800 transition duration-200'
            >
              ×
            </button>
          )}
        </div>
        {error && <div className='text-red-500 text-center'>{error}</div>}
        {loading && posts.length === 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-0.5 m-2'>
            {new Array(3).fill(null).map((_, index) => (
              <div
                key={index}
                className='flex m-1 bg-white relative p-2 shadow-md rounded-md dark:bg-gray-800 animate-pulse'
              >
                <div className='flex-shrink-0'>
                  <div className='rounded w-[100px] h-[140px] dark:bg-gray-500 bg-gray-300'></div>
                </div>
                <div className='p-3 flex flex-col justify-between w-full'>
                  <div className='flex flex-col'>
                    <div className='h-4 w-3/4 dark:bg-gray-500 bg-gray-300 rounded mb-2'></div>
                    <div className='h-3 w-1/2 dark:bg-gray-500 bg-gray-300 rounded'></div>
                  </div>
                  <div className='absolute flex gap-3 right-3 px-2 py-1 bottom-3 rounded-full dark:bg-gray-500 bg-gray-300 opacity-50'>
                    <div className='h-3 w-1/3 dark:bg-gray-500 bg-gray-300 rounded'></div>
                  </div>
                </div>
                <h3 className='absolute bottom-4 left-4'>
                  <div className='h-4 w-1/2 dark:bg-gray-500 bg-gray-300 rounded'></div>
                </h3>
              </div>
            ))}
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-0.5 m-2'>
            {posts.map((post, index) => (
              <Link
                key={index}
                className='flex m-1 bg-white relative p-2 shadow-md rounded-md dark:bg-gray-800'
                href={`/book/${post.id}`}
              >
                <div className='flex-shrink-0'>
                  <img
                    src={post.front_image}
                    className='rounded w-[100px] h-[140px]'
                    alt={post.title}
                  />
                </div>
                <div className='p-3 flex flex-col justify-between relative'>
                  <div>
                    <h2 className='text-gray-800 text-[16px] dark:text-gray-300'>
                      {post.title}
                    </h2>
                    <h3 className='text-gray-500 text-[14px] dark:text-gray-400'>
                      {post.author}
                    </h3>
                  </div>
                  <div className='text-[10px] dark:bg-gray-700 absolute flex gap-3 right-3 px-2 py-1 bottom-3 rounded-full bg-gray-300'>
                    <h4 className=''>{post.province}</h4>
                  </div>
                </div>
                <h3 className='absolute bottom-4 left-4 dark:text-gray-300'>
                  {toPersianNumber(post.sale_price)}
                  <span className='text-gray-400 text-[10px]'> تومان</span>
                </h3>
              </Link>
            ))}
          </div>
        )}
      </InfiniteScroll>

      {posts.length == 0 && <Lottie animationData={Empty} loop={true} />}

      <TopFooter data={footerData} />
    </div>
  )
}

export default Infinite
