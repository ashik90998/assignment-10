"use client";

import React from "react";
import { Bell, Envelope, Gear, House, LayoutSideContentLeft, Magnifier, Person, Plus, ListCheck } from "@gravity-ui/icons";
import { Button, Drawer, Avatar } from "@heroui/react";
import { useSession } from "@/lib/auth-client";

export function DashboardSidebarPage() {
    const { data: sessionData } = useSession();
        const user = sessionData?.user;

    const navItems = [
        { icon: House, label: "Dashboard" },
        { icon: ListCheck, label: "My Requests" },
        { icon: Plus, label: "Create Request" },
        { icon: Person, label: "Profile" },
        { icon: Envelope, label: "Messages" },
        { icon: Gear, label: "Settings" },
    ];

    const naveLinks = (
        <div className="flex flex-col h-full">
            {user && (
                <div className="border-b border-slate-200 dark:border-slate-800 pb-4 flex items-center gap-3">
                    <Avatar
                        src={user?.image || user?.avatar || undefined}
                        name={user?.name || "U"}
                        classNames={{
                            img: "opacity-100"
                        }}
                        className="w-9 h-9 border border-red-500/20 text-xs font-bold bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400"
                    />
                    <div className="flex flex-col truncate">
                        <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">
                            {user?.name}
                        </span>
                        <span className="text-xs text-slate-400 truncate">
                            {user?.email}
                        </span>
                    </div>
                </div>
            )}
            <nav className="flex flex-col gap-1.5">
                {navItems.map((item) => (
                    <button
                        key={item.label}
                        className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${item.label === "Dashboard"
                                ? "bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400"
                                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900"
                            }`}
                        type="button"
                    >
                        <item.icon className="size-5" />
                        {item.label}
                    </button>
                ))}
            </nav>

          
        </div>
    );

    return (
        <>
            <aside className="hidden w-64 shrink-0 border-r border-slate-200 dark:border-slate-800 p-4 lg:flex flex-col gap-6 bg-white dark:bg-[#0B1F3A]">
                <div className="flex items-center gap-2 px-2">
                    <span className="text-2xl">🩸</span>
                    <span className="font-bold text-lg text-slate-950 dark:text-slate-50 tracking-tight">SaveBlood Network</span>
                </div>
                <div className="flex-1">{naveLinks}</div>
            </aside>


            <div className="lg:hidden fixed bottom-4 right-4 z-50">
                <Button onPress={() => { }} className="bg-red-600 text-white rounded-full p-4 shadow-lg min-w-0 w-12 h-12">
                    <LayoutSideContentLeft className="size-6" />
                </Button>
            </div>
        </>
    );
}