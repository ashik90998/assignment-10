"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Droplet, LogoFacebook } from "@gravity-ui/icons";
import { BsGithub } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
import { LiaLinkedin } from "react-icons/lia";

export default function Footer() {
  const links = [
    { name: "Home", href: "/" },
    { name: "Donation Requests", href: "/donation-requests" },
    { name: "Search Donors", href: "/search" },
    { name: "Funding", href: "/funding" },
    { name: "Dashboard", href: "/dashboard" },
  ];

  const socialIcons = [
    { icon: LogoFacebook, href: "#", color: "hover:bg-blue-600 hover:shadow-blue-600/50" },
    { icon: FaXTwitter, href: "#", color: "hover:bg-slate-900 hover:shadow-slate-900/50" },
    { icon: BsGithub, href: "#", color: "hover:bg-slate-800 hover:shadow-slate-800/50" },
    { icon: LiaLinkedin, href: "#", color: "hover:bg-blue-700 hover:shadow-blue-700/50" },
  ];

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-[#0b1f3a] to-[#050e1a] text-white border-t border-slate-800/60 mt-auto">

      {/* 🌟 CINEMATIC GRADIENT GLOWS */}
      <div className="absolute top-0 left-10 w-96 h-96 bg-red-600/15 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-80 h-80 bg-rose-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 py-16 z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* LEFT: BRAND INFO */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 15 }}
                className="w-11 h-11 rounded-xl bg-gradient-to-br from-red-600 to-rose-600 flex items-center justify-center shadow-lg shadow-red-600/30"
              >
                <Droplet className="text-white size-5 animate-pulse" />
              </motion.div>
              <h2 className="text-2xl font-black tracking-tight">
                Save<span className="text-red-500 group-hover:text-red-400 transition-colors">Blood</span>
              </h2>
            </Link>
            <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-sm">
              Every drop counts. Connect donors with those in need, build an emergency response network, and help save precious lives together.
            </p>
          </motion.div>

          {/* MIDDLE: QUICK LINKS */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-5"
          >
            <h3 className="text-xs uppercase font-extrabold tracking-widest text-red-500 pl-0.5">Quick Links</h3>
            <div className="space-y-3">
              {links.map((link) => (
                <div key={link.href} className="overflow-hidden">
                  <Link href={link.href} className="block w-fit">
                    <motion.span
                      whileHover={{ x: 8, color: "#f87171" }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="block text-slate-300 text-sm font-semibold transition-colors"
                    >
                      {link.name}
                    </motion.span>
                  </Link>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: EMERGENCY CONTACT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-5"
          >
            <h3 className="text-xs uppercase font-extrabold tracking-widest text-red-500 pl-0.5">Stay Connected</h3>
            <div className="space-y-2 text-sm font-medium text-slate-300">
              <p className="flex items-center gap-2 group cursor-pointer">
                <span>📞 Hotline:</span>
                <span className="font-black text-white group-hover:text-red-400 transition-colors">+880 1712-345678</span>
              </p>
              <p className="flex items-center gap-2 group cursor-pointer">
                <span>✉️ Email:</span>
                <span className="font-black text-white group-hover:text-red-400 transition-colors">support@saveblood.org</span>
              </p>
            </div>
          </motion.div>
        </div>

        {/* DIVIDER LINE */}
        <div className="border-t border-slate-800/80 my-10" />

        {/* BOTTOM FOOTER BAR */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-xs font-bold tracking-wide">
            © 2026 SaveBlood. All rights reserved.
          </p>

          {/* GLOWING SOCIAL ICONS */}
          <div className="flex gap-3">
            {socialIcons.map((item, i) => (
              <motion.a
                key={i}
                href={item.href}
                whileHover={{ scale: 1.15, y: -4, rotate: 6 }}
                whileTap={{ scale: 0.95 }}
                className={`w-11 h-11 rounded-xl bg-slate-900/40 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300 hover:border-transparent hover:shadow-lg ${item.color}`}
              >
                <item.icon className="text-lg" />
              </motion.a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}