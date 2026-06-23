"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { bloodGroups, districts, upazilas } from "@/components/geoData";
import { api } from "@/lib/api";
import { Card, TextField, Label, Input, Select, ListBox, Button, Form } from "@heroui/react";

export default function EditRequestPage() {
  const { id } = useParams();
  const router = useRouter();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.getRequest(id).then((data) => {
      setFormData({
        recipientName: data.recipientName,
        district: data.district,
        upazila: data.upazila,
        hospitalName: data.hospitalName,
        fullAddress: data.fullAddress,
        bloodGroup: data.bloodGroup,
        donationDate: data.donationDate,
        donationTime: data.donationTime,
        requestMessage: data.requestMessage,
      });
    }).catch(() => router.push("/dashboard/donor/requests"));
  }, [id, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.updateRequest(id, formData);
      router.push("/dashboard/donor/requests");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!formData) return <div className="p-6">Loading...</div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 max-w-[900px] mx-auto space-y-6">
      <h2 className="text-2xl font-bold">Edit Donation Request</h2>
      <Card className="p-6 bg-white dark:bg-[#0B1F3A] border shadow-md">
        <Form onSubmit={handleSubmit} className="space-y-4">
          <TextField><Label>Recipient Name</Label><Input value={formData.recipientName} onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })} /></TextField>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>District</Label>
              <Select value={formData.district} onChange={(v) => setFormData({ ...formData, district: v, upazila: "" })}>
                <Select.Trigger className="border rounded-xl h-10 px-3 mt-1"><Select.Value /><Select.Indicator /></Select.Trigger>
                <Select.Popover><ListBox className="p-1">{districts.map((d) => <ListBox.Item key={d.key} id={d.key}>{d.label}</ListBox.Item>)}</ListBox></Select.Popover>
              </Select>
            </div>
            <div>
              <Label>Upazila</Label>
              <Select value={formData.upazila} onChange={(v) => setFormData({ ...formData, upazila: v })}>
                <Select.Trigger className="border rounded-xl h-10 px-3 mt-1"><Select.Value /><Select.Indicator /></Select.Trigger>
                <Select.Popover><ListBox className="p-1">{(upazilas[formData.district] || []).map((u) => <ListBox.Item key={u.key} id={u.key}>{u.label}</ListBox.Item>)}</ListBox></Select.Popover>
              </Select>
            </div>
          </div>
          <TextField><Label>Hospital</Label><Input value={formData.hospitalName} onChange={(e) => setFormData({ ...formData, hospitalName: e.target.value })} /></TextField>
          <TextField><Label>Address</Label><Input value={formData.fullAddress} onChange={(e) => setFormData({ ...formData, fullAddress: e.target.value })} /></TextField>
          <div>
            <Label>Blood Group</Label>
            <Select value={formData.bloodGroup} onChange={(v) => setFormData({ ...formData, bloodGroup: v })}>
              <Select.Trigger className="border rounded-xl h-10 px-3 mt-1"><Select.Value /><Select.Indicator /></Select.Trigger>
              <Select.Popover><ListBox className="p-1">{bloodGroups.map((g) => <ListBox.Item key={g.key} id={g.key}>{g.label}</ListBox.Item>)}</ListBox></Select.Popover>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <TextField><Label>Date</Label><Input type="date" value={formData.donationDate} onChange={(e) => setFormData({ ...formData, donationDate: e.target.value })} /></TextField>
            <TextField><Label>Time</Label><Input type="time" value={formData.donationTime} onChange={(e) => setFormData({ ...formData, donationTime: e.target.value })} /></TextField>
          </div>
          <TextField><Label>Message</Label><Input value={formData.requestMessage} onChange={(e) => setFormData({ ...formData, requestMessage: e.target.value })} /></TextField>
          <Button type="submit" disabled={loading} className="w-full bg-red-600 text-white rounded-xl">{loading ? "Saving..." : "Update Request"}</Button>
        </Form>
      </Card>
    </motion.div>
  );
}
