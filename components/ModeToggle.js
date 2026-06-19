"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ModeToggle() {
  const pathname = usePathname();

  // Dynamic route checking
  const isCustomer = pathname.startsWith("/customer");
  const isOwner = pathname.startsWith("/owner");

  const baseButtonClass = "flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 z-10 w-1/2 select-none";
  
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-[340px] px-4 sm:px-0">
      <div className="relative flex items-center bg-white p-1 rounded-full border border-zinc-200 shadow-[0_8px_30px_rgba(0,0,0,0.15)] backdrop-blur-md">
        
        {/* Sliding Background Indicator */}
        <div 
          className={`absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] bg-[#793fdf] rounded-full transition-transform duration-300 ease-out ${
            isOwner ? "translate-x-full" : "translate-x-0"
          }`}
        />

        {/* Customer Button */}
        <Link 
          href="/customer" 
          className={`${baseButtonClass} ${
            isCustomer ? "text-white font-semibold" : "text-zinc-700 hover:text-black"
          }`}
        >
          <span className="text-base">🛍️</span>
          <span>Customer</span>
        </Link>

        {/* Owner Button */}
        <Link 
          href="/owner" 
          className={`${baseButtonClass} ${
            isOwner ? "text-white font-semibold" : "text-zinc-700 hover:text-black"
          }`}
        >
          <span className="text-base">🤝</span>
          <span>Owner</span>
        </Link>
        
      </div>
    </div>
  );
}