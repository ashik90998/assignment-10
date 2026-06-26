"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Persons, ListCheck, Heart, CircleDollar } from "@gravity-ui/icons";
import { api } from "@/lib/api";
import StatCard from "@/components/dashboard/StatCard";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import { useAuth } from "@/providers/AuthProvider";

export default function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState();
  const [chartType, setChartType] = useState("daily");

  useEffect(() => {
    api.getAdminStats().then(setStats).catch(console.error);
  }, []);

  if (!stats) return <div className="p-6">Loading...</div>;

  const chartData = stats.charts?.[chartType] || [];

  return (
    <ProtectedRoute roles={["admin"]}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 space-y-6 max-w-[1600px] mx-auto">
        <div>
          <h1 className="text-3xl font-bold">Wellcome Mr, {user.name} </h1>
          <p className="text-sm text-slate-500">Overview of platform activity</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard title="Total Users" value={stats.totalUsers} icon={Persons} />
          <StatCard title="Total Requests" value={stats.totalRequests} icon={ListCheck} color="blue" delay={0.1} />
          <StatCard title="Completed" value={stats.doneRequests} icon={Heart} color="green" delay={0.2} />
          <StatCard title="Total Funds" value={`$${stats.totalFunds}`} icon={CircleDollar} color="amber" delay={0.3} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard title="Donors" value={stats.totalDonors} delay={0.1} />
          <StatCard title="Volunteers" value={stats.totalVolunteers} color="blue" delay={0.2} />
          <StatCard title="Pending Requests" value={stats.pendingRequests} color="amber" delay={0.3} />
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-6 rounded-2xl bg-white dark:bg-[#0B1F3A] border shadow-md">
          <div className="flex gap-4 mb-6">
            {["daily", "weekly", "monthly"].map((type) => (
              <button key={type} onClick={() => setChartType(type)} className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize ${chartType === type ? "bg-red-600 text-white" : "bg-slate-100 dark:bg-slate-800"}`}>
                {type}
              </button>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#dc2626" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </motion.div>
    </ProtectedRoute>
  );
}
