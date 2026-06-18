"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";

function DeliveryBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 bg-[#793FDF]/10 backdrop-blur-md border border-[#793FDF]/20 text-white text-[10px] font-bold tracking-widest uppercase rounded-md px-2.5 py-1 shadow-sm">
      <span className="w-1.5 h-1.5 rounded-full bg-[#793FDF] animate-pulse inline-block" />
      30 min
    </span>
  );
}

function StoreCard({ store }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <Link href={'/products'} className="group flex flex-col w-[200px] sm:w-[240px] md:w-[260px] cursor-pointer transition-all duration-300">
      
      {/* Image Container */}
      <div className="relative overflow-hidden rounded-2xl w-full h-[220px] sm:h-[260px] bg-slate-200 border border-slate-200 shadow-sm transition-shadow duration-300 group-hover:shadow-lg">
        {!imgLoaded && (
          <div className="absolute inset-0 bg-slate-200 animate-pulse" />
        )}
        <img
          src={store.store_image_duplicate}
          alt={store.store_name}
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 ${
            imgLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
        
        {/* Top Badge remains safely bound to the image quadrant */}
        <div className="absolute top-3 left-3 z-10">
          <DeliveryBadge />
        </div>
      </div>

      {/* Information Content Section Below the Image */}
      <div className="pt-4 pb-2 px-1">
        <h3 className="font-bold text-slate-800 text-base md:text-lg leading-tight capitalize truncate transition-colors group-hover:text-[#793FDF]">
          {store.store_name}
        </h3>
        
        {store.area_name && (
          <div className="flex items-center gap-1 mt-1.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#793FDF" className="flex-shrink-0">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" />
            </svg>
            <span className="text-slate-500 text-xs font-semibold capitalize truncate">
              {store.area_name}
            </span>
          </div>
        )}
      </div>

    </Link>
  );
}

export default function StoreCarousel() {
  const [storeList, setStoreList] = useState([]);
  const [loading, setLoading] = useState(true);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  /* ── Fetch stores ── */
  useEffect(() => {
    async function getStores() {
      try {
        const res = await fetch("https://dev.zuget.com/site/stores", {
          headers: { accept: "application/json" },
        });
        const data = await res.json();
        setStoreList(data?.results || []);
      } catch (error) {
        console.error("Failed to fetch stores", error);
        setStoreList([]);
      } finally {
        setLoading(false);
      }
    }
    getStores();
  }, []);

  /* ── Skeleton card for loading state ── */
  const SkeletonCard = () => (
    <div className="flex flex-col w-[200px] sm:w-[240px] md:w-[260px]">
      <div className="rounded-2xl w-full h-[220px] sm:h-[260px] bg-slate-200 animate-pulse border border-slate-100" />
      <div className="pt-4 px-1 gap-2 flex flex-col">
        <div className="h-4 bg-slate-200 animate-pulse rounded-md w-3/4" />
        <div className="h-3 bg-slate-200 animate-pulse rounded-md w-1/2" />
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;700&display=swap');
        .zu-sc * { font-family: 'DM Sans', sans-serif; }
        .zu-sc h2 { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.02em; }
        
        .swiper-slide {
          width: auto !important;
        }

        /* Swiper disabled state management for custom hooks */
        .custom-prev.swiper-button-disabled,
        .custom-next.swiper-button-disabled {
          opacity: 0.35;
          cursor: not-allowed;
          pointer-events: none;
        }
      `}</style>

      <section className="zu-sc relative bg-slate-50 overflow-hidden py-8 lg:py-24">
        
        <div 
          className="absolute inset-0 opacity-[0.04] pointer-events-none z-0" 
          style={{ 
            backgroundImage: 'radial-gradient(#000000 1.5px, transparent 1.5px)', 
            backgroundSize: '24px 24px' 
          }} 
        />
        <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-[#793FDF]/5 blur-[100px] rounded-full pointer-events-none z-0" />
        <div className="absolute bottom-0 left-0 w-[40vw] h-[40vh] bg-[#793FDF]/5 blur-[120px] rounded-full pointer-events-none z-0" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="mb-10"
          >
            <p className="text-[#793FDF] text-[11px] font-bold tracking-[0.2em] uppercase mb-2">
              Partner Stores
            </p>
            <h2 className="text-5xl md:text-7xl text-slate-900 leading-none">
              Shop the<br />
              <span className="text-[#793FDF]">City's Best.</span>
            </h2>
          </motion.div>

          {/* Subheader Title & Customized Navigation Arrows */}
          <div className="flex items-center justify-between mb-6 border-b border-slate-200/60 pb-4">
            <div>
              <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                More Stores ({loading ? "..." : storeList.length})
              </h3>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                ref={prevRef}
                className="custom-prev flex items-center justify-center w-10 h-10 rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:text-[#793FDF] active:scale-95"
                aria-label="Previous slider slide"
              >
                <ChevronLeft size={20} strokeWidth={2.5} />
              </button>
              <button
                ref={nextRef}
                className="custom-next flex items-center justify-center w-10 h-10 rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:text-[#793FDF] active:scale-95"
                aria-label="Next slider slide"
              >
                <ChevronRight size={20} strokeWidth={2.5} />
              </button>
            </div>
          </div>

          {/* Swiper Carousel */}
          <div className="relative -mx-5 px-5 sm:mx-0 sm:px-0">
            <Swiper
              modules={[FreeMode, Navigation]}
              freeMode={true}
              grabCursor={true}
              spaceBetween={20}
              slidesPerView="auto"
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              onBeforeInit={(swiper) => {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
              }}
              className="w-full pb-6"
            >
              {loading
                ? Array(6)
                    .fill(null)
                    .map((_, i) => (
                      <SwiperSlide key={`skeleton-${i}`}>
                        <SkeletonCard />
                      </SwiperSlide>
                    ))
                : storeList.map((store) => (
                    <SwiperSlide key={store.id}>
                      <StoreCard store={store} />
                    </SwiperSlide>
                  ))}
            </Swiper>

            {/* Empty State */}
            {!loading && storeList.length === 0 && (
              <div className="text-center py-12 text-slate-400">
                <p className="text-sm font-medium">No stores available right now.</p>
              </div>
            )}
          </div>

        </div>
      </section>
    </>
  );
}