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
    Handset
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
            bgHover: "hover:border-red-100 hover:bg-red-50/30 dark:hover:border-red-900/30 dark:hover:bg-red-950/20"
        },
        {
            icon: <ShieldCheck className="w-8 h-8 text-emerald-500" />,
            title: "Verified Profiles",
            description: "Every donor is verified through a strict contact and medical history check for safety.",
            stats: "100%",
            statsLabel: "Safe & Verified",
            bgHover: "hover:border-emerald-100 hover:bg-emerald-50/30 dark:hover:border-emerald-900/30 dark:hover:bg-emerald-950/20"
        },
        {
            icon: <Person className="w-8 h-8 text-blue-500" />,
            title: "Community Driven",
            description: "Join a massive network of blood clubs, organizations, and heroes saving lives daily.",
            stats: "15,000+",
            statsLabel: "Lives Saved",
            bgHover: "hover:border-blue-100 hover:bg-blue-50/30 dark:hover:border-blue-900/30 dark:hover:bg-blue-950/20"
        },
        {
            icon: <ClockFill className="w-8 h-8 text-amber-500" />,
            title: "24/7 Real-time Support",
            description: "Get instant notifications and round-the-clock help from our dedicated support team.",
            stats: "10 Min",
            statsLabel: "Avg. Response",
            bgHover: "hover:border-amber-100 hover:bg-amber-50/30 dark:hover:border-amber-900/30 dark:hover:bg-amber-950/20"
        },
        {
            icon: <Pin className="w-8 h-8 text-indigo-500" />,
            title: "Location-Based Search",
            description: "Advanced map filtering to track and reach the nearest available blood donors instantly.",
            stats: "5 KM",
            statsLabel: "Radius Match",
            bgHover: "hover:border-indigo-100 hover:bg-indigo-50/30 dark:hover:border-indigo-900/30 dark:hover:bg-indigo-950/20"
        },
        {
            icon: <Bell className="w-8 h-8 text-purple-500" />,
            title: "Instant Smart Alerts",
            description: "Receive push notifications and SMS alerts immediately when someone nearby requests blood.",
            stats: "1 Sec",
            statsLabel: "Alert Broadcast",
            bgHover: "hover:border-purple-100 hover:bg-purple-50/30 dark:hover:border-purple-900/30 dark:hover:bg-purple-950/20"
        },
        {
            icon: <HeartFill className="w-8 h-8 text-pink-500" />,
            title: "Donor Rewards",
            description: "Earn custom digital badges, certificates, and community recognition points for every donation.",
            stats: "8,000+",
            statsLabel: "Badges Issued",
            bgHover: "hover:border-pink-100 hover:bg-pink-50/30 dark:hover:border-pink-900/30 dark:hover:bg-pink-950/20"
        },
        {
            icon: <FaHandshake className="w-8 h-8 text-teal-500" />,
            title: "Hospital Partnerships",
            description: "Direct collaboration with top hospital blood banks to reduce standard authorization delays.",
            stats: "120+",
            statsLabel: "Partner Labs",
            bgHover: "hover:border-teal-100 hover:bg-teal-50/30 dark:hover:border-teal-900/30 dark:hover:bg-teal-950/20"
        }
    ];

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    return (
        <section className="py-20 bg-white dark:bg-[#0B1F3A] transition-colors duration-500 relative overflow-hidden">

            {/* Background glow effects */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden hidden dark:block">
                <motion.div
                    animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
                    transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                    className="absolute -left-20 top-0 w-96 h-96 bg-red-600/10 blur-[130px]"
                />
                <motion.div
                    animate={{ x: [0, -30, 0], y: [0, -40, 0] }}
                    transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
                    className="absolute -right-20 bottom-0 w-96 h-96 bg-red-500/10 blur-[130px]"
                />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <motion.span
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="px-4 py-1.5 bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400 rounded-full text-xs font-bold uppercase tracking-wider inline-block border border-red-100/50 dark:border-red-900/30"
                    >
                        Why Choose SaveBlood
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-5xl font-extrabold text-[#1b0091] dark:text-slate-50 tracking-tight"
                    >
                        Our Best Features & <span className="text-red-600 dark:text-red-500">Impact</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-500 dark:text-slate-300 text-base md:text-lg font-medium"
                    >
                        We connect blood donors with recipients seamlessly, removing middleman delays and maximizing community safety.
                    </motion.p>
                </div>

                {/* Features Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            className={`p-6 bg-white dark:bg-[#0B1F3A]/60 border border-slate-100 dark:border-red-900/30 rounded-2xl shadow-sm dark:shadow-none transition-all duration-300 flex flex-col justify-between ${feature.bgHover} group hover:-translate-y-1.5 hover:shadow-md dark:hover:shadow-xl dark:hover:shadow-black/30`}
                        >
                            <div className="space-y-4">
                                {/* Icon Container */}
                                <div className="w-14 h-14 bg-slate-50 dark:bg-slate-800/40 rounded-xl flex items-center justify-center border border-slate-100 dark:border-slate-800/80 group-hover:scale-110 transition-transform duration-300">
                                    {feature.icon}
                                </div>

                                {/* Text Content */}
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-300 font-medium leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>

                            {/* Stats Footer */}
                            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-red-900/20 flex items-baseline gap-2">
                                <span className="text-2xl font-black text-slate-900 dark:text-slate-50 tracking-tight">
                                    {feature.stats}
                                </span>
                                <span className="text-xs font-bold text-slate-400 dark:text-slate-400/60 uppercase tracking-wider">
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