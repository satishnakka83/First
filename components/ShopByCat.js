"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const categories = [
  {
    title: "Men's wear",
    count: "1,800+ styles",
    image: "/shopbycat/Shirt.png",
  },
  {
    title: "Women's Wear",
    count: "1,500+ styles",
    image: "/shopbycat/Zugetwk.png",
  },
  {
    title: "Kids",
    count: "900+ styles",
    image: "/shopbycat/kids.png",
  },
  {
    title: "Jeans & Pants",
    count: "1,200+ styles",
    image: "/shopbycat/Hoodie.png",
  },
  {
    title: "Women Kurthas",
    count: "Daily Drops",
    image: "/shopbycat/women.png",
  },
  {
    title: "Hoodies",
    count: "Daily Drops",
    image: "/shopbycat/Hoodie.png",
  },
];

export default function ZugetTestimonials() {
  return (
    <section className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-14 lg:py-10">
      {/* Increased max-w to gracefully accommodate 4 cards on desktop */}
      <div className="">
         <div>
            <span className="text-xs md:text-sm tracking-[0.35em] uppercase text-[#793FDF] font-bold bg-[#793FDF]/10 px-4 py-2 rounded-full">
              Shop By Category
            </span>

            <h2 className="mt-8 text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
              Everything you
              <br />
              <span className="text-[#793FDF]">love, faster.</span>
            </h2>
          </div>
        {/* Carousel Wrapper */}
        <div className="relative w-full lg:pt-12 pt-6">
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={16}
            loop={true} 
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
                slidesPerView: 2,
                spaceBetween: 12,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 16,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
            }}
            className="w-full !pb-14 overflow-visible"
          >
            {categories.map((item, index) => (
              <SwiperSlide key={index}>
                {/* Changed fixed widths to w-full so Swiper controls the card sizing naturally */}
                <div className="relative group lg:h-[222px] h-[120px] w-[140px] lg:w-[290px]">
                  <Link href="/products" className="relative block h-64 md:h-72 w-full overflow-hidden rounded-xl">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/30 to-transparent" />
                  </Link>

                  {/* Content */}
                  <div className="absolute lg:-bottom-10 -bottom-14 uppercase p-6 text-white w-full z-10 pointer-events-none">
                    <h3 className="lg:text-xl text-[10px] font-bold tracking-tight ">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 lg:text-sm text-[8px] font-medium text-slate-300">
                      {item.count}
                    </p>
                  </div>

                  {/* Hover Glow inside card */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-tr from-[#793FDF]/20 to-transparent pointer-events-none mix-blend-overlay rounded-xl" />
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