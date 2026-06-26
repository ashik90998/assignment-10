"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/providers/AuthProvider";
import { bloodGroups, districts, upazilas } from "@/components/geoData";
import { api } from "@/lib/api";
import { Card, TextField, Label, Input, Select, ListBox, Button, Form } from "@heroui/react";

export default function CreateNewRequestPage() {
  const router = useRouter();
  const { user } = useAuth();
  const isBlocked = user?.status === "blocked";

  const [formData, setFormData] = useState({
    bloodGroup: "", district: "", upazila: "", recipientName: "",
    hospitalName: "", fullAddress: "", donationDate: "", donationTime: "", requestMessage: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSelectChange = (name, value) => {
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === "district") updated.upazila = "";
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isBlocked) return;
    setLoading(true);
    try {
      await api.createRequest(formData);
      const redirects = { donor: "/dashboard/donor/requests", volunteer: "/dashboard/volunteer/requests", admin: "/dashboard/admin/requests" };
      router.push(redirects[user?.role] || "/dashboard/donor/requests");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-6 max-w-[900px] mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Create Blood Donation Request</h2>
        <p className="text-sm text-slate-500">Provide the required medical and hospital details.</p>
      </div>

      {isBlocked && (
        <div className="p-4 bg-red-100 text-red-600 text-sm font-semibold rounded-xl">
          You are currently blocked from creating donation requests.
        </div>
      )}

      <Card className="p-6 bg-white dark:bg-[#0B1F3A] border shadow-md">
        <Form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextField><Label>Requester Name</Label><Input value={user?.name || ""} isReadOnly /></TextField>
            <TextField><Label>Requester Email</Label><Input value={user?.email || ""} isReadOnly /></TextField>
          </div>

          <TextField isRequired>
            <Label>Recipient Name</Label>
            <Input value={formData.recipientName} isDisabled={isBlocked} onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })} />
          </TextField>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>District *</Label>
              <Select isDisabled={isBlocked} value={formData.district} onChange={(v) => handleSelectChange("district", v)}>
                <Select.Trigger className="border rounded-xl h-10 px-3 mt-1"><Select.Value /><Select.Indicator /></Select.Trigger>
                <Select.Popover><ListBox className="p-1 max-h-60 overflow-y-auto">{districts.map((d) => <ListBox.Item key={d.key} id={d.key}>{d.label}</ListBox.Item>)}</ListBox></Select.Popover>
              </Select>
            </div>
            <div>
              <Label>Upazila *</Label>
              <Select isDisabled={!formData.district || isBlocked} value={formData.upazila} onChange={(v) => handleSelectChange("upazila", v)}>
                <Select.Trigger className="border rounded-xl h-10 px-3 mt-1"><Select.Value /><Select.Indicator /></Select.Trigger>
                <Select.Popover><ListBox className="p-1 max-h-60 overflow-y-auto">{(upazilas[formData.district] || []).map((u) => <ListBox.Item key={u.key} id={u.key}>{u.label}</ListBox.Item>)}</ListBox></Select.Popover>
              </Select>
            </div>
          </div>

          <TextField isRequired>
            <Label>Hospital Name</Label>
            <Input isDisabled={isBlocked} value={formData.hospitalName} onChange={(e) => setFormData({ ...formData, hospitalName: e.target.value })} />
          </TextField>
          <TextField isRequired><Label>Full Address</Label><Input isDisabled={isBlocked} value={formData.fullAddress} onChange={(e) => setFormData({ ...formData, fullAddress: e.target.value })} /></TextField>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <Label>Blood Group *</Label>
              <Select isDisabled={isBlocked} value={formData.bloodGroup} onChange={(v) => handleSelectChange("bloodGroup", v)}>
                <Select.Trigger className="border rounded-xl h-10 px-3 mt-1"><Select.Value /><Select.Indicator /></Select.Trigger>
                <Select.Popover><ListBox className="p-1">{bloodGroups.map((bg) => <ListBox.Item key={bg.key} id={bg.key}>{bg.label}</ListBox.Item>)}</ListBox></Select.Popover>
              </Select>
            </div>
            <TextField isRequired>
              <Label>Donation Date</Label>
              <Input type="date" isDisabled={isBlocked} value={formData.donationDate} onChange={(e) => setFormData({ ...formData, donationDate: e.target.value })} />
            </TextField>
            <TextField isRequired>
              <Label>Donation Time</Label>
              <Input type="time" isDisabled={isBlocked} value={formData.donationTime} onChange={(e) => setFormData({ ...formData, donationTime: e.target.value })} />
            </TextField>
          </div>

          <TextField isRequired><Label>Request Message</Label><Input isDisabled={isBlocked} value={formData.requestMessage} onChange={(e) => setFormData({ ...formData, requestMessage: e.target.value })} /></TextField>

          <Button type="submit" disabled={isBlocked || loading} className="w-full h-11 bg-red-600 text-white font-semibold rounded-xl">
            {loading ? "Submitting..." : "Submit Blood Request"}
          </Button>
        </Form>
      </Card>
    </motion.div>
  );
}
