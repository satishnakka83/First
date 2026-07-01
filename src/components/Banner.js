import Image from 'next/image';
import React from 'react';

const Banner = (props) => {
  return (
    <div>
      {['/bannerimages/4.png', '/bannerimages/2.png','/bannerimages/3.png','/bannerimages/1.png','/bannerimages/5.png'].map(item => (
        <Image
        key={item}
          src={item}
          width={1000}
          height={1000}
          className='w-full h-full'
          alt='kl'
        />
      ))}
    </div>
  );
};

export default Banner;