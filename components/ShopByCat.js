"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const categories = [
  {
    title: "Men's wear",
    count: "1,800+ styles",
    image: "/shopbycat/Hoodie.png",
  },
  {
    title: "Women's Wear",
    count: "1,500+ styles",
    image: "/shopbycat/Hoodie.png",
  },
  {
    title: "Shirts",
    count: "900+ styles",
    image: "/shopbycat/Hoodie.png",
  },
  {
    title: "Jeans & Pants",
    count: "1,200+ styles",
    image: "/shopbycat/Hoodie.png",
  },
  {
    title: "Women Kurthas",
    count: "Daily Drops",
    image: "/shopbycat/Hoodie.png",
  },
  {
    title: "Hoodies",
    count: "Daily Drops",
    image: "/shopbycat/Hoodie.png",
  },
];

export default function ZugetTestimonials() {
  return (
    <section className="w-full py-12 px-4 sm:px-8 lg:px-16 relative overflow-hidden select-none">
      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* Carousel Wrapper */}
        <div className="relative px-2 sm:px-12 md:px-14">
          <Swiper
            modules={[Autoplay,Navigation, Pagination]}
            spaceBetween={16}
            loop={true}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={{
              prevEl: ".cate-prev",
              nextEl: ".cate-next",
            }}
            breakpoints={{
              0: {
                slidesPerView: 1.25, // Shows peak preview of next card on small screens
                spaceBetween: 12,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 16,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1280: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
            }}
            className="w-full !pb-14 !overflow-visible"
          >
            {categories.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="lg:h-[222px] h-[100px] w-[211px] lg:w-[211px]">
                  
                  {/* Image wrapper link */}
                  <Link href="/products" className="relative block h-64 md:h-72 w-full overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Darker overlay at the bottom for crisp text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/30 to-transparent" />
                  </Link>

                  {/* Content */}
                  <div className="absolute top-24 lg:top-0 lg:bottom-0 p-6 text-white w-full z-10 pointer-events-none">
                    <h3 className="text-xl font-bold tracking-tight">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-sm font-medium text-slate-300">
                      {item.count}
                    </p>
                  </div>

                  {/* Hover Glow inside card */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-tr from-[#793FDF]/20 to-transparent pointer-events-none mix-blend-overlay" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Arrows */}
          <button className="cate-prev absolute left-0 sm:left-[-12px] lg:left-[-16px] top-[50%] -translate-y-1/2 z-30 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-black text-white hover:bg-slate-800 transition-all active:scale-95 shadow-md disabled:opacity-30 disabled:pointer-events-none">
            <ChevronLeft size={22} strokeWidth={2.5} />
          </button>
          <button className="cate-next absolute right-0 sm:right-[-12px] lg:right-[-16px] top-[50%] -translate-y-1/2 z-30 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-black text-white hover:bg-slate-800 transition-all active:scale-95 shadow-md disabled:opacity-30 disabled:pointer-events-none">
            <ChevronRight size={22} strokeWidth={2.5} />
          </button>
        </div>

      </div>
    </section>
  );
}