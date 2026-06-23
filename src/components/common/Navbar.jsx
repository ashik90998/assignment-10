"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar } from "@heroui/avatar";
import { Bars, Droplet, Moon, Sun, Xmark, ChevronDown } from "@gravity-ui/icons";
import { BiLogOut, BiGridAlt } from "react-icons/bi";
import { useTheme } from "next-themes";
import { useAuth } from "@/providers/AuthProvider";

const roleDashboard = {
  admin: "/dashboard/admin",
  volunteer: "/dashboard/volunteer",
  donor: "/dashboard/donor",
};

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const dropdownRef = useRef(null);

  useEffect(() => setMounted(true), []);
  useEffect(() => { setMenuOpen(false); setDropdownOpen(false); }, [pathname]);
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdownOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const dark = mounted ? theme === "dark" : false;
  const dashboardHref = roleDashboard[user?.role] || "/dashboard/donor";

  const links = user
    ? [
        { name: "Home", href: "/" },
        { name: "Donation Requests", href: "/donation-requests" },
        { name: "Search Donors", href: "/search" },
        { name: "Funding", href: "/funding" },
      ]
    : [
        { name: "Home", href: "/" },
        { name: "Donation Requests", href: "/donation-requests" },
        { name: "Search Donors", href: "/search" },
      ];

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <nav className={`sticky top-0 z-50 backdrop-blur-md border-b transition-all ${dark ? "bg-[#0B1F3A] border-red-900 text-white" : "bg-white/90 border-red-100 shadow-sm"}`}>
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center">
              <Droplet className="text-white" />
            </motion.div>
            <h1 className={`text-2xl font-bold ${dark ? "text-white" : "text-[#1b0091]"}`}>
              Save<span className="text-red-600 font-extrabold">Blood</span>
            </h1>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link key={link.href} href={link.href} className={`relative font-semibold transition ${active ? "text-red-600" : dark ? "text-white hover:text-red-400" : "text-[#112240] hover:text-red-500"}`}>
                  {link.name}
                  {active && <motion.div layoutId="underline" className="absolute -bottom-1 left-0 right-0 h-[3px] bg-red-600 rounded-full" />}
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-5">
            {mounted && (
              <motion.button whileTap={{ scale: 0.9 }} onClick={() => setTheme(dark ? "light" : "dark")} className={`p-3 rounded-full ${dark ? "bg-white/10" : "bg-slate-100"}`}>
                {dark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5" />}
              </motion.button>
            )}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-1.5 p-1.5 pr-3 rounded-full">
                  <Avatar src={user?.avatar} name={user?.name} className="w-9 h-9 bg-red-100 text-red-600" />
                  <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute right-0 mt-3 w-56 rounded-2xl p-2 shadow-2xl border bg-white dark:bg-[#0F294A] dark:border-slate-800">
                      <div className="px-3 py-2 border-b dark:border-white/5">
                        <p className="text-xs text-slate-400">Signed in as</p>
                        <p className="text-sm font-bold truncate">{user.name}</p>
                      </div>
                      <Link href={dashboardHref} className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-50 dark:hover:bg-white/5">
                        <BiGridAlt className="text-red-500" /> Dashboard
                      </Link>
                      <button onClick={handleLogout} className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50">
                        <BiLogOut /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link href="/login">
                <button className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl shadow-lg">Login</button>
              </Link>
            )}
          </div>

          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <Xmark className="w-7 h-7 text-red-600" /> : <Bars className={`w-7 h-7 ${dark ? "text-white" : ""}`} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="md:hidden border-t overflow-hidden">
            <div className="p-5 space-y-4">
              {links.map((link) => (
                <Link key={link.href} href={link.href} className={`block py-2 font-semibold text-lg ${pathname === link.href ? "text-red-600" : ""}`}>{link.name}</Link>
              ))}
              {user ? (
                <>
                  <Link href={dashboardHref} className="block py-2 font-semibold">Dashboard</Link>
                  <button onClick={handleLogout} className="w-full py-3 bg-red-600 text-white font-bold rounded-xl">Logout</button>
                </>
              ) : (
                <Link href="/login"><button className="w-full py-3 bg-red-600 text-white font-bold rounded-xl">Login</button></Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
