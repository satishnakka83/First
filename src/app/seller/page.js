import Banner from '@/components/Banner';
import SimpleSellerNavbar from '@/components/common/SimpleSellerNavbar';
import MerchantCTA from '@/components/MerchantCTA';
import Slider from '@/components/Slider';
import React from 'react';

const Seller = (props) => {

  const appslides = [
    "/bannerimages/seller/1.jpeg",
    "/bannerimages/seller/2.jpeg",
    "/bannerimages/seller/3.jpeg",
  ];

  const slides = [
    "/bannerimages/seller/1.jpeg",
    "/bannerimages/seller/2.jpeg",
    "/bannerimages/seller/3.jpeg",
  ];

  return (
    <div className=''>
      {/* <Slider appslides={appslides} slides={slides} /> */}
      <SimpleSellerNavbar/>
      <Banner/>
      <MerchantCTA/>
    </div>
  );
};

export default Seller;