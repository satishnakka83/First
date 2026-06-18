'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function AnimatedHero() {
  // Animation variants for smooth text reveal
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    },
  };

  return (
    <section className="relative w-full min-h-[650px] md:min-h-[750px] flex items-center justify-center overflow-hidden rounded-2xl shadow-2xl font-sans bg-gray-950">
      
      {/* --- Injected CSS for Shape Floating Animations --- */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes floatShape1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
          33% { transform: translate(40px, -60px) rotate(45deg) scale(1.05); }
          66% { transform: translate(-20px, 40px) rotate(90deg) scale(0.95); }
        }
        @keyframes floatShape2 {
          0%, 100% { transform: translate(0, 0) rotate(45deg) scale(1); }
          33% { transform: translate(-50px, 50px) rotate(0deg) scale(1.1); }
          66% { transform: translate(30px, -30px) rotate(90deg) scale(0.9); }
        }
        .shape-1 { animation: floatShape1 14s ease-in-out infinite; }
        .shape-2 { animation: floatShape2 18s ease-in-out infinite reverse; }
        .shape-3 { animation: floatShape1 11s ease-in-out infinite 2s; }
        .shape-4 { animation: floatShape2 16s ease-in-out infinite 1s; }
      `}} />

      {/* --- Base Photographic Background Image --- */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat scale-105 filter saturate-100 brightness-[0.8]"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1920&q=80')` 
        }}
      />

      {/* --- Primary Gradient Overlay Tint (#793FDF Accent Blend) --- */}
      {/* This layer blends the background photograph seamlessly into your brand identity */}
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-[#5A2EAA]/80 via-[#793FDF]/75 to-[#1A0B36]/90 mix-blend-multiply"></div>
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-90"></div>

      {/* --- Floating Semi-Translucent Kinetic Shapes Over Image --- */}
      <div className="absolute inset-0 z-20 overflow-hidden opacity-35 pointer-events-none">
        <div className="absolute top-[12%] left-[8%] w-36 h-36 bg-white/10 border border-white/20 backdrop-blur-md rounded-[2.5rem] shape-1"></div>
        <div className="absolute bottom-[15%] right-[12%] w-52 h-52 bg-white/10 border border-white/20 backdrop-blur-md rounded-[3.5rem] shape-2"></div>
        <div className="absolute top-[45%] right-[25%] w-28 h-28 bg-white/5 border border-white/10 backdrop-blur-sm rounded-[1.75rem] shape-3"></div>
        <div className="absolute bottom-[25%] left-[22%] w-24 h-24 bg-white/5 border border-white/10 backdrop-blur-sm rounded-[1.25rem] shape-4"></div>
        {/* Diamond accents */}
        <div className="absolute top-[28%] left-[38%] w-14 h-14 bg-white/10 border border-white/20 backdrop-blur-sm rounded-xl rotate-45 shape-2"></div>
        <div className="absolute bottom-[35%] right-[38%] w-18 h-18 bg-white/10 border border-white/20 backdrop-blur-sm rounded-2xl rotate-45 shape-1"></div>
      </div>

      {/* --- Foreground Copy and Interface Elements --- */}
      <motion.div
        className="relative z-30 max-w-3xl px-6 flex flex-col items-center text-center text-white select-none"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Eyebrow Notification Badge */}
        <motion.p 
          variants={itemVariants} 
          className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] mb-5 px-4 py-1.5 bg-black/20 border border-white/10 rounded-full backdrop-blur-md text-white/90 shadow-sm"
        >
          ⚡ Fashion delivered in 30 minutes
        </motion.p>

        {/* Dynamic Typography Header */}
        <motion.h1 
          variants={itemVariants} 
          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-[1.15]"
        >
          Your City's Fashion.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-white">
            Delivered Fast.
          </span>
        </motion.h1>

        {/* Supportive Paragraph Copy */}
        <motion.p 
          variants={itemVariants} 
          className="text-lg sm:text-xl text-white/85 mb-12 max-w-xl mx-auto leading-relaxed drop-shadow-sm"
        >
          Shop the latest trends and styles with instant virtual try-on.
        </motion.p>

        {/* Action Button Interfaces */}
        <motion.div variants={itemVariants}>
          <button className="group relative px-12 py-4.5 bg-white text-[#793FDF] font-bold text-lg rounded-2xl shadow-[0_12px_45px_rgba(121,63,223,0.3)] hover:shadow-[0_18px_60px_rgba(121,63,223,0.5)] transition-all duration-300 hover:-translate-y-1 overflow-hidden border border-white">
            <span className="relative z-10 flex items-center justify-center gap-2">
              I'm a Customer
            </span>
            {/* Hover reveal overlay inside the button structure */}
            <div className="absolute inset-0 h-full w-full bg-purple-50 transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100 z-0"></div>
          </button>
        </motion.div>

      </motion.div>
    </section>
  );
}