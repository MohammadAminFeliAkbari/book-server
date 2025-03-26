'use client'
import React, { useState } from 'react'
import axios from 'axios'
import config from '../../config'
import { province } from './province'
import { Select } from 'antd'
import { category } from './category'
import { toPersianNumber } from '@/convertNumberToPersion'

const BookForm = () => {
  const [showError, setError] = useState()
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    category: '',
    sale_price: '',
    province: '',
    front_image: null,
    back_image: null,
    description: ''
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, files } = e.target
    console.log(name, value, type, files)

    if (type === 'file') {
      setBookData({
        ...bookData,
        [name]: files[0] // Store the File object
      })
    } else {
      setBookData({
        ...bookData,
        [name]: value
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData()

    for (const key in bookData) {
      formData.append(key, bookData[key]) // Append each key-value pair to FormData
    }

    try {
      const response = await axios.post(
        `${config.BASE_URL}/bookcase/books/`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      console.log('Response:', response.data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(() => error.response?.data)
        console.log(error.response?.data)
      } else {
        console.error('Error:', error)
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`max-w-md mx-auto mt-10 p-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg transition duration-300 ease-in-out transform`}
      encType='multipart/form-data'
    >
      <h2 className='text-2xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200'>
        اضافه کردن کتاب جدید
      </h2>
      <input
        type='text'
        name='title'
        value={bookData.title}
        onChange={handleChange}
        placeholder='عنوان'
        className={`${
          showError?.title ? 'border border-red-500' : null
        } block w-full p-3 mb-4 border-2 border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500`}
      />
      <input
        type='text'
        name='author'
        value={bookData.author}
        onChange={handleChange}
        placeholder='نویسنده'
        className={`${
          showError?.author ? 'border border-red-500' : null
        }  block w-full p-3 mb-4 border-2 border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500`}
      />
      <select
        name='category'
        onChange={handleChange}
        className={`${
          showError?.category ? 'border border-red-500' : null
        } bg-gray-50 w-full mb-3 border p-3 border-gray-300 text-gray-400 text-sm rounded-lg`}
        value={bookData.category} // Ensure the select is controlled
      >
        <option value=''>دسته بندی</option>
        {category.map((item: any) => (
          <option key={item.value} value={item.value}>
            {item.display_name} {/* Show the display name to the user */}
          </option>
        ))}
      </select>
      <input
        type='number'
        name='sale_price'
        value={bookData.sale_price}
        onChange={handleChange}
        placeholder='قیمت پیشنهادی'
        className={`${
          showError?.sale_price ? 'border border-red-500' : ''
        } block w-full p-3 mb-4 border-2 border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2`}
      />
      <select
        name='province'
        onChange={handleChange}
        className={`${
          showError?.province ? 'border border-red-500 ' : null
        } bg-gray-50 w-full mb-3 border p-3 border-gray-300 text-gray-400 text-sm rounded-lg`}
        value={bookData.province} // Ensure the select is controlled
      >
        <option value=''>انتخاب شهرستان</option>
        {province.map((item: any) => (
          <option key={item.value} value={item.value}>
            {item.display_name} {/* Show the display name to the user */}
          </option>
        ))}
      </select>
      <input
        type='file'
        name='front_image'
        onChange={handleChange}
        className={`${
          showError?.front_image ? 'border border-red-500' : null
        } block w-full mb-4 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
      />
      <input
        type='file'
        name='back_image'
        onChange={handleChange}
        className={`${
          showError?.back_image ? 'border border-red-500' : null
        } block w-full mb-4 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
      />
      <textarea
        name='description'
        value={bookData.description}
        onChange={handleChange}
        placeholder='Description'
        className='block w-full p-3 mb-4 border-2 border-gray-300 rounded-lg text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500'
      ></textarea>
      <button
        type='submit'
        className='w-full bg-blue-600 text-white p-3 rounded-lg font-semibold transition duration-150 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
      >
        اضافه کردن
      </button>
    </form>
  )
}

export default BookForm
