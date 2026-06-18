// // "use client"

// // import React, { useEffect, useState } from 'react';

// // const Items = (props) => {
// //     const [list,setList] = useState([])
// //     useEffect(() => {
// //         const myHeaders = new Headers();
// //         myHeaders.append("accept", "application/json");

// //         const requestOptions = {
// //             method: "GET",
// //             headers: myHeaders,
// //             redirect: "follow"
// //         };

// //         fetch("http://dev.zuget.com/site/item-details?gender=Men&item_name=Shirt&limit=12&offset=0", requestOptions)
// //             .then((response) => response.json())
// //             .then((result) => setList(result.data.items))
// //             .catch((error) => console.error(error));
// //     }, [])
// //     console.log(list,'pppppp');
    
// //     return (
// //         <div className='bg-gray-200 text-black'>
// //             <ul>
// //                 {list?.map((item,index)=>(
// //                     <div>{item?.item_name}</div>
// //                 ))}
// //             </ul>
// //         </div>
// //     );
// // };

// // export default Items;

// // app/sell-with-zuget/page.jsx
// // Drop this in your Next.js app directory

// import ZugetHero from "@/components/ZugetHero";
// import ZugetFeatures from "@/components/ZugetFeatures";
// import ZugetWhoIsItFor from "@/components/ZugetWhoIsItFor";

// // export const metadata = {
//   title: "Sell With Zuget — Zuget Partner",
//   description:
//     "Zuget Partner helps fashion stores, boutiques, and apparel retailers take their business online. Upload products, manage orders, and deliver to local customers.",
// };

// export default function SellWithZugetPage() {
//   return (
//     <main>
//       <ZugetHero />
//       <ZugetFeatures />
//       <ZugetWhoIsItFor />
//     </main>
//   );
// }
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

