"use client";
import { AiOutlineThunderbolt } from "react-icons/ai";

import Image from "next/image";
import Link from "next/link";

export default function Banner() {
  return (
    <section
      style={{ backgroundImage: "url('/bgimgs.webp')", backgroundSize: '100%',objectFit:'cover', backgroundRepeat: 'no-repeat' }}
      className="flex py-10 h-full flex-col md:flex-row justify-end items-center lg:pl-32 pl-28  text-gray-900 "
      aria-label="Fashion delivery advertisement"
    >
      {/* Text Content */}
      <div className="flex flex-col lg:gap-y-10 xs:p-2 xs justify-end lg:pr-24 space-y-6 text-center md:text-left lg:pb-56 lg:pt-12 ">
        <div>
          <p className="text-lg md:text-4xl lg:text-5xl font-bold leading-snug text-white">
            Your City's <span className=" px-">Fashion.</span>
          </p>
          <p className="text-lg md:text-xl lg:text-4xl text-white font-semibold mt-2 lg:pt-8">
            Delivered in{" "}
            <span className="bg- px-2 py-1 rounded-md text-white">
             30 Minutes 
            </span>
          </p>
        </div>

        {/* App Store Icons */}
        <div className="flex lg:gap-x-12 gap-x-6 lg:pt-10">
          <Image
            src="/mobileframe3.webp"
            alt="Fashion banner showcasing latest collection"
            width={1000}
            height={1000}
            className="w-24 lg:scale-200 scale-125 md:w-36 lg:w-72 rounded-lg h-auto object-contain transition-transform duration-300"
            priority
          />
          <div className="flex flex-col justify-center md:justify-start gap-4 ">
            <Link
              href="https://apps.apple.com/in/app/zuget/id6756003689"
              aria-label="Download on the App Store"
              className="focus:outline-none focus:ring-2 focus:ring-green-400 rounded lg:hover:scale-105"
            >
              <Image
                src="/appstore-icon.webp"
                alt="App Store icon"
                width={140}
                height={45}
                className="w-20 md:w-32 h-auto"
                priority
              />
            </Link>
            <Link
              href="https://play.google.com/store/apps/details?id=com.zuget.customer_app"
              aria-label="Get it on Google Play"
              className="focus:outline-none focus:ring-2 focus:ring-green-400 rounded lg:hover:scale-105"
            >
              <Image
                src="/playstore-icon.webp"
                alt="Play Store icon"
                width={140}
                height={45}
                className="w-20 md:w-32 h-auto"
                priority
              />
            </Link>

          </div>
        </div>
      </div>
    </section>
  );
}
