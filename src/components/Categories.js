import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const categories = [
  { id: 1, name: "Cargo-Pants", image: "/categories/Cargo-Pants.png" },
  { id: 3, name: "Dress", image: "/categories/Dress.png" },
  { id: 4, name: "Hoodie", image: "/categories/Hoodie.png" },
  { id: 5, name: "Jeans", image: "/categories/Jeans.png" },
  { id: 6, name: "Jumpsuit", image: "/categories/Jumpsuit.png" },
  { id: 7, name: "Kids-Wear", image: "/categories/Kids-Wear.png" },
  { id: 8, name: "Kurti", image: "/categories/Kurti.png" },
  { id: 9, name: "Leggings", image: "/categories/Leggings.png" },
  { id: 11, name: "Sarees", image: "/categories/Sarees.png" },
  { id: 12, name: "Shirt", image: "/categories/Shirt.png" },
  { id: 13, name: "Shorts", image: "/categories/Shorts.png" },
  { id: 14, name: "T-Shirts", image: "/categories/T-Shirts.png" },
  { id: 15, name: "Top", image: "/categories/Top.png" },
  { id: 16, name: "Trousers", image: "/categories/Trousers.png" },
];

export default function Categories() {
  return (
    <section className="bg-neutral-50/50 lg:py-16 py-2 px-4 sm:px-6 lg:px-16 xl:px-24">
      <div className="max-w-[1536px] mx-auto">

        {/* Short & Catchy Header */}
        <div className="w-full mb-12 flex flex-col items-center text-center px-4">
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#793FDF] mb-2">
            Find Your Style
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-950 uppercase">
            Shop By Category
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-neutral-500 tracking-wide">
            Discover the latest trends across our collections.
          </p>
        </div>

        {/* Premium E-commerce Grid Layout */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-5 gap-y-10">
          {categories.map((category) => (
            <Link 
              key={category.id}
              href={`/customer/products?item_name=${category.name}`}
              className="group flex flex-col w-full cursor-pointer text-left"
            >
              {/* Image Frame with soft premium shadow */}
              <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden bg-neutral-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all duration-500 group-hover:shadow-[0_12px_30px_rgba(121,63,223,0.08)] border border-neutral-200/40">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-w-640px) 50vw, (max-w-768px) 33vw, (max-w-1024px) 25vw, 16vw"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                />
                
                {/* Subtle dark-to-transparent overlay on hover for premium depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
              
              {/* Minimalist, High-End Typography Styling */}
              <div className="mt-4 px-1 flex flex-col items-start gap-1">
                <h4 className="text-xs font-semibold uppercase tracking-widest text-neutral-800 transition-colors duration-300 group-hover:text-[#793FDF]">
                  {category.name.replace(/-/g, ' ')}
                </h4>
                
                {/* Elegant Animated Border Underline */}
                <div className="relative h-[2px] w-8 overflow-hidden">
                  <span className="absolute inset-0 bg-neutral-200" />
                  <span className="absolute inset-0 bg-[#793FDF] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}