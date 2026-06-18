"use client";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/effect-coverflow";
import "swiper/css/effect-cards";
import "swiper/css/effect-creative";
// import "swiper/css/autoplay";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { EffectCoverflow, Navigation, Autoplay } from "swiper/modules";

// Styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import TextReveal from "./TextReveal";


export default function Mens() {

    const images = [
        "/mens/mens1.png",
        "/mens/mens3.png",
        "/mens/mens4.png",
        "/mens/mens5.png",
        "/mens/mens44.png",
    ];

    return (
        <div className="bg-white lg:py-16 min-h-80 relative">
            <div className="text-center mb-10">
                <p className="text-[#793FDF] text-xl lg:text-3xl font-bold">Mens</p>

            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
                <button
                    className="custommens-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 
                               bg-white text-black rounded-full w-10 h-10 flex items-center
                                cursor-pointer p-4 shadow-lg 
                               hover:bg-pink-400 hover:text-white transition"
                >
                    ❮
                </button>

                <button
                    className="custommens-next absolute right-0 top-1/2 -translate-y-1/2 z-10 
                               bg-white text-black rounded-full w-10 h-10 flex items-center
                                cursor-pointer p-4 shadow-lg 
                               hover:bg-pink-400 hover:text-white transition"
                >
                    ❯
                </button>

                <div className="w-full max-w-4xl mx-auto mt-10">
                    <Swiper
                        modules={[Navigation, Autoplay]}
                        spaceBetween={20}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        navigation={{
                            nextEl: ".custommens-next",
                            prevEl: ".custommens-prev",
                        }}
                        className="rounded-xl"
                        breakpoints={{
                            268: { slidesPerView: 3 },
                            1024: { slidesPerView: 4 },
                        }}
                        loop={true}
                        autoplay={{
                            delay: 2500,          // time between slides (2.5s) 
                            disableOnInteraction: true, // keep autoplay after manual swipe 
                            pauseOnMouseEnter: true,     // pause on hover
                        }}

                    >

                        {images.map((src, idx) => (
                            <SwiperSlide>
                                <div className="flex items-center justify-center text-white text-2xl rounded-xl">
                                    <Image
                                        src={src}
                                        alt={`mens product`}
                                        width={150}
                                        height={150}
                                        className="object-contain rounded-xs"
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    
                </div>
            </div>
        </div>
    );
}
4