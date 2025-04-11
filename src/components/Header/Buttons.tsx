'use client'
import { useMotionValueEvent, motion, useScroll } from 'framer-motion'
import { useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHouse,
  faCartShopping,
  faUser,
  faMagnifyingGlass
} from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

export default function Buttons_Main () {
  const [hidden, setHidden] = useState(false)
  const { scrollY } = useScroll()
  const lastYRef = useRef(0)

  useMotionValueEvent(scrollY, 'change', y => {
    const difference = y - lastYRef.current
    if (Math.abs(difference) > 0) {
      setHidden(difference > 0)
      lastYRef.current = y
    }
  })

  return (
    <motion.div
      animate={hidden ? 'hidden' : 'visible'}
      initial='visible'
      onFocusCapture={hidden ? () => setHidden(false) : undefined}
      variants={{
        visible: { y: '-10%' },
        hidden: { y: '90%' }
      }}
      transition={{ duration: 0.2 }}
      className='fixed bottom-0 z-10 flex w-full justify-center pt-3'
    >
      <div className='w-full flex justify-center items-center'>
        <motion.div
          className='flex items-center relative justify-center shadow-1xl gap-10 dark:text-gray-900 dark:bg-gray-400 bg-gray-100 border-b-2 border-gray-400 px-7 py-3 rounded-3xl'
          whileHover={{ y: '-40px', cursor: 'pointer' }} // Move up on hover
        >
          <Link href={'/darshbord'}  className='pt-1'>
            <FontAwesomeIcon className='text-xl' icon={faUser} />
          </Link>
          <Link href={'/'} className='pt-1'>
            <FontAwesomeIcon className='text-xl' icon={faCartShopping} />
          </Link>

          <Link href={'/post'} className=''>
            <div className='border-1 p-1.5 rounded-full dark:bg-gray-300 bg-white shadow-md cursor-pointer'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='15'
                height='15'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='text-black'
              >
                <line x1='12' y1='5' x2='12' y2='19'></line>
                <line x1='5' y1='12' x2='19' y2='12'></line>
              </svg>
            </div>
          </Link>
          <Link href={'/search'} className='pt-1'>
            <FontAwesomeIcon className='text-xl' icon={faMagnifyingGlass} />
          </Link>
          <Link href={'/'} className='pt-1'>
            <FontAwesomeIcon className='text-xl' icon={faHouse} />
          </Link>
        </motion.div>
      </div>
    </motion.div>
  )
}
