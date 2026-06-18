"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Partner", href: "/#partner" },
  { name: "Customer", href: "/#customer" },
  { name: "About", href: "/about-us" },
  { name: "Contact", href: "/contact-us" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8 lg:px-12">
        <Link href="/" aria-label="Zuget home" className="text-2xl font-bold tracking-tight text-white">
          Zu<span className="text-fuchsia-400">get</span>
        </Link>

        <nav className="hidden items-center gap-10 lg:flex">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold text-slate-200 transition hover:text-white"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <button
          ref={buttonRef}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-slate-900/90 text-white transition hover:border-fuchsia-400 hover:text-fuchsia-300 lg:hidden"
          aria-label="Toggle mobile menu"
          aria-expanded={isOpen}
        >
          {!isOpen ? (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          ) : (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </button>
      </div>

      <div
        ref={menuRef}
        className={`fixed inset-y-0 right-0 z-40 w-[85%] max-w-sm transform bg-slate-950/95 p-6 shadow-2xl shadow-black/40 transition duration-300 ease-out backdrop-blur-xl lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <p className="text-xl font-semibold text-white">Zuget</p>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white transition hover:border-fuchsia-400 hover:text-fuchsia-300"
              aria-label="Close mobile menu"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-col gap-4 text-lg font-semibold text-slate-200">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="transition hover:text-white"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.32em] text-slate-400">Available in Hyderabad</p>
            <p className="mt-3 text-base font-semibold text-white">Fast fashion delivered in 10 minutes.</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
