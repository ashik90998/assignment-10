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

    return (
        <section className="py-20 bg-white dark:bg-[#0B1F3A] transition-colors duration-500 relative overflow-hidden min-h-screen flex items-center">

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

            <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">

                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <motion.span
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="px-4 py-1.5 bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400 rounded-full text-xs font-bold uppercase tracking-wider inline-block border border-red-100/50 dark:border-red-900/30"
                    >
                        Get In Touch
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-extrabold text-[#1b0091] dark:text-slate-50 tracking-tight"
                    >
                        Contact <span className="text-red-600 dark:text-red-500">Our Team</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-slate-500 dark:text-slate-300 text-base md:text-lg font-medium"
                    >
                       Do you have any questions about blood donation, partnerships, or need urgent help? Drop us a message anytime.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="lg:col-span-5 space-y-6"
                    >
                        <div className="p-8 bg-slate-50 dark:bg-[#0B1F3A]/40 border border-slate-100 dark:border-red-900/20 rounded-2xl space-y-8 shadow-sm dark:shadow-none">
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                                Emergency Contacts
                            </h3>

                            <div className="space-y-6">
                                
                                <div className="flex gap-4 items-start">
                                    <div className="w-12 h-12 bg-red-50 dark:bg-red-950/40 rounded-xl flex items-center justify-center text-red-600 dark:text-red-400 border border-red-100/50 dark:border-red-900/20 shrink-0">
                                        <Handset className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-400 dark:text-slate-400/70 uppercase tracking-wider">Call Us 24/7</h4>
                                        <p className="text-lg font-bold text-slate-800 dark:text-slate-200 mt-1">+880 1234-567890</p>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">Emergency Support Line</p>
                                    </div>
                                </div>


                                <div className="flex gap-4 items-start">
                                    <div className="w-12 h-12 bg-blue-50 dark:bg-blue-950/40 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 border border-blue-100/50 dark:border-blue-900/20 shrink-0">
                                        <Envelope className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-400 dark:text-slate-400/70 uppercase tracking-wider">Email Support</h4>
                                        <p className="text-lg font-bold text-slate-800 dark:text-slate-200 mt-1">support@saveblood.com</p>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">Response within 2 hours</p>
                                    </div>
                                </div>


                                <div className="flex gap-4 items-start">
                                    <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 border border-emerald-100/50 dark:border-emerald-900/20 shrink-0">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-400 dark:text-slate-400/70 uppercase tracking-wider">Main Headquarters</h4>
                                        <p className="text-base font-bold text-slate-800 dark:text-slate-200 mt-1">12/A, Dhanmondi, Dhaka-1209</p>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">Bangladesh</p>
                                    </div>
                                </div>


                                <div className="flex gap-4 items-start">
                                    <div className="w-12 h-12 bg-amber-50 dark:bg-amber-950/40 rounded-xl flex items-center justify-center text-amber-600 dark:text-amber-400 border border-amber-100/50 dark:border-amber-900/20 shrink-0">
                                        <Clock className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-400 dark:text-slate-400/70 uppercase tracking-wider">Office Hours</h4>
                                        <p className="text-base font-bold text-slate-800 dark:text-slate-200 mt-1">Sat - Thu: 9:00 AM - 6:00 PM</p>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">(Emergency blood request system is 24/7 online)</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side: Contact Form Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="lg:col-span-7"
                    >
                        <form
                            onSubmit={handleSubmit}
                            className="p-8 md:p-10 bg-white dark:bg-[#0B1F3A]/60 border border-slate-100 dark:border-red-900/30 rounded-2xl shadow-sm dark:shadow-none space-y-6"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Name Input */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Your Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-red-500 dark:focus:border-red-500 dark:text-slate-400 transition-colors text-sm font-medium"
                                    />
                                </div>
                                {/* Email Input */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="john@example.com"
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-red-500 dark:focus:border-red-500 dark:text-slate-400 transition-colors text-sm font-medium"
                                    />
                                </div>
                            </div>

                            {/* Subject Input */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    required
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="How can we help you?"
                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-red-500 dark:focus:border-red-500 dark:text-slate-400 transition-colors text-sm font-medium"
                                />
                            </div>

                            {/* Message Textarea */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Message</label>
                                <textarea
                                    name="message"
                                    required
                                    rows={5}
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Write your message here..."
                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-red-500 dark:focus:border-red-500 dark:text-slate-400 transition-colors text-sm font-medium resize-none"
                                />
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl shadow-sm shadow-red-600/20 transition-colors flex items-center justify-center gap-2 text-sm disabled:opacity-70"
                            >
                                {isSubmitting ? "Sending Message..." : "Send Message"}
                            </motion.button>
                        </form>
                    </motion.div>

                </div>

            </div>
        </section>
    );
}