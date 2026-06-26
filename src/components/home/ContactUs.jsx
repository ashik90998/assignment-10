"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Handset, MapPin, Clock, Envelope } from "@gravity-ui/icons";

export default function ContactUs() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        setTimeout(() => {
            alert("Thank you! Your message has been sent successfully.");
            setFormData({ name: "", email: "", subject: "", message: "" });
            setIsSubmitting(false);
        }, 1500);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const bgParticleVariants = {
        animate1: {
            x: [0, 80, -40, 0],
            y: [0, -70, 90, 0],
            scale: [1, 1.2, 0.95, 1],
            transition: { duration: 20, repeat: Infinity, ease: "linear" }
        },
        animate2: {
            x: [0, -90, 50, 0],
            y: [0, 80, -60, 0],
            scale: [1, 0.85, 1.15, 1],
            transition: { duration: 24, repeat: Infinity, ease: "linear" }
        }
    };

    const contactItems = [
        { icon: <Handset className="w-5 h-5" />, title: "Call Us 24/7", value: "+880 1234-567890", desc: "Emergency Support Line", color: "text-red-600 dark:text-red-400", bg: "bg-red-50 dark:bg-red-950/40", border: "border-red-100/50 dark:border-red-900/20" },
        { icon: <Envelope className="w-5 h-5" />, title: "Email Support", value: "support@saveblood.com", desc: "Response within 2 hours", color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-950/40", border: "border-blue-100/50 dark:border-blue-900/20" },
        { icon: <MapPin className="w-5 h-5" />, title: "Main Headquarters", value: "12/A, Dhanmondi, Dhaka-1209", desc: "Bangladesh", color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-950/40", border: "border-emerald-100/50 dark:border-emerald-900/20" },
        { icon: <Clock className="w-5 h-5" />, title: "Office Hours", value: "Sat - Thu: 9:00 AM - 6:00 PM", desc: "(Emergency blood request system is 24/7 online)", color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-950/40", border: "border-amber-100/50 dark:border-amber-900/20" }
    ];

    return (
        <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-red-50/20 dark:from-[#030712] dark:via-[#0B1F3A] dark:to-[#020617] transition-colors duration-500 relative overflow-hidden min-h-screen flex items-center">

            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30 dark:opacity-25">
                <motion.div variants={bgParticleVariants} animate="animate1" className="absolute -left-20 top-10 w-96 h-96 bg-red-400 dark:bg-red-900 rounded-full blur-[120px]" />
                <motion.div variants={bgParticleVariants} animate="animate2" className="absolute -right-20 bottom-10 w-96 h-96 bg-rose-300 dark:bg-rose-950 rounded-full blur-[130px]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">

                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="px-4 py-1.5 bg-red-500/10 text-red-600 dark:text-red-400 rounded-full text-xs font-black uppercase tracking-widest inline-block border border-red-500/20 backdrop-blur-md shadow-sm"
                    >
                        Get In Touch
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-black text-slate-900 dark:text-slate-50 tracking-tight"
                    >
                        Contact <span className="text-red-600 dark:text-red-500">Our Team</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-slate-500 dark:text-slate-300 text-base md:text-lg font-medium max-w-2xl mx-auto"
                    >
                        Do you have any questions about blood donation, partnerships, or need urgent help? Drop us a message anytime.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, type: "spring" }}
                        className="lg:col-span-5"
                    >
                        <Card className="p-6 md:p-8 bg-white/70 dark:bg-[#0B1F3A]/60 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/50 rounded-2xl space-y-6 shadow-2xl flex flex-col justify-between overflow-hidden relative group">
                            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100">
                                Emergency Contacts
                            </h3>

                            <div className="space-y-6">
                                {contactItems.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        whileHover={{ x: 5 }}
                                        className="flex gap-4 items-start group/item"
                                    >
                                        <div className={`w-12 h-12 ${item.bg} ${item.color} ${item.border} rounded-xl flex items-center justify-center shrink-0 border transition-transform group-hover/item:scale-110 shadow-sm`} >
                                            {item.icon}
                                        </div>
                                        <div className="min-w-0">
                                            <h4 className="text-xs font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider">{item.title}</h4>
                                            <p className="text-base md:text-lg font-black text-slate-800 dark:text-slate-200 mt-0.5 break-words group-hover/item:text-red-600 dark:group-hover/item:text-red-400 transition-colors">{item.value}</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, type: "spring" }}
                        className="lg:col-span-7"
                    >
                        <form
                            onSubmit={handleSubmit}
                            className="p-6 md:p-10 bg-white/70 dark:bg-[#0B1F3A]/60 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/50 rounded-2xl shadow-2xl space-y-6 relative group"
                        >
                            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs uppercase font-extrabold tracking-wider text-slate-400 dark:text-slate-500 block pl-1">Your Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-red-500 dark:focus:border-red-500 dark:text-slate-200 transition-all text-sm font-medium shadow-inner"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs uppercase font-extrabold tracking-wider text-slate-400 dark:text-slate-500 block pl-1">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="john@example.com"
                                        className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-red-500 dark:focus:border-red-500 dark:text-slate-200 transition-all text-sm font-medium shadow-inner"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs uppercase font-extrabold tracking-wider text-slate-400 dark:text-slate-500 block pl-1">Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    required
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="How can we help you?"
                                    className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-red-500 dark:focus:border-red-500 dark:text-slate-200 transition-all text-sm font-medium shadow-inner"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs uppercase font-extrabold tracking-wider text-slate-400 dark:text-slate-500 block pl-1">Message</label>
                                <textarea
                                    name="message"
                                    required
                                    rows={5}
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Write your message here..."
                                    className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-red-500 dark:focus:border-red-500 dark:text-slate-200 transition-all text-sm font-medium resize-none shadow-inner"
                                />
                            </div>

                            <motion.div whileTap={{ scale: 0.98 }}>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-4 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-black rounded-xl shadow-lg shadow-red-600/20 transition-all duration-300 flex items-center justify-center gap-2 text-sm tracking-wider disabled:opacity-70 uppercase"
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center gap-2">
                                            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            Sending...
                                        </span>
                                    ) : "✉️ Send Message"}
                                </button>
                            </motion.div>
                        </form>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}

const Card = ({ children, className }) => (
    <div className={`shadow-lg bg-white dark:bg-[#0B1F3A] ${className}`}>{children}</div>
);