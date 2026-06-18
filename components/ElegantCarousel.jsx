"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

// --- Mock Data ---
const SLIDES = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=3183&auto=format&fit=crop",
    title: "Performance & Elegance",
    subtitle: "Experience the thrill of the open road with uncompromised luxury.",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1503376713192-3652a130f148?q=80&w=3270&auto=format&fit=crop",
    title: "Classic Heritage",
    subtitle: "Timeless design meets modern engineering in perfect harmony.",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=3270&auto=format&fit=crop",
    title: "Electric Future",
    subtitle: "Silent, powerful, and sustainable. The next generation of driving.",
  },
];

// --- Animation Variants ---
const sliderVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
    scale: 1.05,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.95,
  }),
};

// Controls the speed and feel of the slide
const sliderTransition = {
  x: { type: "spring", stiffness: 300, damping: 30 },
  opacity: { duration: 0.4 },
  scale: { duration: 0.6 },
};

export default function ElegantCarousel() {
  const [page, setPage] = useState([0, 0]); // [currentIndex, direction]
  const [isHovered, setIsHovered] = useState(false);

  const imageIndex = Math.abs(page[0] % SLIDES.length);
  const slide = SLIDES[imageIndex];

  const paginate = (newDirection) => {
    setPage([page[0] + newDirection, newDirection]);
  };

  return (
    <div 
      className="relative w-full h-[600px] md:h-[800px] bg-neutral-950 overflow-hidden flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence initial={false} custom={page[1]}>
        <motion.div
          key={page[0]}
          custom={page[1]}
          variants={sliderVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={sliderTransition}
          // Swipe functionality for mobile
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = Math.abs(offset.x) * velocity.x;
            if (swipe < -10000) paginate(1);
            else if (swipe > 10000) paginate(-1);
          }}
          className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          
          {/* Dark Gradient Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Text Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 pb-20 md:pb-24 max-w-7xl mx-auto">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
            >
              <h2 className="text-4xl md:text-6xl font-semibold text-white tracking-tight mb-4 drop-shadow-lg">
                {slide.title}
              </h2>
            </motion.div>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.6, ease: "easeOut" }}
            >
              <p className="text-lg md:text-xl text-neutral-300 max-w-2xl leading-relaxed drop-shadow-md">
                {slide.subtitle}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <div 
        className={`absolute inset-0 flex items-center justify-between p-4 md:p-8 pointer-events-none transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'md:opacity-0 opacity-100'}`}
      >
        <button
          className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white pointer-events-auto transition-all active:scale-95"
          onClick={() => paginate(-1)}
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
        </button>
        <button
          className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white pointer-events-auto transition-all active:scale-95"
          onClick={() => paginate(1)}
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-6 md:bottom-10 left-0 right-0 flex justify-center gap-3 z-10">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              const direction = index > imageIndex ? 1 : -1;
              setPage([index, direction]);
            }}
            className={`transition-all duration-500 ease-out rounded-full ${
              index === imageIndex 
                ? "w-8 h-2 bg-white" 
                : "w-2 h-2 bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}