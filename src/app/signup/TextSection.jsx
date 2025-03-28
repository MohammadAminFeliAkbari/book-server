'use client'
import React from 'react'
import './signUpCss.css'

function TextSection () {
  return (
    <div className='text-container mx-10 text-gray-800 text-center drop-shadow-2xl'>
      <h2 className='dark:text-gray-300 text-2xl text-center'>
        خوش امدید!
      </h2>
      <p className='paragraph font-semibold dark:text-gray-400'>
        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده
        از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و
        سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای
        متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه
        درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با
        نرم افزارها شناخت بیشتری را برای طراحان رایانه ای
      </p>
    </div>
  )
}

export default TextSection
