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

    const containerVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } }
    };

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.9, y: 30 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { type: "spring", stiffness: 100, damping: 15 }
        }
    };

    return (
        <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-red-50/20 dark:from-[#030712] dark:via-[#0B1F3A] dark:to-[#020617] transition-colors duration-500 relative overflow-hidden">

            <div className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-20">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-red-600/10 blur-[140px] rounded-full animate-pulse" />
                <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-red-500/10 blur-[120px] rounded-full" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 rounded-full text-xs font-black uppercase tracking-widest backdrop-blur-md shadow-sm"
                    >
                        <HeartFill className="w-3.5 h-3.5 animate-pulse text-red-500" />
                        Our Real Impact
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-slate-50"
                    >
                        Successfully <span className="text-red-600 dark:text-red-500">Saved Lives</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-slate-500 dark:text-slate-300 text-base md:text-lg font-medium max-w-2xl mx-auto"
                    >
                        Every drop of blood brings a smile back to a face. Here are some of the real stories of those who got a second chance at life through your support.
                    </motion.p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-24">
                    {[
                        { icon: Heart, count: "12,450+", label: "Lives Saved", color: "text-red-500", bgGlow: "group-hover:shadow-[0_15px_30px_rgba(239,68,68,0.1)]" },
                        { icon: Person, count: "25,000+", label: "Registered Donors", color: "text-blue-500 dark:text-blue-400", bgGlow: "group-hover:shadow-[0_15px_30px_rgba(59,130,246,0.1)]" },
                        { icon: ShieldCheck, count: "99.8%", label: "Successful Matches", color: "text-emerald-600 dark:text-emerald-400", bgGlow: "group-hover:shadow-[0_15px_30px_rgba(16,185,129,0.1)]" },
                        { icon: BiTrophy, count: "45+", label: "Partner Hospitals", color: "text-amber-600 dark:text-amber-400", bgGlow: "group-hover:shadow-[0_15px_30px_rgba(245,158,11,0.1)]" },
                    ].map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.08, type: "spring" }}
                            whileHover={{ y: -5 }}
                            className={`p-6 md:p-8 bg-slate-100 dark:bg-[#0B1F3A]/60 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/50 rounded-2xl text-center space-y-3 shadow-xl dark:shadow-none transition-all duration-300 group ${stat.bgGlow}`}
                        >
                            <div className="w-12 h-12 mx-auto rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/40 dark:border-slate-800 flex items-center justify-center shadow-inner transition-transform group-hover:scale-110">
                                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                            </div>
                            <h3 className="text-2xl md:text-4xl font-black tracking-tight text-slate-800 dark:text-slate-50 group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors duration-300">{stat.count}</h3>
                            <p className="text-[10px] md:text-xs font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-40px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {stories.map((item, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            whileHover={{ y: -8, transition: { duration: 0.3 } }}
                            className="flex flex-col justify-between p-8 bg-white/70 dark:bg-[#0B1F3A]/60 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/40 hover:border-red-500/30 dark:hover:border-red-500/40 rounded-2xl transition-all duration-300 group shadow-xl dark:shadow-none hover:shadow-[0_25px_40px_rgba(239,68,68,0.12)] relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <span className="px-3 py-1 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/30 text-xs font-bold rounded-lg shadow-sm">
                                        {item.tag}
                                    </span>
                                    <span className="w-10 h-10 bg-gradient-to-br from-red-600 to-rose-600 text-white font-black text-sm rounded-full flex items-center justify-center shadow-lg shadow-red-600/30 animate-pulse">
                                        {item.bloodType}
                                    </span>
                                </div>

                                <p className="text-slate-600 dark:text-slate-200 text-sm md:text-base leading-relaxed italic font-medium">
                                    "{item.story}"
                                </p>
                            </div>

                            <div className="pt-6 mt-8 border-t border-slate-100 dark:border-slate-800/60 flex justify-between items-end">
                                <div>
                                    <h4 className="font-extrabold text-slate-800 dark:text-slate-50 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-300">
                                        {item.name}
                                    </h4>
                                    <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 mt-0.5">{item.role}</p>
                                </div>
                                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-wider">{item.date}</span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}