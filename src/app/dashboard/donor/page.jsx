"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Card, Button, Input, Chip, Avatar, Badge } from "@heroui/react";
import { Magnifier, Bell, LayoutCells, Calendar, Clock, Heart, TriangleRight } from "@gravity-ui/icons";
import { useSession } from "@/lib/auth-client";

export default function DonorDashboard() {
    const { data: sessionData } = useSession();
    const user = sessionData?.user;

    const [currentTime, setCurrentTime] = useState("");

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString("en-US", { hour12: false }));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const [recentRequests, setRecentRequests] = useState([
        {
            id: 1,
            name: "Alam Name",
            location: "Dhaka/Gulshan",
            date: "03/03/2026",
            time: "07:50 PM",
            group: "A+",
            status: "Pending"
        },
        {
            id: 2,
            name: "Admin Name",
            location: "Dhaka/Gulshan",
            date: "12/02/2026",
            time: "07:50 PM",
            group: "B-",
            status: "In Progress",
            donorInfo: { name: "Ashik Mridha", email: "ashik@example.com" } // In Progress থাকলে ডোনর ইনফো দেখাবে
        },
        {
            id: 3,
            name: "Momn Name",
            location: "Dhaka/Gulshan",
            date: "12/02/2026",
            time: "07:50 PM",
            group: "B+",
            status: "Done"
        },
    ]);

    const handleStatusChange = (id, newStatus) => {
        setRecentRequests(prev =>
            prev.map(req => req.id === id ? { ...req, status: newStatus } : req)
        );
    };

    
    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this donation request?")) {
            setRecentRequests(prev => prev.filter(req => req.id !== id));
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Pending": return "warning";
            case "In Progress": return "primary";
            case "Done": return "success";
            case "Canceled": return "danger";
            default: return "default";
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300">

            {/* Top Navigation Bar */}
            <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B1F3A] px-6 py-3 flex items-center justify-between sticky top-0 z-40">
                <div className="w-72">
                    <Input
                        placeholder="Search anything here..."
                        startContent={<Magnifier className="text-slate-400 size-4" />}
                        variant="flat"
                        size="sm"
                        className="bg-slate-100 dark:bg-slate-700 w-full "
                    />
                </div>
                <div className="flex items-center gap-4">
                    <Button isIconOnly variant="light" size="sm">
                        <LayoutCells className="size-5 text-slate-500" />
                    </Button>
                </div>
            </header>

            <main className="p-6 space-y-6 max-w-[1600px] mx-auto">


                <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

                    {recentRequests.length > 0 && (
                        <Card className="xl:col-span-7 p-6 bg-slate-50 dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 shadow-md flex flex-col justify-between">
                            <div>
                                <h3 className="text-md font-bold uppercase tracking-wide text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                                    <span className="w-1 h-4 bg-red-600 rounded-full"></span> My Recent Donation Requests
                                </h3>

                                <div className="w-full overflow-x-auto border border-slate-100 dark:border-slate-900 rounded-xl">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-slate-100 dark:bg-slate-800  border-b border-slate-100 dark:border-slate-900">
                                                <th className="p-3 text-xs font-semibold text-slate-600 dark:text-slate-400">Recipient Name</th>
                                                <th className="p-3 text-xs font-semibold text-slate-600 dark:text-slate-400">Recipient Location (District & Upazila)</th>
                                                <th className="p-3 text-xs font-semibold text-slate-600 dark:text-slate-400">Donation Date & Time</th>
                                                <th className="p-3 text-xs font-semibold text-slate-600 dark:text-slate-400 text-center">Blood Group</th>
                                                <th className="p-3 text-xs font-semibold text-slate-600 dark:text-slate-400">Donation Status</th>
                                                <th className="p-3 text-xs font-semibold text-slate-600 dark:text-slate-400 text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {recentRequests.slice(0, 3).map((row) => (
                                                <tr key={row.id} className="border-b border-slate-100 dark:border-slate-900 last:border-0 hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors">
                                                    <td className="p-3 font-semibold text-sm">
                                                        {row.name}
                                                    </td>
                                                    <td className="p-3 text-xs text-slate-500 dark:text-slate-400">{row.location}</td>
                                                    <td className="p-3 text-xs">
                                                        <div>{row.date}</div>
                                                        <div className="text-[10px] text-slate-400">{row.time}</div>
                                                    </td>
                                                    <td className="p-3 text-center font-bold text-red-600 dark:text-red-400">{row.group}</td>
                                                    <td className="p-3">
                                                        <Chip color={getStatusColor(row.status)} variant="flat" size="sm" className="font-medium">
                                                            {row.status}
                                                        </Chip>

                                                        {/* রিকোয়ারমেন্ট: স্ট্যাটাস ইন-প্রোগ্রেস হলে ডোনর ইনফো দৃশ্যমান হবে */}
                                                        {row.status === "In Progress" && row.donorInfo && (
                                                            <div className="mt-2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded text-[10px] space-y-0.5">
                                                                <p className="font-semibold text-slate-700 dark:text-slate-300">Donor: {row.donorInfo.name}</p>
                                                                <p className="text-slate-500">{row.donorInfo.email}</p>
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td className="p-3 text-right space-y-1">
                                                        <div className="flex items-center justify-end gap-1.5 flex-wrap">
                                                            {/* রিকোয়ারমেন্ট: কেবল In Progress থাকলেই Done এবং Cancel বাটন অ্যাক্টিভ হবে */}
                                                            {row.status === "In Progress" && (
                                                                <>
                                                                    <Button size="xs" color="success" variant="flat" className="text-[11px] h-7 px-2 font-medium" onClick={() => handleStatusChange(row.id, "Done")}>
                                                                        Done
                                                                    </Button>
                                                                    <Button size="xs" color="danger" variant="flat" className="text-[11px] h-7 px-2 font-medium" onClick={() => handleStatusChange(row.id, "Canceled")}>
                                                                        Cancel
                                                                    </Button>
                                                                </>
                                                            )}

                                                            <Button as={Link} href={`/dashboard/request/${row.id}`} size="xs" variant="flat" className="text-[11px] h-7 px-2 font-medium">
                                                                View
                                                            </Button>
                                                            <Button as={Link} href={`/dashboard/request/edit/${row.id}`} size="xs" variant="flat" color="warning" className="text-[11px] h-7 px-2 font-medium">
                                                                Edit
                                                            </Button>
                                                            <Button size="xs" color="danger" className="text-[11px] h-7 px-2 font-medium bg-red-600 text-white" onClick={() => handleDelete(row.id)}>
                                                                Delete
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* View My All Requests Button */}
                            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-900 flex justify-start">
                                <Button as={Link} href="/dashboard/my-requests" size="sm" variant="solid" className="font-medium bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md">
                                    View All Requests
                                </Button>
                            </div>
                        </Card>
                    )}
                </div>
            </main>
        </div>
    );
}