import Image from 'next/image';
import Link from 'next/link';

export default function TwoImages() {
  return (
    <div className="relative w-full h-screen flex flex-col md:flex-row overflow-hidden bg-black">
      
      {/* Optional Central Brand Logo (Overlays exactly in the middle like Dior) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none text-center">
        <h1 className="text-white text-4xl md:text-7xl font-serif bg-bla tracking-widest drop-shadow-lg mix-blend-overlay">
          ZUGET
        </h1>
      </div>

      {/* Left Side - SHOP */}
      <Link 
        href="/customer" 
        className="relative w-full h-1/2 md:h-full md:w-1/2 group overflow-hidden block"
      >
        <Image
          src="/Shop.webp" // Place your image in the public folder
          alt="Shop fast fashion"
          fill
          className="object-cover object-center transition-transform duration-[1500ms] ease-out group-hover:scale-105"
          priority
        />
        
        {/* Uniform slight black overlay for text readability & hover effect */}
        <div className="absolute inset-0 bg-black/40 transition-opacity duration-700 group-hover:bg-black/60 z-0" />

        {/* Centered Call to Action */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 transition-transform duration-500 scale-95 group-hover:scale-100">
          <h2 className="text-white text-3xl md:text-4xl font-light tracking-wider mb-4 drop-shadow-lg">
            Fast Fashion
          </h2>
          <span className="text-white text-sm tracking-[0.2em] uppercase border-b border-white/30 pb-1 transition-colors duration-500 group-hover:border-white">
            Shop now
          </span>
        </div>
      </Link>

      {/* Right Side - SELL */}
      <Link 
        href="/owner" 
        className="relative w-full h-1/2 md:h-full md:w-1/2 group overflow-hidden block"
      >
        <Image
          src="/Sell.webp" 
          alt="Sell on Zuget platform"
          fill
          className="object-cover object-center transition-transform duration-[1500ms] ease-out group-hover:scale-105"
          priority
        />

        {/* Uniform slight black overlay for text readability & hover effect */}
        <div className="absolute inset-0 bg-black/40 transition-opacity duration-700 group-hover:bg-black/60 z-0" />

        {/* Centered Call to Action */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 transition-transform duration-500 scale-95 group-hover:scale-100">
          <h2 className="text-white text-3xl md:text-4xl font-light tracking-wider mb-4 drop-shadow-lg">
            Merchant Portal
          </h2>
          <span className="text-white text-sm tracking-[0.2em] uppercase border-b border-white/30 pb-1 transition-colors duration-500 group-hover:border-white">
            Start selling
          </span>
        </div>
      </Link>
    </div>
  );
}