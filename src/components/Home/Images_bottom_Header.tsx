'use client'
import React from "react";
import head1 from "../../assets/head1.jpg";
import head2 from "../../assets/head2.jpg";
import head3 from "../../assets/head3.jpg";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative, Autoplay } from "swiper/modules";
import 'swiper/swiper-bundle.css'; // Import Swiper CSS  

function Images_bottom_Header() {
  return (
    <Swiper
      dir="rtl"
      grabCursor={true}
      effect="creative"
      creativeEffect={{
        prev: {
          shadow: true,
          translate: [0, 0, -400],
        },
        next: {
          translate: ["100%", 0, 0],
        },
      }}
      modules={[EffectCreative, Autoplay]} // Add Autoplay module  
      className="mySwiper"
      autoplay={{
        delay: 3000, // Change image every 3 seconds  
        disableOnInteraction: false, // Allow autoplay to continue after user interaction  
      }}
    >
      <SwiperSlide>
        <Image src={head1} alt="Slide 1" className="w-full h-[200px] md:h-[400px] rounded" />
      </SwiperSlide>
      <SwiperSlide>
        <Image src={head2} alt="Slide 2" className="w-full h-[200px] md:h-[400px] rounded" />
      </SwiperSlide>
      <SwiperSlide>
        <Image src={head3} alt="Slide 3" className="w-full h-[200px] rounded md:h-[400px]" />
      </SwiperSlide>
    </Swiper>
  );
}

export default Images_bottom_Header;  