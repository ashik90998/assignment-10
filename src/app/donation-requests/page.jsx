"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card, Button, Chip, Pagination, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, Label, TextField } from "@heroui/react";
import { api } from "@/lib/api";
import { useAuth } from "@/providers/AuthProvider";
import { formatStatus, getStatusColor, formatLocation } from "@/lib/utils";

export default function DonationRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    api.getPublicRequests(`page=${page}&limit=9`).then((res) => {
      setRequests(res.data);
      setTotalPages(res.totalPages);
    }).catch(console.error);
  }, [page]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen py-12 px-4 max-w-7xl mx-auto">
      <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
          Pending <span className="text-red-600">Donation Requests</span>
        </h1>
        <p className="text-slate-500 mt-2">Help save lives by responding to urgent blood needs</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {requests.map((req, i) => (
          <motion.div key={req._id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Card className="p-6 h-full bg-white dark:bg-[#0B1F3A] border shadow-md hover:shadow-xl transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-lg">{req.recipientName}</h3>
                <Chip color={getStatusColor(req.status)} size="sm">{formatStatus(req.status)}</Chip>
              </div>
              <div className="space-y-2 text-sm text-slate-500">
                <p><span className="font-semibold text-red-600">{req.bloodGroup}</span> needed</p>
                <p>{formatLocation(req.district, req.upazila)}</p>
                <p>{req.hospitalName}</p>
                <p>{req.donationDate} at {req.donationTime}</p>
              </div>
              <Button as={Link} href={`/donation-requests/${req._id}`} className="w-full mt-4 bg-red-600 text-white font-semibold rounded-xl">
                View Details
              </Button>
            </Card>
          </motion.div>
        ))}
      </div>

      {requests.length === 0 && <p className="text-center text-slate-500 py-12">No pending requests at the moment.</p>}

      {totalPages > 1 && (
        <div className="mt-10 flex justify-center">
          <Pagination total={totalPages} page={page} onChange={setPage} color="danger" />
        </div>
      )}
    </motion.div>
  );
}
