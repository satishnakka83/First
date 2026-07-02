"use client"
// import CustomerHeaderMain from '@/components/CustomerHeaderMain';
import Footer from '@/components/common/Footer';
import React, { useState } from 'react';

const CATS = {
  men: [
    { t: "Topwear", i: ["T-Shirt", "Shirt", "Sweatshirt", "Jacket", "Blazer", "Hoodie"] }, 
    { t: "Bottomwear", i: ["Jeans", "Shorts", "Trousers", "Cargo Pants"] }, 
    { t: "Active & Sports", i: ["Tracksuit", "Sportswear", "Swimwear"] }, 
    { t: "Traditional & Loungewear", i: ["Kurta", "Ethnic Wear", "Nightwear"] }, 
    { t: "Featured Collections", i: ["New Arrivals", "Best Sellers", "Daily Drops", "Trending Now"] }
  ],
  women: [
    { t: "Topwear & Dresses", i: ["Top", "Dress", "Sweatshirt", "Jacket", "Sweater", "Frocks"] }, 
    { t: "Bottomwear", i: ["Skirt", "Leggings", "Palazzo", "Capris"] }, 
    { t: "Traditional Wear", i: ["Kurti", "Ethnic Wear", "Saree"] }, 
    { t: "Co-ords & Utilities", i: ["Jumpsuit", "Dungarees"] }, 
    { t: "Featured Collections", i: ["New Arrivals", "Daily Drops", "Festive Specials", "Western Edit"] }
  ],
  footwear: [
    { t: "Men's Footwear", i: ["Sports Shoes", "Casual Shoes", "Formal Shoes", "Sneakers", "Sandals & Floaters", "Flip Flops"] }, 
    { t: "Women's Footwear", i: ["Flats & Ballerinas", "Heels & Wedges", "Casual Shoes", "Sports Shoes", "Sneakers", "Sandals & Slides"] }, 
    { t: "Kids Footwear", i: ["School Shoes", "Sports Shoes", "Sandals & Loafers", "Flip Flops & Slides"] }, 
    { t: "Essentials", i: ["Socks", "Shoe Care Kits", "Insoles"] }, 
    { t: "Trending Styles", i: ["Chunky Sneakers", "Loafers", "Slider Packs", "Active Run"] }
  ]
};

