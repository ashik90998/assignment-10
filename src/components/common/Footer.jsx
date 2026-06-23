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
    { icon: LogoFacebook, href: "#" },
    { icon: FaXTwitter, href: "#" },
    { icon: BsGithub, href: "#" },
    { icon: LiaLinkedin, href: "#" },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#0b1f3a] text-white border-t mt-auto">
      <div className="absolute top-0 left-0 w-72 h-72 bg-red-600/20 blur-[120px]" />
      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center">
                <Droplet className="text-white" />
              </div>
              <h2 className="text-2xl font-bold">Save<span className="text-red-600">Blood</span></h2>
            </Link>
            <p className="text-gray-300 mt-4 leading-relaxed">
              Every drop counts. Connect donors with those in need and help save lives.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <h3 className="text-xl font-semibold mb-5 text-red-400">Quick Links</h3>
            <div className="space-y-3">
              {links.map((link) => (
                <Link key={link.href} href={link.href} className="block text-gray-300 hover:text-red-400 transition hover:translate-x-2">
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <h3 className="text-xl font-semibold mb-5 text-red-400">Stay Connected</h3>
            <p className="text-gray-300 mb-2">Emergency Hotline: +880 1712-345678</p>
            <p className="text-gray-300">Email: support@saveblood.org</p>
          </motion.div>
        </div>

        <div className="border-t border-white/10 my-10" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-400 text-sm">© 2026 SaveBlood. All rights reserved.</p>
          <div className="flex gap-4">
            {socialIcons.map((item, i) => (
              <motion.a key={i} href={item.href} whileHover={{ scale: 1.15, rotate: 8 }} className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center">
                <item.icon className="text-lg" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
