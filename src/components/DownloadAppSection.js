"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CustomerApp } from './common/CustomerApp';

export default function DownloadAppSection() {
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

  const handleAppRedirect = () => {
    // CustomerApp should be a function that returns/handles the redirect,
    // not passed directly as a component reference into onClick.
    if (typeof CustomerApp === "function") CustomerApp();
  };

  return (
    <section className="relative w-full bg-slate-50 py-14 md:py-20 px-5 md:px-12 lg:px-24 overflow-hidden">

      {/* Dot grid background — cheap, CSS-only */}
      <div
  className="absolute inset-0 opacity-[0.04] pointer-events-none z-0"
  style={{
    backgroundImage: "url('/')",
    backgroundSize: '24px 24px',
  }}
/>

      {/* Ambient glows — hidden on mobile to cut paint cost on low-power devices */}
      <div className="hidden sm:block absolute top-0 right-0 w-[60vw] h-[60vh] bg-[#793FDF]/5 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="hidden sm:block absolute bottom-10 left-10 w-[40vw] h-[40vh] bg-rose-400/5 blur-[100px] rounded-full pointer-events-none z-0" />

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
            City&apos;s best fashion,<br />
            <span className="text-[#793FDF] drop-shadow-sm">delivered in 30 mins.</span>
          </motion.h2>

          <motion.p variants={itemVariants} className="text-slate-600 text-base md:text-lg mb-10 max-w-md leading-relaxed font-medium">
            Shop from 500+ local boutiques. Try it on at home, get instant returns, and explore daily drops all from your pocket.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
            <button
              onClick={handleAppRedirect}
              aria-label="Download on the App Store"
              className="bg-slate-900 text-white w-full sm:w-48 h-[52px] rounded-xl flex items-center justify-center gap-3 hover:bg-[#793FDF] hover:-translate-y-1 transition-all duration-300 shadow-md group"
            >
              <svg viewBox="0 0 384 512" className="w-6 h-6 fill-current transition-transform group-hover:scale-110" aria-hidden="true">
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
              </svg>
              <div className="text-left flex flex-col justify-center">
                <span className="text-[10px] leading-none text-slate-300 font-medium">Download on the</span>
                <span className="text-[15px] font-bold leading-tight mt-0.5">App Store</span>
              </div>
            </button>

            <button
              onClick={handleAppRedirect}
              aria-label="Get it on Google Play"
              className="bg-slate-900 text-white w-full sm:w-48 h-[52px] rounded-xl flex items-center justify-center gap-3 hover:bg-[#793FDF] hover:-translate-y-1 transition-all duration-300 shadow-md group"
            >
              <svg viewBox="0 0 512 512" className="w-5 h-5 fill-current transition-transform group-hover:scale-110" aria-hidden="true">
                <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
              </svg>
              <div className="text-left flex flex-col justify-center">
                <span className="text-[10px] leading-none text-slate-300 font-medium">GET IT ON</span>
                <span className="text-[15px] font-bold leading-tight mt-0.5">Google Play</span>
              </div>
            </button>
          </motion.div>
        </motion.div>

        {/* --- RIGHT COLUMN: IMAGE SHOWCASE --- */}
        <div className="flex-1 w-full flex justify-center lg:justify-end mt-4 lg:mt-0">
          <div className="relative w-[300px] sm:w-[340px] md:w-[400px] lg:w-[450px] h-[420px] sm:h-[480px] md:h-[550px]">

            {/* Decorative back panel — replaced external Unsplash hotlink with a
                lightweight local gradient, removing an unoptimized network request
                that was hurting LCP */}
            

            {/* Main app image — next/image gives automatic format negotiation
                (avif/webp), responsive sizes, and lazy loading below the fold */}
                <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute right-16 top-0 w-[220px] sm:w-[250px] md:w-[290px] aspect-[3/4] z-10"
            >
              <Image
                src="/bg-app.png"
                alt="Zuget App View"
                fill
                sizes="(max-width: 768px) 250px, 290px"
                className="object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.18)]"
                priority
              />
            </motion.div>
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute right-0 top-0 w-[220px] sm:w-[250px] md:w-[290px] aspect-[2/3] z-10"
            >
              <Image
                src="/9022843.png"
                alt="Zuget App View"
                fill
                sizes="(max-width: 768px) 250px, 290px"
                className="object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.18)]"
                priority
              />
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}