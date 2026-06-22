"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, HeartFill, ShieldCheck, Person } from "@gravity-ui/icons";
import { BiTrophy } from "react-icons/bi";

const stories = [
    {
        name: "Arif Rahman",
        role: "Recipient (Thalassemia Warrior)",
        tag: "Urgent Moment",
        story: "I need O-negative blood every month. When I couldn't find it anywhere at midnight, a donor from this platform came and saved my life. I am forever grateful.",
        date: "May 10, 2026",
        bloodType: "O-",
    },
    {
        name: "Nusrat Jahan",
        role: "Mother of Nabil (Road Accident Survivor)",
        tag: "Successful Surgery",
        story: "My son needed 4 bags of AB-positive blood for his emergency operation. Within just 20 minutes, two donors arrived at the hospital. It felt like a miracle.",
        date: "April 24, 2026",
        bloodType: "AB+",
    },
    {
        name: "Dr. Sajjad Hossain",
        role: "Senior Surgeon, DMCH",
        tag: "Medical Impact",
        story: "Since the implementation of this online blood-matching system, crisis-related delays in our emergency OT have dropped by nearly 30%. It truly is a lifesaver.",
        date: "March 02, 2026",
        bloodType: "B+",
    },
];

export default function SavedLivesSection() {
    return (
        <section className="py-24 bg-white dark:bg-[#0B1F3A] transition-colors duration-500 relative overflow-hidden">

            {/* Ambient Background Effects (Only visible in dark mode for theme depth) */}
            <div className="absolute inset-0 pointer-events-none hidden dark:block">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-red-600/10 blur-[150px] rounded-full" />
                <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-red-500/5 blur-[120px] rounded-full" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/40 rounded-full text-xs font-bold uppercase tracking-wider"
                    >
                        <HeartFill className="w-3.5 h-3.5 animate-pulse text-red-500" />
                        Our Real Impact
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-200"
                    >
                        Successfully <span className="text-red-600 dark:text-red-500">Saved Lives</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-slate-600 dark:text-slate-300 text-base md:text-lg"
                    >
                        Every drop of blood brings a smile back to a face. Here are some of the real stories of those who got a second chance at life through your support.
                    </motion.p>
                </div>

                {/* Impact Counter Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-20">
                    {[
                        { icon: Heart, count: "12,450+", label: "Lives Saved", color: "text-red-500" },
                        { icon: Person, count: "25,000+", label: "Registered Donors", color: "text-blue-500 dark:text-blue-400" },
                        { icon: ShieldCheck, count: "99.8%", label: "Successful Matches", color: "text-emerald-600 dark:text-emerald-400" },
                        { icon: BiTrophy, count: "45+", label: "Partner Hospitals", color: "text-amber-600 dark:text-amber-400" },
                    ].map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="p-6 md:p-8 bg-slate-100 dark:bg-[#0F294A] border border-slate-100 dark:border-slate-800/60 rounded-2xl text-center space-y-3 shadow-sm dark:shadow-xl backdrop-blur-sm"
                        >
                            <div className="w-12 h-12 mx-auto rounded-xl bg-white dark:bg-slate-900/50 flex items-center justify-center shadow-sm dark:shadow-none">
                                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                            </div>
                            <h3 className="text-2xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white">{stat.count}</h3>
                            <p className="text-xs md:text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Real Stories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {stories.map((item, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 }}
                            whileHover={{ y: -6 }}
                            className="flex flex-col justify-between p-8 bg-slate-50/50 dark:bg-gradient-to-b dark:from-[#0F294A] dark:to-[#0B1F3A] border border-slate-300 dark:border-slate-800 hover:border-red-300 dark:hover:border-red-900/40 rounded-2xl transition-all duration-300 group shadow-sm dark:shadow-md"
                        >
                            <div className="space-y-5">
                                {/* Top Tag & Blood Group */}
                                <div className="flex justify-between items-center">
                                    <span className="px-3 py-1 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/30 text-xs font-bold rounded-md">
                                        {item.tag}
                                    </span>
                                    <span className="w-9 h-9 bg-red-600 text-white font-black text-sm rounded-full flex items-center justify-center shadow-lg shadow-red-600/30">
                                        {item.bloodType}
                                    </span>
                                </div>

                                {/* Main Quote Story */}
                                <p className="text-slate-700 dark:text-slate-200 text-sm md:text-base leading-relaxed italic font-medium">
                                    "{item.story}"
                                </p>
                            </div>

                            {/* User Profile Footer */}
                            <div className="pt-6 mt-6 border-t border-slate-200/60 dark:border-slate-800/60 flex justify-between items-center">
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                                        {item.name}
                                    </h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.role}</p>
                                </div>
                                <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">{item.date}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}