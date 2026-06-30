"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Card, Button, Input, Pagination } from "@heroui/react";
import { api } from "@/lib/api";
import { useAuth } from "@/providers/AuthProvider";

export default function FundingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading: authLoading } = useAuth();

  const [fundings, setFundings] = useState([]);
  const [totalFunds, setTotalFunds] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [amount, setAmount] = useState("");
  const [processing, setProcessing] = useState(false);

  const bgParticleVariants = {
    animate1: {
      x: [0, 90, -30, 0],
      y: [0, -70, 110, 0],
      scale: [1, 1.2, 0.9, 1],
      transition: { duration: 22, repeat: Infinity, ease: "linear" },
    },
    animate2: {
      x: [0, -110, 70, 0],
      y: [0, 90, -40, 0],
      scale: [1, 0.8, 1.25, 1],
      transition: { duration: 26, repeat: Infinity, ease: "linear" },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        type: "spring",
        stiffness: 100,
      },
    }),
  };

  useEffect(() => {
    if (!authLoading && !user) router.replace("/login");
  }, [user, authLoading, router]);

  const fetchFundings = async () => {
    setIsLoading(true);
    try {
      const res = await api.getFundings(`page=${page}&limit=10`);
      setFundings(res.data || []);
      setTotalFunds(res.totalFunds || 0);
      setTotalPages(res.totalPages || 1);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchFundings();
  }, [user, page]);

  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    if (sessionId) {
      alert("Payment successful ❤️");
      fetchFundings();
    }
  }, [searchParams]);

  const handleGiveFund = async () => {
    if (!amount || parseFloat(amount) < 1) {
      alert("Minimum $1 required");
      return;
    }

    try {
      setProcessing(true);

      const res = await api.createCheckoutSession({
        amount: parseFloat(amount),
      });

      if (res.url) {
        window.location.href = res.url;
      }
    } catch (err) {
      console.error(err);
      alert("Checkout failed");
    } finally {
      setProcessing(false);
    }
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 1,
            ease: "linear",
          }}
          className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen py-12 px-4 max-w-5xl mx-auto overflow-hidden bg-gradient-to-br from-slate-50 via-white to-red-50/30 dark:from-[#030712] dark:via-[#0B1F3A] dark:to-[#020617]">

      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
        <motion.div
          variants={bgParticleVariants}
          animate="animate1"
          className="absolute top-1/4 left-1/12 w-80 h-80 bg-red-400 rounded-full blur-[120px]"
        />
        <motion.div
          variants={bgParticleVariants}
          animate="animate2"
          className="absolute bottom-1/4 right-1/12 w-96 h-96 bg-rose-300 rounded-full blur-[140px]"
        />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <h1 className="text-4xl font-black">
            Organization <span className="text-red-600">Funding</span>
          </h1>
          <p className="text-gray-500 mt-2">
            Your contributions help urgent medical logistics.
          </p>
        </motion.div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-4 px-6 shadow-xl rounded-2xl flex items-center gap-4"
        >
          <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-2xl">
            💰
          </div>
          <div>
            <p className="text-xs uppercase font-bold text-gray-400">
              Total Raised
            </p>
            <p className="text-2xl font-black text-red-600">
              ${totalFunds.toFixed(2)}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Funding input */}
      <Card className="p-6 mb-8 relative z-10">
        <Input
          type="number"
          min="1"
          placeholder="Enter amount in USD"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
          <Button
            onClick={handleGiveFund}
            disabled={processing}
            className="mt-4 w-full bg-gradient-to-r from-red-600 to-rose-600 text-white font-black py-6 rounded-xl"
          >
            {processing ? "Redirecting..." : "❤️ Give Fund Now"}
          </Button>
        </motion.div>
      </Card>

      {/* Funding table */}
      <motion.div className="relative z-10">
        <Card className="p-4 rounded-2xl shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="p-4 text-left">Donor Name</th>
                  <th className="p-4 text-left">Amount</th>
                  <th className="p-4 text-left">Date</th>
                </tr>
              </thead>

              <tbody>
                <AnimatePresence>
                  {isLoading ? (
                    <tr>
                      <td colSpan={3} className="text-center py-10">
                        Loading...
                      </td>
                    </tr>
                  ) : (
                    fundings.map((f, i) => (
                      <motion.tr
                        key={f._id}
                        custom={i}
                        variants={rowVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        <td className="p-4">👤 {f.userName}</td>
                        <td className="p-4 text-red-600 font-bold">
                          ${f.amount.toFixed(2)}
                        </td>
                        <td className="p-4">
                          {new Date(f.createdAt).toLocaleDateString()}
                        </td>
                      </motion.tr>
                    ))
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <Pagination
                total={totalPages}
                page={page}
                onChange={setPage}
                color="danger"
              />
            </div>
          )}
        </Card>
      </motion.div>
    </div>
  );
}