'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const SimpleSellerNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: 'Sell On Zuget', href: '#sell' },
    { name: 'Contact Us', href: '/contact-us' },
    { name: 'Services', href: '#services' },
    { name: 'FAQs', href: '#faqs' },
  ];

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 h-20 flex items-center font-sans">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-full">
          
          {/* LEFT: Brand Logo */}
          <Link href="/" className="flex items-center space-x-2">
            {/* The signature Myntra gradient "M" logo shape */}
            
            <span className="text-gray-800 font-bold text-lg tracking-tight">Zuget</span>
          </Link>

          {/* CENTER: Simple Navigation Links */}
          <div className="hidden md:flex items-center space-x-10">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[14px] font-medium text-gray-700 hover:text-[#E71C60] transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* RIGHT: Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              href="/register" 
              className="bg-[#FF3E6C] text-white px-6 py-2 rounded text-xs font-bold uppercase tracking-wider hover:bg-[#e62e5a] transition-all text-center min-w-[100px]"
            >
              Register
            </Link>
            <Link 
              href="/login" 
              className="border border-gray-300 text-gray-700 px-6 py-2 rounded text-xs font-bold uppercase tracking-wider hover:border-gray-400 transition-all text-center min-w-[100px]"
            >
              Login
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 p-2 hover:bg-gray-50 rounded"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="absolute top-20 left-0 w-full bg-white border-b border-gray-200 py-4 px-6 flex flex-col space-y-4 md:hidden shadow-md">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-700 font-medium text-sm hover:text-[#FF3E6C]"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2 flex flex-col space-y-2">
            <Link 
              href="/register" 
              className="bg-[#FF3E6C] text-white py-2.5 rounded text-xs font-bold uppercase tracking-wider text-center"
            >
              Register
            </Link>
            <Link 
              href="/login" 
              className="border border-gray-300 text-gray-700 py-2.5 rounded text-xs font-bold uppercase tracking-wider text-center"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default SimpleSellerNavbar;