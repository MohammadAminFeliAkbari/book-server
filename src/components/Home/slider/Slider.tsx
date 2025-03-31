'use client';
import { Navigation, Pagination, Scrollbar, A11y, FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Card from './Card';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useEffect, useState } from 'react';

// Define a type for the book data  
interface Book {
  title: string;
  front_image: string;
  sale_price: number; // Adjust type based on actual API response  
  author: string;
  province: string;
}

export default function TopFooter() {
  const [data, setData] = useState<Book[]>([]); // State to hold array of Book  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://141.11.21.237:8000/api/v1/bookcase/books/`
        );
        if (!response.ok) throw new Error('Network response was not OK');
        const data: Book[] = await response.json(); // Parse JSON with type assertion  
        setData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className='w-full flex items-center justify-center'>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        freeMode={true}
        // pagination={{ clickable: true }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            <Card
              title={item.title}
              front_image={item.front_image}
              sale_price={item.sale_price}
              author={item.author}
              province={item.province}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}  