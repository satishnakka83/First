"use client";

import React, { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Info, 
  Truck, 
  Sparkles, 
  RotateCcw, 
  Smartphone, 
  HelpCircle, 
  Plus, 
  Frown 
} from "lucide-react";

const FAQS = [
  { cat: "General", q: "What is Zuget?", a: "Zuget is a fast fashion delivery app that brings trendy men's, women's, and kids' clothing right to your door — in as little as 30 minutes. Shop your city's latest styles at affordable prices." },
  { cat: "General", q: "Where is Zuget available?", a: "Zuget currently operates across select cities in India. Download the app and enter your address to check if we deliver to your location." },
  { cat: "Orders", q: "How fast is delivery?", a: "We deliver in 30 minutes or less within your city — so you can order during your lunch break and wear it before your next meeting!" },
  { cat: "Orders", q: "How do I track my order?", a: "You can track your order in real time directly through the Zuget app under the \"Track Order\" section." },
  { cat: "Orders", q: "What areas do you deliver to?", a: "We deliver within supported city zones. Enter your address in the app to confirm delivery availability in your area." },
  { cat: "Try-On", q: "What is the AI Try-On feature?", a: "Zuget has a smart AI-powered virtual try-on that lets you preview how outfits look on you before you buy — no stepping into a store required. It works for men's and women's clothing including tops, ethnic wear, jeans, and more." },
  { cat: "Try-On", q: "Is the Try-On feature free to use?", a: "Yes! The virtual try-on feature is completely free for all Zuget app users." },
  { cat: "Try-On", q: "How accurate is the virtual try-on?", a: "Our AI is designed to give you a personalized, realistic preview of colors and designs on your body type so you can shop with confidence." },
  { cat: "Returns", q: "What is your return policy?", a: "We offer hassle-free returns. Visit the \"Returns\" section in the app or contact our support team to initiate a return." },
  { cat: "Returns", q: "How long does a refund take?", a: "Refund timelines vary by payment method but are typically processed within 5–7 business days after the return is confirmed." },
  { cat: "App", q: "How do I download the Zuget app?", a: "You can download Zuget on the App Store or Google Play Store." },
  { cat: "App", q: "Do I need an account to shop?", a: "Yes, a Zuget account is required to place orders, use the try-on feature, and track your deliveries." },
  { cat: "Support", q: "How do I contact Zuget support?", a: "You can reach our support team via the Help Center in the app. We're quick to respond and always happy to help!" },
  { cat: "Support", q: "Do you have a merchant or delivery partner program?", a: "Yes! If you're interested in partnering with Zuget as a merchant or delivery partner, please refer to the relevant sections in the app or the website footer." },
];

const CATEGORIES = [
  { id: "all", label: "All Topics" },
  { id: "General", label: "General" },
  { id: "Orders", label: "Orders & Delivery" },
  { id: "Try-On", label: "AI Try-On" },
  { id: "Returns", label: "Returns" },
  { id: "App", label: "App & Account" },
  { id: "Support", label: "Support" },
];

const CAT_ICONS = {
  General: <Info className="w-4 h-4 text-slate-400" />,
  Orders: <Truck className="w-4 h-4 text-slate-400" />,
  "Try-On": <Sparkles className="w-4 h-4 text-amber-500" />,
  Returns: <RotateCcw className="w-4 h-4 text-slate-400" />,
  App: <Smartphone className="w-4 h-4 text-slate-400" />,
  Support: <HelpCircle className="w-4 h-4 text-slate-400" />,
};

