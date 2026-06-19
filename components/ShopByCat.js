"use client";

import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const categories = [
  { title: "Men's wear", count: "1,800+ styles", image: "/shopbycat/Shirt.png" },
  { title: "Women's Wear", count: "1,500+ styles", image: "/shopbycat/Zugetwk.png" },
  { title: "Kids", count: "900+ styles", image: "/shopbycat/kids.png" },
  { title: "Jeans", count: "1,200+ styles", image: "/shopbycat/Zugetjeans.png " },
  { title: "Women Kurthas", count: "Daily Drops", image: "/shopbycat/women.png" },
  { title: "Hoodies", count: "Daily Drops", image: "/shopbycat/Hoodie.png" },
];

export default function ZugetTestimonials() {
  // Initialize Embla with smooth drag physics, infinite loop, and auto-play configurations
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true, 
      align: "start",
      duration: 35, // Controls sliding deceleration speed (higher = smoother, more fluid)
    }, 
    [
      Autoplay({ 
        delay: 4000, 
        stopOnInteraction: false, 
        stopOnMouseEnter: true 
      })
    ]
  );

  // Navigation controller hooks
  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <section className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-14 py-10 select-none">
      <div>
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

        {/* Embla Carousel Viewport Frame Container */}
        <div className="relative w-full lg:pt-12 pt-6">
          
          {/* The visible viewport mask box */}
          <div className="overflow-hidden w-full" ref={emblaRef}>
            
            {/* The scrolling track element */}
            <div className="flex backface-hidden touch-pan-y">
              {categories.map((item, index) => (
                <div 
                  key={index} 
                  // Responsive sizing grid logic handled completely natively by Tailwind classes
                  className="flex-[0_0_50%] md:flex-[0_0_33.33%] lg:flex-[0_0_25%] min-w-0 pl-4"
                >
                  <Link 
                    href="/products" 
                    className="relative group block h-64 md:h-80 w-full overflow-hidden rounded-xl bg-slate-900 shadow-sm"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-10" />

                    {/* Content text */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white z-20 uppercase">
                      <h3 className="text-sm md:text-lg font-bold tracking-tight line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-[10px] md:text-xs font-medium text-slate-300">
                        {item.count}
                      </p>
                    </div>

                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-tr from-[#793FDF]/20 to-transparent z-30 mix-blend-overlay" />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Control Buttons */}
          <button 
            onClick={scrollPrev}
            className="absolute left-0 sm:left-[-12px] lg:left-[-24px] top-[50%] -translate-y-1/2 z-30 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-black text-white hover:bg-slate-800 transition-all active:scale-95 shadow-md"
          >
            <ChevronLeft size={22} strokeWidth={2.5} />
          </button>
          <button 
            onClick={scrollNext}
            className="absolute right-0 sm:right-[-12px] lg:right-[-24px] top-[50%] -translate-y-1/2 z-30 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-black text-white hover:bg-slate-800 transition-all active:scale-95 shadow-md"
          >
            <ChevronRight size={22} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </section>
  );
}