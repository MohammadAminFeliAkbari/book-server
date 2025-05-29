'use client'

import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../context/AppContext'
import axios from 'axios'
import config from '../../config'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

function Dashboard () {
  const { access } = useContext(AppContext)
  const [data, setData] = useState<{
    first_name: string
    last_name: string
    phone_number: string
  }>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${config.BASE_URL}/account/me`, {
          headers: {
            Authorization: `Bearer ${access}`,
            'Content-Type': 'application/json'
          }
        })
        setData(response.data)
      } catch (err) {
        if (err) console.log()
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [access, router])

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className='flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-gray-800 dark:to-gray-900'
      >
        <div className='text-center'>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className='w-16 h-16 border-4 border-blue-500 dark:border-blue-400 border-t-transparent rounded-full mx-auto mb-4'
          />
          <h2 className='text-2xl font-bold text-gray-800 dark:text-gray-200'>
            در حال بارگذاری داشبورد...
          </h2>
          <p className='text-gray-600 dark:text-gray-400 mt-2'>
            لطفاً منتظر بمانید تا اطلاعات شما دریافت شود
          </p>
        </div>
      </motion.div>
    )
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className='flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-pink-100 dark:from-gray-800 dark:to-gray-900'
      >
        <div className='max-w-md p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md text-center'>
          <div className='text-red-500 dark:text-red-400 mb-4'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-16 w-16 mx-auto'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
          </div>
          <h2 className='text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2'>
            خطا! مشکلی پیش آمده است
          </h2>
          <p className='text-gray-600 dark:text-gray-400 mb-6'>{error}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/signup')}
            className='px-6 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors'
          >
            رفتن به صفحه ثبت نام
          </motion.button>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8'
    >
      <div className='max-w-7xl mx-auto'>
        <div className='flex justify-between items-center mb-8'>
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className='text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-2'>
              داشبورد شما
            </h1>
            <p className='text-gray-600 dark:text-gray-400'>
              خوش آمدید! اینجا اطلاعات حساب شما نمایش داده می‌شود
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
        >
          {data && (
            <>
              <motion.div
                whileHover={{
                  y: -5,
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                }}
                className='bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700'
              >
                <h3 className='text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider'>
                  {data.first_name}
                </h3>
              </motion.div>

              <motion.div
                whileHover={{
                  y: -5,
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                }}
                className='bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700'
              >
                <h3 className='text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider'>
                  {data.last_name}
                </h3>
              </motion.div>

              <motion.div
                whileHover={{
                  y: -5,
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                }}
                className='bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700'
              >
                <h3 className='text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider'>
                  {data.phone_number}
                </h3>
              </motion.div>
            </>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className='mt-12 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md'
        >
          <h2 className='text-xl font-bold text-gray-800 dark:text-gray-200 mb-4'>
            تکمیل پروفایل و بروزرسانی
          </h2>
          <div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5'>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '65%' }}
              transition={{ duration: 1 }}
              className='bg-blue-600 dark:bg-blue-500 h-2.5 rounded-full'
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Dashboard
