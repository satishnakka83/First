'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function MobileSafeParabolicLine() {
  const containerRef = useRef(null);
  const pathRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const path = pathRef.current;
    if (!path) return;

    const initScrollAnimation = () => {
      const pathLength = path.getTotalLength();
      
      // Force initial hidden line state
      gsap.set(path, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });

      // 1. CHOOSE THE RIGHT TRIGGER TARGET FOR MOBILE
      // If a custom scroll container wrapper exists, GSAP must track THAT instead of the window
      const scrollContainer = document.querySelector('.scroll-container') || window;

      // 2. Clear out any old instances to prevent duplicate hooks on mobile re-renders
      ScrollTrigger.addEventListener("refresh", () => ScrollTrigger.update());

      gsap.to(path, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          scroller: window, // Keeps global viewport context
          start: 'top bottom', 
          end: 'bottom top',   
          scrub: true, // Changing 0.1 to true updates instantaneously with touch tracking
          invalidateOnRefresh: true,
        },
      });
    };

    // Give the DOM engine a moment to render the SVG layout paths on mobile screens
    const timer = setTimeout(() => {
      initScrollAnimation();
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full min-h-screen bg-[#f3f4f6] text-black flex flex-col justify-center px-6 sm:px-12 md:px-16 overflow-hidden py-20"
    >
      {/* LAYER 1: SVG BACKGROUND BRUSH */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <svg 
          className="w-full h-full pointer-events-none"
          viewBox="0 0 1000 1000" 
          preserveAspectRatio="none"
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            ref={pathRef}
            d="M -20,100 Q 850,250 500,900"
            stroke="#2563eb" 
            strokeWidth="55"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* LAYER 2: TYPOGRAPHY LAYERS FLOATING SECURELY ABOVE */}
      <div className="w-full max-w-4xl relative z-10 pointer-events-none select-none">
        <h1 className="text-[13vw] sm:text-[10vw] md:text-9xl font-black tracking-tighter uppercase leading-[0.85] mb-6 text-neutral-950">
          Bold <br />
          Ideas, <br />
          Brought to <br />
          Life
        </h1>
        
        <p className="text-neutral-700 text-sm sm:text-base max-w-lg font-medium tracking-tight mt-8 sm:mt-12 leading-relaxed pointer-events-auto">
          We combine design, motion, 3D, and development to create digital experiences 
          that feel visually striking and technically seamless. From campaign launches 
          to immersive brand worlds, we build work that captures attention and invites interaction.
        </p>

        <div className="mt-8 pointer-events-auto">
          <button className="flex items-center space-x-2 bg-black text-white text-[11px] font-bold tracking-widest uppercase px-6 py-4 rounded-full active:scale-95 transition-transform">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
            <span>Our Approach</span>
          </button>
        </div>
      </div>
    </section>
  );
}