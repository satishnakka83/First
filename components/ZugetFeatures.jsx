"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const FEATURES = [
  {
    id: "catalog",
    icon: "✨",
    title: "Vibrant Lookbook Engine",
    desc: "Deploy interactive fashion variants. Add color matrices, multi-size SKU parameters, and high-fidelity visuals in moments via a structured designer dashboard.",
    tag: "Visual Merchandising",
    size: "large",
    accent: "#ec4899",
    accentBg: "rgba(236,72,153,0.06)",
    demo: "upload"
  },
  {
    id: "orders",
    icon: "👠",
    title: "Hyperlocal Demand Routing",
    desc: "Connect instantly with local consumer search pools across your immediate perimeter. Seamless one-tap confirmation architecture.",
    tag: "Marketplace Flows",
    size: "small",
    accent: "#a855f7",
    accentBg: "rgba(168,85,247,0.06)",
    demo: "orders"
  },
  {
    id: "delivery",
    icon: "🧥",
    title: "White-Glove Logistic Network",
    desc: "Zuget specialized courier personnel interface directly with your physical store to process rapid customer dispatch workflows seamlessly.",
    tag: "Courier Pipelines",
    size: "small",
    accent: "#3b82f6",
    accentBg: "rgba(59,130,246,0.06)",
    demo: "delivery"
  },
  {
    id: "analytics",
    icon: "📊",
    title: "Real-time Demand Matrices",
    desc: "Monitor high-velocity trends, sizing popularity spikes, and physical store item availability charts instantly from a dynamic dashboard.",
    tag: "Data Infrastructure",
    size: "small",
    accent: "#f59e0b",
    accentBg: "rgba(245,158,11,0.06)",
    demo: "analytics"
  },
  {
    id: "payouts",
    icon: "💎",
    title: "Escrow & Instant Settlements",
    desc: "Automated corporate clearing channels securely distribute item sales revenue directly into verified partner store financial ledgers.",
    tag: "Fintech Systems",
    size: "small",
    accent: "#10b981",
    accentBg: "rgba(16,185,129,0.06)",
    demo: "payout"
  },
  {
    id: "local",
    icon: "🗺",
    title: "Dominating The Hyderabad Footprint",
    desc: "Maximize local community organic discovery pipelines over top target zones. Expand baseline regional visibility with zero upfront marketing allocations.",
    tag: "Regional Expansion",
    size: "large",
    accent: "#06b6d4",
    accentBg: "rgba(6,182,212,0.06)",
    demo: "map"
  },
];

function UploadDemo({ accent }) {
  const items = [
    { name: "Organza Saree", price: "₹4,899", variant: "Pastel Mint" },
    { name: "Slim Fit Blazer", price: "₹3,299", variant: "Midnight Ash" },
  ];
  return (
    <div className="flex flex-col gap-2 mt-4 w-full">
      {items.map((item, i) => (
        <div key={item.name} className="flex items-center justify-between rounded-xl px-4 py-3 bg-white/[0.02] border border-white/5 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-pink-500/10 flex items-center justify-center text-sm border border-pink-500/10">✨</div>
            <div className="flex flex-col">
              <span className="text-xs text-slate-200 font-semibold">{item.name}</span>
              <span className="text-[10px] text-slate-500 font-medium">{item.variant}</span>
            </div>
          </div>
          <span className="text-xs font-bold font-serif" style={{ color: accent }}>{item.price}</span>
        </div>
      ))}
    </div>
  );
}

function OrdersDemo() {
  return (
    <div className="flex gap-2.5 mt-5 w-full">
      {[
        { label: "Incoming", count: 4, color: "#ec4899" },
        { label: "In Packing", count: 2, color: "#a855f7" },
        { label: "Dispatched", count: 29, color: "#10b981" },
      ].map((o) => (
        <div key={o.label} className="flex-1 rounded-xl p-3 bg-white/[0.02] border border-white/5 text-center relative overflow-hidden">
          <div className="text-xl font-bold tracking-tight" style={{ color: o.color }}>{o.count}</div>
          <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">{o.label}</div>
        </div>
      ))}
    </div>
  );
}

