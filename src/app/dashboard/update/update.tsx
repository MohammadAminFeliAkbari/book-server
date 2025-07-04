'use client'
import React, { useContext, useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import loadingSvg from '../../signup/loading.svg'
import Image from 'next/image'
import { AppContext, contextT } from '../../../../context/AppContext'
import axios, { AxiosError } from 'axios'
import config from '../../../config'
import { useRouter } from 'next/navigation'

interface FormValues {
  first_name: string
  last_name: string
  phone_number: string
}

const validationSchema = Yup.object().shape({
  first_name: Yup.string()
    .required('نام الزامی است')
    .min(3, 'نام کاربری باید حداقل ۳ کاراکتر باشد')
    .max(20, 'نام کاربری نمی‌تواند بیشتر از ۲۰ کاراکتر باشد'),
  last_name: Yup.string()
    .required('نام خانوادگی الزامی است')
    .min(3, 'نام کاربری باید حداقل ۳ کاراکتر باشد')
    .max(20, 'نام کاربری نمی‌تواند بیشتر از ۲۰ کاراکتر باشد'),
  phone_number: Yup.string()
    .required('شماره تلفن الزامی است')
    .matches(/^(\+98|0)?9\d{9}$/, 'شماره تلفن نامعتبر است')
})

function FormSection () {
  const [loading, setLoading] = useState<boolean>(false)
  const [errors_, setError] = useState<string[]>()
  const { access } = useContext<contextT>(AppContext)
  const router = useRouter()

  const formik = useFormik<FormValues>({
    initialValues: {
      first_name: '',
      last_name: '',
      phone_number: '',
    },
    validationSchema,
    onSubmit: async values => {
      setLoading(true)
      try {
        await axios.patch(`${config.BASE_URL}/account/me/`, values, {
          // Config object
          headers: {
            Authorization: `Bearer ${access}`,
            'Content-Type': 'application/json',
            'X-CSRFTOKEN':
              'xnD7ab0C5Si0rfpxkrOKrKMZnqMMrTIISIv8azzBjnsBDATerPHAyQjQDDapUmTB',
            accept: 'application/json'
          }
        })
        router.push('/dashboard')
      } catch (error) {
        const err = error as AxiosError<Record<string, string[]>>
        const errors_value = err.response?.data

        const allErrors: string[] = []

        for (const key in errors_value) {
          if (errors_value.hasOwnProperty(key)) {
            allErrors.push(...errors_value[key])
          }
        }

        setError(allErrors)
      } finally {
        setLoading(false)
      }
    }
  })

  useEffect(() => {
    const get = async () => {
      setLoading(true)
      try {
        const response = await axios.get(`${config.BASE_URL}/account/me`, {
          headers: {
            Authorization: `Bearer ${access}`,
            'Content-Type': 'application/json'
          }
        })
        formik.setValues({
          first_name: response.data.first_name || '',
          last_name: response.data.last_name || '',
          phone_number: response.data.phone_number || '',
        })
      } catch (error) {
        const err = error as AxiosError<Record<string, string[]>>
        const errors_value = err.response?.data
        const allErrors: string[] = []

        for (const key in errors_value) {
          if (errors_value.hasOwnProperty(key)) {
            allErrors.push(...errors_value[key])
          }
        }

        setError(allErrors)
      } finally {
        setLoading(false)
      }
    }

    get()
  }, [])

  return (
    <div className='min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700'>
      <div className='w-full max-w-md'>
        <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-3xl'>
          <div className='p-8'>
            {/* Header with decorative elements */}
            <div className='text-center mb-8 relative'>
              <h1 className='text-3xl font-bold text-gray-800 dark:text-white mb-2 relative z-10'>
                ویرایش پروفایل
              </h1>
              <p className='text-gray-600 dark:text-gray-300 relative z-10'>
                اطلاعات شخصی خود را به روزرسانی کنید
              </p>
            </div>

            <form onSubmit={formik.handleSubmit} className='space-y-6'>
              <div className='space-y-5'>
                {/* First Name */}
                <div>
                  <label
                    htmlFor='first_name'
                    className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
                  >
                    نام
                  </label>
                  <input
                    autoComplete='off'
                    type='text'
                    placeholder='نام خود را وارد کنید'
                    className={`w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border ${
                      formik.touched.first_name && formik.errors.first_name
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
                    } focus:outline-none focus:ring-2 focus:border-transparent transition-all text-gray-800 dark:text-white`}
                    id='first_name'
                    {...formik.getFieldProps('first_name')}
                  />
                  {formik.touched.first_name && formik.errors.first_name && (
                    <div className='text-red-500 text-xs mt-1 text-right animate-fadeIn'>
                      {formik.errors.first_name}
                    </div>
                  )}
                </div>

                {/* Last Name */}
                <div>
                  <label
                    htmlFor='last_name'
                    className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
                  >
                    نام خانوادگی
                  </label>
                  <input
                    type='text'
                    placeholder='نام خانوادگی خود را وارد کنید'
                    className={`w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border ${
                      formik.touched.last_name && formik.errors.last_name
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
                    } focus:outline-none focus:ring-2 focus:border-transparent transition-all text-gray-800 dark:text-white`}
                    id='last_name'
                    {...formik.getFieldProps('last_name')}
                  />
                  {formik.touched.last_name && formik.errors.last_name && (
                    <div className='text-red-500 text-xs mt-1 text-right animate-fadeIn'>
                      {formik.errors.last_name}
                    </div>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label
                    htmlFor='phone_number'
                    className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
                  >
                    شماره تلفن
                  </label>
                  <input
                    autoComplete='off'
                    type='number'
                    placeholder='09xxxxxxxxx'
                    className={`w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border ${
                      formik.touched.phone_number && formik.errors.phone_number
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
                    } focus:outline-none focus:ring-2 focus:border-transparent transition-all text-gray-800 dark:text-white`}
                    id='phone_number'
                    {...formik.getFieldProps('phone_number')}
                  />
                  {formik.touched.phone_number &&
                    formik.errors.phone_number && (
                      <div className='text-red-500 text-xs mt-1 text-right animate-fadeIn'>
                        {formik.errors.phone_number}
                      </div>
                    )}
                </div>

                {/* Optional Fields Section */}
                <div className='pt-4 border-t border-gray-200 dark:border-gray-700'>
                  <h2 className='text-sm font-medium text-gray-500 dark:text-gray-400 mb-4 flex items-center'>
                    <span className='w-4 h-0.5 bg-gray-300 dark:bg-gray-600 mr-2'></span>
                    موارد اختیاری
                    <span className='w-4 h-0.5 bg-gray-300 dark:bg-gray-600 ml-2'></span>
                  </h2>

                  

                  
                </div>
              </div>

              {/* Submit Button */}
              <button
                type='submit'
                disabled={loading}
                className={`w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg shadow-lg transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  loading ? 'opacity-80 cursor-not-allowed' : ''
                } relative overflow-hidden group`}
              >
                <span className='absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></span>
                <span className='relative z-10 flex items-center justify-center'>
                  {loading ? (
                    <>
                      <Image
                        src={loadingSvg}
                        alt='Loading'
                        width={20}
                        height={20}
                        className='animate-spin mr-2'
                      />
                      در حال پردازش...
                    </>
                  ) : (
                    'بروزرسانی پروفایل'
                  )}
                </span>
              </button>
            </form>

            {/* Error Messages */}
            {errors_ && errors_.length > 0 && (
              <div className='mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg shadow-sm transition-all duration-300'>
                <h3 className='text-sm font-medium text-red-800 dark:text-red-200 mb-2 flex items-center'>
                  <svg
                    className='w-4 h-4 mr-1'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                  خطاهای موجود
                </h3>
                <div className='space-y-1.5'>
                  {errors_.map((str, index) => (
                    <div
                      key={index}
                      className='text-sm text-red-700 dark:text-red-300 leading-relaxed font-medium animate-fadeIn flex items-start'
                    >
                      <span className='inline-block mr-1'>•</span>
                      {str}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormSection
