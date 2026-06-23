"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, Button, Select, ListBox, Pagination, Avatar } from "@heroui/react";
import { bloodGroups, districts, upazilas } from "@/components/geoData";
import { api } from "@/lib/api";

export default function SearchPage() {
  const [filters, setFilters] = useState({ bloodGroup: "", district: "", upazila: "" });
  const [donors, setDonors] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const handleSearch = async (p = 1) => {
    setLoading(true);
    setSearched(true);
    try {
      const params = new URLSearchParams({ page: p, limit: 9 });
      if (filters.bloodGroup) params.set("bloodGroup", filters.bloodGroup);
      if (filters.district) params.set("district", filters.district);
      if (filters.upazila) params.set("upazila", filters.upazila);
      const res = await api.searchDonors(params.toString());
      setDonors(res.data);
      setTotalPages(res.totalPages);
      setPage(p);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = async () => {
    const { default: jsPDF } = await import("jspdf");
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("SaveBlood - Donor Search Results", 14, 20);
    doc.setFontSize(10);
    let y = 35;
    donors.forEach((d, i) => {
      doc.text(`${i + 1}. ${d.name} | ${d.bloodGroup} | ${d.district}/${d.upazila} | ${d.email}`, 14, y);
      y += 8;
      if (y > 280) { doc.addPage(); y = 20; }
    });
    doc.save("donor-search-results.pdf");
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen py-12 px-4 max-w-5xl mx-auto">
      <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold">Search <span className="text-red-600">Donors</span></h1>
        <p className="text-slate-500 mt-2">Find active donors by blood group and location</p>
      </motion.div>

      <Card className="p-6 bg-white dark:bg-[#0B1F3A] border shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Blood Group</label>
            <Select value={filters.bloodGroup} onChange={(v) => setFilters({ ...filters, bloodGroup: v })}>
              <Select.Trigger className="border rounded-xl h-10 px-3"><Select.Value placeholder="Select" /><Select.Indicator /></Select.Trigger>
              <Select.Popover><ListBox className="p-1">{bloodGroups.map((g) => <ListBox.Item key={g.key} id={g.key}>{g.label}</ListBox.Item>)}</ListBox></Select.Popover>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">District</label>
            <Select value={filters.district} onChange={(v) => setFilters({ ...filters, district: v, upazila: "" })}>
              <Select.Trigger className="border rounded-xl h-10 px-3"><Select.Value placeholder="Select" /><Select.Indicator /></Select.Trigger>
              <Select.Popover><ListBox className="p-1 max-h-60 overflow-y-auto">{districts.map((d) => <ListBox.Item key={d.key} id={d.key}>{d.label}</ListBox.Item>)}</ListBox></Select.Popover>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Upazila</label>
            <Select isDisabled={!filters.district} value={filters.upazila} onChange={(v) => setFilters({ ...filters, upazila: v })}>
              <Select.Trigger className="border rounded-xl h-10 px-3"><Select.Value placeholder="Select" /><Select.Indicator /></Select.Trigger>
              <Select.Popover><ListBox className="p-1 max-h-60 overflow-y-auto">{(upazilas[filters.district] || []).map((u) => <ListBox.Item key={u.key} id={u.key}>{u.label}</ListBox.Item>)}</ListBox></Select.Popover>
            </Select>
          </div>
        </div>
        <Button onClick={() => handleSearch(1)} disabled={loading} className="w-full mt-4 bg-red-600 text-white font-bold py-6 rounded-xl">
          {loading ? "Searching..." : "Search Donors"}
        </Button>
      </Card>

      <AnimatePresence>
        {searched && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {donors.length > 0 && (
              <div className="flex justify-end mb-4">
                <Button onClick={downloadPDF} variant="flat" className="text-red-600 font-semibold">Download PDF</Button>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {donors.map((donor, i) => (
                <motion.div key={donor._id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}>
                  <Card className="p-6 h-full bg-white dark:bg-[#0B1F3A] border shadow-md text-center">
                    <Avatar src={donor.avatar} name={donor.name} className="w-16 h-16 mx-auto mb-3" />
                    <h3 className="font-bold text-lg">{donor.name}</h3>
                    <p className="text-red-600 font-bold text-xl my-1">{donor.bloodGroup}</p>
                    <p className="text-sm text-slate-500">{donor.district} / {donor.upazila}</p>
                    <p className="text-xs text-slate-400 mt-2">{donor.email}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
            {donors.length === 0 && <p className="text-center text-slate-500 py-8">No donors found matching your criteria.</p>}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <Pagination total={totalPages} page={page} onChange={(p) => handleSearch(p)} color="danger" />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
