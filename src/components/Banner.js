import Image from 'next/image';
import React from 'react';

const Banner = (props) => {
  const images = [
    '/bannerimages/seller/4.jpeg',
    '/bannerimages/seller/2.jpeg',
    '/bannerimages/seller/3.jpeg',
    '/bannerimages/seller/4.jpeg',
    '/bannerimages/seller/5.jpeg'
  ];

  return (
    <div className='flex flex-col w-full'>
      {images.map((item, index) => (
        /* 
          1. 'relative' is required so the absolute 'fill' image stays inside this container.
          2. 'aspect-[3/1]' forces a specific shape (e.g., 3x wider than it is tall). Change this 
             to match your actual banner dimensions (like aspect-video, aspect-[16/9], etc.).
        */
        <div key={index} className="relative w-full aspect-[3/1]">
          <Image
            src={item}
            fill
            quality={100}
            // Only add priority to the first image so you don't hurt page performance
            priority={index === 0}
            className="object-cover" // 'object-cover' ensures the image fills the space without gaps
            alt={`banner-${index}`}
          />
        </div>
      ))}
    </div>
  );
};

export default Banner;