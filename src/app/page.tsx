'use client';

import React, { useEffect, useState } from 'react';
import Image_bottom_Header from '../components/Home/Images_bottom_Header';
// import Pupolar_Menu from '../components/Home/Popular_Menu';
import TopFooter from '../components/Home/slider/Slider';
import axios from 'axios';
import config from '../config';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [books, setBooks] = useState([]);
  // const [categories, setCategories] = useState([]);
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`${config.BASE_URL}/bookcase/featured-categories/`)
        .then((res) => {
          setBooks(res.data)
        }).catch(() => {
          router.push('/networkError')
        });
      // const catRes = await axios.get(`${config.BASE_URL}/bookcase/categories/`);
      // setCategories(catRes.data);
    };

    fetchData();
  }, []);

  return (
    <div className='overflow-hidden'>
      <Image_bottom_Header />
      {/* <Pupolar_Menu data={categories} /> */}
      <TopFooter data={books} />
    </div>
  );
}
