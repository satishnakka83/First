"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ModeToggle() {
  const pathname = usePathname();

  // Route checking (assigns home page cleanly to customer side)
  const isCustomer = pathname.startsWith("/customer") || pathname === "/";
  const ispartner = pathname.startsWith("/owner");

  // Tailored base classes: smaller paddings/text on mobile, restored on desktop (md:)
  const baseButtonClass = 
    "flex items-center justify-center gap-1.5 md:gap-2 " +
    "px-3 py-1.5 md:px-6 md:py-2.5 " +
    "rounded-full text-xs md:text-sm font-medium " +
    "transition-all duration-300 z-10 w-1/2 select-none";
  
  return (
    /* Responsive wrapper: narrower width limit on mobile to keep it tight and sleek */
    <div className="fixed bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-[260px] md:max-w-[340px] px-4 sm:px-0">
      
      {/* Container with a slightly tighter padding block on mobile */}
      <div className="relative flex items-center bg-white p-0.5 md:p-1 rounded-full border border-zinc-200 shadow-[0_8px_30px_rgba(0,0,0,0.15)] backdrop-blur-md">
        
        {/* Sliding Background Indicator */}
        <div 
          className={`absolute top-0.5 bottom-0.5 left-0.5 md:top-1 md:bottom-1 md:left-1 w-[calc(50%-2px)] md:w-[calc(50%-4px)] bg-[#793fdf] rounded-full transition-transform duration-300 ease-out ${
            ispartner ? "translate-x-full" : "translate-x-0"
          }`}
        />

        {/* Customer Button */}
        <Link 
          href="/customer" 
          className={`${baseButtonClass} ${
            isCustomer ? "text-white font-semibold" : "text-slate-800 hover:text-black"
          }`}
        >
          <span className="text-sm md:text-base">🛍️</span>
          <span>Customer</span>
        </Link>

        {/* partner Button */}
        <Link 
          href="/owner" 
          className={`${baseButtonClass} ${
            ispartner ? "text-white font-semibold" : "text-slate-800 hover:text-black"
          }`}
        >
          <span className="text-sm md:text-base">🤝</span>
          <span>partner</span>
        </Link>
        
      </div>
    </div>
  );
}