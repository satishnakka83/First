"use client"
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { IoIosArrowDown } from "react-icons/io";

const HeaderOverlay = ({ locname = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  // Lock body scroll when mobile menu is open
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
  const handleClickOutside = (event) => {
    if (
      menuRef.current && !menuRef.current.contains(event.target) &&
      buttonRef.current && !buttonRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  };

  function HoverRollLink({ text, href }) {
    return (
      <motion.a
        href={href}
        initial="initial"
        whileHover="hover"
        className="relative block overflow-hidden font-medium text-white capitalize cursor-pointer"
      >
        <motion.div
          variants={{
            initial: { y: 0 },
            hover: { y: "-100%" },
          }}
          transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
        >
          {text}
        </motion.div>
        <motion.div
          className="absolute top-0 left-0"
          variants={{
            initial: { y: "100%" },
            hover: { y: 0 },
          }}
          transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
        >
          {text}
        </motion.div>
      </motion.a>
    );
  }

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

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
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative w-full min-h-[650px] md:min-h-[850px] flex flex-col overflow-hidden bg-gray-950 font-sans"
    >

      {/* --- Injected CSS for Shape Floating Animations --- */}
      <style dangerouslySetInnerHTML={{
        __html: `
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

      {/* --- ANIMATED BACKGROUND LAYER --- */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat scale-105 filter saturate-100 brightness-[0.8]"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1920&q=80')`
        }}
      />

      {/* Primary Gradient Overlay Tint */}
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-[#5A2EAA]/80 via-[#793FDF]/75 to-[#1A0B36]/90 mix-blend-multiply pointer-events-none"></div>
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-90 pointer-events-none"></div>

      {/* Floating Semi-Translucent Kinetic Shapes Over Image */}
      <div className="absolute inset-0 z-20 overflow-hidden opacity-35 pointer-events-none">
        <div className="absolute top-[12%] left-[8%] w-36 h-36 bg-white/10 border border-white/20 backdrop-blur-md rounded-[2.5rem] shape-1"></div>
        <div className="absolute bottom-[15%] right-[12%] w-52 h-52 bg-white/10 border border-white/20 backdrop-blur-md rounded-[3.5rem] shape-2"></div>
        <div className="absolute top-[45%] right-[25%] w-28 h-28 bg-white/5 border border-white/10 backdrop-blur-sm rounded-[1.75rem] shape-3"></div>
        <div className="absolute bottom-[25%] left-[22%] w-24 h-24 bg-white/5 border border-white/10 backdrop-blur-sm rounded-[1.25rem] shape-4"></div>
        <div className="absolute top-[28%] left-[38%] w-14 h-14 bg-white/10 border border-white/20 backdrop-blur-sm rounded-xl rotate-45 shape-2"></div>
        <div className="absolute bottom-[35%] right-[38%] w-18 h-18 bg-white/10 border border-white/20 backdrop-blur-sm rounded-2xl rotate-45 shape-1"></div>
      </div>

      {/* FIXED NAVIGATION BAR - Now Permanently White */}
      <header className="fixed top-0 left-0 right-0 z-50 px-5 md:px-12 lg:px-20 flex justify-between items-center py-3 md:py-4 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] border-b border-slate-200">

        {/* Location Dropdown */}
        <div className="flex items-center gap-3 cursor-pointer select-none group">
          <div className="flex flex-col leading-tight">
            <span className="text-[10px] font-extrabold tracking-widest uppercase text-[#793FDF]">
              30 Min Delivery
            </span>
            <span className="flex items-center gap-1 text-sm font-bold text-slate-800 hover:text-[#793FDF] transition-colors">
              Hyderabad <IoIosArrowDown className="text-slate-800 animate-pulse" size={16} />
            </span>
          </div>
        </div>

        {/* LOGO */}
        <Link href="/" className="tracking-wide text-2xl md:text-3xl font-black tracking-tighter drop-shadow-sm transition-all active:scale-95 text-slate-900">
          Zu<span className="text-[#793FDF]">Get</span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:block">
          <ul className="flex gap-x-10 font-bold text-sm tracking-wide text-slate-700">
            {['Home', 'Shops', 'Contact Us', 'About Us'].map((item, idx) => (
              <li key={idx}>
                <Link
                  href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                  className="relative py-1 transition-all duration-300 hover:text-[#793FDF] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#793FDF] hover:after:w-full after:transition-all after:duration-300"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Hamburger Menu Trigger Button */}
        <div className="lg:hidden block z-20">
          <button
            ref={buttonRef}
            className="relative flex flex-col justify-center items-center w-8 h-8 focus:outline-none group"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <span className={`block w-6 h-[2px] rounded-full transition-all duration-300 ease-out ${isOpen ? "bg-slate-900 rotate-45 translate-y-1.5" : "bg-slate-900 -translate-y-1 group-hover:bg-[#793FDF]"}`} />
            <span className={`block w-6 h-[2px] rounded-full transition-all duration-300 ease-out ${isOpen ? "opacity-0" : "opacity-100 bg-slate-900 group-hover:bg-[#793FDF]"}`} />
            <span className={`block w-6 h-[2px] rounded-full transition-all duration-300 ease-out ${isOpen ? "bg-slate-900 -rotate-45 -translate-y-1.5" : "bg-slate-900 translate-y-1 group-hover:bg-[#793FDF]"}`} />
          </button>
        </div>

        {/* Mobile Sliding Navigation Drawer */}
        <nav
          ref={menuRef}
          aria-label="Mobile Navigation"
          className={`
            fixed top-0 right-0 h-screen w-[75%] sm:w-[50%]
            bg-white/95 backdrop-blur-xl border-l border-slate-100
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

          <div className="absolute bottom-10 left-8 right-8">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1">Partner with us</span>
              <span className="text-sm font-bold text-[#793FDF]">0% Commission</span>
            </div>
          </div>
        </nav>
      </header>

      {/* DYNAMIC HERO BODY SEGMENT */}
      <motion.div
        className="relative z-30 flex-1 flex flex-col items-center justify-center pt-24 px-6 text-center text-white select-none"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Eyebrow Notification Badge */}
        <motion.p
          variants={itemVariants}
          className="text-[9px] lg:text-sm font-bold uppercase tracking-[0.25em] mb-5 px-4 py-1.5 bg-black/20 border border-white/10 rounded-full backdrop-blur-md text-white/90 shadow-sm"
        >
          ⚡ Fashion delivered in 30 minutes
        </motion.p>

        {/* Dynamic Typography Header */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.15]"
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

        {/* Action Button */}
        <div className="flex flex-col items-center gap-6 py-12 px-4">

          {/* ── Two CTA Cards ── */}
          

          {/* ── Trust Strip ── */}
          <div className="flex flex-wrap gap-5 items-center justify-center font-mono text-[9px] tracking-[0.35em] uppercase text-white/20">
            <span>4.9 ★ App Store</span>
            <span className="text-white/10">|</span>
            <span>50k+ Customers</span>
            <span className="text-white/10">|</span>
            <span>200+ Partner Stores</span>
          </div>

          {/* ── Scroll Down Button ── */}
          <button className="mt-2 w-10 h-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-colors duration-200">
            ↓
          </button>

        </div>

      </motion.div>

    </motion.div>
  );
};

export default HeaderOverlay;