function DeliveryDemo() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1) % 4), 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mt-4 flex flex-col gap-2 w-full bg-white/[0.01] border border-white/5 rounded-xl p-3">
      {["Manifest Generated", "Courier Assigned", "Product Collected", "Delivered Outbound"].map((s, i) => (
        <div key={s} className="flex items-center gap-3">
          <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold border transition-all duration-300 ${i <= step ? "bg-pink-500/20 border-pink-500/40 text-pink-400" : "bg-white/5 border-white/5 text-slate-700"}`}>
            {i <= step ? "✓" : ""}
          </div>
          <span className={`text-[11px] font-semibold tracking-wide transition-colors duration-300 ${i <= step ? "text-slate-300" : "text-slate-600"}`}>{s}</span>
        </div>
      ))}
    </div>
  );
}

function AnalyticsDemo({ accent }) {
  return (
    <div className="mt-5 w-full bg-white/[0.02] border border-white/5 rounded-xl p-3.5">
      <div className="flex justify-between items-end h-16 gap-2">
        {[30, 75, 45, 90, 55, 100, 65].map((h, i) => (
          <div key={i} className="flex-1 bg-white/5 rounded-sm h-full flex items-end overflow-hidden">
            <motion.div 
              initial={{ height: 0 }} 
              whileInView={{ height: `${h}%` }} 
              transition={{ duration: 0.6, delay: i * 0.04 }}
              className="w-full rounded-t-sm opacity-80" 
              style={{ background: i === 5 ? "#ec4899" : accent }} 
            />
          </div>
        ))}
      </div>
      <div className="text-[9px] font-bold text-slate-500 tracking-wider uppercase text-center mt-3 border-t border-white/5 pt-2">
        Weekly Volume Vector
      </div>
    </div>
  );
}

function PayoutDemo({ accent }) {
  return (
    <div className="mt-4 w-full rounded-xl bg-white/[0.02] border border-white/5 p-4">
      <div className="text-[9px] font-bold tracking-widest text-slate-500 uppercase mb-1">Cleared Earnings</div>
      <div className="text-2xl font-bold text-white font-serif tracking-tight">₹42,850</div>
      <div className="mt-3 h-1 rounded-full bg-white/5 overflow-hidden">
        <motion.div initial={{ width: 0 }} whileInView={{ width: "85%" }} transition={{ duration: 1 }} className="h-full rounded-full shadow-[0_0_8px_#10b981]" style={{ background: accent }} />
      </div>
    </div>
  );
}

function MapDemo() {
  return (
    <div className="relative mt-4 h-32 rounded-xl bg-gradient-to-b from-white/[0.02] to-transparent border border-white/5 overflow-hidden w-full">
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`, backgroundSize: "16px 16px" }} />
      {[
        { x: "25%", y: "35%" }, { x: "60%", y: "55%" }, { x: "80%", y: "25%" }, { x: "45%", y: "75%" }
      ].map((d, i) => (
        <div key={i} className="absolute w-2 h-2 rounded-full bg-pink-500 shadow-[0_0_10px_#ec4899]" style={{ left: d.x, top: d.y }}>
          <span className="absolute inset-0 rounded-full bg-pink-500/40 animate-ping" />
        </div>
      ))}
      <div className="absolute bottom-2.5 left-3 text-[10px] font-bold tracking-widest uppercase text-pink-400 bg-black/60 border border-white/5 px-2.5 py-0.5 rounded backdrop-blur-md">
        Active Node Map
      </div>
    </div>
  );
}

export default function ZugetFeatures() {
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true });

  return (
    <section className="bg-[#07060B] px-5 py-28 border-t border-white/5 relative">
      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div ref={headRef} className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-pink-400 mb-3"
          >
            Operational Framework
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-none"
            style={{ fontFamily: "'Syne',sans-serif" }}
          >
            Engineered Specially For <br />
            <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-300" style={{ fontFamily: "Georgia, serif" }}>
              Modern Retailing
            </span>
          </motion.h2>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              whileHover={{ y: -4, borderColor: "rgba(236,72,153,0.2)" }}
              className={`relative rounded-2xl border border-white/5 bg-[#0D0B16] overflow-hidden p-6 flex flex-col justify-between shadow-xl transition-all duration-300 ${f.size === "large" ? "md:col-span-2" : ""}`}
            >
              <div>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-4 border border-white/5 bg-white/[0.02] shadow-inner">
                  {f.icon}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest mb-1 inline-block" style={{ color: f.accent }}>
                  {f.tag}
                </span>
                <h3 className="text-base font-bold text-white mb-2 tracking-wide" style={{ fontFamily: "'Syne',sans-serif" }}>
                  {f.title}
                </h3>
                <p className="text-slate-400 text-xs sm:text-[13px] leading-relaxed opacity-80 font-medium">{f.desc}</p>
              </div>
              <div className="mt-4 w-full">
                {f.demo === "upload" && <UploadDemo accent={f.accent} />}
                {f.demo === "orders" && <OrdersDemo />}
                {f.demo === "delivery" && <DeliveryDemo />}
                {f.demo === "analytics" && <AnalyticsDemo accent={f.accent} />}
                {f.demo === "payout" && <PayoutDemo accent={f.accent} />}
                {f.demo === "map" && <MapDemo />}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}