'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const slides = [
  { id: 1, url: '/ownerbanners/on1.jpeg', },
  { id: 2, url: '/ownerbanners/on2.jpeg', },
  { id: 3, url: '/ownerbanners/on3.jpeg' },
  { id: 4, url: '/ownerbanners/on4.jpeg' },
  { id: 5, url: '/ownerbanners/on5.jpeg' },
  { id: 6, url: '/ownerbanners/on6.jpeg' },
];

export default function HeroBanner() {
  return (
    <div className="relative w-full lg:h-screen overflow-hidden bg-[#a8a0d0]">
      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        effect="fade"
        speed={1000}
        loop={true}
        // navigation={true}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              <Image
                className="w-full rounded-sm"
                src={slide.url}
                alt={slide.url}
                width={2000}
                height={2000}
              />

              {/* Dark Overlay for Text Readability */}
              <div className="absolute inset-0 bg-black/0 z-10" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}