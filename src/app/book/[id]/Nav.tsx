'use client'
import axios from 'axios'
import { useMotionValueEvent, motion, useScroll } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { useState, useRef, useContext } from 'react'
import config from '../../../config'
import { AppContext } from '../../../../context/AppContext'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function Nav({ isMine, book_id }: { isMine: boolean, book_id: number }) {
  const [hidden, setHidden] = useState(false)
  const { scrollY } = useScroll()
  const lastYRef = useRef(0)
  const { access } = useContext(AppContext);
  const router = useRouter()

  useMotionValueEvent(scrollY, 'change', y => {
    const difference = y - lastYRef.current
    if (Math.abs(difference) > 0) {
      setHidden(difference > 0)
      lastYRef.current = y
    }
  })

  const buy_or_delete = () => {

    if (isMine)
      console.log('delete');
    else {
      axios.post(`${config.BASE_URL}/cart/add/`,
        { book_id: book_id },
        {
          headers: {
            'Content-Type': 'application/json',
            ...(access && { Authorization: `Bearer ${access}` })
          }
        }
      ).then(response => {
        toast.success('با موفقیت ثبت شد!')
        router.push('/')
        console.log(response.data);
      }).catch((err) => {
        toast.error('مشکلی پیش اماده بعدا دوباره امتحان کنید')
        console.error(err.response ? err.response.data : err.message);
      });

    }
  }

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
      className='bottom-0 z-10  justify-center pt-3'
    >
      <button onClick={buy_or_delete} className={`${isMine ? 'bg-red-500' : ' dark:bg-green-800  bg-[#3dcd5c]'} py-5 w-full text-gray-100 cursor-pointer dark:text-gray-300`}>
        {isMine ? 'حذف' : 'خرید'}
      </button>
    </motion.div>
  )
}