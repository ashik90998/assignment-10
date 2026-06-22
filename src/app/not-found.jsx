"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
    return (
        <div className="relative min-h-screen bg-[#0B1F3A] text-white flex items-center justify-center overflow-hidden px-6">

            {/* Background Glow */}
            <div className="absolute left-0 top-0 w-80 h-80 bg-red-600/20 blur-[140px]" />
            <div className="absolute right-0 bottom-0 w-80 h-80 bg-red-500/20 blur-[140px]" />

            {/* Floating Blood Drops */}
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    animate={{ y: [0, 30, 0] }}
                    transition={{
                        duration: 2 + i,
                        repeat: Infinity,
                    }}
                    className={`absolute text-3xl opacity-20`}
                    style={{
                        top: `${10 + i * 12}%`,
                        left: `${5 + i * 15}%`,
                    }}
                >
                    🩸
                </motion.div>
            ))}

            <div className="text-center z-10">

                {/* Animated 404 */}
                <motion.h1
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.7 }}
                    className="text-[120px] md:text-[220px] font-extrabold leading-none"
                >
                    <span className="text-white">4</span>
                    <motion.span
                        animate={{
                            color: ["#dc2626", "#ffffff", "#dc2626"],
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 2,
                        }}
                    >
                        0
                    </motion.span>
                    <span className="text-white">4</span>
                </motion.h1>

                {/* Heart */}
                <motion.div
                    animate={{
                        scale: [1, 1.15, 1],
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 1,
                    }}
                    className="text-5xl mb-6"
                >
                    ❤️
                </motion.div>

                {/* Text */}
                <motion.h2
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl md:text-5xl font-bold"
                >
                    Page Not Found
                </motion.h2>

                <motion.p
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-gray-300 max-w-xl mt-5 mx-auto text-lg"
                >
                    The page you are looking for might have been never existed.
                </motion.p>

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-10 flex flex-col md:flex-row gap-4 justify-center"
                >
                    <Link href="/">
                        <button className="px-8 py-4 rounded-xl bg-red-700 hover:bg-red-600 transition font-bold shadow-xl shadow-red-700/30">
                            Back to Home
                        </button>
                    </Link>

                    <Link href="/donation-requests">
                        <button className="px-8 py-4 rounded-xl border border-white/20 hover:bg-white/10 transition font-bold">
                            Donation Requests
                        </button>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}