"use client"
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { IoIosArrowDown } from "react-icons/io";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const CustomerBannerOrg = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  // Lock scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [isOpen]);

  // Close mobile menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current && !menuRef.current.contains(event.target) &&
        buttonRef.current && !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);


  const slides = [
    { id: 2, url: '/customerbanners/44.webp', },
    { id: 3, url: '/customerbanners/33.webp' },
    { id: 4, url: '/customerbanners/22.webp' },
    { id: 5, url: '/customerbanners/11.webp' },

  ];

  return (
    <div className="w-full lg:min-h-screen min-h-[263px] flex flex-col bg-slate-50 font-sans">

      {/* 1. NAVIGATION BAR */}
      <header className="w-full bg-white px-5 md:px-12 lg:px-20 py-4 md:py-5 flex justify-between items-center shadow-sm border-b border-slate-200 z-50">

        {/* Location Dropdown */}
        <div className="flex items-center gap-3 cursor-pointer select-none group">
          <div className="flex flex-col leading-tight">
            <span className="text-[10px] font-extrabold tracking-widest uppercase text-[#793FDF]">
              30 Min Delivery
            </span>
            <span className="flex items-center gap-1 text-sm font-bold text-black">
              Hyderabad <IoIosArrowDown className="text-black animate-pulse" size={16} />
            </span>
          </div>
        </div>

        {/* LOGO */}
        <Link href="/" className="tracking-wide text-2xl md:text-3xl font-black tracking-tighter transition-all active:scale-95 text-black">
          Zu<span className="text-[#793FDF]">Get</span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:block">
          <ul className="flex gap-x-10 font-bold text-sm tracking-wide text-black">
            {['Home', 'Shops', 'Contact Us', 'About Us'].map((item, idx) => (
              <li key={idx}>
                <Link
                  href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')} `}
                  className="relative py-1 transition-all duration-300 hover:text-[#793FDF] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#793FDF] hover:after:w-full after:transition-all after:duration-300"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Hamburger Menu Trigger */}
        <div className="lg:hidden block z-50">
          <button
            ref={buttonRef}
            className="relative flex flex-col justify-center items-center w-8 h-8 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <span className={`block w-6 h-[2px] rounded-full bg-[#793FDF] transition-all duration-300 ease-out ${isOpen ? "bg-slate-900 rotate-45 translate-y-1.5" : "-translate-y-1"}`} />
            <span className={`block w-6 h-[2px] rounded-full bg-[#793FDF] transition-all duration-300 ease-out ${isOpen ? "opacity-0" : "opacity-100"}`} />
            <span className={`block w-6 h-[2px] rounded-full bg-[#793FDF] transition-all duration-300 ease-out ${isOpen ? "bg-slate-900 -rotate-45 -translate-y-1.5" : "translate-y-1"}`} />
          </button>
        </div>

        {/* Mobile Sliding Drawer */}
        <nav
          ref={menuRef}
          aria-label="Mobile Navigation"
          className={`
            fixed top-0 right-0 h-screen w-[75%] sm:w-[50%]
            bg-white border-l border-slate-100
            shadow-[-10px_0_40px_rgba(0,0,0,0.1)]
            transition-transform duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]
            ${isOpen ? "translate-x-0" : "translate-x-full"}
          `}
        >
          <div className="p-8 pt-28 flex flex-col gap-6 text-xl font-bold text-slate-800">
            {['Home', 'Shops', 'About Us', 'Contact Us'].map((item, idx) => (
              <Link
                key={idx}
                href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                className="hover:text-[#793FDF] hover:translate-x-2 transition-all duration-200 border-b border-slate-100 pb-4"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </Link>
            ))}
          </div>
        </nav>
      </header>

      {/* 2. BANNER SLIDER (Fits naturally under the navbar based entirely on image proportions) */}
      {/* 2. BANNER SLIDER (Fits naturally under the navbar based entirely on image proportions) */}
<div className="w-full block overflow-hidden">
  <Swiper
    modules={[Autoplay, EffectFade, Navigation, Pagination]}
    effect="fade"
    fadeEffect={{ crossFade: true }} // Forces the outgoing image to fade out to 0 opacity cleanly
    watchSlidesProgress={true}       // Keeps tabs on slide states to stop inactive slides from rendering underneath
    speed={1000}
    loop={true}
    autoHeight={true} 
    pagination={{ clickable: true }}
    autoplay={{
      delay: 2500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    }}
    className="w-full"
  >
    {slides.map((slide) => (
      <SwiperSlide key={slide.id} className="overflow-hidden bg-white">
        <Image
          src={slide.url}
          alt="title"
          width={1800}
          height={100}
          className="lg:h-screen lg:object-cover w-screen h-[222px]"
          priority
        />
      </SwiperSlide>
    ))}
  </Swiper>
</div>

    </div>
  );
};

export default CustomerBannerOrg;