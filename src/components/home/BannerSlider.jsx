"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@heroui/button"; // আপনার Hero UI এর বাটন সাব-প্যাকেজ

export default function Banner() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            image: "https://regencyhealthcare.in/wp-content/uploads/2018/08/blood-donation-3.png", 
            title: "Donate Blood, Every Life Counts",
            description: "Your single drop of blood can bring back a smile to someone's face. Join our community today.",
            buttonText: "Find Donors",
        },
        {
            image: "https://media.assettype.com/gulfnews%2Fimport%2F2021%2F02%2F21%2FBlood-donation-_177c4fe2ee2_large.jpg?w=480&auto=format%2Ccompress&fit=max", 
            title: "Emergency Blood Requests",
            description: "Countless people are looking for blood every day. Check urgent requests and stand beside them.",
            buttonText: "View Requests",
        },
        {
            image: "https://www.shutterstock.com/shutterstock/videos/3503857049/thumb/1.jpg?ip=x480", // ইমেজ ৩
            title: "Fund Our Noble Cause",
            description: "Help us manage campaigns and storage facilities by donating a small amount to our funding program.",
            buttonText: "Donate Fund",
        },
        {
            image: "https://medicine.tufts.edu/sites/g/files/lrezom436/files/styles/large/public/tufts_feeds/news/220124_blood_type.jpg?itok=pvcZ4HMP", // ইমেজ ৩
            title: "Your blood can save a life",
            description: "A single blood donation takes about an hour and can save or sustain up to three lives",
            buttonText: "Save a life",
        },
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [slides.length]);

    return (
        <div className="relative w-full h-[60vh] md:h-[85vh] overflow-hidden bg-slate-900">
            
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
                >
                    
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/50 to-transparent" />


                    <div className="absolute inset-0 max-w-7xl mx-auto px-6 flex flex-col justify-center h-full z-10">
                        <div className="max-w-2xl text-white space-y-4 md:space-y-6">
                            
                            <motion.h1
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                className="text-3xl md:text-6xl font-extrabold tracking-tight text-white leading-tight"
                            >
                                {slides[currentSlide].title.split(",")[0]}
                                <span className="text-red-500 block md:inline">
                                    {slides[currentSlide].title.split(",")[1] || ""}
                                </span>
                            </motion.h1>


                            <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                                className="text-sm md:text-lg text-slate-200 font-medium max-w-xl"
                            >
                                {slides[currentSlide].description}
                            </motion.p>


                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.6, duration: 0.5 }}
                                className="pt-2"
                            >
                                <Button
                                    className="bg-red-600 hover:bg-red-700 text-white font-bold text-sm md:text-base px-6 md:px-8 py-4 md:py-6 rounded-xl shadow-lg shadow-red-600/30 transition-all hover:scale-[1.02]"
                                >
                                    {slides[currentSlide].buttonText}
                                </Button>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>


            <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center gap-3">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none ${currentSlide === index ? "w-8 bg-red-600" : "w-2.5 bg-white/50 hover:bg-white"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}