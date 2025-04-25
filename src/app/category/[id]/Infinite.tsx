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
      endMessage={
        <div className='text-center text-gray-500'>No more posts</div>
      }
    >
      <div className='grid grid-cols-1 md:grid-cols-3 gap-0.5 m-2'>
        {posts.map((post, index) => (
          <Link
            key={index} // It's important to add a key to each Link
            className='flex m-1 bg-white relative p-2 shadow-md rounded-md dark:bg-gray-800'
            href={`/book/${post.id}`}
          >
            <div className='flex-shrink-0'>
              <img
                src={post.front_image}
                className='rounded w-[100px] h-[140px]'
                alt={post.title} // Use the title as an alt text for better accessibility
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
    </InfiniteScroll>
  )
}

export default Infinite
