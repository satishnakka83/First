"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const MARQUEE_ITEMS = [
  "Free same-day delivery",
  "Virtual try-on",
  "Hyderabad's fashion hub",
  "500+ local stores",
  "Instant returns",
  "New arrivals daily",
  "Exclusive drops",
  "Style your city",
];

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Zuget Partner", href: "/#partner" },
  { label: "Customer App", href: "/#customer" },
  { label: "About Us", href: "/about-us" },
];

function MarqueeStrip() {
  const MARQUEE_ITEMS = [
  "Free same-day delivery",
  "Virtual try-on",
  "Hyderabad's fashion hub",
  "500+ local stores",
  "Instant returns",
  "New arrivals daily",
  "Exclusive drops",
  "Style your city",
];
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="relative overflow-hidden border-y border-slate-200 py-3 bg-white/50 backdrop-blur-sm z-10">
      {/* Injecting keyframes cleanly with standard inline styles */}
      <style>{`
        @keyframes customMarquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
      
      <div 
        className="flex whitespace-nowrap"
        style={{
          animation: "customMarquee 25s linear infinite"
        }}
      >
        {items.map((text, i) => (
          <span
            key={i}
            className="mx-6 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-[#793FDF]/80"
          >
            <span className="h-[4px] w-[4px] rounded-full bg-[#793FDF]" />
            {text}
          </span>
        ))}
      </div>
      {/* Light theme fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-slate-50 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-slate-50 to-transparent z-10" />
    </div>
  );
}

function AnimatedCounter({ end, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const duration = 1400;
          const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) requestAnimationFrame(step);
            else setCount(end);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

const STATS = [
  { value: 500, suffix: "+", label: "Local Stores" },
  { value: 45, suffix: "min", label: "Avg Delivery" },
  { value: 12, suffix: "k+", label: "Happy Shoppers" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-slate-50 text-slate-700 ">
      
      {/* Trendy Light Background Elements */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none z-0" 
        style={{ 
          backgroundImage: 'radial-gradient(#000000 1.5px, transparent 1.5px)', 
          backgroundSize: '24px 24px' 
        }} 
      />

      {/* Ambient glow blobs */}
      <div className="pointer-events-none absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-[#793FDF]/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-[#793FDF]/10 blur-[100px]" />

      {/* Top marquee */}
      <MarqueeStrip />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
        
        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 grid grid-cols-3 divide-x divide-slate-100 border border-slate-200 bg-white shadow-sm rounded-2xl overflow-hidden"
        >
          {STATS.map((s) => (
            <div
              key={s.label}
              className="group flex flex-col items-center gap-1 px-4 py-8 transition-colors hover:bg-slate-50"
            >
              <span className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
                <AnimatedCounter end={s.value} suffix={s.suffix} />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 transition-colors group-hover:text-[#793FDF]">
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Main grid */}
        <div className="grid gap-12 lg:grid-cols-[1.8fr_1fr_1fr]">
          
          {/* Brand */}
          <div className="space-y-5">
            <div className="flex items-start gap-2">
              <span className="text-[2.8rem] sm:text-[3.5rem] font-black leading-none tracking-tighter text-slate-900">
                Zuget
              </span>
              
            </div>
            <p className="max-w-sm text-[15px] leading-relaxed text-slate-500 font-medium">
              Hyperlocal fashion for stores and shoppers across Hyderabad. Partner with us to sell online — or shop with instant delivery and virtual try-on.
            </p>
            <div className="flex items-center gap-2 text-sm font-semibold mt-4">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#793FDF] opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#793FDF]" />
              </span>
              <span className="text-[#793FDF]">Live in Hyderabad · Delivering now</span>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="mb-6 text-[11px] font-bold uppercase tracking-[0.25em] text-slate-400">
              Explore
            </h3>
            <ul className="space-y-2">
              {LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="group flex items-center gap-2 py-1.5 text-[15px] font-medium text-slate-600 transition-all duration-200 hover:translate-x-1 hover:text-[#793FDF]"
                  >
                    <span className="h-px w-0 bg-[#793FDF] transition-all duration-200 group-hover:w-4" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-6 text-[11px] font-bold uppercase tracking-[0.25em] text-slate-400">
              Contact
            </h3>
            <div className="space-y-4">
              <a
                href="tel:+919111911162"
                className="group flex items-start gap-3 text-[15px] font-medium transition-colors hover:text-[#793FDF]"
              >
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-[#793FDF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                <span className="text-slate-600 transition-colors group-hover:text-[#793FDF]">+91 9111 911 162</span>
              </a>
              <a
                href="mailto:support@zuget.in"
                className="group flex items-start gap-3 text-[15px] font-medium transition-colors"
              >
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-[#793FDF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <span className="text-slate-600 transition-colors group-hover:text-[#793FDF]">support@zuget.in</span>
              </a>
              <div className="flex items-start gap-3 text-[15px] font-medium">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-[#793FDF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span className="text-slate-500">Hyderabad, Telangana</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 sm:flex-row">
          <p className="text-[13px] font-medium text-slate-500">
            © {new Date().getFullYear()} Zuget · Built for hyperlocal fashion
          </p>
          <div className="flex items-center gap-2 text-[13px] font-semibold text-slate-500 bg-white px-4 py-1.5 rounded-full shadow-sm border border-slate-100">
            <span className="h-1.5 w-1.5 rounded-full bg-[#793FDF]" />
            <span>Fashion · Fast · Hyderabad</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 28s linear infinite;
        }
      `}</style>
    </footer>
  );
}