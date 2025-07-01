'use client'
import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import config from '../../config'
import { AppContext } from '../../../context/AppContext'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import loadingSvg from '../signup/loading.svg'
import axios from 'axios'

interface FormValues {
  phone_number: string
  password: string
}

const validationSchema = Yup.object().shape({
  phone_number: Yup.string()
    .required('شماره تلفن الزامی است')
    .matches(/^(\+98|0)?9\d{9}$/, 'شماره تلفن نامعتبر است'),
  password: Yup.string()
    .required('رمز عبور الزامی است')
    .min(1, 'رمز عبور باید حداقل ۶ کاراکتر باشد')
})

function FormSection() {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const { setAccess } = useContext(AppContext)
  const router = useRouter()

  const formik = useFormik<FormValues>({
    initialValues: {
      phone_number: '',
      password: ''
    },
    validationSchema,
    onSubmit: async values => {
      setLoading(true)
      setError(false)

      try {
        const response = await axios.post(
          `${config.BASE_URL}/auth/login/`,
          values,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )

        console.log(response.data.access)
        console.log(response.data.refres)

        setAccess(response.data.access)
        localStorage.setItem('refresh', response.data.refresh)

        router.push('/')
      } catch (err: unknown) {
        if (err) console.log()

        setError(true)
      } finally {
        setLoading(false)
      }
    }
  })

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 p-4'>
      <div className='w-full max-w-md'>
        <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl'>
          <div className='p-8'>
            <div className='text-center mb-8'>
              <h1 className='text-3xl font-bold text-gray-800 dark:text-white mb-2'>
                ورود به حساب کاربری
              </h1>
              <p className='text-gray-600 dark:text-gray-300'>
                لطفا اطلاعات خود را وارد کنید
              </p>
            </div>

            <form onSubmit={formik.handleSubmit} className='space-y-6'>
              <div className='space-y-4'>
                <div>
                  <input
                    type='number'
                    placeholder='شماره تلفن'
                    className={`w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border rtl:text-2xl ${formik.touched.phone_number && formik.errors.phone_number
                        ? 'border-red-500'
                        : 'border-gray-300 dark:border-gray-600'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                    id='phone_number'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phone_number}
                  />
                  {formik.touched.phone_number &&
                    formik.errors.phone_number && (
                      <div className='text-red-500 text-sm mt-1 text-right animate-fadeIn'>
                        {formik.errors.phone_number}
                      </div>
                    )}
                </div>

                <div>
                  <input
                    type='password'
                    placeholder='رمز عبور'
                    className={`w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border ${formik.touched.password && formik.errors.password
                        ? 'border-red-500'
                        : 'border-gray-300 dark:border-gray-600'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                    id='password'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <div className='text-red-500 text-sm mt-1 text-right animate-fadeIn'>
                      {formik.errors.password}
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
                    در حال ورود...
                  </div>
                ) : (
                  'ورود به حساب'
                )}
              </button>

              {error && (
                <div className='animate-bounce bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 p-3 rounded-lg text-center'>
                  شماره تلفن یا رمز عبور اشتباه است
                </div>
              )}
            </form>

            <div className='mt-6 text-center'>
              <p className='text-gray-600 dark:text-gray-300'>
                حساب کاربری ندارید؟{' '}
                <a
                  href='/signup'
                  className='text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors'
                >
                  ثبت نام کنید
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormSection
