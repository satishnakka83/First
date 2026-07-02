"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Quote, Sparkles, Heart } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Neha M.",
    role: "Verified Buyer",
    initials: "NM",
    accent: "bg-purple-500",
    text: "Zuget makes shopping incredibly easy and convenient. The app is simple to use, orders are easy to track, and the overall experience is smooth and hassle-free. Highly recommended!",
  },
  {
    id: 2,
    name: "Shreyash N.",
    role: "Local Reviewer",
    initials: "SN",
    accent: "bg-indigo-500",
    text: "Amazing experience! I ordered multiple items, tried them at home, kept my favorites, and returned the rest instantly. The delivery executive waited outside safely, making the process perfectly seamless.",
  },
  {
    id: 3,
    name: "Priya R.",
    role: "Trendsetter Elite",
    initials: "PR",
    accent: "bg-pink-500",
    text: "Great service and outstanding support. The team responded promptly and ensured everything was handled smoothly from start to finish. Essential app for weekend outfits!",
  },
  {
    id: 4,
    name: "Aarav S.",
    role: "Regular Customer",
    initials: "AS",
    accent: "bg-teal-500",
    text: "Ordered it during my lunch break, used the virtual try-on to see how it looked, and it arrived before my meeting started. The speed and convenience were absolutely unbelievable!",
  },
  {
    id: 5,
    name: "Rohan K.",
    role: "Daily Shopper",
    initials: "RK",
    accent: "bg-amber-500",
    text: "Extremely reliable platform. Getting items delivered right to your doorstep within minutes completely changes how we plan our wardrobes.",
  },
  {
    id: 6,
    name: "Ananya P.",
    role: "Fashion Enthusiast",
    initials: "AP",
    accent: "bg-rose-500",
    text: "The selection of local partner stores is great. Super authentic items and exceptionally fast fulfillment ecosystem. Love using Zuget for last-minute party edits!",
  }
];

function StarRating() {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#793FDF" className="text-[#793FDF]">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ review }) {
  return (
    <div className="group bg-white rounded-[2rem] p-5 md:p-6 border border-purple-100/60 shadow-[0_4px_25px_rgba(121,63,223,0.02)] flex flex-col justify-between relative transition-all duration-500 hover:shadow-[0_15px_40px_rgba(121,63,223,0.06)] hover:-translate-y-1.5 overflow-hidden w-full h-full min-h-[230px]">
      
      <div className="absolute -right-10 -top-10 w-28 h-28 bg-[#793FDF]/5 rounded-full blur-2xl transition-all duration-500 group-hover:scale-150 pointer-events-none" />

      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl ${review.accent} flex items-center justify-center text-white font-bold text-xs shadow-sm relative overflow-hidden shrink-0`}>
              <span>{review.initials}</span>
            </div>
            <div className="flex flex-col leading-tight">
              <h3 className="font-bold text-slate-900 text-base tracking-tight truncate max-w-[130px] sm:max-w-none">
                {review.name}
              </h3>
              <span className="text-slate-400 text-[11px] font-medium mt-0.5">
                {review.role}
              </span>
            </div>
          </div>
          
          <div className="text-purple-100 group-hover:text-[#793FDF]/20 transition-colors duration-500 shrink-0">
            <Quote size={24} fill="currentColor" stroke="none" />
          </div>
        </div>

        <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-normal mb-5 line-clamp-5 w-full">
          "{review.text}"
        </p>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-slate-50 mt-auto">
        <StarRating />
        <span className="inline-flex items-center gap-1 text-[9px] font-extrabold uppercase tracking-wider text-[#793FDF] bg-[#793FDF]/5 rounded-full px-2.5 py-1">
          <span className="w-1 h-1 rounded-full bg-[#793FDF]" />
          Verified Zuget
        </span>
      </div>
    </div>
  );
}

export default function ZugetTestimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true, 
      align: "start",
      duration: 30 
    },
    [
      Autoplay({ 
        delay: 4500, 
        stopOnInteraction: false, 
        stopOnMouseEnter: true 
      })
    ]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="w-full bg-gradient-to-b from-slate-50 via-[#F3EFFF] to-slate-50 py-16 px-4 sm:px-8 lg:px-16 relative overflow-hidden font-sans select-none">
      
      <div className="absolute top-1/4 left-[-10%] w-[45vw] h-[45vh] bg-[#793FDF]/8 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-[-10%] w-[40vw] h-[40vh] bg-pink-400/4 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#793FDF]/10 border border-[#793FDF]/20 px-3 py-1.5 rounded-full mb-3 shadow-sm">
            <Sparkles size={13} className="text-[#793FDF]" />
            <span className="text-[#793FDF] text-[10px] font-bold tracking-widest uppercase">
              Community Love
            </span>
          </div>
          
          <h2 className="text-slate-900 text-3xl md:text-4xl lg:text-5xl font-black tracking-tight max-w-2xl leading-tight">
            Loved by Shoppers,<br />
            Driven by <span className="text-[#793FDF]">Speed.</span>
          </h2>
        </div>

        {/* Embla Viewport Frame Slider */}
        <div className="relative px-2 sm:px-12 md:px-14">
          <div className="overflow-hidden w-full pb-12" ref={emblaRef}>
            <div className="flex backface-hidden touch-pan-y">
              {testimonials.map((review) => (
                <div 
                  key={review.id} 
                  className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 pl-5"
                >
                  <TestimonialCard review={review} />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Control Arrows */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 sm:left-[-12px] lg:left-[-16px] top-[42%] -translate-y-1/2 z-20 flex items-center justify-center w-9 h-9 md:w-11 md:h-11 rounded-full bg-black text-white hover:bg-slate-800 transition-all active:scale-95 shadow-md"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} strokeWidth={2.5} />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-0 sm:right-[-12px] lg:right-[-16px] top-[42%] -translate-y-1/2 z-20 flex items-center justify-center w-9 h-9 md:w-11 md:h-11 rounded-full bg-black text-white hover:bg-slate-800 transition-all active:scale-95 shadow-md"
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} strokeWidth={2.5} />
          </button>

          {/* Dynamic Pagination Pill Dots Below Track */}
          <div className="absolute bottom-2 left-0 right-0 flex items-center justify-center gap-2">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`h-2 transition-all duration-300 rounded-full ${
                  index === selectedIndex 
                    ? "bg-[#793FDF] w-[18px]" 
                    : "bg-slate-300 w-2 hover:bg-slate-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Footer Banner */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3.5 text-center sm:text-left bg-white/40 border border-white/60 shadow-inner rounded-2xl p-4 max-w-xl mx-auto backdrop-blur-sm">
          <div className="flex -space-x-2.5">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-slate-400 text-[10px] font-bold">
                G
              </div>
            ))}
            <div className="w-8 h-8 rounded-full border-2 border-white bg-[#793FDF] flex items-center justify-center text-white shadow-sm">
              <Heart size={11} fill="currentColor" />
            </div>
          </div>
          <p className="text-slate-600 text-xs font-semibold">
            Join <span className="text-[#793FDF] font-bold">12,500+ users</span> experiencing instant fashion gratification across the city.
          </p>
        </div>

      </div>
    </section>
  );
}