"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  House,
  LayoutSideContentLeft,
  Person,
  Plus,
  ListCheck,
  Persons,
  Xmark,
} from "@gravity-ui/icons";
import { useAuth } from "@/providers/AuthProvider";
import Image from "next/image";

const navByRole = {
  donor: [
    { icon: House, href: "/dashboard/donor", label: "Dashboard" },
    { icon: ListCheck, href: "/dashboard/donor/requests", label: "My Requests" },
    { icon: Plus, href: "/dashboard/donor/requests/createNew", label: "Create Request" },
    { icon: Person, href: "/dashboard/profile", label: "Profile" },
  ],
  admin: [
    { icon: House, href: "/dashboard/admin", label: "Dashboard" },
    { icon: Persons, href: "/dashboard/admin/users", label: "All Users" },
    { icon: ListCheck, href: "/dashboard/admin/requests", label: "All Requests" },
    { icon: Person, href: "/dashboard/profile", label: "Profile" },
    { icon: Plus, href: "/dashboard/admin/createNew", label: "Create Request" },
  ],
  volunteer: [
    { icon: House, href: "/dashboard/volunteer", label: "Dashboard" },
    { icon: ListCheck, href: "/dashboard/volunteer/requests", label: "All Requests" },
    { icon: Plus, href: "/dashboard/requests/create", label: "Create Request" },
    { icon: Person, href: "/dashboard/profile", label: "Profile" },
  ],
};

export function DashboardSidebarPage() {
  const { user } = useAuth();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = navByRole[user?.role] || navByRole.donor;

  const navLinks = (
    <div className="flex flex-col h-full">
      {user && (
        <div className="border-b border-slate-200/60 dark:border-slate-800/60 pb-5 mb-4 flex items-center gap-3 px-1">
          <div className="relative">
            <Image
              src={user?.avatar || "/default-avatar.png"}
              alt={user?.name || "User Profile"}
              height={44}
              width={44}
              className="w-10 h-10 bg-red-100 dark:bg-red-950/40 rounded-xl text-red-600 object-cover ring-2 ring-red-500/20"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-[#0B1F3A] rounded-full animate-pulse" />
          </div>
          <div className="flex flex-col truncate ">
            <span className="text-lg font-black text-slate-800 dark:text-slate-200 truncate tracking-tight">
              {user?.name}
            </span>
            <span className="text-sm w-max font-bold px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-md capitalize mt-0.5 tracking-wide">
              {user?.role}
            </span>
          </div>
        </div>
      )}

      <nav className="flex flex-col gap-1 w-full">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              href={item.href}
              key={item.label}
              onClick={() => setMobileOpen(false)}
              className="relative block w-full group"
            >
              <motion.div
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                className={`relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold tracking-wide transition-colors duration-300 z-10 ${isActive
                    ? "text-red-600 dark:text-red-400"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                  }`}
              >
                <item.icon className={`size-5 transition-transform duration-300 ${isActive ? "scale-105" : "group-hover:scale-110"}`} />
                {item.label}


                {isActive && (
                  <motion.div
                    layoutId="sidebarActiveBg"
                    className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-rose-500/5 border-l-3 border-red-500 rounded-xl -z-10 dark:from-red-500/10 dark:to-transparent"
                    transition={{ type: "spring", stiffness: 380, damping: 28 }}
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>
    </div>
  );

  return (
    <>
    
      <aside className="hidden w-66 shrink-0 border-r border-slate-200/60 dark:border-slate-800/80 p-5 lg:flex flex-col gap-6 bg-white/80 dark:bg-[#0B1F3A]/90 backdrop-blur-xl relative">
        <div className="flex items-center gap-2.5 px-2 mb-2 group cursor-pointer">
          <motion.div
            whileHover={{ scale: 1.15, rotate: 12 }}
            className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-600 to-rose-600 flex items-center justify-center shadow-md shadow-red-600/20"
          >
            <span className="text-lg text-white">🩸</span>
          </motion.div>
          <span className="font-black text-base text-slate-900 dark:text-slate-50 tracking-tight">
            SaveBlood <span className="text-red-500 font-medium">Panel</span>
          </span>
        </div>
        <div className="flex-1">{navLinks}</div>
      </aside>


      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-40 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-2xl shadow-xl shadow-red-600/30 w-12 h-12 flex items-center justify-center border border-red-500/20 active:scale-95 transition-transform"
        aria-label="Open menu"
      >
        <LayoutSideContentLeft className="size-5" />
      </motion.button>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileOpen(false)}
              className="lg:hidden fixed inset-0 bg-slate-950/40 dark:bg-black/60 backdrop-blur-md z-50"
            />

            <motion.aside
              initial={{ x: "-100%", filter: "blur(4px)" }}
              animate={{ x: 0, filter: "blur(0px)" }}
              exit={{ x: "-100%", filter: "blur(4px)" }}
              transition={{ type: "spring", stiffness: 300, damping: 26 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-72 z-50 bg-white/95 dark:bg-[#0B1F3A]/95 backdrop-blur-xl border-r border-slate-200/60 dark:border-slate-800/60 p-5 flex flex-col shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-red-500 to-rose-500" />

              <div className="flex items-center justify-between mb-6 border-b border-slate-100 dark:border-white/5 pb-3">
                <span className="font-black text-lg tracking-tight text-slate-800 dark:text-white">SaveBlood</span>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setMobileOpen(false)}
                  className="p-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-slate-400 hover:text-red-500 transition-colors"
                >
                  <Xmark className="size-5" />
                </motion.button>
              </div>

              <div className="flex-1">{navLinks}</div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}