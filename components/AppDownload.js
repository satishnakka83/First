"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function DownloadAppSection() {
  // Animation Variants for Text and Content
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <section className="relative w-full bg-slate-50 py-20 md:py-32 px-5 md:px-12 lg:px-24 overflow-hidden ">
      
      {/* Trendy Light Background Elements */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none z-0" 
        style={{ 
          backgroundImage: 'radial-gradient(#000000 1.5px, transparent 1.5px)', 
          backgroundSize: '24px 24px' 
        }} 
      />
      
      {/* Soft Ambient Glows */}
      <div className="absolute top-0 right-0 w-[60vw] h-[60vh] bg-[#793FDF]/5 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-10 left-10 w-[40vw] h-[40vh] bg-rose-400/5 blur-[100px] rounded-full pointer-events-none z-0" />
      
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 relative z-10">
        
        {/* --- LEFT COLUMN: CONTENT & BUTTONS --- */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left w-full"
        >
          <motion.div variants={itemVariants} className="mb-5">
            <span className="text-[#793FDF] text-xs font-black tracking-[0.2em] uppercase bg-[#793FDF]/10 px-4 py-2 rounded-full border border-[#793FDF]/20">
              Get The Zuget App
            </span>
          </motion.div>

          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 leading-[1.15] tracking-tight">
            City's best fashion,<br />
            <span className="text-[#793FDF] drop-shadow-sm">delivered in 30 mins.</span>
          </motion.h2>

          <motion.p variants={itemVariants} className="text-slate-600 text-base md:text-lg mb-10 max-w-md leading-relaxed font-medium">
            Shop from 500+ local boutiques. Try it on at home, get instant returns, and explore daily drops—all from your pocket.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-6">
            
            {/* QR Code Container */}
            <div className="bg-white p-3 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-slate-100 flex-shrink-0 group hover:shadow-[0_15px_40px_rgba(121,63,223,0.15)] transition-all duration-300">
              <img 
                src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://zuget.in/download&color=793FDF" 
                alt="Scan to download" 
                className="w-24 h-24 md:w-28 md:h-28 object-contain rounded-xl group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Store Badges */}
            <div className="flex flex-col gap-3.5">
              {/* App Store Button */}
              <button className="bg-slate-900 text-white w-48 h-[52px] rounded-xl flex items-center justify-center gap-3 hover:bg-[#793FDF] hover:-translate-y-1 transition-all duration-300 shadow-md group">
                <svg viewBox="0 0 384 512" className="w-6 h-6 fill-current transition-transform group-hover:scale-110">
                  <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
                </svg>
                <div className="text-left flex flex-col justify-center">
                  <span className="text-[10px] leading-none text-slate-300 font-medium">Download on the</span>
                  <span className="text-[15px] font-bold leading-tight mt-0.5">App Store</span>
                </div>
              </button>

              {/* Google Play Button */}
              <button className="bg-slate-900 text-white w-48 h-[52px] rounded-xl flex items-center justify-center gap-3 hover:bg-[#793FDF] hover:-translate-y-1 transition-all duration-300 shadow-md group">
                <svg viewBox="0 0 512 512" className="w-5 h-5 fill-current transition-transform group-hover:scale-110">
                  <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
                </svg>
                <div className="text-left flex flex-col justify-center">
                  <span className="text-[10px] leading-none text-slate-300 font-medium">GET IT ON</span>
                  <span className="text-[15px] font-bold leading-tight mt-0.5">Google Play</span>
                </div>
              </button>
            </div>
            
          </motion.div>
        </motion.div>

        {/* --- RIGHT COLUMN: CLEANED IMAGE SHOWCASE --- */}
        <div className="flex-1 w-full flex justify-center lg:justify-end mt-16 lg:mt-0 perspective-1000">
          
          {/* SAFE CONTAINER */}
          <div className="relative w-[340px] md:w-[400px] lg:w-[450px] h-[480px] md:h-[550px]">
            
            {/* Background Blur Phone Graphic */}
            <motion.div 
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-0 top-12 w-[220px] md:w-64 h-[400px] md:h-[480px] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden transform -rotate-6 z-0 shadow-lg"
            >
              <img 
                src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=400&auto=format&fit=crop" 
                alt="Stores Grid" 
                className="w-full h-full object-cover opacity-60 filter blur-[1px]"
              />
            </motion.div>

            {/* Front Main Image (Your pure image asset showcasing the app) */}
            <motion.div 
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute right-0 top-0 w-[250px] md:w-[290px] h-auto z-10"
            >
              <img 
                src="/9022843.png" 
                alt="Zuget App View" 
                className="w-full h-full object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.18)]"
              />
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}