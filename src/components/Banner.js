import Image from 'next/image';
import React from 'react';

const Banner = (props) => {
  return (
    <div>
      {['/bannerimages/BannerArtboard 4.jpg', '/bannerimages/BannerArtboard 2.jpg','/bannerimages/BannerArtboard 3.jpg','/bannerimages/BannerArtboard 4.jpg','/bannerimages/BannerArtboard 5.jpg'].map(item => (
        <div className="relative w-full aspect-[16/9]">
  <Image
    src={item}
    fill
    quality={100}
    priority
    className="object-cover"
    alt="banner"
  />
</div>
      ))}
    </div>
  );
};

export default Banner;