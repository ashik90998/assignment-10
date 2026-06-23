"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, Pagination, Select, ListBox } from "@heroui/react";
import { api } from "@/lib/api";
import DonationTable from "@/components/dashboard/DonationTable";
import ProtectedRoute from "@/components/common/ProtectedRoute";

export default function VolunteerRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchRequests = async () => {
    const params = new URLSearchParams({ page, limit: 8 });
    if (statusFilter !== "all") params.set("status", statusFilter);
    const res = await api.getRequests(params.toString());
    setRequests(res.data);
    setTotalPages(res.totalPages);
  };

  useEffect(() => { fetchRequests().catch(console.error); }, [page, statusFilter]);

  return (
    <ProtectedRoute roles={["volunteer", "admin"]}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 max-w-[1400px] mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">All Blood Donation Requests</h2>
          <Select value={statusFilter} onChange={(v) => { setStatusFilter(v); setPage(1); }} className="w-48">
            <Select.Trigger className="border rounded-xl h-10 px-3"><Select.Value /><Select.Indicator /></Select.Trigger>
            <Select.Popover>
              <ListBox className="p-1">
                {["all", "pending", "inprogress", "done", "canceled"].map((s) => (
                  <ListBox.Item key={s} id={s} className="capitalize">{s}</ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
        </div>
        <Card className="p-6 bg-white dark:bg-[#0B1F3A] border shadow-md">
          <DonationTable requests={requests} showActions viewBasePath="/donation-requests" />
          {totalPages > 1 && <div className="mt-6 flex justify-center"><Pagination total={totalPages} page={page} onChange={setPage} color="danger" /></div>}
        </Card>
      </motion.div>
    </ProtectedRoute>
  );
}
