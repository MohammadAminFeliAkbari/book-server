'use client'

import Link from 'next/link'
import React, { useState, useEffect, useContext } from 'react'
import { AppContext } from '../../../context/AppContext'
import config from '../../config'
import Buttons_Main from './Buttons'
import { motion, AnimatePresence } from 'framer-motion'

export default function Header () {
  const [username, setUsername] = useState('')
  const [hiddenName, setHiddenName] = useState(false)

  const { refresh, access, setAccess, setRefresh } = useContext(AppContext)

  useEffect(() => {
    setAccess(localStorage.getItem('access'))
    setRefresh(localStorage.getItem('refresh'))

    const timer = setInterval(() => setHiddenName(false), 10000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const fetchUserData = async () => {
      if (!access || !refresh) return

      try {
        const res = await fetch(`${config.BASE_URL}/account/me/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${access}`
          }
        })

        const data = await res.json()

        if (data.detail) {
          const tokenRes = await fetch(`${config.BASE_URL}/auth/refresh/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refresh })
          })

          const newTokens = await tokenRes.json()
          setAccess(newTokens.access)
          setRefresh(newTokens.refresh)
          localStorage.setItem('access', newTokens.access)
          localStorage.setItem('refresh', newTokens.refresh)
        } else if (data.first_name && data.last_name) {
          setUsername(`${data.first_name} ${data.last_name}`)
          setHiddenName(true)
        }
      } catch (err) {
        console.error('Error fetching user info:', err)
      }
    }

    fetchUserData()
  }, [access, refresh])

  return (
    <header className='relative flex items-center justify-center w-full px-6 py-4 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 shadow-md'>
      <h2 className='hidden xl:block font-semibold text-gray-600 dark:text-gray-400'>
        Hello
      </h2>

      <Link
        className=' text-center font-extrabold text-blue-600 dark:text-blue-400 tracking-wide hover:text-blue-700 dark:hover:text-blue-500 transition-colors duration-300'
        href='/'
      >
        کتاب بان
      </Link>

      <div className='flex items-center gap-5'>
        <Buttons_Main />
      </div>

      <AnimatePresence>
        {username && hiddenName && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className='absolute top-5 right-5 flex items-center gap-3 bg-green-500 text-white px-5 py-2 rounded-xl shadow-lg cursor-pointer select-none z-30'
          >
            <button
              onClick={() => setHiddenName(false)}
              className='text-xl font-bold hover:text-red-300 transition-colors duration-200'
              aria-label='Close welcome message'
            >
              ×
            </button>
            <span className='text-sm sm:text-base font-semibold'>
              {username} خوش آمدی!!
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
