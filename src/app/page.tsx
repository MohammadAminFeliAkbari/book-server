'use client';

import React, { useEffect, useState } from 'react';
import Image_bottom_Header from '../components/Home/Images_bottom_Header';
// import Pupolar_Menu from '../components/Home/Popular_Menu';
import TopFooter from '../components/Home/slider/Slider';
import axios from 'axios';
import config from '../config';

export default function Home() {
  const [books, setBooks] = useState([]);
  // const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const bookRes = await axios.get(`${config.BASE_URL}/bookcase/featured-categories/`);
      // const catRes = await axios.get(`${config.BASE_URL}/bookcase/categories/`);
      setBooks(bookRes.data);
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
