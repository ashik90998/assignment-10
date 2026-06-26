"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@heroui/button";

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "https://regencyhealthcare.in/wp-content/uploads/2018/08/blood-donation-3.png",
      title: "Donate Blood, Every Life Counts",
      description: "Your single drop of blood can bring back a smile to someone's face. Join our community today.",
      primary: "Join as a Donor",
      primaryLink: "/register",
      secondary: "Search Donors",
      secondaryLink: "/search",
    },
    {
      image: "https://media.assettype.com/gulfnews%2Fimport%2F2021%2F02%2F21%2FBlood-donation-_177c4fe2ee2_large.jpg?w=480&auto=format%2Ccompress&fit=max",
      title: "Emergency Blood Requests",
      description: "Countless people are looking for blood every day. Check urgent requests and stand beside them.",
      primary: "View Requests",
      primaryLink: "/donation-requests",
      secondary: "Search Donors",
      secondaryLink: "/search",
    },
    {
      image: "https://medicine.tufts.edu/sites/g/files/lrezom436/files/styles/large/public/tufts_feeds/news/220124_blood_type.jpg?itok=pvcZ4HMP",
      title: "Your Blood Can Save a Life",
      description: "A single blood donation takes about an hour and can save or sustain up to three lives.",
      primary: "Join as a Donor",
      primaryLink: "/register",
      secondary: "Give Fund",
      secondaryLink: "/funding",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide((p) => (p + 1) % slides.length), 6000); // Cinematic 6 seconds interval
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative w-full h-[65vh] md:h-[88vh] overflow-hidden bg-slate-950 flex items-center justify-center select-none">

      {/* 🎬 CINEMATIC SLIDER BACKGROUND & OVERLAYS */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Ken Burns Zoom & Pan Animation For Images */}
          <motion.div
            initial={{ scale: 1.15, x: -10, y: -5 }}
            animate={{ scale: 1, x: 0, y: 0 }}
            transition={{ duration: 6, ease: "easeOut" }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
          />

          {/* Luxury Gradient Dark Masks */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent z-[1]" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/30 z-[1]" />

          {/* Neon Subtle Light Leak */}
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-red-600/15 rounded-full blur-[150px] z-[2] pointer-events-none" />
        </motion.div>
      </AnimatePresence>

      {/* 🏷️ SLIDE CONTENT CONTAINER */}
      <div className="absolute inset-0 max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center h-full z-10">
        <div className="max-w-3xl text-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
                exit: { opacity: 0, transition: { duration: 0.4 } }
              }}
              className="space-y-6 md:space-y-8"
            >
              {/* Animated Top Tiny Badge */}
              <motion.div
                variants={{
                  hidden: { y: -15, opacity: 0 },
                  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 120 } }
                }}
                className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold tracking-widest text-red-400 uppercase"
              >
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> Emergency SaveBlood Platform
              </motion.div>

              {/* Title Animation */}
              <motion.h1
                variants={{
                  hidden: { y: 30, opacity: 0, filter: "blur(5px)" },
                  visible: { y: 0, opacity: 1, filter: "blur(0px)", transition: { duration: 0.6, ease: "easeOut" } }
                }}
                className="text-4xl md:text-7xl font-black tracking-tight leading-[1.1] text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-slate-300 drop-shadow-2xl"
              >
                {slides[currentSlide].title.split(", ").map((part, idx) => (
                  <span key={idx} className={idx === 1 ? "text-red-500 block md:inline" : ""}>
                    {idx === 1 ? `, ${part}` : part}
                  </span>
                ))}
              </motion.h1>

              {/* Description Animation */}
              <motion.p
                variants={{
                  hidden: { y: 25, opacity: 0 },
                  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
                }}
                className="text-base md:text-xl text-slate-300 max-w-xl font-medium leading-relaxed drop-shadow"
              >
                {slides[currentSlide].description}
              </motion.p>

              {/* Action Buttons Animation */}
              <motion.div
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 90 } }
                }}
                className="flex flex-wrap gap-4 pt-2"
              >
                <Link href={slides[currentSlide].primaryLink}>
                  <Button
                    className="relative group bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-black text-base px-10 py-7 rounded-xl shadow-xl shadow-red-600/20 active:scale-95 transition-all duration-300 overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {slides[currentSlide].primary} →
                    </span>
                    <span className="absolute inset-0 bg-white/20 scale-0 group-hover:scale-100 rounded-xl transition-transform duration-500 origin-center" />
                  </Button>
                </Link>

                <Link href={slides[currentSlide].secondaryLink}>
                  <Button
                    className="bg-white/5 hover:bg-white/10 text-white font-bold text-base px-10 py-7 rounded-xl border border-white/10 backdrop-blur-md hover:border-white/30 shadow-lg active:scale-95 transition-all duration-300"
                  >
                    {slides[currentSlide].secondary}
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* 🔢 LUXURY PROGRESS INDICATOR DOTS */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center items-center gap-4">
        {slides.map((_, index) => {
          const isActive = currentSlide === index;
          return (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className="relative p-2 focus:outline-none group"
              aria-label={`Go to slide ${index + 1}`}
            >
              <div className="h-2.5 rounded-full bg-white/20 overflow-hidden transition-all duration-500 w-2.5 group-hover:w-6 group-hover:bg-white/40 relative">
                {/* Active Pill Smooth Stretch Fill Effect */}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute inset-0 h-full bg-gradient-to-r from-red-500 to-rose-500 rounded-full"
                    style={{ width: "24px" }}
                    transition={{ type: "spring", stiffness: 150, damping: 18 }}
                  />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}