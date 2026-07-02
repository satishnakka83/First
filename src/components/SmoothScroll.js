"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }) {
  useEffect(() => {
    // 1. Initialize Lenis with modern configuration
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Premium smooth easing curve
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    // 2. Correctly handle the Request Animation Frame loop
    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // 3. Prevent getting stuck by forcing Lenis to recalculate dimensions on resize/DOM changes
    const resizeObserver = new ResizeObserver(() => {
      lenis.resize();
    });
    
    // Observe the full body document to catch any late layout updates or images popping in
    if (document.body) {
      resizeObserver.observe(document.body);
    }

    // 4. Clean up everything on unmount to prevent memory leaks and scroll hijacking
    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      lenis.destroy();
    };
  }, []);

  return children;
}