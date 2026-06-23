"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, Button } from "@heroui/react";
import { Heart, Clock, Check, ListCheck } from "@gravity-ui/icons";
import { api } from "@/lib/api";
import StatCard from "@/components/dashboard/StatCard";
import DonationTable from "@/components/dashboard/DonationTable";

export default function DonorDashboard() {
  const [stats, setStats] = useState({ total: 0, pending: 0, inprogress: 0, done: 0 });
  const [recentRequests, setRecentRequests] = useState([]);

  useEffect(() => {
    api.getDonorStats().then(setStats).catch(console.error);
    api.getRequests("limit=3").then((res) => setRecentRequests(res.data)).catch(console.error);
  }, []);

  const handleStatusChange = async (id, status) => {
    await api.updateRequestStatus(id, status);
    const res = await api.getRequests("limit=3");
    setRecentRequests(res.data);
    api.getDonorStats().then(setStats);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this request?")) return;
    await api.deleteRequest(id);
    const res = await api.getRequests("limit=3");
    setRecentRequests(res.data);
    api.getDonorStats().then(setStats);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <div>
        <h1 className="text-2xl font-bold">Donor Dashboard</h1>
        <p className="text-sm text-slate-500">Track your blood donation requests</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="Total Requests" value={stats.total} icon={ListCheck} delay={0} />
        <StatCard title="Pending" value={stats.pending} icon={Clock} color="amber" delay={0.1} />
        <StatCard title="In Progress" value={stats.inprogress} icon={Heart} color="blue" delay={0.2} />
        <StatCard title="Completed" value={stats.done} icon={Check} color="green" delay={0.3} />
      </div>

      <Card className="p-6 bg-white dark:bg-[#0B1F3A] border shadow-md">
        <h3 className="text-md font-bold uppercase tracking-wide mb-4 flex items-center gap-2">
          <span className="w-1 h-4 bg-red-600 rounded-full" /> My Recent Donation Requests
        </h3>
        <DonationTable
          requests={recentRequests}
          canManage
          viewBasePath="/donation-requests"
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
        />
        <div className="mt-6 pt-4 border-t">
          <Button as={Link} href="/dashboard/donor/requests" className="bg-red-600 text-white font-medium">
            View All Requests
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
