"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const ROTATING_WORDS = ["Couture Boutiques", "Designer Studios", "Premium Apparel", "Ethnic Labels", "Footwear Houses"];

const STATS = [
  { value: "2 Mins", label: "Instant Digital Catalogue" },
  { value: "0%", label: "Marketing Acquisition Cost" },
  { value: "Live", label: "Hyderabad Fashion Hub" },
];

export default function ZugetHero() {
  const [wordIdx, setWordIdx] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({ 
    target: containerRef, 
    offset: ["start start", "end start"] 
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    setIsVisible(true);
    const id = setInterval(() => setWordIdx((i) => (i + 1) % ROTATING_WORDS.length), 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#07060B] px-5 py-24">
      
      {/* High-Fashion Silk & Velvet Textured Gradient Backdrops */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Soft Pink Silk Sheen Glow */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1], 
            x: [0, 30, 0],
            y: [0, -20, 0] 
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -left-20 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-pink-500/10 to-purple-600/5 blur-[120px]" 
        />
        {/* Royal Indigo Velvet Layer */}
        <motion.div 
          animate={{ 
            scale: [1, 1.15, 1], 
            x: [0, -40, 0],
            y: [0, 40, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-indigo-600/10 via-violet-500/5 to-transparent blur-[140px]" 
        />
      </div>

      {/* Editorial Lookbook Grid Lines overlay */}
      <div className="absolute inset-0 pointer-events-none grid grid-cols-4 gap-0 opacity-[0.03] max-w-7xl mx-auto px-5">
        <div className="border-l border-r border-white h-full w-full" />
        <div className="border-r border-white h-full w-full" />
        <div className="border-r border-white h-full w-full" />
        <div className="w-full h-full" />
      </div>

      {/* Decorative Fashion Runway Indicators */}
      <div className="absolute top-12 left-10 hidden lg:block text-[10px] uppercase tracking-[0.3em] text-slate-600 font-medium select-none">
        Zuget Partner Platform / Autumn-Winter '26
      </div>
      <div className="absolute bottom-12 left-10 hidden lg:block text-[10px] uppercase tracking-[0.3em] text-slate-600 font-medium select-none">
        Locality Node: 17.3850° N, 78.4867° E
      </div>

      <motion.div style={{ y, opacity }} className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto">
        
        {/* Premium Badge styled like a designer label */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-pink-500/20 bg-gradient-to-r from-pink-500/10 to-violet-500/10 text-pink-300 text-[11px] font-bold tracking-[0.15em] uppercase backdrop-blur-md shadow-lg shadow-pink-900/10">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
            Empowering Hyderabad Retailers
          </span>
        </motion.div>

        {/* Dynamic High-Contrast Editorial Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl md:text-8xl font-bold text-white leading-[1.05] tracking-tight mb-6"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Launch Your Digital <br />
          <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-200" style={{ fontFamily: "Georgia, serif" }}>
            Fashion House.
          </span>
        </motion.h1>

        {/* Rotating Niche Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center gap-2 text-lg sm:text-2xl text-slate-400 mb-10"
        >
          <span className="font-light tracking-wide">Tailored for</span>
          <div className="relative overflow-hidden h-9 w-60 sm:w-72 border-b border-pink-500/30 pb-1">
            <AnimatePresence mode="wait">
              <motion.span
                key={wordIdx}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute inset-x-0 text-pink-400 font-semibold tracking-wide"
              >
                {ROTATING_WORDS[wordIdx]}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Interactive Brand CTAs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-20 w-full sm:w-auto"
        >
          <motion.button
            whileHover={{ scale: 1.02, y: -2, boxShadow: "0 20px 35px -10px rgba(236,72,153,0.4)" }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto px-10 py-4 rounded-xl text-xs uppercase tracking-widest font-bold text-white shadow-xl transition-all duration-300"
            style={{ background: "linear-gradient(135deg, #ec4899, #8b5cf6)" }}
          >
            Open Your Boutique Online →
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02, y: -2, backgroundColor: "rgba(255,255,255,0.08)" }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto px-10 py-4 rounded-xl text-xs uppercase tracking-widest font-bold text-slate-300 border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300"
          >
            Explore System Architecture
          </motion.button>
        </motion.div>

        {/* Luxury Brand Metrics Divider */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 border-t border-b border-white/10 py-8 w-full max-w-4xl mx-auto backdrop-blur-sm bg-black/10"
        >
          {STATS.map((s, i) => (
            <div key={i} className="flex flex-col items-center px-4 border-r last:border-r-0 border-white/5">
              <span className="text-xl sm:text-2xl font-bold text-white tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>{s.value}</span>
              <span className="text-[10px] font-semibold tracking-widest text-slate-500 uppercase mt-2">{s.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Floating High-Fashion Product Lookbook Preview Card */}
      <motion.div
        initial={{ opacity: 0, x: 80, rotate: 6 }}
        animate={isVisible ? { opacity: 1, x: 0, rotate: 4 } : {}}
        transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ rotate: 0, y: -8, scale: 1.03 }}
        className="absolute bottom-16 right-4 sm:right-10 md:right-16 w-56 rounded-2xl border border-white/10 bg-[#120F1D]/80 backdrop-blur-xl p-4 hidden lg:block shadow-2xl cursor-pointer"
      >
        <div className="relative w-full h-44 rounded-xl bg-gradient-to-b from-pink-500/20 via-purple-500/10 to-transparent mb-4 flex items-center justify-center overflow-hidden group">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(244,114,182,0.15),transparent)]" />
          <span className="text-5xl drop-shadow-2xl filter transform group-hover:scale-110 transition-transform duration-300">👗</span>
          <div className="absolute bottom-2 left-2 text-[9px] uppercase tracking-wider bg-black/60 backdrop-blur-sm text-pink-300 px-2 py-0.5 rounded border border-white/5">
            Silk Ensemble
          </div>
        </div>
        <div className="h-3 w-36 bg-white/10 rounded-full mb-2" />
        <div className="h-2 w-20 bg-white/5 rounded-full mb-4" />
        <div className="flex justify-between items-center border-t border-white/5 pt-3">
          <span className="text-sm font-bold text-pink-400 font-serif">₹4,499</span>
          <span className="text-[9px] font-bold tracking-wider uppercase text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">Ready to Handoff</span>
        </div>
      </motion.div>
    </section>
  );
}