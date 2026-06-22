"use client";

import { motion } from "framer-motion";

export default function Loading() {
    return (
        <div className="min-h-screen bg-[#0B1F3A] flex flex-col items-center justify-center relative overflow-hidden">

            <div className="absolute w-72 h-72 bg-red-600/20 blur-[120px] left-0 top-0" />
            <div className="absolute w-72 h-72 bg-red-500/20 blur-[120px] right-0 bottom-0" />

            <motion.div
                animate={{
                    y: [0, 20, 0],
                    scale: [1, 1.05, 1],
                }}
                transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="text-7xl"
            >
                🩸
            </motion.div>

            {/* Heart Beat */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 0.8,
                    repeat: Infinity,
                }}
                className="text-4xl mt-4"
            >
                ❤️
            </motion.div>

            <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                    duration: 1,
                    repeat: Infinity,
                    repeatType: "reverse",
                }}
                className="mt-8 text-3xl font-bold text-white"
            >
                Save<span className="text-red-500">Blood</span>
            </motion.h2>

            <p className="text-gray-300 mt-3 text-lg">
                Preparing life-saving data...
            </p>

            <div className="flex gap-3 mt-6">
                {[0, 1, 2].map((dot) => (
                    <motion.div
                        key={dot}
                        animate={{
                            y: [0, -12, 0],
                        }}
                        transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: dot * 0.2,
                        }}
                        className="w-4 h-4 rounded-full bg-red-500"
                    />
                ))}
            </div>
        </div>
    );
}