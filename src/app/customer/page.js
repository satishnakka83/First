import Banner from '@/components/Banner';
import Categories from '@/components/Categories';
import DownloadAppSection from '@/components/DownloadAppSection';
import FAQPage from '@/components/FAQPage';
import Slider from '@/components/Slider';
import Slider2 from '@/components/Slider2';
import ZugetTestimonials from '@/components/ZugetTestimonials';
import React from 'react';

const Customer = (props) => {
  const appslides = [
  "/bannerimages/BannerArtboard 1.jpg",
  "/bannerimages/BannerArtboard 2.jpg",
  "/bannerimages/BannerArtboard 3.jpg",
];

const slides = [
  "/bannerimages/Artboard 1.jpg",
  "/bannerimages/Artboard 2.jpg",
  "/bannerimages/Artboard 3.jpg",
];

const appslides2 = [
  "/bannerimages/BannerArtboard 4.jpg",
  "/bannerimages/BannerArtboard 5.jpg",
];

const slides2 = [
  "/bannerimages/Artboard 4.jpg",
  "/bannerimages/Artboard 5.jpg",
];


  return (
    <div className='bg-white'>
      <div className='lg:pt-16 pt-12'>

      <Slider appslides={appslides} slides={slides}/>
      </div>
      {/* <Banner/> */}
      <Categories/>
      <Slider appslides={appslides2} slides={slides2}/>
      <DownloadAppSection/>
      <ZugetTestimonials/>
      <FAQPage/>
    
    </div>
  );
};

export default Customer;