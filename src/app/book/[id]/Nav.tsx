'use client'
import axios from 'axios'
import { useMotionValueEvent, motion, useScroll } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { useState, useRef, useContext } from 'react'
import config from '../../../config'
import { AppContext } from '../../../../context/AppContext'
import toast from 'react-hot-toast'
import Image from 'next/image'
import loadingSvg from '../../signup/loading.svg'
import { Tdata } from './BookPage'
import { useRouter } from 'next/navigation'

export default function Nav({ isMine, book_id, in_cart, setData, data }: { data: Tdata, setData: React.Dispatch<React.SetStateAction<Tdata | undefined>>, isMine: boolean, book_id: number, in_cart: boolean }) {
  const [hidden, setHidden] = useState(false)
  const [loading, setLoading] = useState(false)
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

  const delete_cart = async () => {
    try {
      await axios.post(`${config.BASE_URL}/cart/remove/`, {
        book_id
      }, {
        headers: {
          'Content-Type': 'application/json',
          ...(access && { Authorization: `Bearer ${access}` })
        }
      })

      toast.success('با موفقیت حذف شد!')
      setData({ ...data, in_cart: false })

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }

  const add_cart = async () => {
    await axios.post(`${config.BASE_URL}/cart/add/`,
      { book_id },
      {
        headers: {
          'Content-Type': 'application/json',
          ...(access && { Authorization: `Bearer ${access}` })
        }
      }
    ).then(() => {
      toast.success('با موفقیت ثبت شد!')
      if (!in_cart && !isMine) {
        setData({ ...data, in_cart: true })
      }
    }).catch(() => {
      toast.error('باید ابتدا وارد شوید')
    });
  }

  const delete_by_force = async () => {
    await axios.delete(`${config.BASE_URL}/bookcase/my-books/${book_id}?force=true`,
      {
        headers: {
          'Content-Type': 'application/json',
          ...(access && { Authorization: `Bearer ${access}` })
        }
      }
    ).then((res) => {
      console.log(res);
      toast.success('با موفقیت حذف شد')
      router.replace('/')
    }).catch((err) => {
      console.log(err);

    })
  }
  const delete_book = async () => {
    await axios.delete(`${config.BASE_URL}/bookcase/my-books/${book_id}/`,
      {
        headers: {
          'Content-Type': 'application/json',
          ...(access && { Authorization: `Bearer ${access}` })
        }
      }
    ).then((res) => {
      console.log(res);
      toast.success('با موفقیت حذف شد')
      router.replace('/')
    }).catch((err) => {
      console.log(err);

      if (err.response.data) {
        toast((t) => (
          <div className="bg-white p-4 rounded-lg max-w-sm w-full mx-auto">
            <h2 className="mb-4 text-gray-800 font-semibold text-center">
              این کتاب درون لیست خرید چند نفر است، آیا مایلید آن را حذف کنید؟
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => { if (!loading) delete_by_force() }}
                className={`${loading ? 'opacity-20' : ''} px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition duration-300`}
              >
                ادامه
              </button>
              <button
                onClick={() => {
                  if (!loading) toast.dismiss(t.id)
                }}
                className={`${loading ? 'opacity-20' : ''}px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg font-semibold transition duration-300`}
              >
                انصراف
              </button>
            </div>
          </div>
        ), { position: 'bottom-center' });
      }
    })

  }

  const buy_or_delete = async () => {
    setLoading(true)

    if (in_cart) {
      await delete_cart()
    } else if (isMine) {
      await delete_book()
    } else {
      await add_cart()
    }

    setLoading(false)
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
      <button onClick={buy_or_delete} className={`${isMine || in_cart ? 'bg-red-500' : ' dark:bg-green-800  bg-[#3dcd5c]'} ${loading ? 'flex justify-center opacity-35' : 'cursor-pointer'} py-5 w-full text-gray-100 dark:text-gray-300`}>
        {isMine ? 'حذف' : in_cart ? 'حذف از لیست خرید' : 'خرید'}
        {loading ? <Image
          src={loadingSvg}
          alt='Loading'
          width={20}
          height={20}
          className='animate-spin mr-2'
        /> : ""}
      </button>
    </motion.div>
  )
}