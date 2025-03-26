'use client'
import React from 'react'
import { useFormik } from 'formik'
import './signUpCss.css'

interface FormValues {
  userName: string
  password: string
}

// Validation function
const validate = (values: FormValues) => {
  const errors: Partial<Record<keyof FormValues, string>> = {}

  if (!values.userName) {
    errors.userName = 'نام کاربری نباید خالی باشد'
  } else if (values.userName.length > 15) {
    errors.userName = 'Must be 15 characters or less'
  }

  if (!values.password) {
    errors.password = 'رمز عبور لازم است'
  } else if (values.password.length < 8) {
    errors.password = 'رمز عبور نباید کمتر از 8 کاراکتر باشد'
  }

  return errors
}

function FormSection () {
  // const [error, setError] = useState<string>('')

  const formik = useFormik<FormValues>({
    initialValues: {
      userName: '',
      password: ''
    },
    validate,
    onSubmit: () => {
      // Handle submission logic here
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
            name='userName'
            id='userName'
            onChange={formik.handleChange}
            value={formik.values.userName}
          />
          {/* {formik.errors.userName || error ? (
            <div className='text-red-500 dark:text-red-500 text-right flex gap-4 text-md mb-2 ml-10'>
              <button
                type='button' // Use type="button" to prevent form submission
                onClick={handleForgotPassword}
                className='text-sm font-medium text-primary-600 text-center hover:underline dark:text-gray-400 text-gray-600'
              >
                فراموشی رمز؟
              </button>
              {error
                ? '(!نام کاربری دیگری استفاده کنید) این یوزرنیم قبلا استفاده شده'
                : formik.errors.userName}
            </div>
          ) : null} */}
          <input
            className='w-full p-4 mb-2 border dark:bg-gray-300 text-gray-800 border-light-gray rounded-md focus:outline-none'
            type='password'
            placeholder='رمز عبور'
            name='password'
            id='password'
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.errors.password ? (
            <div className='text-red-500 text-right'>
              {formik.errors.password}
            </div>
          ) : null}
          <button
            type='submit'
            className='w-full bg-[hsl(154,59%,51%)] border-0 border-b-2 border-b-black/20 rounded-md p-4 text-white cursor-pointer'
          >
            ثبت نام
          </button>
        </form>
      </div>
    </div>
  )
}

export default FormSection
