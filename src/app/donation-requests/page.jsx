"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Card, Chip, Pagination } from "@heroui/react";
import { api } from "@/lib/api";
import { formatStatus, getStatusColor, formatLocation } from "@/lib/utils";

export default function DonationRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    api.getPublicRequests(`page=${page}&limit=9`)
      .then((res) => {
        setRequests(res.data);
        setTotalPages(res.totalPages);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [page]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    },
    hover: {
      y: -10,
      scale: 1.03,
      boxShadow: "0px 20px 30px rgba(239, 68, 68, 0.15)",
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  };

  const bgParticleVariants = {
    animate1: {
      x: [0, 100, -50, 0],
      y: [0, -80, 120, 0],
      scale: [1, 1.2, 0.9, 1],
      transition: { duration: 20, repeat: Infinity, ease: "linear" }
    },
    animate2: {
      x: [0, -120, 80, 0],
      y: [0, 100, -60, 0],
      scale: [1, 0.8, 1.3, 1],
      transition: { duration: 25, repeat: Infinity, ease: "linear" }
    }
  };

  return (
    <div className="relative min-h-screen py-12 px-4 max-w-7xl mx-auto overflow-hidden bg-gradient-to-br from-slate-50 via-white to-red-50/30 dark:from-[#030712] dark:via-[#0B1F3A] dark:to-[#020617] transition-colors duration-500">

      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40 dark:opacity-25">
        <motion.div
          variants={bgParticleVariants}
          animate="animate1"
          className="absolute top-1/4 left-1/4 w-72 h-72 bg-red-400 dark:bg-red-900 rounded-full blur-[100px]"
        />
        <motion.div
          variants={bgParticleVariants}
          animate="animate2"
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rose-300 dark:bg-rose-950 rounded-full blur-[130px]"
        />
        <motion.div
          animate={{ y: [0, -20, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 right-10 w-4 h-4 bg-red-500 rounded-full grid grid-cols-1 shadow-[0_0_20px_#ef4444]"
        />
        <motion.div
          animate={{ y: [0, 30, 0], opacity: [0.1, 0.4, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-20 left-20 w-6 h-6 bg-red-500 rounded-full shadow-[0_0_30px_#ef4444]"
        />
      </div>

      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 80 }}
        className="relative z-10 text-center mb-16"
      >
        <motion.h1
          className="text-4xl md:text-6xl font-black text-slate-900 dark:text-slate-100 tracking-tight"
          whileHover={{ scale: 1.02 }}
        >
          Pending <span className="relative inline-block text-red-600 dark:text-red-500">
            Donation Requests
            <motion.span
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute bottom-1 left-0 h-[4px] bg-red-500 rounded-full"
            />
          </span>
        </motion.h1>
        <p className="text-slate-500 dark:text-slate-400 mt-4 text-lg font-medium max-w-md mx-auto">
          Help save lives by responding to urgent blood needs today.
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        {isLoading ? (
          // Skeleton/Loading State
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center py-20">
            <div className="text-red-500 animate-pulse text-xl font-bold">Loading Requests...</div>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {requests.map((req) => (
              <motion.div
                key={req._id}
                variants={cardVariants}
                whileHover="hover"
                layout
              >
                <Card className="p-6 h-full bg-white/70 dark:bg-[#0B1F3A]/60 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/50 shadow-lg rounded-2xl flex flex-col justify-between overflow-hidden relative group">
                  <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div>
                    <div className="flex justify-between items-start mb-5">
                      <h3 className="font-extrabold text-xl text-slate-800 dark:text-slate-200 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-300">
                        {req.recipientName}
                      </h3>
                      <Chip
                        variant="shadow"
                        color={getStatusColor(req.status)}
                        size="sm"
                        className="capitalize font-semibold shadow-sm"
                      >
                        {formatStatus(req.status)}
                      </Chip>
                    </div>

                    <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                      <div className="flex items-center gap-2 bg-red-50 dark:bg-red-950/40 p-2 rounded-xl border border-red-100 dark:border-red-900/30">
                        <span className="text-xs uppercase font-bold tracking-wider text-red-500">Blood Group:</span>
                        <span className="font-black text-lg text-red-600 dark:text-red-400 animate-pulse">{req.bloodGroup}</span>
                      </div>

                      <p className="flex items-center gap-2 mt-2">
                        📍 <span>{formatLocation(req.district, req.upazila)}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        🏥 <span className="font-medium">{req.hospitalName}</span>
                      </p>
                      <p className="flex items-center gap-2 text-xs bg-slate-100 dark:bg-slate-800/60 p-2 rounded-lg w-max">
                        📅 <span>{req.donationDate} at {req.donationTime}</span>
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-2">
                    <Link href={`/donation-requests/${req._id}`} className="block w-full">
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        className="w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 py-3 px-4 text-white font-bold rounded-xl shadow-md shadow-red-500/20 hover:shadow-red-500/40 transition-all duration-300 text-center text-sm tracking-wide"
                      >
                        View Details →
                      </motion.button>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoading && requests.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center text-slate-500 py-20 relative z-10"
        >
          <span className="text-5xl block mb-4">🩸</span>
          <p className="text-lg font-medium">No pending requests at the moment.</p>
        </motion.div>
      )}

      {totalPages > 1 && (
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-16 flex justify-center relative z-10"
        >
          <div className="bg-white/80 dark:bg-[#0B1F3A]/80 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-800/50">
            <Pagination total={totalPages} page={page} onChange={setPage} color="danger" size="lg" radius="xl" isCompact showControls />
          </div>
        </motion.div>
      )}
    </div>
  );
}