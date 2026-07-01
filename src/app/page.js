// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 dark:bg-black">
//       <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={100}
//           height={20}
//           priority
//         />
//         <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
//           <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
//             To get started, edit the page.js file.
//           </h1>
//           <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
//             Looking for a starting point or more instructions? Head over to{" "}
//             <a
//               href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Templates
//             </a>{" "}
//             or the{" "}
//             <a
//               href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Learning
//             </a>{" "}
//             center.
//           </p>
//         </div>
//         <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
//           <a
//             className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={16}
//               height={16}
//             />
//             Deploy Now
//           </a>
//           <a
//             className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Documentation
//           </a>
//         </div>
//       </main>
//     </div>
//   );
// }
"use client";

import { useRef, useState } from 'react';
import Link from 'next/link';
export default function Home() {
  const customerVideoRef = useRef(null);
  const merchantVideoRef = useRef(null);

  // Tracks active state solely to trigger CSS classes smoothly
  const [activeSide, setActiveSide] = useState(null);

  // Keep track of internal play states to prevent async race conditions
  const playPromises = useRef({
    customer: null,
    merchant: null,
  });

  // Safe wrapper to play video and manage async browser locks
  const safePlay = (videoRef, side) => {
    const video = videoRef.current;
    if (!video) return;

    setActiveSide(side);
    
    // Only call play if it isn't already playing/trying to play
    if (!playPromises.current[side]) {
      const promise = video.play();
      if (promise !== undefined) {
        playPromises.current[side] = promise;
        promise
          .then(() => {
            playPromises.current[side] = null;
          })
          .catch((err) => {
            playPromises.current[side] = null;
            console.log(`Playback prevented for ${side}:`, err.message);
          });
      }
    }
  };

  // Safe wrapper to pause video, waiting for any pending play promises to resolve first
  const safePause = (videoRef, side) => {
    const video = videoRef.current;
    if (!video) return;

    const pendingPromise = playPromises.current[side];

    const executePause = () => {
      video.pause();
      video.currentTime = 0; // Reset cleanly to frame zero
    };

    if (pendingPromise) {
      // If a play attempt is running, wait until it finishes to execute pause safely
      pendingPromise.then(executePause).catch(executePause);
    } else {
      executePause();
    }
  };

  // Fixed mobile logic: First tap activates video, second tap navigates
  const handleMobileTouch = (
    e,
    videoRef,
    side,
    destination
  ) => {
    e.preventDefault(); // Stop instant link activation

    if (activeSide === side) {
      // Second tap -> navigate programmatically
      window.location.href = destination;
    } else {
      // Deactivate opposite side first
      const oppositeRef = side === 'customer' ? merchantVideoRef : customerVideoRef;
      const oppositeSide = side === 'customer' ? 'merchant' : 'customer';
      
      safePause(oppositeRef, oppositeSide);
      safePlay(videoRef, side);
    }
  };

  return (
    <div className="relative w-full h-[100dvh] max-h-[100dvh] flex flex-col md:flex-row overflow-hidden bg-black select-none antialiased touch-none">
      
      {/* Brand Logo */}
      {/* <div className="absolute top-4 md:top-10 left-1/2 -translate-x-1/2 z-40 text-center text-xl lg:text-7xl tracking-[0.25em] font-black w-full pointer-events-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] text-white/90">
        <h1>ZUGET</h1>
      </div> */}

      {/* Customer Side */}
      <Link
      href="/customer"
        onMouseEnter={() => safePlay(customerVideoRef, 'customer')}
        onMouseLeave={() => { safePause(customerVideoRef, 'customer'); setActiveSide(null); }}
        onTouchStart={(e) => handleMobileTouch(e, customerVideoRef, 'customer', '/customer')}
        className="relative w-full h-1/2 md:h-full md:w-1/2 group overflow-hidden block cursor-pointer border-b border-white/10 md:border-b-0 md:border-r touch-none"
      >
        
        <video
          ref={customerVideoRef}
          loop
          muted
          playsInline
          preload="auto"
          className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out scale-100 will-change-transform group-hover:scale-105 ${
            activeSide === 'customer' ? 'scale-105' : ''
          }`}
        >
          {/* CRITICAL FOR SLOW NETWORKS: Add high-performance WebM format */}
          <source src="/mp4/Shop.mp4" type="video/mp4" />
          <source src="/mp4/Shop.mp4" type="video/mp4" />
        </video>

        {/* Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/60 group-hover:from-black/95 group-hover:via-black/50 group-hover:to-black/70 transition-all duration-500 z-10 ${
          activeSide === 'customer' ? 'from-black/95 via-black/50 to-black/70' : ''
        }`} />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-center p-6 pt-12 md:p-8">
          <h2 className={`text-white text-2xl sm:text-3xl md:text-7xl font-black uppercase tracking-widest mb-1 md:mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] transition-transform duration-500 group-hover:scale-[1.02] ${
            activeSide === 'customer' ? 'scale-[1.02]' : ''
          }`}>
            Customer
          </h2>
          <p className="text-zinc-300/90 text-[10px] md:text-xl font-medium tracking-[0.2em] uppercase mb-4 md:mb-8 max-w-xs md:max-w-md">
            Curated Fast Fashion
          </p>
          
          <span className={`px-5 py-2 md:px-8 md:py-3.5 border border-white/80 text-white font-bold uppercase tracking-[0.2em] text-[10px] md:text-sm transition-all duration-300 rounded-none backdrop-blur-sm group-hover:bg-white group-hover:text-black group-hover:scale-105 bg-white/10 md:border-2 md:bg-transparent ${
            activeSide === 'customer' ? '!bg-white !text-black scale-105 border-white' : ''
          }`}>
            Shop Now
          </span>

          <span className="mt-3 text-[9px] tracking-[0.25em] uppercase text-zinc-400/80 font-semibold md:hidden">
            {activeSide === 'customer' ? 'Tap again to Enter' : 'Tap to View'}
          </span>
        </div>
      </Link>

      {/* Merchant Side */}
      <Link
      href="/seller"
        onMouseEnter={() => safePlay(merchantVideoRef, 'merchant')}
        onMouseLeave={() => { safePause(merchantVideoRef, 'merchant'); setActiveSide(null); }}
        onTouchStart={(e) => handleMobileTouch(e, merchantVideoRef, 'merchant', '/seller')}
        className="relative w-full h-1/2 md:h-full md:w-1/2 group overflow-hidden block cursor-pointer touch-none"
      >
        <video
          ref={merchantVideoRef}
          loop
          muted
          playsInline
          preload="auto"
          className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out scale-100 will-change-transform group-hover:scale-105 ${
            activeSide === 'merchant' ? 'scale-105' : ''
          }`}
        >
          <source src="/mp4/Sell.mp4" type="video/mp4" />
          <source src="/mp4/Sell.mp4" type="video/mp4" />
        </video>

        {/* Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/60 group-hover:from-black/90 group-hover:via-black/50 group-hover:to-black/70 transition-all duration-700 z-10 ${
          activeSide === 'merchant' ? 'from-black/90 via-black/50 to-black/70' : ''
        }`} />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-center p-6 pt-12 md:p-8">
          <h2 className={`text-white text-2xl sm:text-3xl md:text-7xl font-black uppercase tracking-widest mb-1 md:mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] transition-transform duration-500 group-hover:scale-[1.02] ${
            activeSide === 'merchant' ? 'scale-[1.02]' : ''
          }`}>
            Merchant
          </h2>
          <p className="text-zinc-300/90 text-[10px] md:text-xl font-medium tracking-[0.2em] uppercase mb-4 md:mb-8 max-w-xs md:max-w-md">
            Scale Your Brand
          </p>
          
          <span className={`px-5 py-2 md:px-8 md:py-3.5 border border-white/80 text-white font-bold uppercase tracking-[0.2em] text-[10px] md:text-sm transition-all duration-300 rounded-none backdrop-blur-sm group-hover:bg-white group-hover:text-black group-hover:scale-105 bg-white/10 md:border-2 md:bg-transparent ${
            activeSide === 'merchant' ? '!bg-white !text-black scale-105 border-white' : ''
          }`}>
            Start Selling
          </span>

          <span className="mt-3 text-[9px] tracking-[0.25em] uppercase text-zinc-400/80 font-semibold md:hidden">
            {activeSide === 'merchant' ? 'Tap again to Enter' : 'Tap to View'}
          </span>
        </div>
      </Link>
    </div>
  );
}