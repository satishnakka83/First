"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, User, Mail, ArrowRight, CheckCircle2, Loader2, Sparkles, Building2 } from "lucide-react";

export default function MerchantCTA() {
  const [formData, setFormData] = useState({ name: "", user_phone: "", email: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("https://dev.zuget.com/site/merchant-enquiries", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json", 
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.status === "success") {
        setStatus("success");
        setMessage(data.message || "Merchant details added successfully !!");
        setFormData({ name: "", user_phone: "", email: "" });
      } else {
        throw new Error(data.message || "Something went wrong.");
      }
    } catch (err) {
      setStatus("error");
      setMessage(err.message || "Failed to connect to server.");
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <section className="w-full py-12 px-5 md:px-12 lg:px-24 bg-white relative overflow-hidden">
      {/* Delicate, High-End Ambient Background Elements */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none z-0" 
        style={{ 
          backgroundImage: 'radial-gradient(#000000 1.5px, transparent 1.5px)', 
          backgroundSize: '32px 32px' 
        }} 
      />
      <div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vh] bg-[#793FDF]/5 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[45vw] h-[45vh] bg-indigo-100 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
        
        {/* LEFT COLUMN: ELEGANT TEXT & BRANDING */}
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ staggerChildren: 0.15 }}
          className="lg:col-span-6 space-y-6 text-center lg:text-left"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-[#793FDF]/5 border border-[#793FDF]/10 text-[#793FDF] text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full shadow-sm backdrop-blur-md">
            <Sparkles size={13} className="text-[#793FDF]" /> ZUGET FOR BUSINESS
          </motion.div>

          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
            Empower your boutique.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#793FDF] to-indigo-600">
              Multiply your sales.
            </span>
          </motion.h2>

          <motion.p variants={fadeInUp} className="text-black text-base md:text-lg max-w-lg font-medium leading-relaxed">
            Have questions about cataloging, faster payouts, or setups? Drop your details here. A dedicated growth partner will step in and give you a structured brief.
          </motion.p>

          <motion.div variants={fadeInUp} className="pt-4 grid grid-cols-2 gap-4 max-w-sm mx-auto lg:mx-0">
            <div className="border border-slate-100 bg-slate-50/50 p-4 rounded-2xl shadow-sm backdrop-blur-sm">
              <p className="text-2xl font-black text-slate-900">30 Mins</p>
              <p className="text-xs font-bold text-slate-500 mt-0.5">Ultra Fast Delivery</p>
            </div>
            <div className="border border-slate-100 bg-slate-50/50 p-4 rounded-2xl shadow-sm backdrop-blur-sm">
              <p className="text-2xl font-black text-slate-900">500+</p>
              <p className="text-xs font-bold text-slate-500 mt-0.5">Boutiques onboarded</p>
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN: REIMAGINED MINIMALIST LIGHT CARD */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-6 w-full max-w-lg mx-auto"
        >
          <div className="relative border border-slate-200/60 bg-white/80 backdrop-blur-2xl p-8 md:p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)]">
            
            <AnimatePresence mode="wait">
              {status !== "success" ? (
                <motion.form 
                  key="merchant-form"
                  onSubmit={handleSubmit} 
                  className="space-y-5"
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                      <Building2 size={20} className="text-[#793FDF]" /> Request a Callback
                    </h3>
                    <p className="text-sm font-medium text-slate-500">Provide details for quick callback assistance.</p>
                  </div>

                  {/* Name Input */}
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Full Name"
                      className="w-full pl-11 pr-4 py-3.5 bg-slate-50/80 border border-slate-200/80 text-slate-900 placeholder-slate-400 text-sm font-medium rounded-xl focus:outline-none focus:border-[#793FDF] focus:bg-white focus:ring-2 focus:ring-[#793FDF]/10 transition-all duration-300"
                    />
                  </div>

                  {/* Phone Input */}
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                      type="tel"
                      name="user_phone"
                      required
                      pattern="[0-9]{10}"
                      value={formData.user_phone}
                      onChange={handleChange}
                      placeholder="Mobile Number (10 digits)"
                      className="w-full pl-11 pr-4 py-3.5 bg-slate-50/80 border border-slate-200/80 text-slate-900 placeholder-slate-400 text-sm font-medium rounded-xl focus:outline-none focus:border-[#793FDF] focus:bg-white focus:ring-2 focus:ring-[#793FDF]/10 transition-all duration-300"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email Address"
                      className="w-full pl-11 pr-4 py-3.5 bg-slate-50/80 border border-slate-200/80 text-slate-900 placeholder-slate-400 text-sm font-medium rounded-xl focus:outline-none focus:border-[#793FDF] focus:bg-white focus:ring-2 focus:ring-[#793FDF]/10 transition-all duration-300"
                    />
                  </div>

                  {/* Server Validation Error */}
                  {status === "error" && (
                    <p className="text-red-500 text-xs font-bold px-1">{message}</p>
                  )}

                  {/* Elegantly Styled Action Button */}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full h-12 bg-gradient-to-r from-[#793FDF] to-[#602ebd] text-white rounded-xl font-bold text-sm shadow-[0_6px_20px_rgba(121,63,223,0.25)] hover:shadow-[0_8px_25px_rgba(121,63,223,0.35)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2 group disabled:pointer-events-none disabled:opacity-50"
                  >
                    {status === "loading" ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        Schedule Connect 
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                /* SOPHISTICATED SUCCESS STATE VIEW */
                <motion.div 
                  key="success-screen"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-10 flex flex-col items-center text-center space-y-4"
                >
                  <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-500 shadow-sm">
                    <CheckCircle2 size={30} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Callback Scheduled!</h3>
                  <p className="text-slate-500 text-sm max-w-xs font-semibold leading-relaxed">
                    {message} An executive will reach out to you shortly.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="text-xs font-bold text-[#793FDF] bg-[#793FDF]/5 hover:bg-[#793FDF]/10 px-4 py-2.5 rounded-xl transition-colors border border-[#793FDF]/10 mt-2"
                  >
                    Submit Another Query
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </motion.div>

      </div>
    </section>
  );
}