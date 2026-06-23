"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ListCheck, Clock, Heart, CircleDollar } from "@gravity-ui/icons";
import { api } from "@/lib/api";
import StatCard from "@/components/dashboard/StatCard";
import ProtectedRoute from "@/components/common/ProtectedRoute";

export default function VolunteerDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.getVolunteerStats().then(setStats).catch(console.error);
  }, []);

  if (!stats) return <div className="p-6">Loading...</div>;

  return (
    <ProtectedRoute roles={["volunteer", "admin"]}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 space-y-6 max-w-[1600px] mx-auto">
        <div>
          <h1 className="text-2xl font-bold">Volunteer Dashboard</h1>
          <p className="text-sm text-slate-500">Monitor donation requests and funding</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard title="Total Requests" value={stats.totalRequests} icon={ListCheck} />
          <StatCard title="Pending" value={stats.pendingRequests} icon={Clock} color="amber" delay={0.1} />
          <StatCard title="In Progress" value={stats.inProgressRequests} icon={Heart} color="blue" delay={0.2} />
          <StatCard title="Total Funds" value={`$${stats.totalFunds}`} icon={CircleDollar} color="green" delay={0.3} />
        </div>
      </motion.div>
    </ProtectedRoute>
  );
}