export default function AboutUs() {
  const [activeTab, setActiveTab] = useState('shoppers');

  const stats = [
    { num: "500+", lbl: "Local Stores" },
    { num: "30", lbl: "Min Avg Delivery" },
    { num: "12.5K+", lbl: "Happy Shoppers" },
    { num: "1", lbl: "City, Done Right" }
  ];

  const timeline = [
    { tag: "The Spark", title: "Fashion was stuck in \"1-3 days\"", desc: "While every other category in India had gone instant, clothing still meant placing an order and waiting — or settling for whatever was in a nearby mall. We thought your neighbourhood's best Stores deserved better reach, and you deserved better speed." },
    { tag: "The Build", title: "A hyperlocal network, not a warehouse", desc: "Instead of building giant dark stores, we plugged directly into local Stores already trusted in their neighbourhoods — giving them an online storefront and giving riders short, fast routes instead of long warehouse-to-door hauls." },
    { tag: "The Proof", title: "Hyderabad, first and fully", desc: "We launched in Hyderabad and stayed focused — onboarding 500+ Stores, adding virtual try-on, and building instant returns so trying something risk-free became normal, not a hassle." },
    { tag: "What's Next", title: "From one city to many", desc: "The model is built to repeat: local stores, short routes, fast delivery. Hyderabad is the proof of concept — and the playbook for every city after it." }
  ];

  const values = [
    { id: "SPEED", title: "30 minutes, genuinely", desc: "Short routes from neighbourhood Stores mean delivery times we can actually stand behind — not a marketing number." },
    { id: "TRUST", title: "Try before you keep", desc: "Virtual try-on and instant at-home returns mean you never commit to an outfit you haven't really seen on yourself." },
    { id: "LOCAL", title: "Real Stores, real stock", desc: "Every store on Zuget is a real, verified business in your city — not a faceless warehouse SKU." },
    { id: "FAIR", title: "Built for both sides", desc: "Transparent payouts for partner stores, fair prices for shoppers. Growth for one shouldn't come at the cost of the other." },
    { id: "HONEST", title: "No inflated promises", desc: "Delivery times may shift during peak hours or for distant pin codes — we'd rather tell you upfront than overpromise." },
    { id: "PEOPLE", title: "Customer-first, always", desc: "Every feature we ship — from cataloguing tools to support response times — is built around what actually helps you, not what looks good on a roadmap." }
  ];

  return (
    <div className="bg-[#FAF6EF] text-[#15121C] antialiased selection:bg-[#793FDF] selection:text-white lg:pt-16 pt-10">
      {/* <CustomerHeaderMain/> */}
      {/* HERO SECTION */}
      <section className="relative px-6 md:px-12 lg:px-20 pt-16 pb-24 border-b border-[#15121C]/12 bg-[radial-gradient(ellipse_700px_420px_at_85%_-10%,rgba(121,63,223,0.16),transparent_60%)]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#793FDF] uppercase">
              <span className="w-2 h-2 rounded-full bg-[#FF6A45]" />
              About Zuget · Hyderabad
            </div>
            <h1 className="text-5xl sm:text-6xl xl:text-7xl font-extrabold uppercase tracking-tight  leading-[0.95]">
              We turned <span className="text-[#793FDF]">fashion</span><br />into something<br />on-demand.
            </h1>
            <p className="text-lg text-[#6B6577] max-w-xl leading-relaxed">
              Zuget connects 500+ local Stores across Hyderabad to a single app — so the outfit you want is never more than 30 minutes from your door, with try-on-at-home and instant returns built in.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <a href="#" className="bg-[#15121C] text-[#FAF6EF] font-bold px-7 py-3.5 rounded-full hover:bg-[#793FDF] transform hover:-translate-y-0.5 transition-all duration-200 shadow-md">
                Shop Now →
              </a>
              <a href="#" className="border-2 border-[#15121C] text-[#15121C] font-bold px-7 py-3.5 rounded-full hover:bg-[#15121C] hover:text-[#FAF6EF] transition-all duration-200">
                Start Selling
              </a>
            </div>
          </div>

          {/* Map Route Animation Element */}
          <div className="lg:col-span-5 max-w-md mx-auto w-full">
            <div className="bg-[#15121C] text-[#FAF6EF] p-8 rounded-[28px] shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#fff_1px,transparent_1px)] bg-[size:14px_14px] opacity-[0.06]" />
              <div className="relative z-10 space-y-6">
                <div>
                  <span className="text-xs font-bold tracking-widest text-[#C9B6F2] uppercase block mb-1">Live Order</span>
                  <h3 className="text-2xl font-bold uppercase tracking-tight">Store to doorstep</h3>
                </div>
                
                <div className="space-y-6 relative before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-[2px] before:bg-dashed before:border-white/20">
                  <div className="flex gap-4 relative">
                    <div className="w-[34px] h-[34px] rounded-full bg-[#793FDF] border-2 border-white/25 shrink-0 flex items-center justify-center font-extrabold text-sm text-white">01</div>
                    <div>
                      <h4 className="font-bold text-sm text-white">Local Store confirms</h4>
                      <p className="text-xs text-[#C7C2D1]">Nearest partner store in your area</p>
                    </div>
                  </div>
                  <div className="flex gap-4 relative">
                    <div className="w-[34px] h-[34px] rounded-full bg-[#FF6A45] border-2 border-white/25 shrink-0 flex items-center justify-center font-extrabold text-sm text-white">02</div>
                    <div>
                      <h4 className="font-bold text-sm text-white">Rider picks up</h4>
                      <p className="text-xs text-[#C7C2D1]">Packed and dispatched instantly</p>
                    </div>
                  </div>
                  <div className="flex gap-4 relative">
                    <div className="w-[34px] h-[34px] rounded-full bg-[#3FB37F] border-2 border-white/25 shrink-0 flex items-center justify-center font-extrabold text-sm text-white">03</div>
                    <div>
                      <h4 className="font-bold text-sm text-white">Delivered to you</h4>
                      <p className="text-xs text-[#C7C2D1]">Try it on, keep it or return it on the spot</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-white/15">
                  <div>
                    <div className="text-4xl font-extrabold text-[#FF6A45]">30</div>
                    <div className="text-[10px] uppercase tracking-wider text-[#C7C2D1]">Minutes, Door to Door</div>
                  </div>
                  <div>
                    <div className="text-4xl font-extrabold text-[#793FDF]">500+</div>
                    <div className="text-[10px] uppercase tracking-wider text-[#C7C2D1]">Stores Live</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* STAT STRIP */}
      <section className="bg-[#15121C] text-[#FAF6EF] py-10 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="border-r last:border-0 border-white/12 py-2">
              <div className="text-4xl md:text-5xl font-extrabold text-[#FF6A45]">{stat.num}</div>
              <div className="text-[11px] uppercase tracking-widest text-[#C7C2D1] mt-2">{stat.lbl}</div>
            </div>
          ))}
        </div>
      </section>

      {/* STORY / TIMELINE SECTION */}
      <section className="bg-[#F3EBDD] py-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-5xl mx-auto space-y-16">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#793FDF]">Our Story</span>
            <h2 className="text-4xl md:text-5xl font-extrabold uppercase tracking-tight">Why wait for fashion when everything else is instant?</h2>
            <p className="text-[#6B6577] text-base leading-relaxed">
              Zuget started with one frustration: food, groceries and cabs had all gone instant — fashion hadn't. We set out to fix that for one city first, properly, before anywhere else.
            </p>
          </div>
          
          <div className="border-l-2 border-dashed border-[#793FDF] pl-8 sm:pl-12 space-y-12">
            {timeline.map((item, idx) => (
              <div key={idx} className="relative space-y-2 group">
                <div className="absolute -left-[41px] sm:-left-[57px] top-1 w-4 h-4 rounded-full bg-[#FF6A45] border-[3px] border-[#F3EBDD] ring-2 ring-[#793FDF]" />
                <span className="text-xs font-extrabold tracking-wider text-[#FF6A45] uppercase block">{item.tag}</span>
                <h4 className="text-2xl font-extrabold uppercase tracking-tight text-[#15121C]">{item.title}</h4>
                <p className="text-[#6B6577] text-sm sm:text-base max-w-2xl leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION / VISION SECTION */}
      <section className="py-24 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#15121C] text-[#FAF6EF] rounded-3xl p-10 lg:p-12 space-y-4">
            <span className="text-3xl block">🎯</span>
            <h3 className="text-3xl font-extrabold uppercase tracking-tight">Our Mission</h3>
            <p className="text-sm sm:text-base leading-relaxed text-[#FAF6EF]/85">
              To make fashion as instant as everything else in your life — so the right outfit is never the reason you're late, underdressed, or scrambling. We do this by giving local Stores the reach of an app and giving shoppers the speed of same-hour delivery.
            </p>
          </div>
          <div className="bg-[#793FDF] text-white rounded-3xl p-10 lg:p-12 space-y-4">
            <span className="text-3xl block">🔭</span>
            <h3 className="text-3xl font-extrabold uppercase tracking-tight">Our Vision</h3>
            <p className="text-sm sm:text-base leading-relaxed text-white/85">
              To become India's most trusted hyperlocal fashion network — one where every neighbourhood Store has a digital storefront, and every shopper gets premium fashion delivered faster than it takes to decide what to wear.
            </p>
          </div>
        </div>
      </section>

      {/* VALUES SECTION */}
      <section className="bg-[#F3EBDD] py-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#793FDF]">What We Stand For</span>
            <h2 className="text-4xl font-extrabold uppercase tracking-tight">The promise behind every delivery</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((val, idx) => (
              <div key={idx} className="bg-[#FAF6EF] border border-[#15121C]/12 rounded-2xl p-8 hover:border-[#793FDF] hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="text-xs font-bold text-[#FF6A45] tracking-widest font-mono">{val.id}</div>
                  <h4 className="text-xl font-extrabold text-[#15121C]">{val.title}</h4>
                  <p className="text-[#6B6577] text-sm leading-relaxed">{val.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AUDIENCES TABBED GRID SYSTEM */}
      <section className="py-24 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto space-y-12">
        <div className="space-y-3 text-center sm:text-left">
          <span className="text-xs font-bold uppercase tracking-widest text-[#793FDF]">Built For Two Audiences</span>
          <h2 className="text-4xl font-extrabold uppercase tracking-tight">One app, two ways to win</h2>
          <p className="text-[#6B6577] max-w-xl text-sm">Zuget exists to serve shoppers and the Stores they love — equally.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Shoppers Segment Layout */}
          <div className="bg-[#FAF6EF] border border-[#15121C]/12 rounded-3xl p-8 lg:p-10 space-y-6 flex flex-col justify-between shadow-sm">
            <div className="space-y-4">
              <span className="bg-[#793FDF]/12 text-[#793FDF] text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-wider inline-block">For Shoppers</span>
              <h3 className="text-3xl font-extrabold uppercase tracking-tight">Shop your city's best, fast</h3>
              <ul className="space-y-3.5 border-t border-[#15121C]/12 pt-4">
                <li className="text-sm font-semibold text-slate-700 flex items-start gap-2.5">
                  <span className="text-[#FF6A45] font-bold">→</span> 500+ local Stores in one app
                </li>
                <li className="text-sm font-semibold text-slate-700 flex items-start gap-2.5">
                  <span className="text-[#FF6A45] font-bold">→</span> 30-minute average delivery
                </li>
                <li className="text-sm font-semibold text-slate-700 flex items-start gap-2.5">
                  <span className="text-[#FF6A45] font-bold">→</span> Virtual try-on before you buy
                </li>
                <li className="text-sm font-semibold text-slate-700 flex items-start gap-2.5">
                  <span className="text-[#FF6A45] font-bold">→</span> Instant at-home returns
                </li>
                <li className="text-sm font-semibold text-slate-700 flex items-start gap-2.5">
                  <span className="text-[#FF6A45] font-bold">→</span> Daily new arrivals & exclusive drops
                </li>
              </ul>
            </div>
            <a href="#" className="inline-flex font-extrabold text-sm pb-1 border-b-2 border-[#FF6A45] text-[#15121C] tracking-wide hover:text-[#793FDF] hover:border-[#793FDF] transition-colors w-max pt-6">
              Start Shopping →
            </a>
          </div>

          {/* Store Segment Layout */}
          <div className="bg-[#FAF6EF] border border-[#15121C]/12 rounded-3xl p-8 lg:p-10 space-y-6 flex flex-col justify-between shadow-sm">
            <div className="space-y-4">
              <span className="bg-[#FF6A45]/14 text-[#C8451F] text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-wider inline-block">For Stores</span>
              <h3 className="text-3xl font-extrabold uppercase tracking-tight">Sell online without the overhead</h3>
              <ul className="space-y-3.5 border-t border-[#15121C]/12 pt-4">
                <li className="text-sm font-semibold text-slate-700 flex items-start gap-2.5">
                  <span className="text-[#FF6A45] font-bold">→</span> Go live in 4 simple onboarding steps
                </li>
                <li className="text-sm font-semibold text-slate-700 flex items-start gap-2.5">
                  <span className="text-[#FF6A45] font-bold">→</span> No listing fees to get started
                </li>
                <li className="text-sm font-semibold text-slate-700 flex items-start gap-2.5">
                  <span className="text-[#FF6A45] font-bold">→</span> Transparent, auto-settled payouts
                </li>
                <li className="text-sm font-semibold text-slate-700 flex items-start gap-2.5">
                  <span className="text-[#FF6A45] font-bold">→</span> Seller analytics & growth insights
                </li>
                <li className="text-sm font-semibold text-slate-700 flex items-start gap-2.5">
                  <span className="text-[#FF6A45] font-bold">→</span> Promotional campaigns & support
                </li>
              </ul>
            </div>
            <a href="#" className="inline-flex font-extrabold text-sm pb-1 border-b-2 border-[#FF6A45] text-[#15121C] tracking-wide hover:text-[#793FDF] hover:border-[#793FDF] transition-colors w-max pt-6">
              Start Selling →
            </a>
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION FOOTER HERO BANNER */}
      <section className="px-6 pb-20 pt-0">
        <div className="bg-[#15121C] text-[#FAF6EF] rounded-[30px] p-12 md:p-16 text-center relative overflow-hidden max-w-7xl mx-auto">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#793FDF]/35 blur-[100px] rounded-full pointer-events-none" />
          <div className="relative z-10 max-w-xl mx-auto space-y-6">
            <h2 className="text-4xl md:text-5xl font-extrabold uppercase tracking-tight leading-none">Ready to move at Zuget speed?</h2>
            <p className="text-[#C7C2D1] text-base opacity-90 max-w-md mx-auto">Whether you're here to shop or here to sell — your city's fashion network is one tap away.</p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <a href="#" className="bg-[#FF6A45] text-white font-bold px-7 py-3.5 rounded-full hover:bg-white hover:text-[#15121C] transition-all duration-300">
                Download the App
              </a>
              <a href="#" className="border border-white/40 text-white font-bold px-7 py-3.5 rounded-full hover:bg-[#FAF6EF] hover:text-[#15121C] transition-all duration-300">
                List Your Store
              </a>
            </div>
          </div>
        </div>
      </section>
            {/* <Footer/> */}
    </div>
  );
}