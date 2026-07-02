"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ModeToggle() {
  const pathname = usePathname();

  // Route checking
  const isCustomer = pathname.startsWith("/customer") || pathname === "/";
  const isPartner = pathname.startsWith("/seller");

  // Route visibility checking
  const isHiddenRoute = pathname === "/" || ['blog', 'privacy'].some(path => pathname.includes(path));
  if (isHiddenRoute) return null;

  const baseButtonClass = 
    "relative flex items-center justify-center gap-2 " +
    "px-3 py-2 md:px-5 md:py-2.5 " +
    "rounded-full text-xs md:text-sm font-semibold tracking-wide " +
    "transition-all duration-300 z-10 w-1/2 select-none active:scale-[0.97]";
  
  return (
    <div className="fixed bottom-6 md:bottom-5 left-1/2 -translate-x-1/2 z-50 w-full max-w-[280px] md:max-w-[340px] px-4 sm:px-0">
      
      {/* Glass container */}
      <div className="relative flex items-center bg-white/40 backdrop-blur-lg backdrop-saturate-150 p-1 rounded-full border border-white/60 shadow-[0_8px_32px_-6px_rgba(31,38,135,0.25),inset_0_1px_1px_rgba(255,255,255,0.6)]">
        
        {/* Sliding Background Indicator */}
        <div 
          className={`absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#6d28d9] shadow-[0_4px_16px_rgba(109,40,217,0.45)] ring-1 ring-white/20 transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] ${
            isPartner ? "translate-x-full" : "translate-x-0"
          }`}
        >
          {/* subtle inner sheen */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/25 to-transparent" />
        </div>

        {/* Customer Side Link */}
        <Link 
          href="/customer" 
          className={`${baseButtonClass} ${
            isCustomer ? "text-white drop-shadow-sm" : "text-zinc-900/80 hover:text-zinc-900"
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
        <span>Customer</span>
        </Link>

        {/* Partner Side Link */}
        <Link 
          href="/seller" 
          className={`${baseButtonClass} ${
            isPartner ? "text-white drop-shadow-sm" : "text-zinc-700/80 hover:text-zinc-900"
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72M6.75 18h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .414.336.75 0 .75z" />
          </svg>
          <span>Partner</span>
        </Link>
        
      </div>
    </div>
  );
}