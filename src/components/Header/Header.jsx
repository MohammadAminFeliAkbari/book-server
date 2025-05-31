'use client'

import Link from 'next/link'
import React, { useState, useEffect, useContext } from 'react'
import { AppContext } from '../../../context/AppContext'
import config from '../../config'
import Buttons_Main from './Buttons'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'

export default function Header () {
  const [username, setUsername] = useState()
  const [loading, setLoading] = useState(true)
  const { refresh, access, setAccess, setRefresh } = useContext(AppContext)

  useEffect(() => {
    const storedAccess = localStorage.getItem('access')
    const storedRefresh = localStorage.getItem('refresh')

    if (storedAccess) setAccess(storedAccess)
    if (storedRefresh) setRefresh(storedRefresh)
  }, [setAccess, setRefresh])

  // Fetch user data when tokens change
  useEffect(() => {
    const fetchUserData = async () => {
      if (!access) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        const res = await axios.get(`${config.BASE_URL}/account/me/`, {
          headers: {
            Authorization: `Bearer ${access}`
          }
        })

        const { first_name, last_name } = res.data
        const fullName = [first_name, last_name]
          .filter(Boolean)
          .join(' ')
          .trim()

        if (fullName) {
          setUsername(fullName)
          toast.success(`${fullName} خوش امدی!`, { duration: 5000 })
        }
      } catch (err) {
        console.error('Error fetching user info:', err)

        // If unauthorized (401) and we have a refresh token
        if (err.response?.status === 401 && refresh) {
          try {
            const tokenRes = await axios.post(
              `${config.BASE_URL}/auth/refresh/`,
              {
                refresh
              }
            )

            const { access: newAccess } = tokenRes.data
            setAccess(newAccess)
            localStorage.setItem('access', newAccess)

            // Retry fetching user data with new token
            await fetchUserData()
          } catch (refreshError) {
            console.error('Token refresh failed:', refreshError)
            // Clear invalid tokens
            setAccess(null)
            setRefresh(null)
          }
        }
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [access, refresh, setAccess, setRefresh])

  const handleLogout = async () => {
    const response = await axios.post(`${config.BASE_URL}/auth/logout`, {
      refresh: refresh
    })

    console.log('logout is')

    console.log(response)

    setAccess(null)
    setRefresh(null)
    setUsername('')
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
  }

  return (
    <header className='relative flex items-center justify-between w-full px-6 py-4 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 shadow-md'>
      <div className='flex items-center gap-4'>
        <Link
          className='text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-wide hover:text-blue-700 dark:hover:text-blue-500 transition-colors duration-300'
          href='/'
        >
          کتاب بان
        </Link>
      </div>

      <div className='flex items-center gap-5'>
        <Buttons_Main />

        {username && (
          <button
            onClick={handleLogout}
            className='px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors'
          >
            خروج
          </button>
        )}
      </div>

      <Toaster position='top-left' />

      {loading && (
        <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-10'>
          <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500'></div>
        </div>
      )}
    </header>
  )
}
