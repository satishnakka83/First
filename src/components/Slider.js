// "use client";

// import { useEffect, useState, useCallback } from "react";
// import Image from "next/image";
// import useEmblaCarousel from "embla-carousel-react";
// import Autoplay from "embla-carousel-autoplay";
// import { AnimatePresence, motion } from "framer-motion";

// const appslides = [
//   "/bannerimages/BannerArtboard 1.jpg",
//   "/bannerimages/BannerArtboard 2.jpg",
//   "/bannerimages/BannerArtboard 3.jpg",
// ];

// const slides = [
//   "/bannerimages/Artboard 1.jpg",
//   "/bannerimages/Artboard 2.jpg",
//   "/bannerimages/Artboard 3.jpg",
// ];

// export default function Slider() {
//   const [index, setIndex] = useState(0);
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const checkScreen = () => setIsMobile(window.innerWidth < 768);

//     checkScreen();
//     window.addEventListener("resize", checkScreen);

//     return () => window.removeEventListener("resize", checkScreen);
//   }, []);

//   const images = isMobile ? appslides : slides;

//   const [emblaRef, emblaApi] = useEmblaCarousel(
//     {
//       loop: true,
//     },
//     [
//       Autoplay({
//         delay: 4000,
//         stopOnInteraction: false,
//       }),
//     ]
//   );

//   const onSelect = useCallback(() => {
//     if (!emblaApi) return;
//     setIndex(emblaApi.selectedScrollSnap());
//   }, [emblaApi]);

//   useEffect(() => {
//     if (!emblaApi) return;

//     onSelect();

//     emblaApi.on("select", onSelect);
//     emblaApi.on("reInit", onSelect);

//     return () => {
//       emblaApi.off("select", onSelect);
//       emblaApi.off("reInit", onSelect);
//     };
//   }, [emblaApi, onSelect]);

//   // Prevent index overflow if mobile/desktop arrays have different lengths
//   useEffect(() => {
//     if (index >= images.length) {
//       setIndex(0);
//       emblaApi?.scrollTo(0, true);
//     }
//   }, [images.length, index, emblaApi]);

//   return (
//     <section className=" group relative w-full overflow-hidden h-[55vw] min-h-[260px] max-h-[420px] md:h-[80vh] bg-red-40 md:max-h-none">

//       {/* Background Image */}
//       {/* Background Image */}
// <AnimatePresence initial={false}>
//   <motion.div
//     key={`${isMobile}-${index}`}
//     initial={{ opacity: 0 }}
//     animate={{ opacity: 1 }}
//     exit={{ opacity: 0 }}
//     transition={{ duration: 0.8, ease: "easeInOut" }}
//     className="absolute inset-0"
//   >
//     <Image
//       src={images[index]}
//       alt={`Slide ${index + 1}`}
//       fill
//       priority={index === 0}
//       quality={100}
//       sizes="100vw"
//       className="object-contain"
//     />
//   </motion.div>
// </AnimatePresence>

//       {/* Swipe Area */}
//       <div
//         ref={emblaRef}
//         className="absolute inset-0 z-10 overflow-hidden touch-pan-y"
//       >
//         <div className="flex h-full">
//           {images.map((_, i) => (
//             <div key={i} className="min-w-full h-full" />
//           ))}
//         </div>
//       </div>

//       {/* Left Arrow */}
//       <button
//         onClick={() => emblaApi?.scrollPrev()}
//         className="hidden md:flex absolute left-5 top-1/2 -translate-y-1/2 z-20 h-12 w-12 items-center justify-center rounded-full bg-black/40 text-3xl text-white transition hover:bg-black/60"
//       >
//         ‹
//       </button>

//       {/* Right Arrow */}
//       <button
//         onClick={() => emblaApi?.scrollNext()}
//         className="hidden md:flex absolute right-5 top-1/2 -translate-y-1/2 z-20 h-12 w-12 items-center justify-center rounded-full bg-black/40 text-3xl text-white transition hover:bg-black/60"
//       >
//         ›
//       </button>

//       {/* Pagination */}
//       {/* <div className="absolute bottom-4 md:bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
//         {images.map((_, i) => (
//           <button
//             key={i}
//             onClick={() => emblaApi?.scrollTo(i)}
//             className={`transition-all duration-300 rounded-full ${
//               index === i
//                 ? "w-8 h-2 bg-white"
//                 : "w-2 h-2 bg-white/50"
//             }`}
//           />
//         ))}
//       </div> */}
//     </section>
//   );
// }

"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { AnimatePresence, motion } from "framer-motion";



export default function Slider({ appslides = [], slides = [] }) {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const images = isMobile ? appslides : slides;

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
    },
    [
      Autoplay({
        delay: 4000,
        stopOnInteraction: false,
      }),
    ]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Prevent index overflow if mobile/desktop arrays have different lengths
  useEffect(() => {
    if (index >= images.length) {
      setIndex(0);
      emblaApi?.scrollTo(0, true);
    }
  }, [images.length, index, emblaApi]);

  // Early return if no images are provided to prevent runtime crashes
  if (images.length === 0) return null;

  return (
    <section className="group relative w-full overflow-hidden h-[55vw] min-h-[260px] max-h-[420px] md:h-[80vh] md:max-h-none">
      {/* Background Image */}
      <AnimatePresence initial={false}>
        <motion.div
          key={`${isMobile}-${index}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={images[index]}
            alt={`Slide ${index + 1}`}
            fill
            priority={index === 0}
            quality={100}
            sizes="100vw"
            className="object-contain"
          />
        </motion.div>
      </AnimatePresence>

      {/* Swipe Area */}
      <div
        ref={emblaRef}
        className="absolute inset-0 z-10 overflow-hidden touch-pan-y"
      >
        <div className="flex h-full">
          {images.map((_, i) => (
            <div key={i} className="min-w-full h-full" />
          ))}
        </div>
      </div>

      {/* Left Arrow */}
      <button
        onClick={() => emblaApi?.scrollPrev()}
        className="hidden md:flex absolute left-5 top-1/2 -translate-y-1/2 z-20 h-12 w-12 items-center justify-center rounded-full bg-black/40 text-3xl text-white transition hover:bg-black/60"
      >
        ‹
      </button>

      {/* Right Arrow */}
      <button
        onClick={() => emblaApi?.scrollNext()}
        className="hidden md:flex absolute right-5 top-1/2 -translate-y-1/2 z-20 h-12 w-12 items-center justify-center rounded-full bg-black/40 text-3xl text-white transition hover:bg-black/60"
      >
        ›
      </button>
    </section>
  );
}