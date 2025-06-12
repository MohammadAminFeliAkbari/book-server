'use client'
import { useMotionValueEvent, motion, useScroll } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { useState, useRef } from 'react'

export default function Nav({ isMine }: { isMine: boolean }) {
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
      animate={'visible'}
      initial='visible'
      whileHover={hidden ? 'peeking' : 'visible'}
      onFocusCapture={hidden ? () => setHidden(false) : undefined}
      variants={
        {
          visible: { y: '0%' },
          hidden: { y: '90%' },
          peeking: { y: '0%', cursor: 'pointer' }
        } as Variants
      }
      transition={{ duration: 0.2 }}
      className='fixed bottom-0 z-10 flex w-full justify-center pt-3'
    >
      <button className={`${isMine ? 'bg-red-500' : ' dark:bg-green-800  bg-[#3dcd5c]'} py-5 w-full text-gray-100 cursor-pointer dark:text-gray-300`}>
        {isMine ? 'حذف' : 'خرید'}
      </button>
    </motion.div>
  )
}