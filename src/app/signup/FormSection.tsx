'use client'
import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'
import './signUpCss.css'
import * as Yup from 'yup'
import config from '../../config'
import { useRouter } from 'next/navigation'
import loadingSvg from './loading.svg'
import Image from 'next/image'
import { AppContext, contextT } from '../../../context/AppContext'
import Link from 'next/link'

interface FormValues {
  first_name: string
  last_name: string
  phone_number: string
  password: string
}

// Validation function
const validationSchema = Yup.object().shape({
  first_name: Yup.string()
    .required('نام الزامی است') // Required message in Persian
    .min(3, 'نام کاربری باید حداقل ۳ کاراکتر باشد') // Minimum length message
    .max(20, 'نام کاربری نمی‌تواند بیشتر از ۲۰ کاراکتر باشد'), // Maximum length message
  password: Yup.string()
    .required('رمز عبور الزامی است') // Required message in Persian
    .min(6, 'رمز عبور باید حداقل ۶ کاراکتر باشد'), // Minimum length message
  last_name: Yup.string()
    .required('نام خانوادگی الزامی است') // Required message in Persian
    .min(3, 'نام کاربری باید حداقل ۳ کاراکتر باشد') // Minimum length message
    .max(20, 'نام کاربری نمی‌تواند بیشتر از ۲۰ کاراکتر باشد'), // Maximum length message
  phone_number: Yup.string()
    .required('شماره تلفن الزامی است') // Required message in Persian
    .matches(/^(\+98|0)?9\d{9}$/, 'شماره تلفن نامعتبر است') // Regex validation with error message
})

function FormSection () {
  const [networkError, setNetworkError] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [doublicatePhoneNumber, setDoublicatePhoneNumber] =
    useState<boolean>(false)
  const router = useRouter()
  const { setAccess, setRefresh } = useContext<contextT>(AppContext)
  const formik = useFormik<FormValues>({
    initialValues: {
      first_name: '',
      last_name: '',
      phone_number: '',
      password: ''
    },
    validationSchema,
    onSubmit: async values => {
      setLoading(true)
      try {
        const urlSignUp = `${config.BASE_URL}/auth/signup/`

        const res = await fetch(urlSignUp, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        })

        if (!res.ok) {
          setDoublicatePhoneNumber(true)
          return
        }

        const urlLogin = `${config.BASE_URL}/auth/login/`

        fetch(urlLogin, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            phone_number: values.phone_number,
            password: values.password
          })
        }).then(data => {
          const fetchToken = async () => {
            const tokens = await data.json()
            setAccess(tokens.access)
            setRefresh(tokens.refresh)
            localStorage.setItem('access', tokens.access)
            localStorage.setItem('refresh', tokens.refresh)
            console.log(tokens)
          }

          fetchToken()
        })

        router.push('/')
      } catch (err) {
        console.log(err)
        setNetworkError(true)
      } finally {
        setLoading(false) // Ensure loading is set to false at the end
      }
    }
  })
  return (
    <div className='section-container mt-[50px]'>
      <div className='mt-5 p-5 bg-gray-300 dark:bg-gray-700 focus:left-[50%] dark:shadow-2xl hover:scale-105 transition-all rounded-lg border-b-4 border-gray-300'>
        <form onSubmit={formik.handleSubmit}>
          <input
            type='text'
            placeholder='نام کاربری'
            className='w-full p-4 dark:bg-gray-300 mb-2 border border-light-gray text-gray-800 rounded-md focus:outline-none'
            id='first_name'
            {...formik.getFieldProps('first_name')}
          />
          {formik.touched.first_name && formik.errors.first_name ? (
            <div className='text-red-400 text-right'>
              {formik.errors.first_name}
            </div>
          ) : null}

          <input
            className='w-full p-4 mb-2 border dark:bg-gray-300 text-gray-800 border-light-gray rounded-md focus:outline-none'
            type='text'
            placeholder='نام خانوادگی'
            id='last_name'
            {...formik.getFieldProps('last_name')}
          />
          {formik.touched.last_name && formik.errors.last_name ? (
            <div className='text-red-400 text-right'>
              {formik.errors.last_name}
            </div>
          ) : null}

          <input
            className='w-full p-4 mb-2 border dark:bg-gray-300 text-gray-800 border-light-gray rounded-md focus:outline-none'
            type='password'
            placeholder='رمز عبور'
            name='password'
            id='password'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className='text-red-400 text-right'>
              {formik.errors.password}
            </div>
          ) : null}

          <input
            className='w-full number_input p-4 mb-2 border dark:bg-gray-300 text-gray-800 border-light-gray rounded-md focus:outline-none'
            type='number'
            placeholder='شماره تلفن'
            id='phone_number'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone_number}
          />
          {formik.touched.phone_number && formik.errors.phone_number ? (
            <div className='text-red-400 text-right'>
              {formik.errors.phone_number}
            </div>
          ) : null}

          {!loading ? (
            <button
              type='submit'
              className='w-full bg-[hsl(154,59%,51%)] border-0 border-b-2 border-b-black/20 rounded-md p-4 text-white cursor-pointer'
            >
              ثبت نام
            </button>
          ) : (
            <div className='w-full text-center bg-[hsl(154,59%,51%)] border-0 border-b-2 opacity-60 border-b-black/20 rounded-md p-4 text-white cursor-pointer'>
              <Image
                className='w-[20px] mx-auto'
                alt='loading'
                src={loadingSvg}
              />
            </div>
          )}
        </form>
        {networkError && (
          <h1 className='text-center mt-3 text-red-400'>خطای شبکه</h1>
        )}
        {doublicatePhoneNumber && (
          <h1 className='text-center mt-3 text-red-400'>
            شماره تلفن تکراری است!
          </h1>
        )}

        {/* Button to navigate to Login */}
        <div className='mt-2 text-center w-full flex justify-center'>
          <Link
            href={'/login'}
            className='w-full bg-blue-500 border-0 border-b-2 border-b-black/20 rounded-md p-4 text-white cursor-pointer'
          >
            ورود
          </Link>
        </div>
      </div>
    </div>
  )
}

export default FormSection
