"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
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

  if (authLoading || !request) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen py-12 px-4 max-w-3xl mx-auto">
      <Card className="p-8 bg-white dark:bg-[#0B1F3A] border shadow-lg">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-2xl font-bold">Donation Request Details</h1>
          <Chip color={getStatusColor(request.status)}>{formatStatus(request.status)}</Chip>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          {[
            ["Recipient", request.recipientName],
            ["Blood Group", request.bloodGroup],
            ["Location", formatLocation(request.district, request.upazila)],
            ["Hospital", request.hospitalName],
            ["Address", request.fullAddress],
            ["Date", request.donationDate],
            ["Time", request.donationTime],
            ["Requester", request.requesterName],
            ["Requester Email", request.requesterEmail],
          ].map(([label, value]) => (
            <div key={label} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900">
              <p className="text-xs text-slate-500">{label}</p>
              <p className="font-semibold mt-0.5">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900">
          <p className="text-xs text-slate-500">Message</p>
          <p className="mt-1">{request.requestMessage}</p>
        </div>

        {request.status === "inprogress" && request.donorName && (
          <div className="mt-4 p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200">
            <p className="font-semibold text-red-600">Donor Information</p>
            <p className="text-sm mt-1">{request.donorName} — {request.donorEmail}</p>
            {request.donorPhone && <p className="text-sm">{request.donorPhone}</p>}
          </div>
        )}

        {request.status === "pending" && (
          <Button onClick={() => setModalOpen(true)} className="w-full mt-6 bg-red-600 text-white font-bold py-6 rounded-xl">
            Donate Blood
          </Button>
        )}
      </Card>

      <AnimatedModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Confirm Blood Donation"
        footer={
          <>
            <Button variant="flat" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button className="bg-red-600 text-white" onClick={handleDonate} disabled={submitting}>
              {submitting ? "Confirming..." : "Confirm Donation"}
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <TextField><Label>Your Name</Label><Input value={donorForm.donorName} onChange={(e) => setDonorForm({ ...donorForm, donorName: e.target.value })} /></TextField>
          <TextField><Label>Email</Label><Input value={donorForm.donorEmail} onChange={(e) => setDonorForm({ ...donorForm, donorEmail: e.target.value })} /></TextField>
          <TextField><Label>Phone</Label><Input value={donorForm.donorPhone} onChange={(e) => setDonorForm({ ...donorForm, donorPhone: e.target.value })} /></TextField>
          <TextField><Label>Message</Label><Input value={donorForm.donorMessage} onChange={(e) => setDonorForm({ ...donorForm, donorMessage: e.target.value })} /></TextField>
        </div>
      </AnimatedModal>
    </motion.div>
  );
}
