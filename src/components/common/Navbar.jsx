"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Bars, Droplet, Moon, Sun, Xmark, ChevronDown } from "@gravity-ui/icons";
import { BiLogOut, BiGridAlt } from "react-icons/bi";
import { useTheme } from "next-themes";
import { useAuth } from "@/providers/AuthProvider";
import Image from "next/image";

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
    <nav className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-all duration-500 ${dark
        ? "bg-[#0B1F3A]/80 border-slate-800/80 text-slate-300"
        : "bg-white/80 border-slate-200/50 shadow-sm text-slate-800"
      }`}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 relative z-10">
        <div className="h-20 flex items-center justify-between">

          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 12 }}
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-rose-600 flex items-center justify-center shadow-lg shadow-red-600/30"
            >
              <Droplet className="text-white size-5 animate-pulse" />
            </motion.div>
            <h1 className="text-2xl font-black tracking-tight">
              Save<span className="text-red-600 group-hover:text-red-500 transition-colors">Blood</span>
            </h1>
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative py-1 font-bold text-sm tracking-wide transition-colors duration-300 ${active
                      ? "text-red-500"
                      : dark ? "text-slate-200 hover:text-red-400" : "text-slate-700 hover:text-red-500"
                    }`}
                >
                  {link.name}
                  {active && (
                    <motion.div
                      layoutId="navUnderline"
                      className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-red-600 to-rose-600 rounded-full"
                      transition={{ type: "spring", stiffness: 300, damping: 24 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-6 shrink-0">
            {mounted && (
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => setTheme(dark ? "light" : "dark")}
                className={`p-2.5 rounded-xl border transition-all ${dark
                    ? "bg-slate-900/40 border-slate-800 text-yellow-400 hover:bg-slate-900"
                    : "bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700"
                  }`}
              >
                {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </motion.button>
            )}

            {user ? (
              <div className="relative" ref={dropdownRef}>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className={`flex items-center gap-2 p-1.5 pr-3.5 rounded-xl border transition-all ${dark
                      ? "bg-slate-900/40 border-slate-800 hover:bg-slate-900/80"
                      : "bg-slate-50 border-slate-200/60 hover:bg-slate-100"
                    }`}
                >
                  <Image
                    src={user?.avatar || "/default-avatar.png"}
                    alt={user?.name || "User"}
                    height={40}
                    width={40}
                    className="w-8 h-8 rounded-lg object-cover ring-2 ring-red-500/20"
                  />
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-300 ${dropdownOpen ? "rotate-180 text-red-500" : ""}`} />
                </motion.button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 15, filter: "blur(4px)" }}
                      animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, scale: 0.95, y: 10, filter: "blur(4px)" }}
                      transition={{ type: "spring", stiffness: 350, damping: 22 }}
                      className="absolute right-0 mt-3 w-60 rounded-2xl p-2 shadow-2xl border bg-white/95 dark:bg-[#0F294A]/90 backdrop-blur-xl border-slate-200/60 dark:border-slate-800/80 overflow-hidden"
                    >
                      <div className="px-3 py-2.5 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-black/10 rounded-xl mb-1">
                        <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Signed in as</p>
                        <p className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate mt-0.5">{user.name}</p>
                      </div>
                      <Link href={dashboardHref} className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                        <BiGridAlt className="text-red-500 text-lg" /> Dashboard
                      </Link>
                      <button onClick={handleLogout} className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors">
                        <BiLogOut className="text-lg" /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link href="/login">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="px-6 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-red-600/20 transition-all duration-300"
                >
                  Login
                </motion.button>
              </Link>
            )}
          </div>

          <motion.button
            whileTap={{ scale: 0.9 }}
            className="md:hidden p-2 rounded-xl bg-slate-100/50 dark:bg-slate-800/40 border border-slate-200/20"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <AnimatePresence mode="wait">
              {menuOpen ? (
                <motion.div key="close" initial={{ rotate: -45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 45, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Xmark className="w-6 h-6 text-red-500" />
                </motion.div>
              ) : (
                <motion.div key="bars" initial={{ rotate: 45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -45, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Bars className={`w-6 h-6 ${dark ? "text-slate-200" : "text-slate-700"}`} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="md:hidden border-t overflow-hidden bg-white dark:bg-[#0B1F3A] border-slate-200 dark:border-slate-800/60"
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.06 } }
              }}
              className="p-5 space-y-4"
            >
              {links.map((link) => (
                <motion.div key={link.href} variants={{ hidden: { x: -10, opacity: 0 }, visible: { x: 0, opacity: 1 } }}>
                  <Link href={link.href} className={`block py-1.5 font-bold text-base transition-colors ${pathname === link.href ? "text-red-500 pl-2 border-l-2 border-red-500" : "text-slate-600 dark:text-slate-300"}`}>
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              {mounted && (
                <motion.button
                  variants={{ hidden: { x: -10, opacity: 0 }, visible: { x: 0, opacity: 1 } }}
                  onClick={() => setTheme(dark ? "light" : "dark")}
                  className={`w-full flex items-center justify-between p-3 rounded-xl font-bold text-xs uppercase tracking-wide transition ${dark ? "bg-white/5 hover:bg-white/10 text-yellow-400" : "bg-slate-50 hover:bg-slate-100 text-slate-700"}`}
                >
                  <span className="flex items-center gap-2">
                    {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    {dark ? "Light Mode" : "Dark Mode"}
                  </span>
                  <span className="text-[10px] text-slate-400 font-normal">Switch</span>
                </motion.button>
              )}

              <motion.div variants={{ hidden: { y: 10, opacity: 0 }, visible: { y: 0, opacity: 1 } }} className="pt-2">
                {user ? (
                  <div className="space-y-3">
                    <Link href={dashboardHref} className="block w-full text-center py-3 border border-slate-200 dark:border-slate-800 font-bold text-sm rounded-xl text-slate-700 dark:text-slate-300">
                      Dashboard
                    </Link>
                    <button onClick={handleLogout} className="w-full py-3 bg-gradient-to-r from-red-600 to-rose-600 text-white font-black text-sm rounded-xl shadow-md">
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link href="/login">
                    <button className="w-full py-3 bg-gradient-to-r from-red-600 to-rose-600 text-white font-black text-sm rounded-xl shadow-md">
                      Login
                    </button>
                  </Link>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}