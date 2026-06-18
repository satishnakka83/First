"use client"
import React, { useState, useEffect } from 'react';

export default function StorePage() {

    function ProductDetailModal({ product, onClose }) {
        const [activeImage, setActiveImage] = useState(product.model_image_front_duplicate);
        const [selectedSize, setSelectedSize] = useState(null);

        const images = [
            product.model_image_front_duplicate,
            product.model_image_back_duplicate
        ].filter(Boolean);

        const currentPrice = selectedSize
            ? product.size_data.find(s => s.size === selectedSize)?.price
            : product.size_data.find(s => s.price !== null)?.price;

        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm p-4 transition-all">
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto flex flex-col md:flex-row relative animate-in fade-in zoom-in-95 duration-200">
                    
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 bg-white/80 backdrop-blur text-gray-500 hover:text-gray-900 z-10 p-2 rounded-full shadow-sm transition-colors"
                    >
                        ✕
                    </button>

                    {/* Left Side: Images */}
                    <div className="w-full md:w-1/2 flex gap-4 p-8 bg-gray-50/50 md:min-h-[600px]">
                        {/* Thumbnails */}
                        <div className="flex flex-col gap-3 w-16 md:w-20">
                            {images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveImage(img)}
                                    className={`relative overflow-hidden rounded-lg transition-all ${activeImage === img ? 'ring-2 ring-slate-900' : 'ring-1 ring-gray-200 hover:ring-gray-400'}`}
                                >
                                    <img src={img} alt="thumbnail" className="w-full h-auto object-cover aspect-[3/4]" />
                                </button>
                            ))}
                        </div>
                        {/* Main Image */}
                        <div className="flex-1 flex items-center justify-center overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-100">
                            <img
                                src={activeImage}
                                alt={product.title}
                                className="w-full h-full object-cover max-h-[70vh] rounded-xl"
                            />
                        </div>
                    </div>

                    {/* Right Side: Details */}
                    <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col bg-white">
                        <h2 className="text-sm font-semibold tracking-widest text-gray-500 uppercase mb-2">{product.brand}</h2>
                        <p className="text-2xl text-slate-900 mb-6 capitalize font-medium">{product.title}</p>

                        {/* Pricing */}
                        <div className="flex items-baseline gap-3 mb-8">
                            <span className="text-3xl font-semibold text-slate-900">
                                {currentPrice ? `₹${currentPrice}` : 'Out of Stock'}
                            </span>
                            <span className="text-sm text-gray-400 font-light">Inclusive of all taxes</span>
                        </div>

                        <hr className="border-gray-100 mb-8" />

                        {/* Size Selector */}
                        <div className="mb-10">
                            <div className="flex justify-between items-center mb-4">
                                <span className="font-medium text-slate-900">Select Size</span>
                                <button className="text-slate-500 hover:text-slate-900 text-sm font-medium transition-colors underline underline-offset-4">Size Guide</button>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                {product.size_data.map((sizeObj) => {
                                    const isOutOfStock = sizeObj.quantity === 0 || sizeObj.quantity === null;
                                    return (
                                        <button
                                            key={sizeObj.size}
                                            disabled={isOutOfStock}
                                            onClick={() => setSelectedSize(sizeObj.size)}
                                            className={`
                                                h-12 min-w-[3rem] px-6 rounded-xl text-sm font-medium transition-all duration-200
                                                ${selectedSize === sizeObj.size
                                                    ? 'border-transparent bg-slate-900 text-white shadow-md'
                                                    : 'border border-gray-200 text-gray-700 bg-white hover:border-slate-400 hover:bg-gray-50'}
                                                ${isOutOfStock ? 'opacity-40 cursor-not-allowed bg-gray-50 text-gray-400' : ''}
                                            `}
                                        >
                                            {sizeObj.size}
                                        </button>
                                    );
                                })}
                            </div>
                            {selectedSize && (
                                <p className="text-sm text-emerald-600 mt-3 font-medium">
                                    Only {product.size_data.find(s => s.size === selectedSize)?.quantity} left in stock
                                </p>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 mb-8">
                            <button className="flex-1 py-4 border border-gray-200 rounded-xl font-medium text-slate-700 flex items-center justify-center gap-2 hover:border-gray-300 hover:bg-gray-50 transition-all">
                                <span className="text-xl leading-none">♡</span> Wishlist
                            </button>
                            <button
                                disabled={!selectedSize}
                                className="flex-[2] py-4 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
                            >
                                Add to Bag
                            </button>
                        </div>

                        <hr className="border-gray-100 mb-8" />

                        {/* Delivery Location Widget */}
                        <div className="bg-gray-50/50 p-6 rounded-xl border border-gray-100">
                            <h4 className="font-medium text-slate-900 mb-2">Delivery Options</h4>
                            <p className="text-sm text-gray-500 mb-4 font-light">Check availability and exact delivery dates</p>

                            <div className="flex border border-gray-200 rounded-lg overflow-hidden mb-6 bg-white focus-within:ring-1 focus-within:ring-slate-400 transition-shadow">
                                <input
                                    type="text"
                                    placeholder="Enter Pincode"
                                    className="flex-1 p-3 bg-transparent outline-none text-sm placeholder-gray-400"
                                />
                                <button className="px-6 text-slate-900 font-medium text-sm hover:bg-gray-50 border-l border-gray-200 transition-colors">Check</button>
                            </div>

                            <div className="grid grid-cols-3 gap-4 text-center text-xs text-gray-600">
                                <div className="flex flex-col items-center">
                                    <span className="text-xl mb-2 opacity-80">📦</span>
                                    <span className="mb-1 leading-relaxed">Pay on Delivery</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="text-xl mb-2 opacity-80">🔄</span>
                                    <span className="mb-1 leading-relaxed">7-day Returns</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="text-xl mb-2 opacity-80">🚚</span>
                                    <span className="mb-1 leading-relaxed">Free Delivery</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const [filters, setFilters] = useState({ gender: 'Men', item_name: 'Shirt' });
    const [pagination, setPagination] = useState({ limit: 12, offset: 0 }); // Increased limit slightly for better grid layout

    const genders = ['Men', 'Women', 'Kids', 'Unisex'];
    const categories = ['Shirt', 'Jeans', 'Shorts', 'T-Shirt'];

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const url = new URL("http://dev.zuget.com/site/item-details");
                url.searchParams.append("gender", filters.gender);
                url.searchParams.append("item_name", filters.item_name);
                url.searchParams.append("limit", pagination.limit);
                url.searchParams.append("offset", pagination.offset);

                const response = await fetch(url.toString(), {
                    headers: { "accept": "application/json" }
                });

                const result = await response.json();
                if (result.status === "success") {
                    setProducts(result.data.items);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [filters, pagination]);

    const handleNextPage = () => {
        setPagination(prev => ({ ...prev, offset: prev.offset + prev.limit }));
    };

    const handlePrevPage = () => {
        setPagination(prev => ({ ...prev, offset: Math.max(0, prev.offset - prev.limit) }));
    };

    const getBasePrice = (sizeData) => {
        const validSize = sizeData?.find(s => s.price !== null);
        return validSize ? validSize.price : 'N/A';
    };

    return (
        <div className="max-w-[1600px] mx-auto p-4 md:p-8 text-gray-800 bg-white min-h-screen">

            {/* Header & Pagination Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-10 pb-6 border-b border-gray-100">
                <h1 className="text-3xl font-light text-slate-900 tracking-tight mb-4 sm:mb-0">Collections</h1>
                <div className="flex items-center gap-6">
                    <span className="text-sm text-gray-500 font-light">
                        Showing {pagination.offset + 1} - {pagination.offset + pagination.limit}
                    </span>
                    <div className="flex gap-2">
                        <button
                            onClick={handlePrevPage}
                            disabled={pagination.offset === 0}
                            className="px-5 py-2 border border-gray-200 rounded-full text-sm font-medium hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
                        >
                            Prev
                        </button>
                        <button
                            onClick={handleNextPage}
                            className="px-5 py-2 bg-slate-900 text-white rounded-full text-sm font-medium hover:bg-slate-800 transition-colors shadow-sm"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-12">

                {/* Left Sidebar: Filters */}
                <aside className="w-full md:w-56 flex-shrink-0 space-y-8">
                    {/* Gender Filter */}
                    <div>
                        <h3 className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-4">Gender</h3>
                        <div className="space-y-3">
                            {genders.map(gender => (
                                <label key={gender} className="flex items-center gap-3 cursor-pointer group">
                                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${filters.gender === gender ? 'border-slate-900 bg-slate-900' : 'border-gray-300 group-hover:border-slate-400'}`}>
                                        {filters.gender === gender && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                                    </div>
                                    <input
                                        type="radio"
                                        name="gender"
                                        className="hidden"
                                        checked={filters.gender === gender}
                                        onChange={() => {
                                            setFilters(prev => ({ ...prev, gender }));
                                            setPagination(prev => ({ ...prev, offset: 0 }));
                                        }}
                                    />
                                    <span className={`text-sm transition-colors ${filters.gender === gender ? 'text-slate-900 font-medium' : 'text-gray-600 group-hover:text-slate-900'}`}>{gender}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Category Filter */}
                    <div>
                        <h3 className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-4">Category</h3>
                        <div className="space-y-3">
                            {categories.map(category => (
                                <label key={category} className="flex items-center gap-3 cursor-pointer group">
                                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${filters.item_name === category ? 'border-slate-900 bg-slate-900' : 'border-gray-300 group-hover:border-slate-400'}`}>
                                        {filters.item_name === category && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                                    </div>
                                    <input
                                        type="radio"
                                        name="category"
                                        className="hidden"
                                        checked={filters.item_name === category}
                                        onChange={() => {
                                            setFilters(prev => ({ ...prev, item_name: category }));
                                            setPagination(prev => ({ ...prev, offset: 0 }));
                                        }}
                                    />
                                    <span className={`text-sm transition-colors ${filters.item_name === category ? 'text-slate-900 font-medium' : 'text-gray-600 group-hover:text-slate-900'}`}>{category}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Right Content: Product Grid */}
                <main className="flex-1">
                    {loading ? (
                        <div className="flex items-center justify-center h-64 text-gray-400 font-light tracking-wide animate-pulse">
                            Curating collection...
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
                            {products.map((product, idx) => (
                                <div
                                    key={idx}
                                    className="group cursor-pointer flex flex-col bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl shadow border border-transparent hover:border-gray-100"
                                    onClick={() => setSelectedProduct(product)}
                                >
                                    {/* Image Wrapper */}
                                    <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden">
                                        {/* Elegant hover overlay */}
                                        <div className="absolute inset-0 bg-slate-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                                        
                                        <img
                                            src={product.model_image_front_duplicate}
                                            alt={product.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                            onError={(e) => e.currentTarget.src = 'https://via.placeholder.com/300x400?text=No+Image'}
                                        />
                                    </div>
                                    
                                    {/* Text Details Area */}
                                    <div className="p-5 flex flex-col flex-1">
                                        <h3 className="font-semibold text-[10px] tracking-widest text-gray-400 uppercase mb-1.5">{product.brand}</h3>
                                        <p className="text-sm text-slate-800 line-clamp-1 mb-4 capitalize font-light">{product.title}</p>
                                        
                                        <div className="mt-auto flex items-center justify-between">
                                            <p className="font-medium text-base text-slate-900">
                                                ₹{getBasePrice(product.size_data)}
                                            </p>
                                            <span className="text-xs font-medium text-slate-900 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                                View Product →
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>

            {/* Product Detail Modal */}
            {selectedProduct && (
                <ProductDetailModal
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />
            )}

        </div>
    );
}