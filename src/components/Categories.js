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
    <section className="bg-white py-12 px-4 sm:px-6 lg:px-20">
      <div className="max-w-[1440px] mx-auto">

        {/* Header Title Banner */}
        <div className="w-full mb-10 flex justify-center">
          <Image
            src="/Artboard-1-copy-2.png"
            alt="Shop By Category"
            width={1400}
            height={200}
            className="w-full h-[129px]"
            priority
          />
        </div>

        {/* Premium E-commerce Grid Layout */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-8">
          {categories.map((category) => (
            <Link 
              key={category.id}
              href={`/customer/products?item_name=${category.name}`}
              className="group flex flex-col gap-3 w-full cursor-pointer text-center"
            >
              {/* Image Frame with soft shadows and overflow isolation */}
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-slate-50 shadow-[0_4px_12px_rgba(0,0,0,0.03)] border border-slate-100/60">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-w-640px) 50vw, (max-w-768px) 33vw, (max-w-1024px) 25vw, 16vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>
              
              {/* Clean, Elegant Typography */}
              <div className="space-y-0.5">
                <h4 className="text-sm font-bold text-slate-800 tracking-wide group-hover:text-[#793FDF] transition-colors duration-200">
                  {category.name.replace(/-/g, ' ')}
                </h4>
                <span className="inline-block text-[11px] font-semibold text-[#793FDF] bg-purple-50 px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                  Shop Now &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}