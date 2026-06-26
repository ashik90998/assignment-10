"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, Button, Select, ListBox, Pagination, Avatar } from "@heroui/react";
import { bloodGroups, districts, upazilas } from "@/components/geoData";
import { api } from "@/lib/api";
import Image from "next/image";
import { useAuth } from "@/providers/AuthProvider";

export default function SearchPage() {
  const [filters, setFilters] = useState({ bloodGroup: "", district: "", upazila: "" });
  const [donors, setDonors] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const { user } = useAuth();
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

  const bgParticleVariants = {
    animate1: {
      x: [0, 70, -40, 0],
      y: [0, -90, 80, 0],
      scale: [1, 1.25, 0.9, 1],
      transition: { duration: 22, repeat: Infinity, ease: "linear" }
    },
    animate2: {
      x: [0, -90, 60, 0],
      y: [0, 70, -90, 0],
      scale: [1, 0.8, 1.2, 1],
      transition: { duration: 26, repeat: Infinity, ease: "linear" }
    }
  };

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.85, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 14 }
    },
    hover: {
      y: -8,
      scale: 1.03,
      boxShadow: "0px 20px 30px rgba(239, 68, 68, 0.12)",
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  };

  return (
    <div className="relative min-h-screen py-12 px-4 max-w-5xl mx-auto overflow-hidden bg-gradient-to-br from-slate-50 via-white to-red-50/30 dark:from-[#030712] dark:via-[#0B1F3A] dark:to-[#020617] transition-colors duration-500">

      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40 dark:opacity-25">
        <motion.div variants={bgParticleVariants} animate="animate1" className="absolute top-1/3 left-1/4 w-80 h-80 bg-red-400 dark:bg-red-900 rounded-full blur-[110px]" />
        <motion.div variants={bgParticleVariants} animate="animate2" className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-rose-300 dark:bg-rose-950 rounded-full blur-[130px]" />
      </div>

      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring" }}
        className="relative z-10 text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
          Search <span className="text-red-600 dark:text-red-500">Donors</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-3 text-base font-medium">
          Find active donors nearby by filtering blood group and location.
        </p>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, type: "spring" }}
        className="relative z-10"
      >
        <Card className="p-6 md:p-8 bg-white/70 dark:bg-[#0B1F3A]/60 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/50 shadow-2xl rounded-2xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="space-y-2">
              <label className="text-xs uppercase font-extrabold tracking-wider text-slate-400 dark:text-slate-500 block pl-1">Blood Group</label>
              <Select value={filters.bloodGroup} onChange={(v) => setFilters({ ...filters, bloodGroup: v })} className="w-full">
                <Select.Trigger className="border border-slate-200/60 dark:border-slate-700/50 bg-white/50 dark:bg-slate-900/40 rounded-xl h-12 px-4 shadow-inner transition-all"><Select.Value placeholder="Choose Group" /><Select.Indicator /></Select.Trigger>
                <Select.Popover><ListBox className="p-1">{bloodGroups.map((g) => <ListBox.Item key={g.key} id={g.key} className="rounded-lg font-semibold">{g.label}</ListBox.Item>)}</ListBox></Select.Popover>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase font-extrabold tracking-wider text-slate-400 dark:text-slate-500 block pl-1">District</label>
              <Select value={filters.district} onChange={(v) => setFilters({ ...filters, district: v, upazila: "" })} className="w-full">
                <Select.Trigger className="border border-slate-200/60 dark:border-slate-700/50 bg-white/50 dark:bg-slate-900/40 rounded-xl h-12 px-4 shadow-inner transition-all"><Select.Value placeholder="Choose District" /><Select.Indicator /></Select.Trigger>
                <Select.Popover><ListBox className="p-1 max-h-60 overflow-y-auto">{districts.map((d) => <ListBox.Item key={d.key} id={d.key} className="rounded-lg font-semibold">{d.label}</ListBox.Item>)}</ListBox></Select.Popover>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase font-extrabold tracking-wider text-slate-400 dark:text-slate-500 block pl-1">Upazila</label>
              <Select isDisabled={!filters.district} value={filters.upazila} onChange={(v) => setFilters({ ...filters, upazila: v })} className="w-full">
                <Select.Trigger className="border border-slate-200/60 dark:border-slate-700/50 bg-white/50 dark:bg-slate-900/40 rounded-xl h-12 px-4 shadow-inner transition-all disabled:opacity-40"><Select.Value placeholder="Choose Upazila" /><Select.Indicator /></Select.Trigger>
                <Select.Popover><ListBox className="p-1 max-h-60 overflow-y-auto">{(upazilas[filters.district] || []).map((u) => <ListBox.Item key={u.key} id={u.key} className="rounded-lg font-semibold">{u.label}</ListBox.Item>)}</ListBox></Select.Popover>
              </Select>
            </div>

          </div>

          <motion.div whileTap={{ scale: 0.98 }} className="mt-6">
            <Button
              onClick={() => handleSearch(1)}
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-black text-base py-6 rounded-xl shadow-lg shadow-red-500/20 transition-all duration-300"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Searching Active Donors...
                </span>
              ) : "🔍 Search Donors"}
            </Button>
          </motion.div>
        </Card>
      </motion.div>

      <AnimatePresence mode="wait">
        {searched && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="mt-10 relative z-10"
          >
            {donors.length > 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-end mb-5">
                <Button
                  onClick={downloadPDF}
                  variant="flat"
                  color="danger"
                  className="font-bold border border-red-200 dark:border-red-900/50 px-5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 transition-colors"
                >
                  📄 Download Results PDF
                </Button>
              </motion.div>
            )}

            {donors.length > 0 ? (
              <motion.div
                variants={gridVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {donors.map((donor, i) => (
                  <motion.div
                    key={donor._id}
                    variants={cardVariants}
                    whileHover="hover"
                    layout
                  >
                    <Card className="p-6 h-full bg-white/70 dark:bg-[#0B1F3A]/60 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/50 shadow-xl rounded-2xl text-center flex flex-col justify-between overflow-hidden relative group">

                      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div>
                        <div className="relative w-20 h-20 mx-auto mb-4">
                          <Image
                            src={user?.avatar || "/default-avatar.png"}
                            alt={user?.name || "User"}
                            height={100}
                            width={100}
                            className="bg-red-100 rounded-2xl text-red-600 object-cover"
                          />
                          <span className="absolute bottom-0 right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white dark:border-[#0B1F3A] shadow animate-pulse" />
                        </div>

                        <h3 className="font-extrabold text-xl text-slate-800 dark:text-slate-200 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                          {donor.name}
                        </h3>

                        <div className="my-3 inline-block bg-red-50 dark:bg-red-950/40 px-4 py-1 rounded-full border border-red-100 dark:border-red-900/30">
                          <p className="text-red-600 dark:text-red-400 font-black text-xl animate-pulse tracking-wide">{donor.bloodGroup}</p>
                        </div>

                        <p className="text-sm font-medium text-slate-600 dark:text-slate-300 flex items-center justify-center gap-1 mt-1">
                          📍 {donor.district} / {donor.upazila}
                        </p>
                      </div>

                      <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800/60">
                        <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 break-all select-all hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                          ✉️ {donor.email}
                        </p>
                      </div>

                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center text-slate-500 py-16"
              >
                <span className="text-5xl block mb-3">🔍</span>
                <p className="text-lg font-semibold">No active donors found matching your criteria.</p>
                <p className="text-sm text-slate-400 mt-1">Try broadening your area or changing the blood group filter.</p>
              </motion.div>
            )}

            {totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                <div class="bg-white/80 dark:bg-[#0B1F3A]/80 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-800/50">
                  <Pagination total={totalPages} page={page} onChange={(p) => handleSearch(p)} color="danger" size="lg" radius="xl" showControls isCompact />
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}