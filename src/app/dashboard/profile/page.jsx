"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/providers/AuthProvider";
import { bloodGroups, districts, upazilas } from "@/components/geoData";
import { api } from "@/lib/api";
import { Card, TextField, Label, Input, Select, ListBox, Button, Form, Avatar } from "@heroui/react";

export default function ProfilePage() {
  const { user, refreshUser } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    bloodGroup: user?.bloodGroup || "",
    district: user?.district || "",
    upazila: user?.upazila || "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.updateProfile(formData);
      await refreshUser();
      setMessage("Profile updated successfully!");
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-6 max-w-[700px] mx-auto space-y-6">
      <h2 className="text-2xl font-bold">My Profile</h2>
      <Card className="p-6 bg-white dark:bg-[#0B1F3A] border shadow-md">
        <div className="flex items-center gap-4 mb-6">
          <Avatar src={user?.avatar} name={user?.name} className="w-20 h-20 text-xl" />
          <div>
            <p className="font-bold text-lg">{user?.name}</p>
            <p className="text-sm text-slate-500">{user?.email}</p>
            <p className="text-xs capitalize text-red-600 font-semibold mt-1">{user?.role}</p>
          </div>
        </div>

        {message && <p className="mb-4 text-sm text-green-600">{message}</p>}

        <Form onSubmit={handleSubmit} className="space-y-4">
          <TextField><Label>Full Name</Label><Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} /></TextField>
          <div>
            <Label>Blood Group</Label>
            <Select value={formData.bloodGroup} onChange={(v) => setFormData({ ...formData, bloodGroup: v })}>
              <Select.Trigger className="border rounded-xl h-10 px-3 mt-1"><Select.Value /><Select.Indicator /></Select.Trigger>
              <Select.Popover><ListBox className="p-1">{bloodGroups.map((g) => <ListBox.Item key={g.key} id={g.key}>{g.label}</ListBox.Item>)}</ListBox></Select.Popover>
            </Select>
          </div>
          <div>
            <Label>District</Label>
            <Select value={formData.district} onChange={(v) => setFormData({ ...formData, district: v, upazila: "" })}>
              <Select.Trigger className="border rounded-xl h-10 px-3 mt-1"><Select.Value /><Select.Indicator /></Select.Trigger>
              <Select.Popover><ListBox className="p-1 max-h-60 overflow-y-auto">{districts.map((d) => <ListBox.Item key={d.key} id={d.key}>{d.label}</ListBox.Item>)}</ListBox></Select.Popover>
            </Select>
          </div>
          <div>
            <Label>Upazila</Label>
            <Select isDisabled={!formData.district} value={formData.upazila} onChange={(v) => setFormData({ ...formData, upazila: v })}>
              <Select.Trigger className="border rounded-xl h-10 px-3 mt-1"><Select.Value /><Select.Indicator /></Select.Trigger>
              <Select.Popover><ListBox className="p-1 max-h-60 overflow-y-auto">{(upazilas[formData.district] || []).map((u) => <ListBox.Item key={u.key} id={u.key}>{u.label}</ListBox.Item>)}</ListBox></Select.Popover>
            </Select>
          </div>
          <Button type="submit" disabled={loading} className="w-full bg-red-600 text-white font-semibold rounded-xl">
            {loading ? "Saving..." : "Update Profile"}
          </Button>
        </Form>
      </Card>
    </motion.div>
  );
}
