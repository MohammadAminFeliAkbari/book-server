'use client'
import { useContext, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { AppContext } from '../../../context/AppContext'
import loadingSvg from '../signup/loading.svg'
import Image from 'next/image'
import { category } from './category'
import { province } from './province'
import axios from 'axios'
import config from '../../config'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

type BookData = {
  title: string
  author: string
  category: string
  sale_price: string
  province: string
  front_image: File | null
  back_image: File | null
  description: string
}

const BookForm = () => {
  const router = useRouter()
  const { access } = useContext(AppContext)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('عنوان کتاب نباید خالی باشد'),
    author: Yup.string().required('نویسنده نباید خالی باشد'),
    category: Yup.string().required('دسته بندی نباید خالی باشد'),
    sale_price: Yup.string().required('قیمت کتاب نباید خالی باشد'),
    province: Yup.string().required('استان نباید خالی باشد'),
    front_image: Yup.mixed() // 👈 Explicitly type as File
      .required('عکس روی کتاب نباید خالی باشد')
      .test('fileFormat', 'فرمت فایل باید jpg یا png باشد', value => {
        if (!value) return false
        return ['image/jpeg', 'image/png'].includes((value as File).type)
      }),
    back_image: Yup.mixed() // 👈 Explicitly type as File
      .required('عکس پشت کتاب نباید خالی باشد')
      .test('fileFormat', 'فرمت فایل باید jpg یا png باشد', value => {
        if (!value) return false
        return ['image/jpeg', 'image/png'].includes((value as File).type)
      }),
    description: Yup.string()
  })

  const formik = useFormik<BookData>({
    initialValues: {
      title: '',
      author: '',
      back_image: null,
      category: 'واژه‌نامه‌ عمومی و تخصصی',
      description: '',
      front_image: null,
      province: 'آذربایجان شرقی',
      sale_price: ''
    },
    validationSchema,
    onSubmit: values => {
      setLoading(true)

      const post = async () => {
        try {
          
          // const formData = new FormData()
          // for (const key in values) {
          //   const value = (values as any)[key]
          //   formData.append(key, value)
          // }

          const response = await axios.post(
            `${config.BASE_URL}/bookcase/books/`,
            values,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${access}`
              }
            }
          )
          console.log('Response:', response.data)
          router.push('/book')
        } catch (error) {
          if (axios.isAxiosError(error)) {
            setError(true)
            console.log(error.response?.data)
          } else {
            console.error('Error:', error)
          }
        } finally {
          setLoading(false)
        }
      }

      post()
    }
  })

  return (
    <motion.form
      onSubmit={formik.handleSubmit}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className='m-5 dark:bg-gray-800 bg-white p-6 rounded-3xl shadow-xl'
    >
      <h1 className='text-center text-[22px] font-bold mb-5 text-gray-700 dark:text-white'>
        افزودن کتاب
      </h1>

      {/* TEXT INPUTS */}
      {[
        { id: 'title', placeholder: 'عنوان', type: 'text' },
        { id: 'author', placeholder: 'نویسنده', type: 'text' },
        { id: 'sale_price', placeholder: 'قیمت پیشنهادی', type: 'number' }
      ].map(({ id, placeholder, type }) => (
        <div key={id} className='mb-3'>
          <input
            type={type}
            placeholder={placeholder}
            id={id}
            {...formik.getFieldProps(id)}
            className='w-full p-4 border dark:bg-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400'
          />
          {formik.touched[id as keyof BookData] &&
          formik.errors[id as keyof BookData] ? (
            <div className='text-red-400 text-right text-sm mt-1'>
              {formik.errors[id as keyof BookData]}
            </div>
          ) : null}
        </div>
      ))}

      {/* SELECTS */}
      {[
        { id: 'province', data: province },
        { id: 'category', data: category }
      ].map(({ id, data }) => (
        <div key={id} className='mb-3'>
          <select
            id={id}
            {...formik.getFieldProps(id)}
            className='w-full p-4 border dark:bg-gray-700 rounded-xl focus:outline-none'
          >
            {data.map((item: { value: string; display_name: string }) => (
              <option key={item.value} value={item.value}>
                {item.display_name}
              </option>
            ))}
          </select>
          {formik.touched[id as keyof BookData] &&
          formik.errors[id as keyof BookData] ? (
            <div className='text-red-400 text-right text-sm mt-1'>
              {formik.errors[id as keyof BookData]}
            </div>
          ) : null}
        </div>
      ))}

      {/* IMAGE PREVIEW */}
      <div className='flex gap-4 mb-4'>
        {[
          { key: 'front_image', label: 'تصویر روی کتاب' },
          { key: 'back_image', label: 'تصویر پشت کتاب' }
        ].map(img => (
          <div className='w-1/2 relative' key={img.key}>
            {formik.values[img.key as keyof BookData] ? (
              <img
                src={URL.createObjectURL(
                  formik.values[img.key as keyof BookData] as File
                )}
                alt={img.label}
                className='w-full h-40 object-cover rounded-xl shadow-md'
              />
            ) : (
              <div className='w-full h-40 border rounded-xl flex items-center justify-center text-sm text-gray-400'>
                {img.label}
              </div>
            )}
            <input
              type='file'
              accept='image/*'
              id={img.key}
              onChange={e => {
                const file = e.currentTarget.files?.[0] || null
                formik.setFieldValue(img.key, file)
              }}
              className='absolute inset-0 opacity-0 cursor-pointer'
            />
          </div>
        ))}
      </div>

      {/* IMAGE ERRORS */}
      {(formik.errors.front_image || formik.errors.back_image) && (
        <div className='text-red-400 text-right text-sm mb-3'>
          <p>{formik.errors.front_image as string}</p>
          <p>{formik.errors.back_image as string}</p>
        </div>
      )}

      {/* DESCRIPTION */}
      <textarea
        placeholder='توضیح اضافه'
        {...formik.getFieldProps('description')}
        className='w-full h-28 p-4 mb-4 border rounded-xl focus:outline-none dark:bg-gray-700'
      />

      {/* SUBMIT BUTTON */}
      <motion.button
        type='submit'
        whileTap={{ scale: 0.98 }}
        disabled={loading}
        className={`w-full py-4 text-white rounded-xl ${
          loading
            ? 'bg-green-400 cursor-not-allowed opacity-70'
            : 'bg-green-500 hover:bg-green-600 transition'
        }`}
      >
        {loading ? (
          <Image className='w-[24px] mx-auto' alt='loading' src={loadingSvg} />
        ) : (
          'اضافه کردن کتاب'
        )}
      </motion.button>

      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className='text-red-500 text-center mt-4'
        >
          ابتدا باید وارد شوید
        </motion.p>
      )}
    </motion.form>
  )
}

export default BookForm
