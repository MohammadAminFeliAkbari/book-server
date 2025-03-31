'use client'
import { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AppContext } from '../../../context/AppContext';
import loadingSvg from '../signup/loading.svg'
import Image from 'next/image';
import { category } from './category';
import { province } from './province';
import axios from 'axios';
import config from '../../config'
import { useRouter } from 'next/navigation';

type BookData = {
  title: string
  author: string
  category: string
  sale_price: string
  province: string
  front_image: File | null // Or specify proper type
  back_image: File | null// Or specify proper type
  description: string
}

type ShowError = {
  title?: boolean
  category?: boolean
  sale_price?: boolean
  province?: boolean
  front_image?: boolean
  back_image?: boolean
  author?: boolean
}

const BookForm = () => {
  const router = useRouter()
  const { access } = useContext(AppContext);
  const [error, setError] = useState<ShowError>({});
  const [loading, setLoading] = useState<boolean>(false)

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('عنوان کتاب نباید خالی باشد'),
    author: Yup.string().required('نویسنده نباید خالی باشد'),
    category: Yup.string().required('Category is required'),
    sale_price: Yup.string().required('قیمت کتاب نباید خالی باشد'),
    province: Yup.string().required('Province is required'),
    front_image: Yup.mixed()
      .required('عکس روی کتاب نباید خالی باشد')
      .test('fileFormat', 'فرمت فایل باید jpg یا png باشد', (value: any) => {
        if (!value) return false; // If no file, return false (invalid)  
        return value && ['image/jpeg', 'image/png'].includes(value.type);
      }),
    back_image: Yup.mixed()
      .required('عکس پشت کتاب نباید خالی باشد')
      .test('fileFormat', ' فرمت فایل باید jpg یا png باشد', (value: any) => {
        if (!value) return false;
        return value && ['image/jpeg', 'image/png'].includes(value.type);
      }),
    description: Yup.string()
  });

  const formik = useFormik<BookData>({
    initialValues: {
      title: '', //
      author: '', // 
      back_image: null,
      category: 'واژه‌نامه‌ عمومی و تخصصی', // 
      description: '',
      front_image: null,
      province: 'آذربایجان شرقی', // 
      sale_price: '', //
    },
    validationSchema,
    onSubmit: (values) => {
      setLoading(true)
      console.log(values);

      const post = async () => {
        try {
          const response = await axios.post(
            `${config.BASE_URL}/bookcase/books/`,
            values,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${access}`
              }
            }
          )
          console.log('Response:', response.data)
          router.push('/book')
        } catch (error) {
          if (axios.isAxiosError(error)) {
            setError(() => error.response?.data)
            console.log(error.response?.data)
          } else {
            console.error('Error:', error)
          }
        } finally {
          setLoading(false)
        }
      }

      post()
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className='m-5 bg-gray-700 p-5 rounded'>
      <h1 className='text-center text-[20px] mb-5'>افزودن کتاب</h1>
      <input
        className='w-full p-4 mb-2 border dark:bg-gray-300 text-gray-800 border-light-gray rounded-md focus:outline-none'
        type='text'
        placeholder='نویسنده'
        id='author'
        {...formik.getFieldProps('author')}
      />
      {formik.touched.author && formik.errors.author ? ( // Show error only if field has been touched  
        <div className='text-red-400 text-right'>
          {formik.errors.author}
        </div>
      ) : null}

      <input
        className='w-full p-4 mb-2 border dark:bg-gray-300 text-gray-800 border-light-gray rounded-md focus:outline-none'
        type='text'
        placeholder='عنوان'
        id='title'
        {...formik.getFieldProps('title')}
      />
      {formik.touched.title && formik.errors.title ? ( // Show error only if field has been touched  
        <div className='text-red-400 text-right'>
          {formik.errors.title}
        </div>
      ) : null}

      <input
        className='w-full p-4 mb-2 border dark:bg-gray-300 text-gray-800 border-light-gray rounded-md focus:outline-none'
        type='number'
        placeholder='قیمت پیشنهادی'
        id='sale_price'
        {...formik.getFieldProps('sale_price')}
      />
      {formik.touched.sale_price && formik.errors.sale_price ? ( // Show error only if field has been touched  
        <div className='text-red-400 text-right'>
          {formik.errors.sale_price}
        </div>
      ) : null}

      <select
        className='w-full p-4 mb-2 border dark:bg-gray-300 text-gray-800 border-light-gray rounded-md focus:outline-none'
        id='province'
        {...formik.getFieldProps('province')}
      >
        {province.map((item: { value: string; display_name: string }) => (
          <option key={item.value} value={item.value}>
            {item.display_name}
          </option>
        ))}
      </select>
      {formik.touched.province && formik.errors.province ? (<div className='text-red-400 text-right'>
        {formik.errors.province}
      </div>
      ) : null}

      <select
        className='w-full p-4 mb-2 border dark:bg-gray-300 text-gray-800 border-light-gray rounded-md focus:outline-none'
        id='category'
        {...formik.getFieldProps('category')}
      >
        {category.map((item: { value: string; display_name: string }) => (
          <option key={item.value} value={item.value}>
            {item.display_name}
          </option>
        ))}
      </select>
      {formik.touched.category && formik.errors.category ? (<div className='text-red-400 text-right'>
        {formik.errors.category}
      </div>
      ) : null}


      <input
        className='w-full p-4 mb-2 border dark:bg-gray-300 text-gray-800 border-light-gray rounded-md focus:outline-none'
        type='file'
        placeholder='عکس روی کتاب'
        id='front_image'
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          const fileList = event.currentTarget.files; // Get the FileList  
          if (fileList && fileList.length > 0) { // Check if fileList is not null and has at least one file  
            const file = fileList[0]; // Access the first file  
            formik.setFieldValue('front_image', file); // Set the file in Formik  
          } else {
            formik.setFieldValue('front_image', null); // Optionally set to null if no file is selected  
          }
        }}
      />
      {formik.touched.front_image && formik.errors.front_image ? ( // Show error only if field has been touched  
        <div className='text-red-400 text-right'>
          {formik.errors.front_image}
        </div>
      ) : null}

      <input
        className='w-full p-4 mb-2 border dark:bg-gray-300 text-gray-800 border-light-gray rounded-md focus:outline-none'
        type='file'
        placeholder='عکس پشت کتاب'
        id='back_image'
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          const fileList = event.currentTarget.files; // Get the FileList  
          if (fileList && fileList.length > 0) { // Check if fileList is not null and has at least one file  
            const file = fileList[0]; // Access the first file  
            formik.setFieldValue('back_image', file); // Set the file in Formik  
          } else {
            formik.setFieldValue('back_image', null); // Optionally set to null if no file is selected  
          }
        }}
      />
      {formik.touched.back_image && formik.errors.back_image ? ( // Show error only if field has been touched  
        <div className='text-red-400 text-right'>
          {formik.errors.back_image}
        </div>
      ) : null}

      <textarea
        placeholder='توضیح اضافه'
        {...formik.getFieldProps('description')}
        className='w-full h-32 p-4 mb-2 border dark:bg-gray-300 text-gray-800 border-light-gray rounded-md focus:outline-none'
      />

      {!loading ? <button
        type='submit'
        className='w-full bg-[hsl(154,59%,51%)] border-0 border-b-2 border-b-black/20 rounded-md p-4 text-white cursor-pointer'
      >
        اضافه کردن کتاب
      </button> :
        <div className='w-full text-center bg-[hsl(154,59%,51%)] border-0 border-b-2 opacity-60 border-b-black/20 rounded-md p-4 text-white cursor-pointer'>
          <Image className='w-[20px] mx-auto' alt='loading' src={loadingSvg} />
        </div>
      }
      {/* {error && <h1 className='text-red-400 mt-3'>شماره تلفن یا رمز عبور اشتباه است</h1>} */}
    </form>
  )
};


export default BookForm