'use client'
import { useMotionValueEvent, motion, useScroll } from 'framer-motion'
import { useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHouse,
  faCartShopping,
  faUser,
  faMagnifyingGlass,
  faArrowAltCircleDown
} from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

export default function Buttons_Main () {
  const [hidden, setHidden] = useState(false)
  const [activeTab, setActiveTab] = useState('')
  const { scrollY } = useScroll()
  const lastYRef = useRef(0)

  useMotionValueEvent(scrollY, 'change', y => {
    const difference = y - lastYRef.current
    if (Math.abs(difference) > 0) {
      setHidden(difference > 0)
      lastYRef.current = y
    }
  })

  const tabs = [
    { id: 'home', icon: faHouse, href: '/' },
    { id: 'search', icon: faMagnifyingGlass, href: '/search' },
    { id: 'post', icon: null, href: '/post' },
    { id: 'cart', icon: faCartShopping, href: '/' },
    { id: 'profile', icon: faUser, href: '/darshbord' }
  ]

  return (
    <motion.div
      animate={hidden ? 'hidden' : 'visible'}
      initial='visible'
      onFocusCapture={hidden ? () => setHidden(false) : undefined}
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: '100%', opacity: 0.9 }
      }}
      transition={{
        type: 'spring',
        damping: 20,
        stiffness: 300
      }}
      className='fixed bottom-4 left-0 right-0 z-50 flex w-full justify-center px-4'
    >
      <div className='relative w-full max-w-md'>
        <motion.div
          className='flex items-center justify-around relative bg-white dark:bg-gray-800 shadow-xl rounded-2xl px-6 py-4 backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80 border border-gray-200 dark:border-gray-700'
          layout
        >
          {tabs.map(tab => (
            <Link
              href={tab.href}
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className='relative flex flex-col items-center'
            >
              {tab.id === 'post' ? (
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className='absolute -top-7 bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full shadow-lg'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='20'
                    height='20'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='white'
                    strokeWidth='2.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <line x1='12' y1='5' x2='12' y2='19'></line>
                    <line x1='5' y1='12' x2='19' y2='12'></line>
                  </svg>
                </motion.div>
              ) : (
                <>
                  <FontAwesomeIcon
                    icon={tab.icon ? tab.icon : faArrowAltCircleDown}
                    className={`text-xl transition-colors ${
                      activeTab === tab.id
                        ? 'text-blue-500 dark:text-purple-400'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}
                  />
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId='activeTab'
                      className='absolute -bottom-1 w-1 h-1 bg-blue-500 dark:bg-purple-400 rounded-full'
                      transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 30
                      }}
                    />
                  )}
                </>
              )}
            </Link>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}