export default function ZugetPartnerLanding() {
  const [wordIdx, setWordIdx] = useState(0);
  const containerRef = useRef(null);
  
  const rotatingWords = ["Fashion Stores", "Boutiques", "Apparel Retailers", "Designer Studios"];

  // Smooth background parallax scroll effects
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const bgParallax = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const fadeHero = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  useEffect(() => {
    const id = setInterval(() => setWordIdx((i) => (i + 1) % rotatingWords.length), 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#06050A] text-white overflow-hidden selection:bg-pink-500/30">
      
      {/* ── HIGH FASHION BACKGROUND AMBIENCE ── */}
      <motion.div style={{ y: bgParallax }} className="absolute inset-0 pointer-events-none z-0">
        {/* Silk Sheen Glow Effects */}
        <div className="absolute top-[-10%] left-[-10%] w-[100vw] h-[100vh] opacity-30 mix-blend-screen bg-[radial-gradient(circle_at_20%_30%,rgba(236,72,153,0.15)_0%,transparent_50%)]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[100vw] h-[100vh] opacity-25 mix-blend-screen bg-[radial-gradient(circle_at_80%_70%,rgba(139,92,246,0.12)_0%,transparent_50%)]" />
        
        {/* Editorial Grid overlay to feel like a modern digital lookbook */}
        <div className="absolute inset-0 opacity-[0.03]" 
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px"
          }}
        />
      </motion.div>

      {/* Decorative Lookbook Details */}
      <div className="absolute top-8 left-8 hidden lg:block text-[9px] uppercase tracking-[0.3em] text-slate-500 font-medium select-none z-10">
        Zuget Ecosystem // Editorial Edition '26
      </div>

      {/* ── HERO RUNWAY SECTION ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center z-10 max-w-5xl mx-auto">
        <motion.div style={{ opacity: fadeHero }} className="flex flex-col items-center">
          {/* Badge Label */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-pink-500/20 bg-pink-500/5 text-pink-300 text-[10px] font-bold tracking-[0.2em] uppercase backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
              Live In Hyderabad
            </span>
          </motion.div>

          {/* Editorial Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight leading-[1.05] mb-6"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Sell With <br />
            <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-200" style={{ fontFamily: "Georgia, serif" }}>
              Zuget Partner
            </span>
          </motion.h1>

          {/* Subtitle Loop */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="flex items-center justify-center gap-2 text-lg sm:text-2xl text-slate-400 mb-8">
            <span className="font-light">Take your business online. Built for</span>
            <div className="relative overflow-hidden h-8 w-44 sm:w-56 border-b border-pink-500/30 pb-1">
              <AnimatePresence mode="wait">
                <motion.span
                  key={wordIdx}
                  initial={{ y: 15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -15, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-x-0 text-pink-400 font-semibold tracking-wide"
                >
                  {rotatingWords[wordIdx]}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="max-w-xl text-slate-400 text-sm sm:text-base leading-relaxed mb-10 font-medium">
            Zuget Partner helps fashion stores, boutiques, and apparel retailers take their business online. Upload products, manage orders, and deliver items smoothly with Zuget's professional network.
          </motion.p>

          {/* Action CTAs */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <motion.button whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto px-10 py-4 rounded-xl text-xs uppercase tracking-widest font-bold text-white shadow-xl transition-all" style={{ background: "linear-gradient(135deg, #ec4899, #8b5cf6)" }}>
              Register Your Store
            </motion.button>
            <motion.button whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto px-10 py-4 rounded-xl text-xs uppercase tracking-widest font-bold text-slate-300 border border-white/10 bg-white/5 backdrop-blur-md">
              Learn More
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* ── FEATURES GRID ── */}
      <section className="relative px-6 py-24 z-10 max-w-5xl mx-auto border-t border-white/5">
        <div className="text-center mb-16">
          <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-pink-400 mb-2">Ecosystem Benefits</span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>Why Use Zuget Partner?</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: "📸", title: "Easy Catalog Upload", desc: "Add product photos, sizes, colors, and pricing in seconds. Manage your digital inventory from one simple dashboard." },
            { icon: "🛍", title: "Local Customer Orders", desc: "Customers in your area can discover your store and place orders. Accept, pack, and prepare items for delivery." },
            { icon: "🚚", title: "Delivery Partner Support", desc: "Zuget delivery partners pick up items from your store and deliver them to customers. Track delivery progress live in the app." },
            { icon: "📊", title: "Order & Store Management", desc: "View active orders, order history, manage product availability, and track business performance—all in one place." },
            { icon: "💰", title: "Transparent Payouts", desc: "Receive secure and timely payouts directly to your bank account. View your earnings and settlement history anytime." },
            { icon: "📍", title: "Grow Locally", desc: "Reach local shoppers searching for fashion items near them and grow your business without spending on marketing (Live in Hyderabad)." }
          ].map((feat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              whileHover={{ y: -5, borderColor: "rgba(236,72,153,0.2)" }}
              className="p-6 rounded-2xl border border-white/5 bg-[#0D0B14] shadow-xl transition-all duration-300 flex flex-col items-start"
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-4 bg-white/[0.02] border border-white/5 shadow-inner">
                {feat.icon}
              </div>
              <h3 className="text-base font-bold text-white mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>{feat.title}</h3>
              <p className="text-slate-400 text-xs sm:text-[13px] leading-relaxed font-medium opacity-80">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── TARGET ROLES SEGMENT ── */}
      <section className="relative px-6 py-24 z-10 max-w-5xl mx-auto border-t border-white/5">
        <div className="text-center mb-12">
          <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-pink-400 mb-2">Platform Fit</span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>Who Is It For?</h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Men's & Kids' Clothing Stores" },
            { label: "Boutiques & Designer Studios" },
            { label: "Footwear & Accessories Shops" },
            { label: "Local Fashion Retailers" }
          ].map((role, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="p-5 rounded-xl border border-white/5 bg-[#0A0910] text-center shadow-lg flex items-center justify-center"
            >
              <p className="text-xs sm:text-sm font-bold text-slate-200 tracking-wide">{role.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CLOSING LOOKBOOK HERO BANNER ── */}
      <section className="relative px-6 pb-24 z-10 max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="relative rounded-3xl overflow-hidden border border-pink-500/10 p-8 sm:p-16 text-center shadow-2xl bg-gradient-to-b from-[#0F0C1B] to-[#07060B]"
        >
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.08),transparent_70%)]" />

          <div className="relative z-10">
            <div className="text-3xl mb-4">✨</div>
            <h2 className="text-3xl sm:text-5xl font-bold mb-4 tracking-tight leading-none" style={{ fontFamily: "'Syne', sans-serif" }}>
              Digitize your fashion store <br />
              <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300" style={{ fontFamily: "Georgia, serif" }}>
                and grow with Zuget Partner.
              </span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto mb-8 font-medium opacity-80 leading-relaxed">
              Convert your physical fashion store inventory into live local online sales effortlessly with zero upfront overhead.
            </p>

            <motion.button
              whileHover={{ scale: 1.02, y: -2, boxShadow: "0 15px 30px -10px rgba(236,72,153,0.4)" }} whileTap={{ scale: 0.98 }}
              className="px-10 py-4 rounded-xl text-xs uppercase tracking-widest font-bold text-white transition-all shadow-xl"
              style={{ background: "linear-gradient(135deg, #ec4899, #8b5cf6)" }}
            >
              Get Started Free →
            </motion.button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
