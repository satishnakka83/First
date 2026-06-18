"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Shirt, Truck } from "lucide-react";

export default function SplashScreen({ onComplete }) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // Exact sequence mapping out the 4-second animation timeline
    const timers = [
      setTimeout(() => setStage(1), 800),  // 0.8s: Bag -> Shirt
      setTimeout(() => setStage(2), 1600), // 1.6s: Shirt -> Scooter
      setTimeout(() => setStage(3), 2600), // 2.6s: Scooter -> Zuget Text
      setTimeout(() => {
        setStage(4); // 4.0s: Turn off Splash Screen
        if (onComplete) onComplete();
      }, 4000), 
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  if (stage === 4) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#f4f1ea] p-6 overflow-hidden select-none">
      <AnimatePresence mode="wait">
        
        {/* Stage 0: Shopping Bag */}
        {stage === 0 && (
          <motion.div
            key="bag"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            // Responsive width: taking up 33% width on mobile, scaling down proportionally on desktop
            className="w-1/3 sm:w-1/4 md:w-1/5 max-w-[180px] aspect-square flex items-center justify-center text-[#1a1124]"
          >
            <ShoppingBag className="w-full h-full" strokeWidth={1.2} />
          </motion.div>
        )}

        {/* Stage 1: T-Shirt */}
        {stage === 1 && (
          <motion.div
            key="shirt"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-1/3 sm:w-1/4 md:w-1/5 max-w-[180px] aspect-square flex items-center justify-center text-[#1a1124]"
          >
            <Shirt className="w-full h-full" strokeWidth={1.2} />
          </motion.div>
        )}

        {/* Stage 2: Delivery Vehicle */}
        {stage === 2 && (
          <motion.div
            key="delivery"
            initial={{ x: "-100vw", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100vw", opacity: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 120, 
              damping: 14,
              exit: { duration: 0.35, ease: "easeInOut" } 
            }}
            className="w-2/5 sm:w-1/3 md:w-1/4 max-w-[240px] aspect-square flex items-center justify-center text-[#1a1124]"
          >
            {/* Standard icon placeholder. Best if swapped with your custom Scooter SVG vector */}
            <Truck className="w-full h-full" strokeWidth={1.2} />
          </motion.div>
        )}

        {/* Stage 3: Zuget Text Reveal */}
        {stage === 3 && (
          <motion.div
            key="text"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center px-4 max-w-xl flex flex-col items-center"
          >
            {/* Responsively sizes font: text-5xl on mobile, text-7xl on desktop */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-[#1a1124] tracking-tight mb-2 md:mb-4">
              Zuget
            </h1>
            {/* Responsively sizes subtitle spacing/font */}
            <p className="text-[#1a1124]/75 text-sm sm:text-base md:text-lg lg:text-xl font-medium tracking-wider whitespace-nowrap">
              Fashion Delivered in 30 Minutes
            </p>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}