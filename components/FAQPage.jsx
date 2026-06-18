"use client";

import React, { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, Frown } from "lucide-react";

const FAQS = [
  { 
    q: "What is Zuget and how does it work?", 
    a: "Zuget is India's first hyperlocal fashion marketplace that connects you with premium fashion stores near you. We bring the trial room to your phone via AI and deliver your favorite outfits straight to your doorstep in just 10 minutes." 
  },
  { 
    q: "How does the AI Virtual Try-On work?", 
    a: "Stop guessing your size! You can create your 3D digital twin by scanning yourself once with your camera. Our advanced AI lets you see exactly how dresses, shirts, or ethnic wear fit your unique body type before making a purchase." 
  },
  { 
    q: "Can I try clothes at home before keeping them?", 
    a: "Yes! With our Try-at-Home experience, you can order multiple sizes or styles. Try them on comfortably at home while our delivery rider waits, keep what you absolutely love, and return the rest on the spot." 
  },
  { 
    q: "What is your return and refund policy?", 
    a: "We offer instant, zero-friction returns. If an item doesn't fit or suit your style, simply hand it back to the rider immediately. No packing, no printing labels, and no waiting days for a pickup." 
  },
  { 
    q: "How can local fashion retailers sell on Zuget?", 
    a: "Boutiques, designer studios, and apparel retailers can partner with us through the Zuget Partner program. You can digitize your inventory, tap into local customer demand across Hyderabad, and leverage our delivery network with secure, transparent payouts." 
  }
];

export default function FAQPage() {
  const [searchVal, setSearchVal] = useState("");
  const [openIndex, setOpenIndex] = useState(null);
  const [, startTransition] = useTransition();

  // Highlight search matched text safely without raw HTML injections
  const highlightText = (text, query) => {
    if (!query.trim()) return text;
    const parts = text.split(new RegExp(`(${query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) => 
          part.toLowerCase() === query.toLowerCase() ? (
            <mark key={i} className="bg-purple-100 text-[#793FDF] font-medium rounded-sm px-0.5">{part}</mark>
          ) : part
        )}
      </span>
    );
  };

  const filteredFaqs = FAQS.filter((f) => {
    const query = searchVal.toLowerCase().trim();
    return !query || f.q.toLowerCase().includes(query) || f.a.toLowerCase().includes(query);
  });

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-16 sm:py-24 font-sans antialiased text-slate-800">
      
      {/* Header Section */}
      <div className="text-center mb-10">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-purple-50 text-[#793FDF]"
        >
          Help Center
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 mt-3 mb-2"
        >
          Have Questions?
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-sm text-slate-500 max-w-md mx-auto"
        >
          Everything you need to know about Zuget — premium hyperlocal fashion, delivered in 10 minutes.
        </motion.p>
      </div>

      {/* Clean Search Input Component */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="relative mb-6 group"
      >
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-slate-400 group-focus-within:text-[#793FDF] transition-colors" />
        </div>
        <input
          type="text"
          value={searchVal}
          onChange={(e) => startTransition(() => setSearchVal(e.target.value))}
          placeholder="Search for delivery timings, AI try-on, returns..."
          className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#793FDF]/10 focus:border-[#793FDF] text-sm transition-all shadow-sm"
        />
      </motion.div>

      {/* Accordion Layout */}
      <motion.div layout className="space-y-3">
        <AnimatePresence mode="popLayout">
          {filteredFaqs.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-10 px-4 bg-white border border-dashed border-slate-200 rounded-xl"
            >
              <Frown className="w-6 h-6 text-slate-300 mx-auto mb-2" />
              <p className="text-xs font-semibold text-slate-600">No matching questions found.</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Try searching for generic terms like 'delivery' or 'try-on'.</p>
            </motion.div>
          ) : (
            filteredFaqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <motion.div
                  key={index}
                  layout
                  className={`border rounded-xl transition-all duration-300 bg-white ${
                    isOpen 
                      ? "border-[#793FDF] ring-4 ring-[#793FDF]/5 shadow-sm" 
                      : "border-slate-100 hover:border-slate-200 hover:shadow-sm"
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between text-left px-5 py-4 gap-4 focus:outline-none select-none"
                  >
                    <span className="text-[14px] font-bold text-slate-800 leading-snug">
                      {highlightText(faq.q, searchVal)}
                    </span>
                    <span className={`w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100 text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-45 bg-purple-50 text-[#793FDF] border-purple-100" : ""}`}>
                      <Plus className="w-3 h-3" />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-4 pt-0 text-[13px] text-slate-500 leading-relaxed border-t border-slate-50/50 mt-1">
                          <p className="pt-3">{highlightText(faq.a, searchVal)}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}