export default function FAQPage() {
  const [activeCat, setActiveCat] = useState("all");
  const [searchVal, setSearchVal] = useState("");
  const [openId, setOpenId] = useState(null);
  const [, startTransition] = useTransition();

  // Highlight search matched text safely
  const highlightText = (text, query) => {
    if (!query.trim()) return text;
    const parts = text.split(new RegExp(`(${query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) => 
          part.toLowerCase() === query.toLowerCase() ? (
            <mark key={i} className="bg-amber-100 text-amber-950 font-medium rounded-sm px-0.5">{part}</mark>
          ) : part
        )}
      </span>
    );
  };

  const filteredFaqs = FAQS.filter((f) => {
    const catMatch = activeCat === "all" || f.cat === activeCat;
    const query = searchVal.toLowerCase().trim();
    const searchMatch = !query || f.q.toLowerCase().includes(query) || f.a.toLowerCase().includes(query);
    return catMatch && searchMatch;
  });

  // Structural mapping of categories
  const groupedFaqs = filteredFaqs.reduce((acc, current) => {
    if (!acc[current.cat]) acc[current.cat] = [];
    acc[current.cat].push(current);
    return acc;
  }, {});

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-16 sm:py-24 font-sans antialiased text-slate-800">
      
      {/* Hero Header Section */}
      <div className="text-center mb-12">
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
          className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 mt-4 mb-3"
        >
          Frequently Asked Questions
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-base text-slate-500 max-w-md mx-auto"
        >
          Everything you need to know about Zuget — fast fashion, delivered in 30 minutes.
        </motion.p>
      </div>

      {/* Modern Search bar Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="relative mb-8 shadow-sm rounded-2xl group"
      >
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-slate-400 group-focus-within:text-[#793FDF] transition-colors" />
        </div>
        <input
          type="text"
          value={searchVal}
          onChange={(e) => startTransition(() => setSearchVal(e.target.value))}
          placeholder="Search questions, keywords, topic insights..."
          className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#793FDF]/20 focus:border-[#793FDF] text-sm transition-all shadow-sm"
        />
      </motion.div>

      {/* Dynamic Navigation Pills */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar scroll-smooth whitespace-nowrap"
      >
        {CATEGORIES.map((cat) => {
          const isActive = activeCat === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCat(cat.id);
                setOpenId(null);
              }}
              className={`text-xs font-semibold px-4 py-2 rounded-full border transition-all duration-200 relative ${
                isActive 
                  ? "bg-[#793FDF] text-white border-[#793FDF] shadow-md shadow-[#793FDF]/10" 
                  : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </motion.div>

      {/* Accordion Layout Grid */}
      <motion.div layout className="space-y-8">
        <AnimatePresence mode="popLayout">
          {Object.keys(groupedFaqs).length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12 px-4 bg-white border border-dashed border-slate-200 rounded-2xl"
            >
              <Frown className="w-8 h-8 text-slate-300 mx-auto mb-3" />
              <p className="text-sm font-medium text-slate-600">No matching questions found.</p>
              <p className="text-xs text-slate-400 mt-1">Try optimizing keywords or change filters.</p>
            </motion.div>
          ) : (
            Object.entries(groupedFaqs).map(([category, items]) => (
              <motion.div
                key={category}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-3"
              >
                {/* Section Header Title Mapping */}
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
                  {CAT_ICONS[category]}
                  <span>{category}</span>
                </div>

                {/* Sublist mapping */}
                <div className="space-y-2.5">
                  {items.map((faq, index) => {
                    const uniqueId = `${category}-${index}`;
                    const isOpen = openId === uniqueId;

                    return (
                      <motion.div
                        key={uniqueId}
                        layout
                        className={`border rounded-2xl transition-all duration-300 bg-white ${
                          isOpen 
                            ? "border-[#793FDF] ring-4 ring-[#793FDF]/5 shadow-sm" 
                            : "border-slate-100 hover:border-slate-200 hover:shadow-sm"
                        }`}
                      >
                        <button
                          onClick={() => setOpenId(isOpen ? null : uniqueId)}
                          className="w-full flex items-center justify-between text-left px-5 py-4 gap-4 focus:outline-none select-none"
                        >
                          <span className="text-[14px] font-semibold text-slate-800 leading-snug">
                            {highlightText(faq.q, searchVal)}
                          </span>
                          <span className={`w-7 h-7 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100 text-slate-500 transition-transform duration-300 ${isOpen ? "rotate-45 bg-purple-50 text-[#793FDF]" : ""}`}>
                            <Plus className="w-4 h-4" />
                          </span>
                        </button>

                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.24, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <div className="px-5 pb-5 pt-1 text-[14px] text-slate-500 leading-relaxed border-t border-slate-50 mt-1">
                                {highlightText(faq.a, searchVal)}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}