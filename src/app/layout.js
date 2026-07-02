import { Geist, Geist_Mono, Plus_Jakarta_Sans, Inter , Manrope, Mulish} from "next/font/google";
import "./globals.css";
import CommonHeader from "@/components/common/CommonHeader";
import ModeToggle from "@/components/common/ModeToggle";
import Footer from "@/components/common/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollToTopButton from "@/components/ScrollToTopButton";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});
const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
  // Optional: You can specify weights if needed, e.g., weight: ["400", "700"]
});

export const metadata = {
  title: "Fast Fashion Delivery | Affordable Outfits Delivered in 30 Minutes",
  description:
    "Zuget delivers trendy mens, womens, and kids fashion in just minutes. Shop instant outfits, daily new arrivals, affordable styles, and fast delivery across your city.",
  metadataBase: new URL("https://www.zuget.com"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/android-icon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/apple-icon-180x180.png", sizes: "180x180",type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon-57x57.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={` ${mulish.className} h-full antialiased`}
    >
      <SmoothScroll>
      <body className="min-h-full flex flex-col">
        <CommonHeader />
        {children}
        <ModeToggle/>
        <Footer/>
      <ScrollToTopButton/>
      </body>
      </SmoothScroll>
    </html>
  );
}
