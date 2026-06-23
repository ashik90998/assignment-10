"use client";

import { motion } from "framer-motion";

const colorMap = {
  red: { text: "text-red-600", bg: "bg-red-100 dark:bg-red-950/30" },
  blue: { text: "text-blue-600", bg: "bg-blue-100 dark:bg-blue-950/30" },
  green: { text: "text-green-600", bg: "bg-green-100 dark:bg-green-950/30" },
  amber: { text: "text-amber-600", bg: "bg-amber-100 dark:bg-amber-950/30" },
};

export default function StatCard({ title, value, icon: Icon, color = "red", delay = 0 }) {
  const colors = colorMap[color] || colorMap.red;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ scale: 1.02 }}
      className="p-6 rounded-2xl bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-slate-800 shadow-md"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>
          <p className={`text-3xl font-bold mt-1 ${colors.text}`}>{value}</p>
        </div>
        {Icon && (
          <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center`}>
            <Icon className={`${colors.text} size-6`} />
          </div>
        )}
      </div>
    </motion.div>
  );
}
