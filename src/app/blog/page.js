"use client";

import { useEffect, useState } from "react";
import { fireDb } from "@/components/firebase";
import { getDocs, collection, where, query } from "firebase/firestore";
// import BlogLayout from "./blogcomponents/BlogLayout";
import Blogs from '@/components/Blogs'
import Link from "next/link";
import { GoDotFill } from "react-icons/go";
import { MdExpandMore } from "react-icons/md";

export default function Page() {
    const [posts, setPosts] = useState([]);
    const [sortedPosts, setSortedPosts] = useState([]);

    const [isMounted, setIsMounted] = useState(false); // Added state

    useEffect(() => {
        setIsMounted(true); // Confirms we are in the browser

        const fetchPosts = async () => {
            try {
                // Prevent execution if fireDb isn't ready
                if (!fireDb) return;

                const postsQuery = query(
                    collection(fireDb, "blogPost"),
                    where("blog_state", "==", "active"),
                    where("blogfor", "==", "zuget")
                );

                const snapshot = await getDocs(postsQuery);
                const data = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                console.log(snapshot, 'snap');


                const sorted = [...data].sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );
                console.log(data, "data");
                console.log(sorted, "sorted");


                setPosts(data);
                setSortedPosts(sorted);
            } catch (err) {
                console.error("Firebase Fetch Error:", err);
            }
        };

        fetchPosts();
    }, []);

    // IMPORTANT: Prevents the server from trying to render 
    // content that relies on client-side state/Firebase
    if (!isMounted) {
        return <div className="min-h-screen bg-white" />;
    }

    return (
        <>
            <div className="xl:px-32 lg:px-12 flex flex-col items-center bg-white helvetica-font text-black">

                <div className="lg:py-10 py-5 text-center">
                    <p className="text-4xl font-semibold pb-3">Blogs</p>

                    <ul className="flex justify-center items-center gap-3">
                        <li>Topic</li>
                        <li><GoDotFill /></li>
                        <li>{posts.length} stories</li>
                    </ul>
                </div>

                {/* <div className="text-center flex justify-center pt-6">
          <PostsListing data={sortedPosts} />
        </div> */}

                <Blogs data={posts} />
            </div>
            <div className="py-5 pl-3 bg-white">
                <Link href={`/blog/travel`} className="flex space-x-2">
                    <span className="border-2 text-black rounded-full p-2 text-sm flex items-center space-x-2">
                        <span>See-- more</span>
                        <MdExpandMore className="text-lg" />
                    </span>
                </Link>
            </div>
        </>
    );
}

export const runtime = 'nodejs';