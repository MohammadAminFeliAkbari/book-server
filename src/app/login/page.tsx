'use client'
import React, { useContext } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import config from '../../config'
import { AppContext } from '../../../context/AppContext'

interface FormValues {
  phone_number: string
  password: string
}

// Validation function  
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required('رمز عبور الزامی است') // Required message in Persian  
    .min(6, 'رمز عبور باید حداقل ۶ کاراکتر باشد'), // Minimum length message  
  phone_number: Yup.string()
    .required('شماره تلفن الزامی است') // Required message in Persian  
    .matches(/^(\+98|0)?9\d{9}$/, 'شماره تلفن نامعتبر است') // Regex validation with error message  
});

function FormSection() {
  const formik = useFormik<FormValues>({
    initialValues: {
      phone_number: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      axios.post(`${config.BASE_URL}/auth/login/`, values, {
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(data => {
        console.log('ok');
        console.log(data);
        console.log(values);

      }).catch(err => {
        console.log('error find');

        console.log(err);
      })
    }
  });

  return (
    <div className='section-container mt-[50px]'>

      <div className='mt-5 p-5 bg-gray-300 dark:bg-gray-700 focus:left-[50%] dark:shadow-2xl hover:scale-105 transition-all rounded-lg border-b-4 border-gray-300 m-5'>
        <h1 className='text-center text-xl m-2 mb-5'>ورود</h1>

        <input
          className='w-full number_input p-4 mb-2 border dark:bg-gray-300 text-gray-800 border-light-gray rounded-md focus:outline-none'
          type='number'
          placeholder='شماره تلفن'
          id='phone_number'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur} // Keep track of field blur for validation  
          value={formik.values.phone_number}
        />
        {formik.touched.phone_number && formik.errors.phone_number ? ( // Show error only if field has been touched  
          <div className='text-red-400 text-right'>
            {formik.errors.phone_number}
          </div>
        ) : null}

        <form onSubmit={formik.handleSubmit}>
          <input
            className='w-full p-4 mb-2 border dark:bg-gray-300 text-gray-800 border-light-gray rounded-md focus:outline-none'
            type='password'
            placeholder='رمز عبور'
            name='password'
            id='password'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} // Keep track of field blur for validation  
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? ( // Show error only if field has been touched  
            <div className='text-red-400 text-right'>
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

export default FormSection;  