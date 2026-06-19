"use client";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Collabrarors from "@/components/Collabrarors";
import Footer from "@/components/Footer";
import OwnerBanner from "@/components/OwnerBanner";
import OwnerBannerOrg from "@/components/OwnerBannerOrg";
import Carousel from "@/components/Carousal";
import ShopByCat from "@/components/ShopByCat";
import AppDownload from "@/components/AppDownload";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import SplashScreen from "@/components/SplashScreen"; // Adjust path as necessary
import { useState, useEffect } from "react";
import TwoImages from "@/components/TwoImages";
import ModeToggle from "@/components/ModeToggle";
export default function Home() {
  
  const Header = dynamic(() => import('../components/Header'), {
    ssr: false, 
  });
  
const [showSplash, setShowSplash] = useState(true);

  // Optional: Fallback timer in case the video fails to load or play
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      setShowSplash(false);
    }, 4000); // Forces site entry after 5 seconds max

    return () => clearTimeout(fallbackTimer);
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };
  return (
    <>
    {/* <SplashScreen isVisible={showSplash} onComplete={handleSplashComplete} /> */}
      <motion.main
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, ease: "easeOut" }}
        className="bg-white text-white"
      >
        <TwoImages/>
        <ModeToggle/>
        {/* <Header locname="bangalore" /> */}
        {/* <Banner /> */}
        {/* <OwnerBanner /> */}
        {/* <OwnerBannerOrg /> */}
         {/* <Womens /> */}
         {/* <Collabrarors /> */}
         {/* <FashionPhysicsBox /> */}
        {/*<Mens />
        <TryOn />
        {/* <HowItWorks /> */}
        {/* <GameClothes /> */}
        {/* <ElegantCarousel /> */}
        {/* <Carousel/> */}
        {/* <ShopByCat/> */}
        {/* <AppDownload /> */}
        {/* <TopCategories /> */}
        {/* <Footer /> */}
        {/* <ScrollToTopButton/> */}
      </motion.main>
    </>
  );
}
