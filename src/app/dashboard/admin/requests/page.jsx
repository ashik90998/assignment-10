"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@heroui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { api } from "@/lib/api";
import DonationTable from "@/components/dashboard/DonationTable";
import ProtectedRoute from "@/components/common/ProtectedRoute";

export default function AdminRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchRequests = async () => {
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "8",
      });

      if (statusFilter !== "all") {
        params.append("status", statusFilter);
      }

      const res = await api.getRequests(params.toString());

      setRequests(res?.data || []);
      setTotalPages(res?.totalPages || 1);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [currentPage, statusFilter]);

  const handleStatusChange = async (id, status) => {
    await api.updateRequestStatus(id, status);
    fetchRequests();
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this request?")) return;
    await api.deleteRequest(id);
    fetchRequests();
  };

  return (
    <ProtectedRoute roles={["admin"]}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-6 max-w-[1400px] mx-auto space-y-6"
      >
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            All Blood Donation Requests
          </h1>

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="border rounded-xl px-4 py-2 bg-white dark:bg-slate-900"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>

        <Card className="p-6">
          <DonationTable
            requests={requests}
            canManage
            viewBasePath="/admin/donation-requests"
            onStatusChange={handleStatusChange}
            onDelete={handleDelete}
          />

          {totalPages > 1 && (
            <div className="mt-6 flex justify-center items-center gap-3">
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.max(1, p - 1))
                }
                disabled={currentPage === 1}
                className="w-10 h-10 rounded-xl border flex items-center justify-center disabled:opacity-40"
              >
                <ChevronLeft size={18} />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-xl ${currentPage === page
                        ? "bg-red-500 text-white"
                        : "border"
                      }`}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="w-10 h-10 rounded-xl border flex items-center justify-center disabled:opacity-40"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </Card>
      </motion.div>
    </ProtectedRoute>
  );
}