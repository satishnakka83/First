'use client';

import { useEffect, useState } from 'react';
import ParabolicLineSection from '@/components/ParabolicLineSection';

export default function ZugetHeroTitle() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Small delay ensures the mobile layout engine has completely drawn the DOM elements
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="w-full bg-black py-16 px-4 text-center">
        {/* Fluid viewport text sizing */}
        <h1 className="text-[10vw] sm:text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none flex flex-col items-center justify-center">
          
          {/* Row 1 Wrapper */}
          <span 
            className="block w-full transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-[clip-path,transform]"
            style={{
              // Starts completely clipped out at the bottom, then reveals fully upward
              clipPath: isMounted ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)',
              transform: isMounted ? 'translateY(0px)' : 'translateY(20px)',
            }}
          >
            Verify Local Styles
          </span>

          {/* Row 2 Wrapper */}
          <span 
            className="block w-full text-indigo-500 transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-[clip-path,transform]"
            style={{
              clipPath: isMounted ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)',
              transform: isMounted ? 'translateY(0px)' : 'translateY(20px)',
              transitionDelay: '150ms', // Native stagger effect
            }}
          >
            Deliver Instantly.
          </span>

        </h1>
        <p className="text-neutral-500 text-xs sm:text-sm max-w-md mx-auto mt-6 tracking-wide font-medium px-4">
          Connecting local retail inventory to nearby customer application feeds seamlessly.
        </p>
      </div>

      <ParabolicLineSection />
    </>
  );
}