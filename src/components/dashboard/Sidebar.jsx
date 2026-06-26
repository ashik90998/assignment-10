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
  ListOl,
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
    { icon: ListCheck, href: "/dashboard/volunteer/requests", label: "My Requests" },
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
        <div className="border-b border-slate-200 dark:border-slate-800 pb-4 flex items-center gap-3">
          <Image
            src={user?.avatar}
            name={user?.name}
            alt={user?.name || "User Profile"}
            height={50}
            width={50}
            className="w-9 h-9 bg-red-100 rounded-full text-red-600"
          />
          <div className="flex flex-col truncate">
            <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">
              {user?.name}
            </span>
            <span className="text-xs text-slate-400 truncate capitalize">{user?.role}</span>
          </div>
        </div>
      )}

      <nav className="flex flex-col gap-1.5 mt-4">
        {
          navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                href={item.href}
                key={item.label}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${isActive
                  ? "bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900"
                  }`}
              >
                <item.icon className="size-5" />
                {item.label}
              </Link>
            );
          })
        }
      </nav>
    </div>
  );

  return (
    <>
      <aside className="hidden w-64 shrink-0 border-r border-slate-200 dark:border-slate-800 p-4 lg:flex flex-col gap-6 bg-white dark:bg-[#0B1F3A]">
        <div className="flex items-center gap-2 px-2">
          <span className="text-2xl">🩸</span>
          <span className="font-bold text-lg text-slate-950 dark:text-slate-50 tracking-tight">
            SaveBlood Network
          </span>
        </div>
        <div className="flex-1">{navLinks}</div>
      </aside>

      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed bottom-4 right-4 z-50 bg-red-600 text-white rounded-full p-4 shadow-lg w-12 h-12 flex items-center justify-center"
        aria-label="Open menu"
      >
        <LayoutSideContentLeft className="size-6" />
      </button>

      <AnimatePresence>
        {
          mobileOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileOpen(false)}
                className="lg:hidden fixed inset-0 bg-black/50 z-50"
              />
              <motion.aside
                initial={{ x: -280 }}
                animate={{ x: 0 }}
                exit={{ x: -280 }}
                transition={{ type: "spring", damping: 25 }}
                className="lg:hidden fixed left-0 top-0 bottom-0 w-72 z-50 bg-white dark:bg-[#0B1F3A] border-r border-slate-200 dark:border-slate-800 p-4 flex flex-col"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-bold text-lg">SaveBlood</span>
                  <button onClick={() => setMobileOpen(false)}>
                    <Xmark className="size-6" />
                  </button>
                </div>
                {navLinks}
              </motion.aside>
            </>
          )
        }
      </AnimatePresence>
    </>
  );
}
