"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const STEPS = [
  {
    step: "01",
    title: "Register",
    headline: "Create your seller account",
    desc: "Fill in your shop details, upload your store logo, and complete onboarding requirements to get verified instantly.",
    bullets: ["Business name & address", "Bank account for payouts"],
    image: "/stepstosell/1.webp",
    accent: "#793FDF",
    lightAccent: "#ede9fb",
    icon: "✦",
  },
  {
    step: "02",
    title: "List Your Clothes",
    headline: "Upload your clothing catalogue",
    desc: "Add your products — dresses, kurtas, jackets, anything you sell. Set sizes, prices, and stock with our easy-to-use dashboard.",
    bullets: ["Product photos & descriptions", "Size & inventory setup"],
    image: "/stepstosell/2.webp",
    accent: "#C026D3",
    lightAccent: "#fce7ff",
    icon: "◈",
  },
  {
    step: "03",
    title: "Earn",
    headline: "Get paid on time, every time",
    desc: "When a customer orders your clothes, you earn. Zuget processes secure payments directly to your account without delays.",
    bullets: ["Transparent payment cycle", "Auto settlement to bank"],
    image: "/stepstosell/3.webp",
    accent: "#0EA5E9",
    lightAccent: "#e0f2fe",
    icon: "❋",
  },
  {
    step: "04",
    title: "Grow",
    headline: "Scale your clothing business",
    desc: "Get tailored support, promotional tools, and deep analytics to understand your customers and grow your store.",
    bullets: ["Seller analytics & insights", "Promotional campaigns"],
    image: "/stepstosell/4.webp",
    accent: "#10B981",
    lightAccent: "#d1fae5",
    icon: "⬡",
  },
];

/* ── Single Step Card ── */
function StepCard({ step, index }) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative grid md:grid-cols-2 gap-8 md:gap-0 mb-32 last:mb-0 items-center"
    >
      {/* ── Step number watermark ── */}
      <span
        className="absolute select-none pointer-events-none font-black text-[18vw] leading-none text-slate-900 opacity-[0.03]"
        style={{
          top: "-5%",
          left: isEven ? "-2%" : "auto",
          right: isEven ? "auto" : "-2%",
          zIndex: 0,
        }}
      >
        {step.step}
      </span>

      {/* ── Image side ── */}
      <div
        className={`relative ${isEven ? "md:order-2" : "md:order-1"} flex justify-center items-center`}
        style={{ zIndex: 1 }}
      >
        <div
          className="relative w-[300px] h-[340px] sm:w-[380px] sm:h-[420px] flex justify-center items-center"
        >
          <Image
            src={step.image}
            alt={step.title}
            fill
            sizes="(max-width: 768px) 300px, 380px"
            // Changed to object-contain to prevent cropping, kept rounded-3xl here so the visible edges are round
            className="object-contain rounded-3xl"
          />
        </div>
      </div>

      {/* ── Content side ── */}
      <div
        className={`relative ${isEven ? "md:order-1 md:pr-16" : "md:order-2 md:pl-16"} pt-8 md:pt-0 pl-6 md:pl-0`}
        style={{ zIndex: 1 }}
      >
        {/* Step label */}
        <div className="flex items-center gap-3 mb-6">
          <span
            className="text-xs font-black tracking-[0.2em] uppercase px-4 py-1.5 rounded-full"
            style={{ background: step.lightAccent, color: step.accent }}
          >
            Step {step.step}
          </span>
          <span className="h-px flex-1 max-w-[48px]" style={{ background: step.accent, opacity: 0.3 }} />
        </div>

        {/* Headline */}
        <h3 className="text-4xl md:text-5xl font-black leading-tight mb-5 text-slate-900 tracking-tight">
          {step.headline}
        </h3>

        {/* Description */}
        <p className="text-slate-500 leading-relaxed mb-8 text-base md:text-lg">
          {step.desc}
        </p>

        {/* Bullets */}
        <div className="flex flex-col gap-4">
          {step.bullets.map((bullet, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <span
                className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-white text-xs font-bold shadow-sm"
                style={{ background: step.accent }}
              >
                ✓
              </span>
              <span className="text-slate-700 font-semibold text-sm">
                {bullet}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main Component ── */
export default function ZugetSellingStepsTimeline() {
  return (
    <section className="relative overflow-hidden py-10 md:py-32 bg-slate-50 ">
      
      {/* Super lightweight CSS grid background instead of heavy SVG noise */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" 
        style={{ 
          backgroundImage: 'linear-gradient(to right, #000000 1px, transparent 1px), linear-gradient(to bottom, #000000 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }} 
      />

      <div className="relative max-w-6xl mx-auto px-5 md:px-8 z-10">

        {/* ── HEADER ── */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24 md:mb-32 max-w-3xl mx-auto"
        >
          {/* Pill badge */}
          <div
            className="inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full text-sm font-bold tracking-widest uppercase bg-[#ede9fb] text-[#793FDF]"
          >
            <span>✦</span>
            Seamless Onboarding
          </div>

          {/* Big headline */}
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] mb-8 text-slate-900 tracking-tight">
            Start Selling on <br className="hidden sm:block" />
            <span className="text-[#793FDF]">Zuget Today</span>
          </h2>

          <p className="text-slate-600 text-lg md:text-xl leading-relaxed">
            Launch your digital clothing store in <span className="font-bold text-slate-900">4 simple steps.</span> We handle the technicalities, so you can focus entirely on fashion.
          </p>
        </motion.div>

        {/* ── STEPS ── */}
        <div className="relative">
          {STEPS.map((step, index) => (
            <StepCard key={step.step} step={step} index={index} />
          ))}
        </div>

        {/* ── CTA FOOTER ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 text-center"
        >
          <button
            className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl text-white font-bold text-lg shadow-xl hover:-translate-y-1 transition-transform duration-300 active:translate-y-0"
            style={{
              background: "linear-gradient(135deg, #793FDF, #9333ea)",
              boxShadow: "0 10px 30px -10px rgba(121,63,223,0.5)",
            }}
          >
            <span>Start Selling Now</span>
            <span className="text-xl leading-none">→</span>
          </button>

          <p className="mt-5 text-slate-500 font-medium text-sm">
            No listing fees · Get started in minutes
          </p>
        </motion.div>

      </div>
    </section>
  );
}