"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, Pagination, Select, ListBox } from "@heroui/react";
import { api } from "@/lib/api";
import DonationTable from "@/components/dashboard/DonationTable";

export default function MyRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchRequests = async () => {
    const params = new URLSearchParams({ page: currentPage, limit: 5 });
    if (statusFilter !== "all") params.set("status", statusFilter);
    const res = await api.getRequests(params.toString());
    setRequests(res.data);
    setTotalPages(res.totalPages);
  };

  useEffect(() => { fetchRequests().catch(console.error); }, [currentPage, statusFilter]);

  const handleStatusChange = async (id, status) => {
    await api.updateRequestStatus(id, status);
    fetchRequests();
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this request?")) return;
    await api.deleteRequest(id);
    fetchRequests();
  };

  const filterOptions = [
    { key: "all", label: "All Requests" },
    { key: "pending", label: "Pending" },
    { key: "inprogress", label: "In Progress" },
    { key: "done", label: "Done" },
    { key: "canceled", label: "Canceled" },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 max-w-[1400px] mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold">My Donation Requests</h2>
          <p className="text-xs text-slate-500">View, filter, and manage all your submitted blood requests.</p>
        </div>
        <div className="w-52">
          <Select value={statusFilter} onChange={(v) => { setStatusFilter(v); setCurrentPage(1); }}>
            <Select.Trigger className="border rounded-xl h-10 px-3 text-sm">
              <Select.Value /><Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox className="p-1">
                {filterOptions.map((opt) => (
                  <ListBox.Item key={opt.key} id={opt.key} textValue={opt.label}>{opt.label}</ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
        </div>
      </div>

      <Card className="p-6 bg-white dark:bg-[#0B1F3A] border shadow-md">
        <DonationTable requests={requests} canManage viewBasePath="/donation-requests" onStatusChange={handleStatusChange} onDelete={handleDelete} />
        {totalPages > 1 && (
          <div className="mt-6 flex justify-center">
            <Pagination total={totalPages} page={currentPage} onChange={setCurrentPage} color="danger" size="sm" />
          </div>
        )}
      </Card>
    </motion.div>
  );
}
