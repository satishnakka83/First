"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

function DeliveryBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 bg-[#793FDF]/30 backdrop-blur-sm border border-[#793FDF]/20 text-white text-[10px] font-bold tracking-widest uppercase rounded-md px-2.5 py-1 shadow-sm">
      <span className="w-1.5 h-1.5 rounded-full bg-[#793FDF] animate-pulse inline-block" />
      30 min
    </span>
  );
}

function StoreCard({ store }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  const hasValidImage = store?.store_image_duplicate && 
    typeof store.store_image_duplicate === 'string' && 
    store.store_image_duplicate.trim() !== "";

  return (
    <Link href={'/products'} className="group flex flex-col w-[280px] sm:w-[320px] md:w-[340px] cursor-pointer transition-all duration-300">
      <div className="relative overflow-hidden rounded-2xl w-full aspect-[4/3] bg-slate-200 border border-slate-100 shadow-sm transition-shadow duration-300 group-hover:shadow-lg">
        
        {(!imgLoaded || !hasValidImage) && (
          <div className="absolute inset-0 bg-slate-200 animate-pulse z-0" />
        )}
        
        {hasValidImage ? (
          <Image
            src={store.store_image_duplicate}
            alt={store.store_name || "Store Image"}
            fill
            sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, 340px"
            onLoad={() => setImgLoaded(true)}
            className={`object-cover object-top transition-transform duration-700 group-hover:scale-105 z-10 ${
              imgLoaded ? "opacity-100" : "opacity-0"
            }`}
            unoptimized
          />
        ) : null}

        <div className="absolute top-3 left-3 z-20">
          <DeliveryBadge />
        </div>
      </div>

      <div className="pt-3 pb-1 px-1">
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
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // Initialize Embla with free dragging physics matching Swiper's FreeMode
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    dragFree: true, // Momentum scrolling physics
    containScroll: "trimSnaps"
  });

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

  /* ── Filter lists based on Search input ── */
  const filteredStores = storeList.filter((store) => {
    const nameMatch = store.store_name?.toLowerCase().includes(searchQuery.toLowerCase());
    const areaMatch = store.area_name?.toLowerCase().includes(searchQuery.toLowerCase());
    return nameMatch || areaMatch;
  });

  // Navigation Callback mechanisms
  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  /* ── Reset Track whenever filters update ── */
  useEffect(() => {
    if (emblaApi) {
      emblaApi.scrollTo(0, false);
    }
  }, [searchQuery, emblaApi]);

  const SkeletonCard = () => (
    <div className="flex flex-col w-[280px] sm:w-[320px] md:w-[340px]">
      <div className="rounded-2xl w-full aspect-[4/3] bg-slate-200 animate-pulse border border-slate-100" />
      <div className="pt-3 px-1 gap-1.5 flex flex-col">
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
      `}</style>

      <section className="zu-sc relative bg-slate-50 overflow-hidden py-8 lg:py-24 select-none">
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

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-slate-200/60 pb-4">
            <div>
              <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                More Stores ({loading ? "..." : filteredStores.length})
              </h3>
            </div>

            <div className="flex items-center flex-wrap sm:flex-nowrap gap-3 w-full sm:w-auto">
              <div className="relative flex items-center w-full sm:w-[260px]">
                <Search size={16} className="absolute left-3.5 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="eg: Uppal , Edit Luxury"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-slate-200 pl-10 pr-9 py-2 rounded-full text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#793FDF] focus:ring-2 focus:ring-[#793FDF]/10 shadow-sm transition-all"
                />
                
                <AnimatePresence>
                  {searchQuery && (
                    <motion.button
                      initial={{ scale: 0.7, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.7, opacity: 0 }}
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 p-0.5 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition-colors"
                    >
                      <X size={12} />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex items-center gap-2 ml-auto sm:ml-0">
                <button
                  onClick={scrollPrev}
                  className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:text-[#793FDF] active:scale-95"
                  aria-label="Previous slider slide"
                >
                  <ChevronLeft size={20} strokeWidth={2.5} />
                </button>
                <button
                  onClick={scrollNext}
                  className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:text-[#793FDF] active:scale-95"
                  aria-label="Next slider slide"
                >
                  <ChevronRight size={20} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </div>

          {/* Embla Viewport Box Structure */}
          <div className="relative -mx-5 px-5 sm:mx-0 sm:px-0">
            <div className="overflow-hidden w-full pb-6" ref={emblaRef}>
              <div className="flex backface-hidden touch-pan-y">
                {loading
                  ? Array(6)
                      .fill(null)
                      .map((_, i) => (
                        <div key={`skeleton-${i}`} className="flex-shrink-0 pr-5">
                          <SkeletonCard />
                        </div>
                      ))
                  : filteredStores.map((store,ind) => (
                      <div key={ind} className="flex-shrink-0 pr-5">
                        <StoreCard store={store} />
                      </div>
                    ))}
              </div>
            </div>

            {!loading && filteredStores.length === 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16 text-slate-400 bg-white/50 border border-dashed border-slate-200 rounded-2xl"
              >
                <p className="text-base font-semibold text-slate-700">No matching stores discovered</p>
                <p className="text-xs text-slate-400 mt-1">Try optimizing your location query parameters or name strings.</p>
              </motion.div>
            )}
          </div>

        </div>
      </section>
    </>
  );
}