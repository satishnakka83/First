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
import TopCategories from "@/components/TopCategories";
import HappyCustomers from "@/components/HappyCustomers";
import CustomerBannerOrg from "@/components/CustomerBannerOrg";
export default function OwnerHome() {

  return (
    <>
      <motion.main
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, ease: "easeOut" }}
        className="bg-white text-white"
      >
        {/* <Header locname="bangalore" /> */}
        {/* <Banner /> */}
        {/* <OwnerBanner /> */}
        <CustomerBannerOrg />
         {/* <Womens /> */}
         {/* <Collabrarors /> */}
         {/* <FashionPhysicsBox /> */}
        {/*<Mens />
        <TryOn />
        {/* <HowItWorks /> */}
        {/* <GameClothes /> */}
        {/* <ElegantCarousel /> */}
        <Carousel/>
        <ShopByCat/>
        <AppDownload />
        <TopCategories />
        <HappyCustomers/>
        <Footer />
        <ScrollToTopButton/>
      </motion.main>
    </>
  );
}
