import React from 'react'
import Image_bottom_Header from '../components/Home/Images_bottom_Header'
import Pupolar_Menu from '../components/Home/Popular_Menu'
import TopFooter from '../components/Home/slider/Slider'
import Link from 'next/link'
import axios from 'axios'
import confing from '../config'

export default async function Home () {
  const books = await axios.get(`${confing.BASE_URL}/bookcase/books/?page_size=100`)
  const category = await axios.get(`${confing.BASE_URL}/bookcase/categories/`)


  const resultBook = books.data.results
  const resultCategory = category.data

  return (
    <div className='m-2'>
      <Image_bottom_Header />
      <Pupolar_Menu data={resultCategory}/>
      <TopFooter data={resultBook}/>
    </div>
  )
}
