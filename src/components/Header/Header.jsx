'use client'

import Link from 'next/link'
import React, { useState, useEffect, useContext } from 'react'
import { AppContext } from '../../../context/AppContext'
import config from '../../config'
import Buttons_Main from './Buttons'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'

export default function Header() {
  const [username, setUsername] = useState('')
  const [hiddenName, setHiddenName] = useState(false)
  const [loading, setLoading] = useState(true)
  const { refresh, access, setAccess, setRefresh } = useContext(AppContext)

  // Initialize tokens from localStorage
  useEffect(() => {
    const storedAccess = localStorage.getItem('access')
    const storedRefresh = localStorage.getItem('refresh')
    
    if (storedAccess) setAccess(storedAccess)
    if (storedRefresh) setRefresh(storedRefresh)

    const timer = setInterval(() => setHiddenName(false), 10000)
    return () => clearInterval(timer)
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
        const fullName = [first_name, last_name].filter(Boolean).join(' ').trim()
        
        if (fullName) {
          setUsername(fullName)
          setHiddenName(true)
        }
      } catch (err) {
        console.error('Error fetching user info:', err)
        
        // If unauthorized (401) and we have a refresh token
        if (err.response?.status === 401 && refresh) {
          try {
            const tokenRes = await axios.post(`${config.BASE_URL}/auth/refresh/`, {
              refresh
            })
            
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
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
          }
        }
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [access, refresh, setAccess, setRefresh])

  const handleLogout = () => {
    setAccess(null)
    setRefresh(null)
    setUsername('')
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
  }

  return (
    <header className="relative flex items-center justify-between w-full px-6 py-4 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 shadow-md">
      <div className="flex items-center gap-4">
        <Link
          className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-wide hover:text-blue-700 dark:hover:text-blue-500 transition-colors duration-300"
          href="/"
        >
          کتاب بان
        </Link>
      </div>

      <div className="flex items-center gap-5">
        <Buttons_Main />
        
        {username && (
          <button 
            onClick={handleLogout}
            className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            خروج
          </button>
        )}
      </div>

      <AnimatePresence>
        {username && hiddenName && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="absolute top-5 right-5 flex items-center gap-3 bg-green-500 text-white px-5 py-2 rounded-xl shadow-lg cursor-pointer select-none z-30"
          >
            <button
              onClick={() => setHiddenName(false)}
              className="text-xl font-bold hover:text-red-300 transition-colors duration-200"
              aria-label="Close welcome message"
            >
              ×
            </button>
            <span className="text-sm sm:text-base font-semibold">
              {username} خوش آمدی!!
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-10">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
    </header>
  )
}