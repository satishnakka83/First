"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const STORE_TYPES = [
  {
    id: "womens",
    emoji: "👑",
    label: "Women's Couture & Ethnic",
    desc: "Sarees, bridal lehengas, fusion ensembles, luxury kurtas—display complete seasonal collections with intelligent variation profiles.",
    tags: ["Designer Sarees", "Anarkalis", "Western Pret", "Lehengas"],
    accent: "#ec4899",
    bg: "rgba(236,72,153,0.05)",
    border: "rgba(236,72,153,0.25)",
  },
  {
    id: "mens",
    emoji: "👔",
    label: "Men's Luxury & Casuals",
    desc: "Bespoke shirts, wedding sherwanis, structured trousers, premium denim. Capture regional style demand vectors rapidly.",
    tags: ["Sherwanis", "Tailored Suits", "Luxury Linens", "Pret"],
    accent: "#3b82f6",
    bg: "rgba(59,130,246,0.05)",
    border: "rgba(59,130,246,0.25)",
  },
  {
    id: "boutique",
    emoji: "✂️",
    label: "Independent Atelier Studios",
    desc: "Exhibit custom patterns, specialized stitch operations, and small-batch designer releases to high-intent local buyers.",
    tags: ["Custom Tailoring", "Handloom", "Exclusive Drops", "Bridal Wear"],
    accent: "#a855f7",
    bg: "rgba(168,85,247,0.05)",
    border: "rgba(168,85,247,0.25)",
  },
];

function StoreCard({ store, index, active, onClick }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      onClick={onClick}
      whileHover={{ y: -4 }}
      className="relative rounded-2xl border cursor-pointer p-6 transition-all duration-300 select-none bg-[#0D0B14]"
      style={{
        backgroundColor: active ? store.bg : "#0A0910",
        borderColor: active ? store.border : "rgba(255,255,255,0.04)",
        boxShadow: active ? `0 15px 35px -15px ${store.accent}40` : "none",
      }}
    >
      <div className="flex items-start gap-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 border shadow-inner transition-all duration-300"
          style={{
            background: "rgba(255,255,255,0.02)",
            borderColor: active ? store.border : "rgba(255,255,255,0.06)",
          }}
        >
          {store.emoji}
        </div>
        <div className="flex-1 min-w-0 mt-0.5">
          <h3 className="text-sm font-bold text-white mb-1 tracking-wide">{store.label}</h3>
          <p className="text-[12px] text-slate-400 opacity-80 leading-relaxed font-medium">{store.desc}</p>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {active && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-white/5">
              {store.tags.map((t) => (
                <span
                  key={t}
                  className="text-[10px] font-bold tracking-wider px-3 py-1 rounded-full uppercase"
                  style={{ background: "rgba(0,0,0,0.3)", color: store.accent, border: `1px solid ${store.border}` }}
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ZugetWhoIsItFor() {
  const [active, setActive] = useState(0);
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true });

  return (
    <>
      <section className="bg-[#07060B] px-5 py-28 border-t border-white/5">
        <div className="max-w-5xl mx-auto">

          <div ref={headRef} className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={headInView ? { opacity: 1, y: 0 } : {}}
              className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-pink-400 mb-3"
            >
              Target Matrix
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={headInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-5xl font-bold text-white tracking-tight"
              style={{ fontFamily: "'Syne',sans-serif" }}
            >
              Who Is Zuget Partner <br />
              <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400" style={{ fontFamily: "Georgia, serif" }}>
                Designed For?
              </span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {STORE_TYPES.map((s, i) => (
              <StoreCard
                key={s.id}
                store={s}
                index={i}
                active={active === i}
                onClick={() => setActive(active === i ? -1 : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Luxury Lookbook Final Call-To-Action Banner */}
      <section className="bg-[#07060B] px-5 pb-28">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl overflow-hidden border border-pink-500/10 p-8 sm:p-20 text-center shadow-2xl bg-[#0F0C1B]"
          >
            {/* Soft Ambient Core Glow */}
            <div className="absolute inset-0 pointer-events-none z-0">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-pink-500/10 blur-[100px]" />
            </div>

            <div className="relative z-10">
              <div className="text-4xl mb-6">💎</div>
              <h2
                className="text-3xl sm:text-5xl font-bold text-white mb-5 tracking-tight leading-none"
                style={{ fontFamily: "'Syne',sans-serif" }}
              >
                Digitize your fashion house <br />
                <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-200" style={{ fontFamily: "Georgia, serif" }}>
                  Seamlessly. For free.
                </span>
              </h2>
              <p className="text-slate-400 text-xs sm:text-base max-w-md mx-auto mb-10 font-medium opacity-80 leading-relaxed">
                Onboard into the Zuget Partner node ecosystem to surface inventory directly to style buyers in Hyderabad. Zero ongoing platform premiums.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-sm mx-auto sm:max-w-none">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2, boxShadow: "0 15px 30px -10px rgba(236,72,153,0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto px-10 py-4 rounded-xl text-xs uppercase tracking-widest font-bold text-white shadow-xl transition-all duration-200"
                  style={{ background: "linear-gradient(135deg, #ec4899, #8b5cf6)" }}
                >
                  Register Storefront
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02, y: -2, backgroundColor: "rgba(255,255,255,0.06)" }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto px-10 py-4 rounded-xl text-xs uppercase tracking-widest font-bold text-slate-400 border border-white/5 bg-white/[0.02] backdrop-blur-md transition-all duration-200"
                >
                  Consult Executive Team
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}