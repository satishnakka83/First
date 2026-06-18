"use client";

import { motion } from "framer-motion";

export default function ScrollToTopButton() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 bg-[#793FDF] text-white p-3 md:p-4 rounded-full shadow-[0_10px_25px_rgba(121,63,223,0.4)] hover:bg-slate-900 transition-colors z-50 flex items-center justify-center border-2 border-white"
      aria-label="Scroll to top"
    >
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-3 h-3">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" />
      </svg>
    </motion.button>
  );
}