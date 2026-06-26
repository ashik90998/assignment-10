"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Xmark } from "@gravity-ui/icons";

export default function AnimatedModal({ isOpen, onClose, title, children, footer }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

          {/* 🌟 ULTRA SLEEK GLASSMORPHISM BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/40 dark:bg-black/60 backdrop-blur-md"
          />

          {/* 💎 GORGEOUS MODAL CONTAINER */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30, filter: "blur(4px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.92, y: 20, filter: "blur(4px)" }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-full max-w-md bg-white/90 dark:bg-[#0B1F3A]/80 backdrop-blur-xl rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] dark:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] border border-slate-200/60 dark:border-slate-800/60 p-6 md:p-7 overflow-hidden group"
          >
            {/* Top Accent Gradient Line */}
            <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-red-500 via-rose-500 to-red-600" />

            {/* MODAL HEADER */}
            <div className="flex items-center justify-between mb-5 relative z-10">
              <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
                {title}
              </h3>
              <motion.button
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                onClick={onClose}
                className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 text-slate-400 hover:text-red-500 dark:hover:text-red-400 border border-slate-200/20 transition-colors"
              >
                <Xmark className="size-5" />
              </motion.button>
            </div>

            {/* MODAL BODY */}
            <div className="relative z-10 text-slate-600 dark:text-slate-300">
              {children}
            </div>

            {/* MODAL FOOTER */}
            {footer && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/40 flex justify-end gap-3 relative z-10"
              >
                {footer}
              </motion.div>
            )}

            {/* Soft Ambient Internal Radial Glow */}
            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-red-500/5 rounded-full blur-2xl pointer-events-none" />
          </motion.div>

        </div>
      )}
    </AnimatePresence>
  );
}