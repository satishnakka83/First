import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-slate-50 text-slate-600  border-t border-slate-200">
      {/* Top Value Props / Feature Bar */}
      {/* <div className="max-w-7xl mx-auto px-4 py-8 border-b border-slate-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-left">
        <div className="flex items-center space-x-3 justify-center sm:justify-start">
          <span className="text-2xl">⚡</span>
          <div>
            <h4 className="font-semibold text-slate-900 text-sm">10-Minute Delivery</h4>
            <p className="text-xs text-slate-500">Fashion from local stores to your door</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 justify-center sm:justify-start">
          <span className="text-2xl">👗</span>
          <div>
            <h4 className="font-semibold text-slate-900 text-sm">AI Virtual Try-On</h4>
            <p className="text-xs text-slate-500">See the fit before you buy</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 justify-center sm:justify-start">
          <span className="text-2xl">🏠</span>
          <div>
            <h4 className="font-semibold text-slate-900 text-sm">Try-at-Home Experience</h4>
            <p className="text-xs text-slate-500">Our rider waits while you try</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 justify-center sm:justify-start">
          <span className="text-2xl">🔄</span>
          <div>
            <h4 className="font-semibold text-slate-900 text-sm">Instant Returns</h4>
            <p className="text-xs text-slate-500">Hand it back directly if it doesn't fit</p>
          </div>
        </div>
      </div> */}

      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        
        {/* Brand Section */}
        <div className="lg:col-span-2 space-y-4">
          <Link href="/" className="text-2xl font-bold tracking-wider text-slate-900 flex items-center space-x-1">
            <span className="text-indigo-600">zuget</span><span className="text-xs align-super font-normal text-indigo-500">.com</span>
          </Link>
          <p className="text-sm text-slate-600 max-w-sm leading-relaxed">
            India's first hyperlocal fashion marketplace bringing the trial room to your phone and the store to your doorstep in just minutes. Currently live in Hyderabad.
          </p>
          <div className="pt-2">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-bold block mb-1">Support Contacts</span>
            <p className="text-sm font-medium text-slate-800">Phone: +91 90004 78478</p>
            <p className="text-xs text-slate-500 mt-0.5">Email: longdrivecars@gmail.com</p>
          </div>
        </div>

        {/* Column 1: Shop */}
        <div>
          <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Shop Fashion</h3>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/men" className="hover:text-indigo-600 transition-colors">Men's Clothing</Link></li>
            <li><Link href="/women" className="hover:text-indigo-600 transition-colors">Women's Apparel</Link></li>
            <li><Link href="/kids" className="hover:text-indigo-600 transition-colors">Kids' Wear</Link></li>
            {/* <li><Link href="/footwear" className="hover:text-indigo-600 transition-colors">Footwear</Link></li> */}
            <li><Link href="/boutiques" className="hover:text-indigo-600 transition-colors">Nearby Boutiques</Link></li>
          </ul>
        </div>

        {/* Column 2: Business / Merchant */}
        <div>
          <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">For Partners</h3>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/partner" className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors">Sell on Zuget</Link></li>
            <li><Link href="/merchant/dashboard" className="hover:text-indigo-600 transition-colors">Merchant Dashboard</Link></li>
            <li><Link href="/delivery-partner" className="hover:text-indigo-600 transition-colors">Become a Rider</Link></li>
            <li><Link href="/partner-stores" className="hover:text-indigo-600 transition-colors">Store Success Stories</Link></li>
          </ul>
        </div>

        {/* Column 3: Legal & Company */}
        <div>
          <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Company</h3>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/about" className="hover:text-indigo-600 transition-colors">About Us</Link></li>
            <li><Link href="/privacy-policy" className="hover:text-indigo-600 transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-indigo-600 transition-colors">Terms of Service</Link></li>
            <li><Link href="/refund-policy" className="hover:text-indigo-600 transition-colors">Refund & Returns</Link></li>
            <li><Link href="/contact" className="hover:text-indigo-600 transition-colors">Contact Support</Link></li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar: Copyright & Socials */}
      <div className="bg-slate-100 text-slate-500 py-6 text-xs border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div>
            &copy; {currentYear} Zuget All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="https://play.google.com/store/apps/details?id=com.zuget.customer_app" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition-colors flex items-center space-x-1">
              <span>🤖</span> <span>Google Play</span>
            </a>
            <a href="https://apps.apple.com/in/app/zuget/id6756003689" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition-colors flex items-center space-x-1">
              <span>🍏</span> <span>App Store</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}