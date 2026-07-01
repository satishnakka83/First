"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BiCategory } from "react-icons/bi";
import { FiCalendar, FiArrowLeft, FiArrowRight } from "react-icons/fi";

const Blogs = ({ data, loc }) => {
    const postsPerPage = 12;
    const [currentPage, setCurrentPage] = useState(1);
    const [pageGroup, setPageGroup] = useState(0);

    // Calculate positions
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;

    // Note: Restored array rendering to include index 0 to prevent skipping initial payload entries
    const currentPosts = data?.slice(indexOfFirstPost, indexOfLastPost);

    const nextPage = () => {
        if (currentPage < Math.ceil(data?.length / postsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const nextGroup = () => {
        if (pageGroup < Math.ceil(data?.length / postsPerPage) / 5 - 1) {
            setPageGroup(pageGroup + 1);
        }
    };

    const prevGroup = () => {
        if (pageGroup > 0) {
            setPageGroup(pageGroup - 1);
        }
    };

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(data?.length / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    const pageNumbersToDisplay = pageNumbers.slice(pageGroup * 4, pageGroup * 4 + 4);

    return (
        <div className="w-full bg-white px-4 sm:px-6 lg:px-12 py-10">

            {/* Premium Post Card Grid Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
                {currentPosts?.length > 0 ? (
                    currentPosts.map((post, i) => (
                        <Link
                            href={`${loc ? `/${loc}` : ''}/blog/posts/${post.slug.toLowerCase().replace(/ /g, "-")}`}
                            key={`post-key-${i}`}
                            className="group flex flex-col w-full h-full bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100/80 transition-all duration-300 hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1"
                        >
                            {/* Media Container Box */}
                            {/* Media Container Box: Fixed with object-contain and an elegant frame background */}
                            <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-50 border-b border-slate-100/60">
                                <Image
                                    className="w-full h-full object-contain p-2 transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                                    src={post?.coverimages && post.coverimages.length ? post.coverimages : "/tempimg.jpg"}
                                    alt={post?.cialt || "Post Image"}
                                    fill
                                    sizes="(max-w-768px) 100vw, (max-w-1024px) 50vw, 33vw"
                                    priority={i < 3}
                                />
                            </div>

                            {/* Text Meta Content Stack */}
                            <div className="p-5 flex-1 flex flex-col justify-between">
                                <div className="space-y-3">

                                    {/* Badge Row Info Content */}
                                    <div className="flex flex-wrap items-center gap-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                        {post?.categoryname?.[0] && (
                                            <span className="flex items-center gap-1.5 text-[#793FDF] bg-purple-50 px-2.5 py-1 rounded-md capitalize">
                                                <BiCategory size={13} />
                                                {post.categoryname[0].replace(/-/g, ' ')}
                                            </span>
                                        )}
                                        {post?.createdAt && (
                                            <span className="flex items-center gap-1.5 font-semibold text-slate-400">
                                                <FiCalendar size={12} />
                                                {new Date(post.createdAt).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                            </span>
                                        )}
                                    </div>

                                    {/* Clean Uniform Headers */}
                                    <h3 className="text-base md:text-lg font-bold text-slate-800 tracking-tight leading-snug line-clamp-2 group-hover:text-[#793FDF] transition-colors duration-200">
                                        {post?.title || "Untitled Story"}
                                    </h3>

                                    {/* Clean Decoupled Description Bounds */}
                                    <p className="text-xs md:text-sm text-slate-500 leading-relaxed font-medium line-clamp-3">
                                        {post?.description || "Read full details regarding this collection story directly on Zuget."}
                                    </p>
                                </div>

                                {/* Card Action Link Sub-line */}
                                <div className="mt-5 pt-4 border-t border-slate-50 flex items-center text-[12px] font-bold text-slate-400 group-hover:text-[#793FDF] transition-colors duration-200">
                                    <span>Read Article</span>
                                    <FiArrowRight className="ml-1 transition-transform duration-200 group-hover:translate-x-1" size={14} />
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="col-span-full text-center py-20 text-slate-400 font-medium">
                        No posts available for this category.
                    </div>
                )}
            </div>

            {/* Pagination Controls Alignment */}
            <div className="flex justify-center items-center mt-16 gap-x-2">
                <button
                    onClick={prevGroup}
                    disabled={pageGroup === 0}
                    className="p-2.5 bg-white text-slate-600 hover:text-black hover:bg-slate-50 border border-slate-200 rounded-full transition-all disabled:opacity-30 disabled:pointer-events-none active:scale-95 shadow-sm"
                    aria-label="Previous page group"
                >
                    <FiArrowLeft size={16} />
                </button>

                <ul className="flex items-center gap-x-1.5 px-2">
                    {pageNumbersToDisplay.map((number) => (
                        <li key={number}>
                            <button
                                onClick={() => setCurrentPage(number)}
                                className={`h-9 w-9 text-xs font-bold rounded-full flex justify-center items-center transition-all active:scale-95 ${currentPage === number
                                    ? "bg-[#793FDF] text-white shadow-md shadow-purple-600/20"
                                    : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
                                    }`}
                            >
                                {number}
                            </button>
                        </li>
                    ))}
                </ul>

                <button
                    onClick={nextGroup}
                    disabled={pageGroup >= Math.ceil(data?.length / postsPerPage) / 5 - 1}
                    className="p-2.5 bg-white text-slate-600 hover:text-black hover:bg-slate-50 border border-slate-200 rounded-full transition-all disabled:opacity-30 disabled:pointer-events-none active:scale-95 shadow-sm"
                    aria-label="Next page group"
                >
                    <FiArrowRight size={16} />
                </button>
            </div>
        </div>
    );
};

export default Blogs;