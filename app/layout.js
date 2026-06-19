import { Lato, Geist } from "next/font/google";
import "./globals.css";
import ModeToggle from "@/components/ModeToggle";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-lato",
});
const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

export const metadata = {
  title: "Zuget | Hyperlocal Fashion Marketplace - Hyderabad",
  description:
    "Zuget Partner and Customer App: AI try-on, 10-minute delivery, and local fashion order management for stores and shoppers.",
  canonical: "https://www.zuget.com",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.className} antialiased`}>
        {children}
      <ModeToggle/>
      </body>
    </html>
  );
}
