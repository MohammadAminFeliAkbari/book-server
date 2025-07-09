'use client'
import { useContext, useLayoutEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { AppContext } from '../../../context/AppContext'
import loadingSvg from '../signup/loading.svg'
import Image from 'next/image'
import { category } from './category'
import { province } from './province'
import axios, { AxiosError } from 'axios'
import config from '../../config'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { condition } from './condition'

type BookData = {
  title: string
  author: string
  category: string
  sale_price: string
  province: string
  front_image: File | null
  back_image: File | null
  description: string
  publisher: string
  publish_year: string
  real_price: string
  translator: string
  page_number: string
  condition: 'new' | 'like_new' | 'good' | 'acceptable' | 'damaged' | ''
  user_anonymous: false | true
}

const BookForm = () => {
  const router = useRouter()
  const { access } = useContext(AppContext)
  const [error_, setError] = useState<string[]>()
  const [loading, setLoading] = useState(false)
  const [tradition, setTradition] = useState(false)

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('عنوان کتاب نباید خالی باشد'),
    author: Yup.string().required('نویسنده نباید خالی باشد'),
    category: Yup.string().required('دسته بندی نباید خالی باشد'),
    sale_price: Yup.string().required('قیمت کتاب نباید خالی باشد'),
    province: Yup.string().required('استان نباید خالی باشد'),
    front_image: Yup.mixed()
      .required('عکس روی کتاب نباید خالی باشد')
      .test('fileFormat', 'فرمت فایل باید jpg یا png باشد', value => {
        if (!value) return false
        return ['image/jpeg', 'image/png'].includes((value as File).type)
      }),
    back_image: Yup.mixed()
      .required('عکس پشت کتاب نباید خالی باشد')
      .test('fileFormat', 'فرمت فایل باید jpg یا png باشد', value => {
        if (!value) return false
        return ['image/jpeg', 'image/png'].includes((value as File).type)
      }),
    description: Yup.string().max(100, 'به حداکثر رسیدید!')
  })

  useLayoutEffect(() => {
    if (!access) router.push('/signup')
  }, [])

  const formik = useFormik<BookData>({
    initialValues: {
      title: '',
      author: '',
      back_image: null,
      category: '5',
      description: '',
      front_image: null,
      province: 'آذربایجان شرقی',
      sale_price: '',
      condition: '',
      page_number: '',
      publish_year: '',
      publisher: '',
      real_price: '',
      translator: '',
      user_anonymous: false
    },
    validationSchema,
    onSubmit: values => {
      setLoading(true)

      const post = async () => {
        // Inside your function...
        try {
          await axios.post(`${config.BASE_URL}/bookcase/books/`, values, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${access}`
            }
          })
          toast.success('کتاب شما بعد از تایید ادمین افزوده خواهد شد!', {
            duration: 5000,
            style: {
              fontSize: '12px'
            }
          })

          router.push('/')
        } catch (error) {
          const axiosError = error as AxiosError<Record<string, string[]>>
          const errors_value = axiosError.response?.data

          const allErrors: string[] = []

          if (errors_value) {
            for (const key in errors_value) {
              if (Object.prototype.hasOwnProperty.call(errors_value, key)) {
                allErrors.push(...errors_value[key])
              }
            }
          }

          setError(allErrors)
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
      className='max-w-2xl mx-3 my-8 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700'
    >
      <h1 className='text-2xl font-bold text-center text-gray-800 dark:text-white mb-8'>
        افزودن کتاب جدید
      </h1>

      {/* TEXT INPUTS */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
        {[
          { id: 'title', placeholder: 'عنوان کتاب', type: 'text' },
          { id: 'author', placeholder: 'نویسنده', type: 'text' },
          {
            id: 'sale_price',
            placeholder: 'قیمت پیشنهادی (تومان)',
            type: 'number'
          }
        ].map(({ id, placeholder, type }) => (
          <div key={id} className='space-y-1'>
            <input
              type={type}
              placeholder={placeholder}
              id={id}
              {...formik.getFieldProps(id)}
              className='w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500 text-gray-800 dark:text-white'
            />
            {formik.touched[id as keyof BookData] &&
              formik.errors[id as keyof BookData] && (
                <p className='text-red-500 text-xs mt-1 text-right'>
                  {formik.errors[id as keyof BookData]}
                </p>
              )}
          </div>
        ))}
      </div>

      {/* SELECTS */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
        {[
          { id: 'province', data: province },
          { id: 'category', data: category }
        ].map(({ id, data }) => (
          <div key={id} className='space-y-1'>
            <select
              id={id}
              {...formik.getFieldProps(id)}
              className='w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent text-gray-800 dark:text-white appearance-none'
            >
              {data.map((item: { value: string; display_name: string }) => (
                <option key={item.value} value={item.value}>
                  {item.display_name}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <div className='m-6 flex justify-between '>
        <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
          انتشار ناشناس؟
        </label>
        <div className='flex space-x-6 rtl:space-x-reverse'>
          <label className='flex items-center space-x-2 rtl:space-x-reverse'>
            <input
              type='radio'
              name='user_anonymous'
              value='no'
              checked={formik.values.user_anonymous === false}
              onChange={() => formik.setFieldValue('user_anonymous', false)}
              className='form-radio text-green-600'
            />
            <span className='text-sm text-gray-700 dark:text-gray-300'>
              خیر
            </span>
          </label>
          <label className='flex items-center space-x-2 rtl:space-x-reverse'>
            <input
              type='radio'
              name='user_anonymous'
              value='yes'
              checked={formik.values.user_anonymous === true}
              onChange={() => formik.setFieldValue('user_anonymous', true)}
              className='form-radio text-green-600'
            />
            <span className='text-sm text-gray-700 dark:text-gray-300'>
              بله
            </span>
          </label>
        </div>
      </div>

      {/* IMAGE UPLOADS */}
      <div className='mb-6'>
        <h3 className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-3'>
          تصاویر کتاب
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {[
            { key: 'front_image', label: 'تصویر روی کتاب' },
            { key: 'back_image', label: 'تصویر پشت کتاب' }
          ].map(img => (
            <div key={img.key} className='space-y-1'>
              <label
                htmlFor={img.key}
                className='w-full h-40 bg-gray-50 dark:bg-gray-700 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl overflow-hidden relative cursor-pointer hover:border-green-400 transition-colors duration-200 flex items-center justify-center'
              >
                {formik.values[img.key as keyof BookData] ? (
                  <Image
                    width={200}
                    height={200}
                    src={URL.createObjectURL(
                      formik.values[img.key as keyof BookData] as File
                    )}
                    alt={img.label}
                    className='w-full h-full object-cover'
                  />
                ) : (
                  <div className='text-center p-4'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-10 w-10 mx-auto text-gray-400'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={1.5}
                        d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                      />
                    </svg>
                    <span className='text-sm text-gray-500 dark:text-gray-400 mt-2 block'>
                      {img.label}
                    </span>
                  </div>
                )}
              </label>
              <input
                type='file'
                accept='image/*'
                id={img.key}
                onChange={e => {
                  const file = e.currentTarget.files?.[0] || null
                  formik.setFieldValue(img.key, file)
                }}
                className='hidden'
              />
            </div>
          ))}
        </div>
        {(formik.errors.front_image || formik.errors.back_image) && (
          <div className='mt-2 space-y-1'>
            {formik.errors.front_image && (
              <p className='text-red-500 text-xs text-right'>
                {formik.errors.front_image as string}
              </p>
            )}
            {formik.errors.back_image && (
              <p className='text-red-500 text-xs text-right'>
                {formik.errors.back_image as string}
              </p>
            )}
          </div>
        )}
      </div>

      {/* OPTIONAL FIELDS */}
      <div className='mb-6'>
        <button
          type='button'
          onClick={() => setTradition(!tradition)}
          className='w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200'
        >
          <span className='font-medium text-gray-800 dark:text-gray-200'>
            موارد اختیاری
          </span>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className={`h-5 w-5 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${tradition ? 'rotate-180' : ''
              }`}
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
              clipRule='evenodd'
            />
          </svg>
        </button>

        {tradition && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
            className='mt-4 space-y-4 overflow-hidden'
          >
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {[
                { id: 'publisher', placeholder: 'ناشر', type: 'text' },
                {
                  id: 'publish_year',
                  placeholder: 'سال انتشار',
                  type: 'number'
                },
                {
                  id: 'real_price',
                  placeholder: 'قیمت واقعی (تومان)',
                  type: 'number'
                },
                { id: 'translator', placeholder: 'مترجم', type: 'text' },
                {
                  id: 'page_number',
                  placeholder: 'تعداد صفحات',
                  type: 'number'
                }
              ].map(({ id, placeholder, type }) => (
                <div key={id}>
                  <input
                    type={type}
                    placeholder={placeholder}
                    id={id}
                    {...formik.getFieldProps(id)}
                    className='w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500 text-gray-800 dark:text-white'
                  />
                </div>
              ))}

              <select
                id={'condition'}
                {...formik.getFieldProps('condition')}
                className='w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent text-gray-800 dark:text-white appearance-none'
              >
                {condition.map(
                  (item: { value: string; display_name: string }) => (
                    <option key={item.value} value={item.value}>
                      {item.display_name}
                    </option>
                  )
                )}
              </select>
            </div>

            <div>
              <label
                htmlFor='description'
                className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
              >
                توضیحات اضافی
              </label>
              <textarea
                id='description'
                placeholder='توضیحات درباره کتاب...'
                {...formik.getFieldProps('description')}
                rows={4}
                className='w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500 text-gray-800 dark:text-white'
              />
              {formik.errors.description && (
                <p className='text-red-500 text-xs mt-1 text-right'>
                  {formik.errors.description}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* SUBMIT BUTTON */}
      <motion.button
        type='submit'
        whileTap={{ scale: 0.98 }}
        disabled={loading}
        className={`w-full py-3 px-6 rounded-lg font-medium text-white transition-colors duration-200 ${loading
          ? 'bg-green-500 cursor-not-allowed opacity-80'
          : 'bg-green-600 hover:bg-green-700 shadow-md'
          }`}
      >
        {loading ? (
          <div className='flex items-center justify-center space-x-2'>
            <Image
              src={loadingSvg}
              alt='در حال ارسال'
              width={24}
              height={24}
              className='animate-spin'
            />
            <span>در حال ارسال...</span>
          </div>
        ) : (
          'اضافه کردن کتاب'
        )}
      </motion.button>

      {/* ERRORS */}
      {error_ && error_.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className='mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg'
        >
          <h3 className='text-sm font-medium text-red-800 dark:text-red-200 mb-2'>
            خطاهای موجود:
          </h3>
          <ul className='space-y-1'>
            {error_.map((error, index) => (
              <li
                key={index}
                className='text-sm text-red-700 dark:text-red-300'
              >
                {error}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.form>
  )
}

export default BookForm
