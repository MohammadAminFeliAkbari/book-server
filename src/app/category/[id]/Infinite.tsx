'use client'
import { toPersianNumber } from '../../../convertNumberToPersion'
import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

const Infinite = ({ categoryNumber }: { categoryNumber: number }) => {
  const [posts, setPosts] = useState<any[]>([])
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Function to fetch posts
  const fetchPosts = async (pageNum: number) => {
    setLoading(true)
    setError('') // Reset any previous error

    try {
      const { data } = await axios.get(
        `http://141.11.21.237:8000/api/v1/bookcase/books/?category=${categoryNumber}&page=${pageNum}&page_size=10`
      )
      setPosts(prevPosts => [...prevPosts, ...data.results])

      // Simulate end of data
      if (data.results.length < 10) {
        setHasMore(false)
      }
    } catch (err) {
      setError('Failed to load posts. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  // Load posts when the component mounts and when page number changes
  useEffect(() => {
    fetchPosts(page)
  }, [page])

  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={() => setPage(prevPage => prevPage + 1)}
      hasMore={hasMore}
      loader={
        <div className='grid grid-cols-2 gap-2 m-2'>
          {new Array(6).fill(null).map((_, index) => (
            <div
              key={index}
              className='flex items-center justify-center w-full h-[200px] bg-gray-300 rounded-sm sm:w-96 animate-pulse'
            >
              <svg
                className='w-10 h-20 text-gray-200 dark:text-gray-600'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='currentColor'
                viewBox='0 0 20 18'
              >
                <path d='M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z' />
              </svg>
            </div>
          ))}
        </div>
      }
      endMessage={<div className='text-center text-gray-500'></div>}
    >
      <div className='grid grid-cols-1 md:grid-cols-3 gap-0.5 m-2'>
        {posts.map(post => (
          <Link
            className='flex m-1 bg-white relative p-2 shadow-md rounded-md'
            href={`/book/${post.id}`}
          >
            <div className=''>
              <img
                src={post.front_image}
                className='rounded w-[100px] h-[140px]'
                alt=''
              />
            </div>
            <div className='p-3 flex flex-col justify-between relative'>
              <div>
                <h2 className='text-gray-800 text-[16px]'>{post.title}</h2>
                <h3 className='text-gray-500 text-[14px]'>{post.author}</h3>
              </div>
              <div className='text-[10px] absolute flex gap-3 right-3 px-2 py-1 bottom-3 rounded-full bg-gray-300'>
                <h4 className=''>{post.province}</h4>
              </div>
            </div>
            <h3 className='absolute bottom-4 left-4'>
              {toPersianNumber(post.sale_price)}
              <span className='text-gray-400 text-[10px]'> تومان</span>
            </h3>
          </Link>
        ))}
      </div>
    </InfiniteScroll>
  )
}

export default Infinite
