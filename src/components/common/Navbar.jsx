"use client";
"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar } from "@heroui/avatar";
import { Bars, Droplet, Moon, Sun, Xmark, ChevronDown } from "@gravity-ui/icons";
import { BiLogOut, BiGridAlt } from "react-icons/bi";
import { useTheme } from "next-themes";

import { useSession, signOut } from "@/lib/auth-client";

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();

    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    const { theme, setTheme } = useTheme();
    const dropdownRef = useRef(null);

    const { data: sessionData} = useSession();
    const user = sessionData?.user;

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        setMenuOpen(false);
        setDropdownOpen(false);
    }, [pathname]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const dark = mounted ? theme === "dark" : true;

    const toggleTheme = () => {
        setTheme(dark ? "light" : "dark");
    };

    const handleLogout = async () => {
        try {
            await signOut();

            setMenuOpen(false);
            setDropdownOpen(false);

            router.push("/login");
            router.refresh();
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const links = user
        ? [
            { name: "Home", href: "/" },
            { name: "Donation Requests", href: "/donation-requests" },
            { name: "Funding", href: "/funding" },
        ]
        : [
            { name: "Home", href: "/" },
            { name: "Donation Requests", href: "/donation-requests" },
        ];

    return (
        <nav
            className={`sticky top-0 z-50 backdrop-blur-md border-b transition-all duration-500 ${dark ? "bg-[#0B1F3A] border-red-900 text-white" : "bg-white/90 border-red-100 shadow-sm"
                }`}
        >
            {dark && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <motion.div
                        animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
                        transition={{ repeat: Infinity, duration: 6 }}
                        className="absolute left-0 top-0 w-72 h-72 bg-red-600/20 blur-[120px]"
                    />
                    <motion.div
                        animate={{ x: [0, -20, 0], y: [0, -30, 0] }}
                        transition={{ repeat: Infinity, duration: 5 }}
                        className="absolute right-0 bottom-0 w-72 h-72 bg-red-500/20 blur-[120px]"
                    />
                </div>
            )}

            <div className="max-w-10/12 mx-auto px-4 relative z-10">
                <div className="h-20 flex items-center justify-between">

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

                        <h1 className={`text-2xl font-bold ${dark ? "text-white" : "text-[#1b0091]"}`}>
                            Save<span className="text-red-600 font-extrabold">Blood</span>
                        </h1>
                    </Link>


                    <div className="hidden md:flex items-center gap-8">
                        {links.map((link) => {
                            const active = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`relative font-semibold transition ${active
                                        ? "text-red-600"
                                        : dark
                                            ? "text-white hover:text-red-400"
                                            : "text-[#112240] hover:text-red-500"
                                        }`}
                                >
                                    {link.name}
                                    {active && (
                                        <motion.div
                                            layoutId="underline"
                                            className="absolute -bottom-1 left-0 right-0 h-[3px] bg-red-600 rounded-full"
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </div>


                    <div className="hidden md:flex items-center gap-5">
                        {mounted && (
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={toggleTheme}
                                className={`p-3 rounded-full transition ${dark ? "bg-white/10 border border-white/20 hover:bg-white/20" : "bg-slate-100 hover:bg-slate-200"
                                    }`}
                            >
                                {dark ? (
                                    <Sun className="w-5 h-5 text-yellow-400" />
                                ) : (
                                    <Moon className="w-5 h-5 text-[#112240]" />
                                )}
                            </motion.button>
                        )}

                        {user ? (
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className={`flex items-center gap-1.5 p-1.5 pr-3 rounded-full transition ${dark ? "hover:bg-white/5" : "hover:bg-slate-50"
                                        }`}
                                >
                                    <Avatar
                                        src={user?.image || user?.avatar || undefined}
                                        name={user?.name || "U"}
                                        classNames={{
                                            img: "opacity-100"
                                        }}
                                        className="w-9 h-9 border border-red-500/20 text-xs font-bold bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400"
                                    />
                                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${dark ? "text-slate-400" : "text-slate-600"} ${dropdownOpen ? "rotate-180" : ""}`} />
                                </button>

                                <AnimatePresence>
                                    {dropdownOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                            className={`absolute right-0 mt-3 w-56 rounded-2xl p-2 shadow-2xl border backdrop-blur-xl ${dark
                                                ? "bg-[#0F294A]/95 border-slate-800 text-white"
                                                : "bg-white border-slate-100 text-slate-800"
                                                }`}
                                        >
                                            <div className="px-3 py-2.5 mb-1.5 border-b border-slate-100 dark:border-white/5">
                                                <p className="text-xs text-slate-400 font-medium">Signed in as</p>
                                                <p className="text-sm font-bold truncate mt-0.5">{user.name}</p>
                                            </div>

                                            <Link
                                                href="/dashboard/donor"
                                                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold transition ${dark ? "hover:bg-white/5 text-slate-200" : "hover:bg-slate-50 text-slate-700"
                                                    }`}
                                            >
                                                <BiGridAlt className="text-lg text-red-500" />
                                                Dashboard
                                            </Link>

                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition mt-1"
                                            >
                                                <BiLogOut className="text-lg" />
                                                Logout
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <Link href="/login">
                                <button className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl shadow-lg shadow-red-600/20 transition">
                                    Login
                                </button>
                            </Link>
                        )}
                    </div>


                    <button className="md:hidden z-50 p-2" onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? (
                            <Xmark className="w-7 h-7 text-red-600" />
                        ) : (
                            <Bars className={`w-7 h-7 ${dark ? "text-white" : "text-[#112240]"}`} />
                        )}
                    </button>
                </div>
            </div>


            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className={`md:hidden border-t overflow-hidden relative z-50 ${dark ? "bg-[#0B1F3A] border-white/10" : "bg-white border-slate-100"
                            }`}
                    >
                        <div className="p-5 space-y-4 shadow-xl">
                            {links.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`block py-2 font-semibold text-lg ${pathname === link.href ? "text-red-600" : dark ? "text-white" : "text-[#112240]"
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}

                            {user && (
                                <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-white/5">
                                    <div className="flex items-center gap-3">
                                        <Avatar
                                            src={user?.image || user?.avatar || undefined}
                                            name={user?.name || "U"}
                                            className="text-xs font-bold bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400"
                                        />
                                        <div>
                                            <p className={`font-bold text-sm ${dark ? "text-white" : "text-slate-800"}`}>{user.name}</p>
                                            <p className="text-xs text-slate-400">{user.email}</p>
                                        </div>
                                    </div>
                                    <Link href="/dashboard/donor" className="block">
                                        <button className={`w-full py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 border ${dark ? "bg-white/5 border-white/10 text-white" : "bg-slate-50 border-slate-200 text-slate-700"
                                            }`}>
                                            <BiGridAlt className="text-base text-red-500" />
                                            Go to Dashboard
                                        </button>
                                    </Link>
                                </div>
                            )}


                            <div className="grid grid-cols-2 gap-4 pt-2">
                                {mounted && (
                                    <button
                                        onClick={toggleTheme}
                                        className={`p-3 rounded-xl flex items-center justify-center gap-2 border font-medium ${dark ? "bg-white/5 border-white/10 text-white" : "bg-slate-50 border-slate-200 text-[#112240]"
                                            }`}
                                    >
                                        {dark ? (
                                            <>
                                                <Sun className="w-4 h-4 text-yellow-400" />
                                                <span>Light</span>
                                            </>
                                        ) : (
                                            <>
                                                <Moon className="w-4 h-4 text-[#112240]" />
                                                <span>Dark</span>
                                            </>
                                        )}
                                    </button>
                                )}

                                {user ? (
                                    <button
                                        onClick={handleLogout}
                                        className="py-3 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 font-bold rounded-xl text-center border border-red-100 dark:border-red-900/30"
                                    >
                                        Logout
                                    </button>
                                ) : (
                                    <Link href="/login" className="w-full">
                                        <button className="w-full py-3 bg-red-600 text-white font-bold rounded-xl">
                                            Login
                                        </button>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}