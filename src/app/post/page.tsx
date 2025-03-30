'use client'
import React, { useContext, useState } from 'react'
import axios from 'axios'
import config from '../../config'
import { province } from './province'
import { category } from './category'
import { AppContext } from '../../../context/AppContext'

type BookData = {
  title: string
  author: string
  category: string
  sale_price: string
  province: string
  front_image: null | string | File // Or specify proper type
  back_image: null | string | File // Or specify proper type
  description: string
}

type ShowError = {
  title?: boolean // Optional, indicating if there's an error for this field
  category?: boolean // Optional, indicating if there's an error for this field
  sale_price?: boolean // Optional, indicating if there's an error for this field
  province?: boolean // Optional, indicating if there's an error for this field
  front_image?: boolean // Optional, indicating if there's an error for this field
  back_image?: boolean // Optional, indicating if there's an error for this field
  author?: boolean
}

const BookForm = () => {
  const { access } = useContext(AppContext)
  const [showError, setError] = useState<ShowError>({})
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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target

    // Check if the target is an HTMLInputElement
    if (e.target instanceof HTMLInputElement && type === 'file') {
      // Access files only if it's a file input
      const file = e.target.files ? e.target.files[0] : null // Get the first file if it exists

      setBookData(prevData => ({
        ...prevData,
        [name]: file // Store the File object
      }))
    } else {
      // For other input types like text or textarea
      setBookData(prevData => ({
        ...prevData,
        [name]: value // Store string value
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData()

    // Assuming bookData is of type BookData
    for (const key in bookData) {
      if (Object.prototype.hasOwnProperty.call(bookData, key)) {
        // Using key as a keyof BookData
        formData.append(
          key as keyof BookData,
          bookData[key as keyof BookData] as string
        ) // Cast to any for safety
      }
    }

    try {
      const response = await axios.post(
        `${config.BASE_URL}/bookcase/books/`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${access}`
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
      className={`max-w-md mx-auto m-3 p-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg transition duration-300 ease-in-out transform`}
      encType='multipart/form-data'
    >
      <h2 className='text-2xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200'>
        اضافه کردن کتاب جدید
      </h2>
      <input
        type='text'
        name='author'
        value={bookData.author}
        onChange={handleChange}
        placeholder='نویسنده'
        className={`${showError?.author ? 'border border-red-500' : null
          } block w-full p-3 mb-4 border-2 border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500`}
      />
      <input
        type='text'
        name='title'
        value={bookData.title}
        onChange={handleChange}
        placeholder='عنوان'
        className={`${showError?.author ? 'border border-red-500' : ''
          } block w-full p-3 mb-4 border-2 border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500`}
      />
      <select
        name='category'
        onChange={handleChange}
        className={`${showError?.category ? 'border border-red-500' : null
          } bg-gray-50 w-full mb-3 border p-3 border-gray-300 text-gray-400 text-sm rounded-lg`}
        value={bookData.category} // Ensure the select is controlled
      >
        <option value=''>دسته بندی</option>
        {category.map((item: { value: string; display_name: string }) => (
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
        className={`${showError?.sale_price ? 'border border-red-500' : ''
          } block w-full p-3 mb-4 border-2 border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2`}
      />
      <select
        name='province'
        onChange={handleChange}
        className={`${showError?.province ? 'border border-red-500 ' : null
          } bg-gray-50 w-full mb-3 border p-3 border-gray-300 text-gray-400 text-sm rounded-lg`}
        value={bookData.province} // Ensure the select is controlled
      >
        <option value=''>انتخاب شهرستان</option>
        {province.map((item: { value: string; display_name: string }) => (
          <option key={item.value} value={item.value}>
            {item.display_name} {/* Show the display name to the user */}
          </option>
        ))}
      </select>
      <input
        type='file'
        name='front_image'
        onChange={handleChange}
        className={`${showError?.front_image ? 'border border-red-500' : null
          } block w-full mb-4 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
      />
      <input
        type='file'
        name='back_image'
        onChange={handleChange}
        className={`${showError?.back_image ? 'border border-red-500' : null
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
