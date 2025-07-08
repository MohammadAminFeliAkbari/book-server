'use client'
import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'
import './signUpCss.css'
import * as Yup from 'yup'
import { useRouter } from 'next/navigation'
import loadingSvg from './loading.svg'
import Image from 'next/image'
import { AppContext, contextT } from '../../../context/AppContext'
import Link from 'next/link'
import axios, { AxiosError } from 'axios'
import config from '../../config'

interface FormValues {
  first_name: string
  last_name: string
  phone_number: string
  password: string
}

// Validation function
const validationSchema = Yup.object().shape({
  first_name: Yup.string()
    .required('نام الزامی است')
    .min(3, 'نام کاربری باید حداقل ۳ کاراکتر باشد')
    .max(20, 'نام کاربری نمی‌تواند بیشتر از ۲۰ کاراکتر باشد'),
  password: Yup.string()
    .required('رمز عبور الزامی است')
    .min(6, 'رمز عبور باید حداقل ۶ کاراکتر باشد'),
  last_name: Yup.string()
    .required('نام خانوادگی الزامی است')
    .min(3, 'نام کاربری باید حداقل ۳ کاراکتر باشد')
    .max(20, 'نام کاربری نمی‌تواند بیشتر از ۲۰ کاراکتر باشد'),
  phone_number: Yup.string()
    .required('شماره تلفن الزامی است')
    .matches(/^(\+98|0)?9\d{9}$/, 'شماره تلفن نامعتبر است')
})

function FormSection() {
  const [loading, setLoading] = useState<boolean>(false)
  const [errors_, setError] = useState<string[]>()
  const router = useRouter()
  const { setAccess } = useContext<contextT>(AppContext)

  const formik = useFormik<FormValues>({
    initialValues: {
      first_name: '',
      last_name: '',
      phone_number: '',
      password: '',
    },
    validationSchema,
    onSubmit: async values => {
      setLoading(true)
      try {
        const urlSignUp = `${config.BASE_URL}/auth/signup/`

        await axios.post(urlSignUp, values)

        // اگر ثبت‌نام موفق نبود (مثلاً status 400)، می‌ره به catch
        const urlLogin = `${config.BASE_URL}/auth/login/`
        const loginRes = await axios.post(urlLogin, {
          phone_number: values.phone_number,
          password: values.password
        })

        const tokens = loginRes.data
        setAccess(tokens.access)
        localStorage.setItem('refresh', tokens.refresh)

        router.push('/')
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

  return (
    <div className='p-4 rounded-2xl mt-3 flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900'>
      <div className='w-full max-w-md'>
        <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl'>
          <div className='p-8'>
            <div className='text-center mb-8'>
              <h1 className='text-3xl font-bold text-gray-800 dark:text-white mb-2'>
                ثبت نام
              </h1>
              <p className='text-gray-600 dark:text-gray-300'>
                حساب کاربری جدید ایجاد کنید
              </p>
            </div>

            <form onSubmit={formik.handleSubmit} className='space-y-6'>
              <div className='space-y-4'>
                <div>
                  <input
                    autoComplete='off'
                    type='text'
                    placeholder='نام'
                    className={`w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border ${formik.touched.first_name && formik.errors.first_name
                      ? 'border-red-500'
                      : 'border-gray-300 dark:border-gray-600'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                    id='first_name'
                    {...formik.getFieldProps('first_name')}
                  />
                  {formik.touched.first_name && formik.errors.first_name && (
                    <div className='text-red-500 text-sm mt-1 text-right animate-fadeIn'>
                      {formik.errors.first_name}
                    </div>
                  )}
                </div>
                <div>
                  <input
                    type='text'
                    placeholder='نام خانوادگی'
                    className={`w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border ${formik.touched.last_name && formik.errors.last_name
                      ? 'border-red-500'
                      : 'border-gray-300 dark:border-gray-600'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                    id='last_name'
                    {...formik.getFieldProps('last_name')}
                  />
                  {formik.touched.last_name && formik.errors.last_name && (
                    <div className='text-red-500 text-sm mt-1 text-right animate-fadeIn'>
                      {formik.errors.last_name}
                    </div>
                  )}
                </div>
                <div>
                  <input
                    autoComplete='off'
                    type='password'
                    placeholder='رمز عبور'
                    className={`w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border ${formik.touched.password && formik.errors.password
                      ? 'border-red-500'
                      : 'border-gray-300 dark:border-gray-600'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                    id='password'
                    {...formik.getFieldProps('password')}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <div className='text-red-500 text-sm mt-1 text-right animate-fadeIn'>
                      {formik.errors.password}
                    </div>
                  )}
                </div>
                <div className='flex-1'>
                  <input
                    autoComplete='off'
                    type='text'
                    placeholder='شماره تلفن'
                    className={`w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border ${formik.touched.phone_number && formik.errors.phone_number
                      ? 'border-red-500'
                      : 'border-gray-300 dark:border-gray-600'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                    id='phone_number'
                    {...formik.getFieldProps('phone_number')}
                  />
                  {formik.touched.phone_number &&
                    formik.errors.phone_number && (
                      <div className='text-red-500 text-sm mt-1 text-right animate-fadeIn'>
                        {formik.errors.phone_number}
                      </div>
                    )}
                </div>
              </div>

              <button
                type='submit'
                disabled={loading}
                className={`w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-lg shadow-md transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${loading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
              >
                {loading ? (
                  <div className='flex items-center justify-center'>
                    <Image
                      src={loadingSvg}
                      alt='Loading'
                      width={20}
                      height={20}
                      className='animate-spin mr-2'
                    />
                    در حال پردازش...
                  </div>
                ) : (
                  'ثبت نام'
                )}
              </button>
            </form>

            {errors_ && errors_.length > 0 && (
              <div className='mt-4 space-y-2 p-4 bg-gray-300 border border-red-300 rounded-md shadow-sm'>
                {errors_.map((str, index) => (
                  <div
                    key={index}
                    className='text-sm text-red-700 leading-relaxed font-medium animate-fadeIn'
                  >
                    {str}
                  </div>
                ))}
              </div>
            )}

            <div className='mt-6 text-center'>
              <p className='text-gray-600 dark:text-gray-300'>
                حساب کاربری دارید؟{' '}
                <Link
                  href='/login'
                  className='text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors'
                >
                  ورود
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormSection
