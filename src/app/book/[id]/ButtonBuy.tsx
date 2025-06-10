'use client'
import { useMotionValueEvent, motion, useScroll } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'

export default function Nav() {
  const [hidden, setHidden] = useState(false)
  const [isMine, setIsMine] = useState(false) // Initial state for isMine
  const { scrollY } = useScroll()
  const lastYRef = useRef(0)

  useMotionValueEvent(scrollY, 'change', y => {
    const difference = y - lastYRef.current
    if (Math.abs(difference) > 0) {
      setHidden(difference > 0)
      lastYRef.current = y
    }
  })

  const searchParams = useSearchParams()

  useEffect(() => {
    // Get the value of 'is_mine' from the URL
    const isMineParam = searchParams.get('is_mine')

    // Determine the boolean state based on the parameter's presence
    // If 'is_mine' is present (not null), consider it true.
    // If you need specific values like '?is_mine=true', modify the logic.
    // Example: const shouldBeMine = isMineParam === 'true';
    const shouldBeMine = isMineParam !== null;

    setIsMine(shouldBeMine);

    // Optional: Log to verify the value
    console.log('useEffect - is_mineParam:', isMineParam);
    console.log('useEffect - isMine state:', shouldBeMine);

  }, [searchParams]) // <--- IMPORTANT: Add searchParams to the dependency array

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