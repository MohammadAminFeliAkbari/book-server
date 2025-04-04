import React from 'react';
import Image_bottom_Header from '../components/Home/Images_bottom_Header'
import Pupolar_Menu from '../components/Home/Popular_Menu'
import Cards from '../components/Home/slider/Slider'

export default function Home() {

  return (
    <div className='m-2'>
      <Image_bottom_Header />
      <Pupolar_Menu />

      <div className='flex flex-col gap-3'>
        <div className='m-3'>
          <h2 className='my-1 dark:text-gray-300 text-[#121212] text-[16px]'>موردعلاقه</h2>
          <Cards />
        </div>

        <div className='m-3'>
          <h2 className='my-1 dark:text-gray-300  text-[#121212] text-[16px]' >موردعلاقه</h2>
          <Cards />
        </div>

        <div className='m-3'>
          <h2 className='my-1 dark:text-gray-300 text-[#121212] text-[16px]'>بیشترین فروش</h2>
          <Cards />
        </div>
      </div>
    </div>
  );
}  