"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { fireDb } from '@/components/firebase';
import { doc, updateDoc, arrayUnion, getDocs, query, collection, where } from "firebase/firestore";
import { GrLike } from "react-icons/gr";
import { FaRegComment } from "react-icons/fa";
import Image from 'next/image';
import Link from "next/link";
import { BiCategory } from "react-icons/bi";
import { IoTimeOutline } from "react-icons/io5";
import { IoMdVolumeHigh, IoMdVolumeOff } from "react-icons/io";

export default function SinglePostPage() {
  const params = useParams();
  const slug = params.slug;
  const router = useRouter();

  // States
  const [postDisplay, setPostDisplay] = useState(null);
  const [postlist, setPostlist] = useState([]);
  const [cat, setCat] = useState('');
  const [commentShow, setCommentShow] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Speech States
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voice, setVoice] = useState(null);

  // Social States
  const [likesCount, setLikesCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [userName, setUserName] = useState("");
  const [commentText, setCommentText] = useState("");

  // Initialize Speech Voices
  useEffect(() => {
    const getVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      let selectedVoice = voices.find(v =>
        v.name.toLowerCase().includes('google') || 
        v.name.toLowerCase().includes('microsoft') || 
        v.name.toLowerCase().includes('en-us')
      );
      if (!selectedVoice) {
        selectedVoice = voices.find(v => v.lang.startsWith('en'));
      }
      setVoice(selectedVoice || null);
    };

    getVoices();
    window.speechSynthesis.onvoiceschanged = getVoices;

    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  // Fetch Data
  useEffect(() => {
    const fetchPostAndRelated = async () => {
      if (!slug) return;
      try {
        setLoading(true);
        const q = query(collection(fireDb, "blogPost"), where("slug", "==", slug));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          router.push('/404');
          return;
        }

        const postDoc = querySnapshot.docs[0];
        const postData = postDoc.data();

        if (postData.blogfor !== 'zuget') {
          router.push('/404');
          return;
        }

        const formattedPost = {
          ...postData,
          time: postData.time?.toDate().toISOString(),
        };

        setPostDisplay(formattedPost);
        setLikesCount(postData.likes || 0);
        setComments(postData.comments || []);
        setCat(postData?.categoryname);

        if (postData?.categoryname) {
          const qCategory = query(
            collection(fireDb, "blogPost"),
            where("categoryname", "==", postData.categoryname),
            where("blog_state", "==", "active")
          );
          const categorySnapshot = await getDocs(qCategory);
          const posts = categorySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setPostlist(posts.filter(p => p.slug !== slug));
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostAndRelated();
  }, [slug, router]);

  const cleanText = (text) => {
    if (!text) return '';
    let cleaned = text.replace(/<[^>]*>/g, '');
    if (typeof document !== 'undefined') {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = cleaned;
      cleaned = tempDiv.textContent || tempDiv.innerText || '';
    }
    return cleaned.replace(/\s+/g, ' ').trim();
  };

  const speakText = () => {
    if (!postDisplay?.content) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const textToSpeak = `${cleanText(postDisplay.title)}. ${cleanText(postDisplay.description)}. ${cleanText(postDisplay.content)}`;
    const newUtterance = new SpeechSynthesisUtterance(textToSpeak);
    newUtterance.onstart = () => setIsSpeaking(true);
    newUtterance.onend = () => setIsSpeaking(false);
    newUtterance.rate = 0.8;
    if (voice) newUtterance.voice = voice;

    window.speechSynthesis.speak(newUtterance);
  };

  const handleLike = async () => {
    try {
      const q = query(collection(fireDb, "blogPost"), where("slug", "==", slug));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) return;

      const postDocRef = doc(fireDb, "blogPost", querySnapshot.docs[0].id);
      const newLikesCount = likesCount + 1;
      setLikesCount(newLikesCount);
      await updateDoc(postDocRef, { likes: newLikesCount });
    } catch (error) {
      console.error("Error updating like:", error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!userName || !commentText) return;

    const newComment = { 
      userName, 
      commentText, 
      date: new Date().toISOString() 
    };

    try {
      const q = query(collection(fireDb, "blogPost"), where("slug", "==", slug));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) return;

      const postDocRef = doc(fireDb, "blogPost", querySnapshot.docs[0].id);
      setComments(prev => [...prev, newComment]);
      await updateDoc(postDocRef, { comments: arrayUnion(newComment) });
      
      setUserName("");
      setCommentText("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#793FDF]"></div>
      </div>
    );
  }

  return (
      <section className="bg-white text-slate-900 selection:bg-[#793FDF]/10 min-h-screen pb-24">
        
        {/* Header Block */}
        <div className="max-w-3xl mx-auto px-4 pt-12 md:pt-20 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#793FDF]/5 text-[#793FDF] text-xs font-semibold tracking-wider uppercase mb-6">
            <BiCategory size={14} />
            <span>
              {Array.isArray(postDisplay?.categoryname)
                ? postDisplay.categoryname.join(", ")
                : postDisplay?.categoryname}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-6 leading-[1.15]">
            {postDisplay?.title}
          </h1>
          
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed mb-8">
            {postDisplay?.description}
          </p>

          {/* Inline Meta Info & Controls */}
          <div className="flex flex-wrap items-center justify-center gap-4 py-4 border-y border-slate-200/80 text-sm font-medium text-slate-500 mb-10">
            <span className="flex items-center gap-1.5">
              <IoTimeOutline className="text-slate-400" />
              {postDisplay?.timetake || "3"} min read
            </span>
            <span className="text-slate-300">•</span>
            <button
              onClick={speakText}
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-[#793FDF] text-white px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 shadow-sm"
            >
              <span>{isSpeaking ? 'Stop Reading' : 'Listen to Article'}</span>
              {isSpeaking ? <IoMdVolumeHigh size={15} /> : <IoMdVolumeOff size={15} />}
            </button>
          </div>
        </div>

        {/* Cinematic Cover Banner Container */}
        <div className="max-w-5xl mx-auto px-4 mb-12 md:mb-16">
          {postDisplay?.coverimages && (
            <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden rounded-2xl shadow-xl shadow-slate-200/50 group">
              <Image
                className="w-full h-full object-contain transform transition-transform duration-700 ease-out group-hover:scale-105"
                src={postDisplay.coverimages}
                alt={postDisplay.cialt || "Cover Image"}
                fill
                priority
              />
            </div>
          )}
        </div>

        {/* Article Body */}
        <div className="max-w-3xl mx-auto px-4">
          <article 
            className="prose prose-slate prose-lg max-w-none text-slate-800 leading-relaxed tracking-normal font-normal
              [&>p]:mb-6 [&>p]:leading-8 [&_a]:text-[#793FDF] [&_a]:underline [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-10 [&_h2]:mb-4"
            dangerouslySetInnerHTML={{ __html: postDisplay?.content }}
          />

          {/* Dynamic Floating Action Row */}
          <div className="flex gap-4 py-6 my-12 border-y border-slate-200/80">
            <button 
              onClick={handleLike} 
              className="flex gap-2 items-center px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-full text-sm font-semibold transition-colors shadow-sm"
            >
              <GrLike className="text-slate-600 hover:text-[#793FDF] transition-colors" />
              <span>{likesCount} Likes</span>
            </button>
            <button 
              onClick={() => setCommentShow(!commentShow)} 
              className={`flex gap-2 items-center px-4 py-2 rounded-full text-sm font-semibold border transition-all shadow-sm ${
                commentShow 
                  ? 'bg-[#793FDF] border-[#793FDF] text-white' 
                  : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
              }`}
            >
              <FaRegComment className={commentShow ? 'text-white' : 'text-slate-600'} />
              <span>{comments.length} Comments</span>
            </button>
          </div>

          {/* Modern Minimalist Comment Drawer */}
          {commentShow && (
            <div className="mt-8 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm mb-16 animate-fadeIn">
              <h4 className="text-base font-bold uppercase tracking-wider text-slate-400 mb-4">Leave a Response</h4>
              <form className="flex flex-col gap-4" onSubmit={handleCommentSubmit}>
                <textarea
                  placeholder="What are your thoughts on this style trend?"
                  required
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="w-full h-28 rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#793FDF]/20 focus:border-[#793FDF] resize-none placeholder-slate-400 transition-all bg-slate-50/50"
                />
                <div className="flex flex-wrap gap-3 items-center justify-between">
                  <input
                    type="text"
                    placeholder="Your Name"
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="flex-1 min-w-[200px] rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#793FDF]/20 focus:border-[#793FDF] transition-all bg-slate-50/50"
                  />
                  <button 
                    className="bg-[#793FDF] hover:bg-[#6531be] text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-sm" 
                    type="submit"
                  >
                    Publish Response
                  </button>
                </div>
              </form>

              {/* Comments Feed */}
              {comments.length > 0 && (
                <div className="mt-10 pt-6 border-t border-slate-100">
                  <p className="text-lg font-bold text-slate-900 mb-6">Responses ({comments.length})</p>
                  <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                    {comments.map((comment, index) => (
                      <div key={index} className="p-4 bg-slate-50 rounded-xl border border-slate-100/80">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-sm text-slate-900">{comment.userName}</span>
                          <span className="text-xs text-slate-400">{new Date(comment.date).toLocaleDateString()}</span>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">{comment.commentText}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Lookbook Style Related Posts Grid */}
          {postlist.length > 0 && (
            <div className="pt-12 border-t border-slate-200/80 mt-16">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-black tracking-tight text-slate-900">You Might Also Like</h3>
                <span className="h-px bg-slate-200 flex-1 ml-6 hidden sm:block"></span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {postlist.slice(0, 4).map((post) => (
                  <div key={post.id} className="group flex flex-col bg-white border border-slate-100 rounded-2xl overflow-hidden p-3 shadow-sm hover:shadow-md transition-all duration-300">
                    <Link href={`/blog/posts/${post.slug.toLowerCase().replace(/ /g, "-")}`} className="flex flex-col h-full">
                      <div className="relative rounded-xl overflow-hidden aspect-[16/10] bg-slate-100 mb-4">
                        <Image
                          className="object-cover w-full h-full transform transition-transform duration-500 ease-out group-hover:scale-105"
                          src={post.coverimages || '/fallback.jpg'}
                          alt={post.cialt || "Related post"}
                          fill
                        />
                      </div>
                      <div className="flex flex-col flex-1 px-1 justify-between">
                        <p className="font-extrabold text-slate-900 group-hover:text-[#793FDF] text-base leading-snug line-clamp-2 transition-colors">
                          {post.title}
                        </p>
                        <span className="text-[11px] font-bold uppercase tracking-widest text-[#793FDF] mt-3 block">
                          View Look →
                        </span>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>
  );
}