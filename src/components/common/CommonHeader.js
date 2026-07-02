"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { IoIosArrowDown, IoIosMenu, IoIosClose, IoIosArrowForward as IoIosChevronRight, IoIosSearch } from "react-icons/io";
import { usePathname } from "next/navigation";

const CATS = {
    men: [
        { t: "Clothing", i: ["Jeans", "T-Shirt", "Shirt", "Shorts", "Hoodie", "Trousers", "Cargo Pants"] }
    ],
    women: [
        { t: "Clothing", i: ["Top", "Dress", "Kurti", "Jumpsuit", "Leggings", "Palazzo", "Saree"] }
    ]
};

const CustomerBannerOrg = ({ onSearchResults, onLoadingState }) => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [results, setResults] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [loading, setLoading] = useState(false);
    const [activeMobileCat, setActiveMobileCat] = useState('men');

    const menuRef = useRef(null);
    const buttonRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.body.style.touchAction = 'none';
        } else {
            document.body.style.overflow = '';
            document.body.style.touchAction = '';
        }

        const hClick = (e) => {
            if (isOpen && !menuRef.current?.contains(e.target) && !buttonRef.current?.contains(e.target)) {
                setIsOpen(false);
            }
            if (showDropdown && !containerRef.current?.contains(e.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', hClick);
        return () => {
            document.body.style.overflow = '';
            document.body.style.touchAction = '';
            document.removeEventListener('mousedown', hClick);
        };
    }, [isOpen, showDropdown]);

    useEffect(() => {
        if (query.trim().length < 2) return setSuggestions([]);
        const ac = new AbortController();
        const delay = setTimeout(async () => {
            try {
                const r = await fetch(`https://dev.zuget.com/user/autocomplete?query=${encodeURIComponent(query)}`, {
                    headers: { accept: 'application/json' },
                    signal: ac.signal
                });
                const d = await r.json();
                if (d.status === 'success') {
                    setSuggestions((d.data || []).sort((a, b) => b.score - a.score));
                }
            } catch (e) {
                if (e.name !== 'AbortError') console.error(e);
            }
        }, 300);
        return () => { clearTimeout(delay); ac.abort(); };
    }, [query]);

    const handleSelectSuggestion = useCallback(async (txt) => {
        setQuery(txt);
        setShowDropdown(false);
        setLoading(true);
        if (onLoadingState) onLoadingState(true);
        try {
            const r = await fetch(`https://dev.zuget.com/user/search?query=${encodeURIComponent(txt)}&limit=10&offset=1&store_id=0`, {
                headers: { accept: 'application/json' }
            });
            const d = await r.json();
            if (d.status === 'success') {
                const payload = d.data.results || [];
                setResults(payload);
                if (onSearchResults) onSearchResults(payload, txt);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
            if (onLoadingState) onLoadingState(false);
        }
    }, [onSearchResults, onLoadingState]);

    return (
        <div className={`w-full flex flex-col bg-slate-50 relative ${pathname === '/' || pathname.includes('seller') && 'hidden'}`}>

            {/* Main Header Context */}
            <header className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-md px-4 sm:px-6 lg:px-12 xl:px-16 h-[76px] flex justify-between items-center shadow-[0_1px_3px_0_rgba(0,0,0,0.05)] border-b border-slate-100 z-50">

                {/* Left Brand and Navigation Group */}
                <div className="flex items-center gap-6 lg:gap-10 h-full">
                    <button
                        ref={buttonRef}
                        className="lg:hidden flex items-center justify-center p-1.5 text-slate-700 hover:text-black transition-colors rounded-lg hover:bg-slate-100"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        <IoIosMenu size={24} />
                    </button>

                    <Link href={`${pathname.includes('customer')?'/customer':'/'}`} className="text-2xl font-black tracking-tight text-black shrink-0 flex items-center">
                        <span className="text-[#793FDF]">Zuget</span>
                    </Link>

                    {/* Clean Location Tag info bar */}
                    <div className="hidden xl:flex flex-col leading-tight select-none border-l border-slate-200 pl-5">
                        <span className="text-[10px] font-bold tracking-widest uppercase text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded mb-0.5">30 Min Delivery</span>
                        <span className="flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-[#793FDF] transition-colors cursor-pointer">
                            Hyderabad <IoIosArrowDown size={11} className="text-slate-400" />
                        </span>
                    </div>

                    {/* Refined Desktop Navigation */}
                    {/* Refined Desktop Navigation */}
                    <nav className="hidden lg:flex h-full items-center">
                        <ul className="flex h-full gap-x-1 font-medium text-sm tracking-wide text-slate-700">

                            {Object.keys(CATS).map((k) => (
                                <li key={k} className="group/nav h-full flex items-center relative">
                                    <Link
                                        href={`/${k}`}
                                        className="h-full flex items-center px-4 text-[14px] font-semibold text-slate-700 hover:text-[#793FDF] tracking-wide capitalize relative transition-colors duration-200"
                                    >
                                        {k}
                                        <span className="absolute bottom-0 left-4 right-4 h-[3px] bg-[#793FDF] scale-x-0 group-hover/nav:scale-x-100 transition-transform duration-200 origin-left rounded-t-full" />
                                    </Link>

                                    {/* Premium Mega Dropdown Container */}
                                    <div className="absolute top-[76px] left-0 w-64 bg-white border border-slate-100 rounded-xl shadow-[0_16px_36px_rgba(0,0,0,0.08)] opacity-0 invisible translate-y-2 group-hover/nav:opacity-100 group-hover/nav:visible group-hover/nav:translate-y-0 transition-all duration-200 z-50 pointer-events-none group-hover/nav:pointer-events-auto p-5">
                                        {CATS[k].map((col, idx) => (
                                            <div key={idx} className="flex flex-col gap-2 normal-case">
                                                <h5 className="font-bold text-slate-400 uppercase tracking-widest text-[11px] border-b border-slate-50 pb-2 mb-1">
                                                    {col.t}
                                                </h5>
                                                <ul className="flex flex-col gap-1.5 text-slate-600">
                                                    {col.i.map((item, i) => (
                                                        <li key={i}>
                                                            <Link
                                                                href={`/${k}/${item.toLowerCase().replace(/ /g, '-')}`}
                                                                className="block text-[13px] font-medium text-slate-600 hover:text-[#793FDF] hover:translate-x-1 transition-all duration-150"
                                                            >
                                                                {item}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </li>
                            ))}

                            {/* Updated Home Link with Group Hover reveal */}
                            <li className="group/nav h-full flex items-center relative">
                                <Link
                                    href="/home"
                                    className="h-full flex items-center px-4 text-[14px] font-semibold text-slate-700 hover:text-[#793FDF] relative transition-colors duration-200"
                                >
                                    Home
                                    <span className="absolute bottom-0 left-4 right-4 h-[3px] bg-[#793FDF] scale-x-0 group-hover/nav:scale-x-100 transition-transform duration-200 origin-left rounded-t-full" />
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>

                {/* Global Search Input Area */}
                <div className="flex-1 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-4 py-2" ref={containerRef}>
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-slate-400">
                            <IoIosSearch size={18} />
                        </div>
                        <input
                            id="search"
                            type="text"
                            className="w-full pl-10 pr-4 py-2 bg-slate-100 focus:bg-white text-sm text-slate-800 rounded-full border border-transparent focus:border-slate-200 focus:outline-none focus:ring-4 focus:ring-slate-100 transition-all placeholder-slate-400"
                            placeholder="Search for products, brands and more..."
                            value={query}
                            onChange={(e) => { setQuery(e.target.value); setShowDropdown(true); }}
                            onFocus={() => setShowDropdown(true)}
                        />

                        {/* Auto-suggest dropdown alignment */}
                        {showDropdown && suggestions.length > 0 && (
                            <ul className="absolute z-50 w-full mt-2 bg-white border border-slate-100 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.12)] max-h-68 overflow-y-auto divide-y divide-slate-50 p-1.5">
                                {suggestions.map((item, idx) => (
                                    <li key={idx}>
                                        <button
                                            type="button"
                                            onClick={() => handleSelectSuggestion(item.title)}
                                            className="w-full text-left px-3.5 py-2.5 text-sm hover:bg-slate-50 text-slate-700 hover:text-[#793FDF] rounded-xl flex justify-between items-center transition-colors"
                                        >
                                            <span className="font-medium">{item.title}</span>
                                            {item.score > 10 && <span className="text-[10px] bg-indigo-50 text-[#793FDF] px-2 py-0.5 rounded-full font-bold">Popular</span>}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                {/* Right Aux Links Context */}
<div className="hidden lg:flex items-center gap-x-1 text-slate-600 h-full text-sm font-medium">
  {['blog', 'contact-us', 'about-us'].map((link) => (
    <div key={link} className="group/nav h-full flex items-center relative">
      <Link 
        href={`/${link}`} 
        className="h-full flex items-center px-3.5 text-[13px] font-semibold text-slate-700 hover:text-[#793FDF] capitalize relative transition-colors duration-200"
      >
        {link.replace('-', ' ')}
        <span className="absolute bottom-0 left-3.5 right-3.5 h-[3px] bg-[#793FDF] scale-x-0 group-hover/nav:scale-x-100 transition-transform duration-200 origin-left rounded-t-full" />
      </Link>
    </div>
  ))}
</div>
            </header>

            {/* Mobile Sliding Sidebar View */}
            <div className={`fixed inset-0 bg-black/40 backdrop-blur-xs z-[100] transition-opacity duration-300 lg:hidden ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
                <nav
                    ref={menuRef}
                    className={`absolute top-0 left-0 h-full w-[290px] bg-white shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
                >
                    <button
                        onClick={() => setIsOpen(false)}
                        className="absolute top-4 right-4 text-slate-500 hover:text-black z-20 bg-slate-100 p-1.5 rounded-full transition-colors"
                        aria-label="Close panel"
                    >
                        <IoIosClose size={22} />
                    </button>

                    {/* Promo Dynamic Banner Area */}
                    <div className="relative w-full aspect-[2.2/1] bg-gradient-to-br from-indigo-50 to-purple-50 shrink-0 flex items-center p-6 border-b border-slate-100">
                        <div className="space-y-1">
                            <span className="bg-[#793FDF] text-white font-bold text-[9px] px-2 py-0.5 rounded uppercase tracking-wider">Welcome Offer</span>
                            <p className="text-slate-900 font-extrabold text-lg tracking-tight">Flat ₹300 Off</p>
                            <p className="text-[11px] font-medium text-slate-500 tracking-tight">On your first fashion order</p>
                        </div>
                    </div>

                    {/* Navigation Items Node */}
                    <div className="flex-1 overflow-y-auto py-3 px-2">
                        {Object.keys(CATS).map((categoryKey) => {
                            const isSelected = activeMobileCat === categoryKey;
                            return (
                                <div key={categoryKey} className="mb-1">
                                    <button
                                        onClick={() => setActiveMobileCat(isSelected ? null : categoryKey)}
                                        className={`w-full px-4 py-3 flex justify-between items-center text-left rounded-xl transition-colors ${isSelected ? "bg-indigo-50/60 text-[#793FDF]" : "text-slate-800 hover:bg-slate-50"}`}
                                    >
                                        <span className="text-sm font-bold capitalize tracking-wide">{categoryKey}</span>
                                        <IoIosArrowDown size={14} className={`text-slate-400 transition-transform duration-200 ${isSelected ? "rotate-180 text-[#793FDF]" : ""}`} />
                                    </button>

                                    {/* Inner collapsible segment */}
                                    {isSelected && (
                                        <div className="mt-1 px-3 pb-2 space-y-1">
                                            {CATS[categoryKey].map((subcategory, sIdx) => (
                                                <div key={sIdx} className="pt-2">
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 mb-1">{subcategory.t}</p>
                                                    <div className="space-y-0.5">
                                                        {subcategory.i.map((item, iIdx) => (
                                                            <Link
                                                                key={iIdx}
                                                                href={`/${categoryKey}/${item.toLowerCase().replace(/ /g, '-')}`}
                                                                onClick={() => setIsOpen(false)}
                                                                className="flex justify-between items-center text-[13px] font-medium text-slate-600 px-2 py-2 rounded-lg hover:bg-slate-50 active:text-black"
                                                            >
                                                                <span>{item}</span>
                                                                <IoIosChevronRight size={14} className="text-slate-300" />
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}

                        <div className="border-t border-slate-100 my-2 pt-2">
                            <Link
                                href="/home"
                                onClick={() => setIsOpen(false)}
                                className="block text-sm font-bold text-slate-800 px-4 py-3 rounded-xl hover:bg-slate-50 transition-colors"
                            >
                                Home
                            </Link>
                            {['blog', 'contact-us', 'about-us'].map((link) => (
                                <Link
                                    key={link}
                                    href={`/${link}`}
                                    onClick={() => setIsOpen(false)}
                                    className="block text-sm font-bold text-slate-500 px-4 py-2.5 rounded-xl hover:bg-slate-50 capitalize transition-colors"
                                >
                                    {link.replace('-', ' ')}
                                </Link>
                            ))}
                        </div>
                    </div>
                </nav>
            </div>

            {/* Main Dynamic View Content */}
            <main className="w-full flex flex-col">
                {loading && (
                    <div className="w-full flex justify-center pt-32 pb-12">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#793FDF]"></div>
                    </div>
                )}

                {!loading && results.length > 0 && (
                    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-10 xl:px-20 pt-7">
                        <h2 className="text-xl font-bold mb-6 text-gray-900">Search Results for "{query}"</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
                            {results.map((product) => (
                                <div key={product._id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow">
                                    <div className="relative h-64 bg-gray-50">
                                        <img src={product.model_image_front || product.item_image} alt={product.title} className="w-full h-full object-cover object-top" loading="lazy" />
                                        <span className="absolute top-2 left-2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider">{product.brand}</span>
                                    </div>
                                    <div className="p-4 flex-1 flex flex-col justify-between">
                                        <div>
                                            <p className="text-[10px] text-gray-400 uppercase font-extrabold tracking-wider">{product.item_category} &middot; {product.category}</p>
                                            <h3 className="font-semibold text-gray-800 text-sm mt-1 line-clamp-2">{product.title}</h3>
                                            <div className="flex flex-wrap gap-1 mt-2">
                                                {product.color && <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded capitalize font-medium">{product.color}</span>}
                                                {product.fit && <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-medium">{product.fit}</span>}
                                            </div>
                                        </div>
                                        <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between">
                                            <div>
                                                <p className="text-[10px] text-gray-400 font-medium">Price</p>
                                                <p className="text-base font-black text-gray-900">₹{product.size_data?.[0]?.price || 'N/A'}</p>
                                            </div>
                                            {product.size_data?.[0] && <span className="text-xs font-bold bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md">Size: {product.size_data[0].size}</span>}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {!loading && query && results.length === 0 && suggestions.length === 0 && (
                    <p className="text-center text-gray-400 pt-32 pb-12 font-medium">No items found. Try typing "mens".</p>
                )}
            </main>
        </div>
    );
};

export default CustomerBannerOrg;