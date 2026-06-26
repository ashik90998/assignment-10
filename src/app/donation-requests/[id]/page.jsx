"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Card, Button, Chip, Input, Label, TextField } from "@heroui/react";
import { api } from "@/lib/api";
import { useAuth } from "@/providers/AuthProvider";
import { formatStatus, getStatusColor, formatLocation } from "@/lib/utils";
import AnimatedModal from "@/components/common/AnimatedModal";

export default function DonationRequestDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [request, setRequest] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [donorForm, setDonorForm] = useState({ donorName: "", donorEmail: "", donorPhone: "", donorMessage: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/login");
      return;
    }
    if (user) {
      setDonorForm({ donorName: user.name, donorEmail: user.email, donorPhone: "", donorMessage: "" });
      api.getRequest(id).then(setRequest).catch(() => router.push("/donation-requests"));
    }
  }, [id, user, authLoading, router]);

  const handleDonate = async () => {
    setSubmitting(true);
    try {
      await api.donateToRequest(id, donorForm);
      const updated = await api.getRequest(id);
      setRequest(updated);
      setModalOpen(false);
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const bgParticleVariants = {
    animate1: {
      x: [0, 80, -40, 0],
      y: [0, -60, 100, 0],
      scale: [1, 1.15, 0.95, 1],
      transition: { duration: 18, repeat: Infinity, ease: "linear" }
    },
    animate2: {
      x: [0, -100, 60, 0],
      y: [0, 80, -50, 0],
      scale: [1, 0.85, 1.2, 1],
      transition: { duration: 22, repeat: Infinity, ease: "linear" }
    }
  };

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  if (authLoading || !request) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-white dark:from-[#030712] dark:to-[#0B1F3A]">
        <div className="relative flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full z-10"
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-8 h-8 bg-red-500/20 rounded-full absolute"
          />
        </div>
      </div>
    );
  }

  const infoGridItems = [
    { label: "Recipient", value: request.recipientName, icon: "👤" },
    { label: "Blood Group", value: request.bloodGroup, icon: "🩸", isBlood: true },
    { label: "Location", value: formatLocation(request.district, request.upazila), icon: "📍" },
    { label: "Hospital", value: request.hospitalName, icon: "🏥" },
    { label: "Address", value: request.fullAddress, icon: "🏠" },
    { label: "Date", value: request.donationDate, icon: "📅" },
    { label: "Time", value: request.donationTime, icon: "🕒" },
    { label: "Requester", value: request.requesterName, icon: "📞" },
    { label: "Requester Email", value: request.requesterEmail, icon: "✉️" },
  ];

  return (
    <div className="relative min-h-screen py-12 px-4 max-w-3xl mx-auto overflow-hidden bg-gradient-to-br from-slate-50 via-white to-red-50/30 dark:from-[#030712] dark:via-[#0B1F3A] dark:to-[#020617] transition-colors duration-500 rounded-3xl my-6">

      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40 dark:opacity-25">
        <motion.div variants={bgParticleVariants} animate="animate1" className="absolute top-1/3 -left-20 w-80 h-80 bg-red-400 dark:bg-red-900 rounded-full blur-[110px]" />
        <motion.div variants={bgParticleVariants} animate="animate2" className="absolute bottom-1/3 -right-20 w-80 h-80 bg-rose-300 dark:bg-rose-950 rounded-full blur-[110px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", damping: 20 }}
        className="relative z-10"
      >
        <Card className="p-6 md:p-8 bg-white/70 dark:bg-[#0B1F3A]/60 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/50 shadow-2xl rounded-2xl">

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 border-b border-slate-200/50 dark:border-slate-700/50 pb-5">
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
                Donation <span className="text-red-600 dark:text-red-500">Details</span>
              </h1>
              <p className="text-xs text-slate-500 mt-1">Request ID: {id}</p>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Chip variant="shadow" color={getStatusColor(request.status)} className="font-bold capitalize px-4 py-3 text-sm shadow-md">
                {formatStatus(request.status)}
              </Chip>
            </motion.div>
          </div>

          <motion.div
            variants={gridVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {infoGridItems.map((item) => (
              <motion.div
                key={item.label}
                variants={itemVariants}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className={`p-4 rounded-xl flex items-start gap-3 transition-colors ${item.isBlood
                    ? "bg-red-50 dark:bg-red-950/40 border border-red-100 dark:border-red-900/30"
                    : "bg-slate-50/80 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/40"
                  }`}
              >
                <span className="text-lg mt-0.5">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">{item.label}</p>
                  <p className={`mt-1 font-bold break-words ${item.isBlood ? "text-xl text-red-600 dark:text-red-400 animate-pulse font-black" : "text-slate-800 dark:text-slate-200"
                    }`}>
                    {item.value}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-5 p-5 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/40"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">📋 Message / Description</p>
            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed italic">
              "{request.requestMessage || "No description provided."}"
            </p>
          </motion.div>

          <AnimatePresence>
            {request.status === "inprogress" && request.donorName && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="mt-6 p-5 rounded-xl bg-red-50/60 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 shadow-inner"
              >
                <div className="flex items-center gap-2 mb-2 text-red-600 dark:text-red-400">
                  <span className="text-lg">🤝</span>
                  <p className="font-extrabold tracking-wide uppercase text-xs">Accepted Donor Information</p>
                </div>
                <div className="text-sm space-y-1 text-slate-700 dark:text-slate-300 pl-7">
                  <p className="font-bold text-base text-slate-900 dark:text-slate-100">{request.donorName}</p>
                  <p>✉️ {request.donorEmail}</p>
                  {request.donorPhone && <p>📞 {request.donorPhone}</p>}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {request.status === "pending" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8"
            >
              <Button
                onClick={() => setModalOpen(true)}
                className="w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-black text-base py-7 rounded-xl shadow-lg shadow-red-500/20 hover:shadow-red-500/40 transition-all duration-300 relative overflow-hidden group"
              >
                <span className="absolute inset-0 bg-white/10 scale-0 group-hover:scale-100 rounded-xl transition-transform duration-500 ease-out" />
                <span className="flex items-center justify-center gap-2">
                  🩸 Donate Blood Now
                </span>
              </Button>
            </motion.div>
          )}
        </Card>
      </motion.div>

      <AnimatedModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Confirm Blood Donation"
        footer={
          <div className="flex gap-3 w-full justify-end mt-2">
            <Button variant="flat" color="default" className="font-bold" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold px-6"
              onClick={handleDonate}
              disabled={submitting}
            >
              {submitting ? "Confirming..." : "Confirm Donation ❤️"}
            </Button>
          </div>
        }
      >
        <div className="space-y-4 py-2">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
            Please verify or fill out your contact details so the requester can reach you immediately.
          </p>
          <div className="grid grid-cols-1 gap-4">
            <TextField><Label className="text-slate-600 dark:text-slate-400 font-semibold text-xs">Your Name</Label><Input className="mt-1" value={donorForm.donorName} onChange={(e) => setDonorForm({ ...donorForm, donorName: e.target.value })} /></TextField>
            <TextField><Label className="text-slate-600 dark:text-slate-400 font-semibold text-xs">Email Address</Label><Input className="mt-1" value={donorForm.donorEmail} onChange={(e) => setDonorForm({ ...donorForm, donorEmail: e.target.value })} /></TextField>
            <TextField><Label className="text-slate-600 dark:text-slate-400 font-semibold text-xs">Phone Number</Label><Input className="mt-1" placeholder="e.g. 017XXXXXXXX" value={donorForm.donorPhone} onChange={(e) => setDonorForm({ ...donorForm, donorPhone: e.target.value })} /></TextField>
            <TextField><Label className="text-slate-600 dark:text-slate-400 font-semibold text-xs">Short Message (Optional)</Label><Input className="mt-1" placeholder="I can donate at that time..." value={donorForm.donorMessage} onChange={(e) => setDonorForm({ ...donorForm, donorMessage: e.target.value })} /></TextField>
          </div>
        </div>
      </AnimatedModal>
    </div>
  );
}