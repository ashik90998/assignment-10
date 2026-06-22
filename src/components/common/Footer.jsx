"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Droplet, LogoFacebook } from "@gravity-ui/icons";
import { BsGithub, BsTwitter } from "react-icons/bs";
import { LiaLinkedin } from "react-icons/lia";


export default function Footer() {
    const links = [
        { name: "Home", href: "/" },
        { name: "Donation Requests", href: "/donation-requests" },
        { name: "Funding", href: "/funding" },
        { name: "Dashboard", href: "/dashboard" },
    ];

    const socialIcons = [
        { icon: LogoFacebook},
        { icon: BsTwitter},
        { icon: BsGithub},
        { icon: LiaLinkedin }
    ]

    return (
        <footer className="relative overflow-hidden bg-[#0b1f3a] text-white border-t">

            <div className="absolute top-0 left-0 w-72 h-72 bg-red-600/20 blur-[120px]" />
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-red-500/20 blur-[120px]" />

            <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute top-10 left-20 text-3xl opacity-20"
            >
                🩸
            </motion.div>

            <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="absolute right-20 top-20 text-4xl opacity-20"
            >
                🩸
            </motion.div>

            <div className="relative max-w-7xl mx-auto px-6 py-16">

                <div className="grid md:grid-cols-3 gap-12">

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Link href="/" className="flex items-center gap-2">
                            <motion.div
                                animate={{ scale: [1, 1.08, 1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center"
                            >
                                <span className="text-white text-xl">
                                    <Droplet />
                                </span>
                            </motion.div>

                            <h1 className="text-2xl font-bold text-white">
                                Save
                                <span className="text-red-600 font-extrabold">
                                    Blood
                                </span>
                            </h1>
                        </Link>
                        <p className="text-gray-300 mt-4 leading-relaxed">
                            Every drop counts. Connect donors with those in need and
                            help save lives through a modern blood donation platform.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        <h3 className="text-xl font-semibold mb-5 text-red-400">
                            Quick Links
                        </h3>

                        <div className="space-y-3">
                            {links.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="block text-gray-300 hover:text-red-400 transition duration-300 hover:translate-x-2"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9 }}
                    >
                        <h3 className="text-xl font-semibold mb-5 text-red-400">
                            Stay Connected
                        </h3>

                        <div className="flex flex-col gap-4">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 outline-none focus:border-red-500"
                            />

                            <button className="bg-red-600 hover:bg-red-500 transition py-3 rounded-xl font-semibold shadow-lg shadow-red-600/30">
                                Subscribe
                            </button>
                        </div>
                    </motion.div>
                </div>

                <div className="border-t border-white/10 my-10" />

                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-gray-400 text-sm">
                        © 2026 SaveBlood. All rights reserved.
                    </p>

                    <div className="flex gap-4">
                        {
                            socialIcons.map((item, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{
                                        scale: 1.15,
                                        rotate: 8,
                                    }}
                                    className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center cursor-pointer transition"
                                >
                                    {item.icon}
                                </motion.div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </footer>
    );
}