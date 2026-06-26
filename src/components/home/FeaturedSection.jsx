"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    ShieldCheck,
    Person,
    ClockFill,
    HeartPulse,
    Bell,
    Pin,
    HeartFill,
} from "@gravity-ui/icons";
import { FaHandshake } from "react-icons/fa";

export default function FeaturedSection() {
    const features = [
        {
            icon: <HeartPulse className="w-8 h-8 text-red-500" />,
            title: "Quick Blood Match",
            description: "Find the exact blood group donors near your location within minutes during emergencies.",
            stats: "2,500+",
            statsLabel: "Active Donors",
            bgHover: "hover:border-red-500/40 dark:hover:border-red-500/50 hover:shadow-[0_20px_40px_rgba(239,68,68,0.15)]",
            glowColor: "bg-red-500/10"
        },
        {
            icon: <ShieldCheck className="w-8 h-8 text-emerald-500" />,
            title: "Verified Profiles",
            description: "Every donor is verified through a strict contact and medical history check for safety.",
            stats: "100%",
            statsLabel: "Safe & Verified",
            bgHover: "hover:border-emerald-500/40 dark:hover:border-emerald-500/50 hover:shadow-[0_20px_40px_rgba(16,185,129,0.15)]",
            glowColor: "bg-emerald-500/10"
        },
        {
            icon: <Person className="w-8 h-8 text-blue-500" />,
            title: "Community Driven",
            description: "Join a massive network of blood clubs, organizations, and heroes saving lives daily.",
            stats: "15,000+",
            statsLabel: "Lives Saved",
            bgHover: "hover:border-blue-500/40 dark:hover:border-blue-500/50 hover:shadow-[0_20px_40px_rgba(59,130,246,0.15)]",
            glowColor: "bg-blue-500/10"
        },
        {
            icon: <ClockFill className="w-8 h-8 text-amber-500" />,
            title: "24/7 Real-time Support",
            description: "Get instant notifications and round-the-clock help from our dedicated support team.",
            stats: "10 Min",
            statsLabel: "Avg. Response",
            bgHover: "hover:border-amber-500/40 dark:hover:border-amber-500/50 hover:shadow-[0_20px_40px_rgba(245,158,11,0.15)]",
            glowColor: "bg-amber-500/10"
        },
        {
            icon: <Pin className="w-8 h-8 text-indigo-500" />,
            title: "Location-Based Search",
            description: "Advanced map filtering to track and reach the nearest available blood donors instantly.",
            stats: "5 KM",
            statsLabel: "Radius Match",
            bgHover: "hover:border-indigo-500/40 dark:hover:border-indigo-500/50 hover:shadow-[0_20px_40px_rgba(99,102,241,0.15)]",
            glowColor: "bg-indigo-500/10"
        },
        {
            icon: <Bell className="w-8 h-8 text-purple-500" />,
            title: "Instant Smart Alerts",
            description: "Receive push notifications and SMS alerts immediately when someone nearby requests blood.",
            stats: "1 Sec",
            statsLabel: "Alert Broadcast",
            bgHover: "hover:border-purple-500/40 dark:hover:border-purple-500/50 hover:shadow-[0_20px_40px_rgba(168,85,247,0.15)]",
            glowColor: "bg-purple-500/10"
        },
        {
            icon: <HeartFill className="w-8 h-8 text-pink-500" />,
            title: "Donor Rewards",
            description: "Earn custom digital badges, certificates, and community recognition points for every donation.",
            stats: "8,000+",
            statsLabel: "Badges Issued",
            bgHover: "hover:border-pink-500/40 dark:hover:border-pink-500/50 hover:shadow-[0_20px_40px_rgba(236,72,153,0.15)]",
            glowColor: "bg-pink-500/10"
        },
        {
            icon: <FaHandshake className="w-8 h-8 text-teal-500" />,
            title: "Hospital Partnerships",
            description: "Direct collaboration with top hospital blood banks to reduce standard authorization delays.",
            stats: "120+",
            statsLabel: "Partner Labs",
            bgHover: "hover:border-teal-500/40 dark:hover:border-teal-500/50 hover:shadow-[0_20px_40px_rgba(20,184,166,0.15)]",
            glowColor: "bg-teal-500/10"
        }
    ];

    const containerVariants = {
        hidden: {},
        visible: {
            transition: { staggerChildren: 0.08 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 40, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { type: "spring", stiffness: 100, damping: 16 }
        }
    };

    const bgParticleVariants = {
        animate1: {
            x: [0, 60, -30, 0],
            y: [0, -40, 80, 0],
            scale: [1, 1.2, 0.9, 1],
            transition: { duration: 20, repeat: Infinity, ease: "linear" }
        },
        animate2: {
            x: [0, -80, 40, 0],
            y: [0, 60, -50, 0],
            scale: [1, 0.85, 1.15, 1],
            transition: { duration: 24, repeat: Infinity, ease: "linear" }
        }
    };

    return (
        <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-red-50/20 dark:from-[#030712] dark:via-[#0B1F3A] dark:to-[#020617] transition-colors duration-500 relative overflow-hidden">

            {/* 🌟 PREMIUM BACKGROUND FLUID PARTICLES */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30 dark:opacity-20">
                <motion.div
                    variants={bgParticleVariants}
                    animate="animate1"
                    className="absolute -left-20 top-10 w-96 h-96 bg-red-400 dark:bg-red-900 rounded-full blur-[120px]"
                />
                <motion.div
                    variants={bgParticleVariants}
                    animate="animate2"
                    className="absolute -right-20 bottom-10 w-96 h-96 bg-rose-300 dark:bg-rose-950 rounded-full blur-[130px]"
                />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* 🏷️ HEADER SECTION */}
                <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
                    <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring" }}
                        className="px-4 py-1.5 bg-red-500/10 text-red-600 dark:text-red-400 rounded-full text-xs font-black uppercase tracking-widest inline-block border border-red-500/20 backdrop-blur-md shadow-sm"
                    >
                        Why Choose SaveBlood
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="text-3xl md:text-5xl font-black text-slate-900 dark:text-slate-50 tracking-tight leading-tight"
                    >
                        Our Best Features & <span className="text-red-600 dark:text-red-500 relative inline-block">Impact</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-500 dark:text-slate-300 text-base md:text-lg font-medium max-w-2xl mx-auto"
                    >
                        We connect blood donors with recipients seamlessly, removing middleman delays and maximizing community safety.
                    </motion.p>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            whileHover={{ y: -8, transition: { duration: 0.3 } }}
                            className={`p-6 bg-white/70 dark:bg-[#0B1F3A]/60 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/50 rounded-2xl shadow-lg dark:shadow-none transition-all duration-300 flex flex-col justify-between group relative overflow-hidden ${feature.bgHover}`}
                        >
                            <div className={`absolute -right-12 -top-12 w-32 h-32 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${feature.glowColor}`} />

                            <div className="space-y-5">
                                <motion.div
                                    whileHover={{ rotate: [0, -10, 10, 0] }}
                                    transition={{ duration: 0.5 }}
                                    className="w-14 h-14 bg-slate-100/80 dark:bg-slate-800/50 rounded-2xl flex items-center justify-center border border-slate-200/60 dark:border-slate-700/40 group-hover:scale-110 group-hover:bg-white dark:group-hover:bg-slate-800 shadow-sm transition-all duration-300"
                                >
                                    {feature.icon}
                                </motion.div>

                                {/* Text Content */}
                                <div className="space-y-2">
                                    <h3 className="text-xl font-extrabold text-slate-800 dark:text-slate-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-300">
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>

                            {/* Stats Footer with Luxury Divider */}
                            <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800/60 flex items-baseline gap-2 relative z-10">
                                <span className="text-3xl font-black text-slate-900 dark:text-slate-50 tracking-tight group-hover:scale-105 transition-transform duration-300 origin-left">
                                    {feature.stats}
                                </span>
                                <span className="text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                                    {feature.statsLabel}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}