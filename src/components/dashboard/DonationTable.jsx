"use client";

import Link from "next/link";
import { Button, Chip } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import { formatStatus, getStatusColor, formatLocation } from "@/lib/utils";

export default function DonationTable({
  requests,
  showActions = true,
  onStatusChange,
  onDelete,
  viewBasePath = "/donation-requests",
  canManage = false,
}) {
  if (!requests?.length) {
    return (
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-10 text-slate-500 font-medium"
      >
        No donation requests found.
      </motion.p>
    );
  }

  return (
    <div className="w-full overflow-x-auto border border-slate-200/60 dark:border-slate-800 rounded-2xl shadow-sm bg-white/50 dark:bg-[#0B1F3A]/30 backdrop-blur-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50/70 dark:bg-slate-900/50 border-b border-slate-200/60 dark:border-slate-800">
            <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">Recipient</th>
            <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">Location</th>
            <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">Date & Time</th>
            <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 text-center">Blood Group</th>
            <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">Status</th>
            {showActions && <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 text-right">Actions</th>}
          </tr>
        </thead>
        <tbody>
          <AnimatePresence>
            {requests.map((row, index) => (
              <motion.tr
                key={row._id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0, transition: { delay: index * 0.04 } }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="border-b border-slate-100 dark:border-slate-800/60 last:border-0 hover:bg-slate-50/80 dark:hover:bg-slate-900/40 transition-colors"
              >
                <td className="p-4 font-bold text-sm text-slate-800 dark:text-slate-200">{row.recipientName}</td>
                <td className="p-4 text-xs text-slate-500 dark:text-slate-400 font-medium">{formatLocation(row.district, row.upazila)}</td>
                <td className="p-4 text-xs font-medium text-slate-700 dark:text-slate-300">
                  <div>{row.donationDate}</div>
                  <div className="text-[10px] text-slate-400 dark:text-slate-500 font-normal mt-0.5">{row.donationTime}</div>
                </td>
                <td className="p-4 text-center font-black text-base text-red-600 dark:text-red-500 tracking-wide">{row.bloodGroup}</td>
                <td className="p-4">
                  <Chip color={getStatusColor(row.status)} variant="flat" size="sm" className="font-bold uppercase tracking-wider text-[10px] px-2">
                    {formatStatus(row.status)}
                  </Chip>
                  {row.status === "inprogress" && row.donorName && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-2 p-2 bg-slate-100/70 dark:bg-slate-800/60 border border-slate-200/20 rounded-xl text-[10px]"
                    >
                      <p className="font-bold text-slate-700 dark:text-slate-300">Donor: {row.donorName}</p>
                      <p className="text-slate-500 dark:text-slate-400 font-medium mt-0.5">{row.donorEmail}</p>
                    </motion.div>
                  )}
                </td>

                {showActions && (
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2 flex-wrap">
                      {canManage && row.status === "inprogress" && (
                        <>
                          <Button size="sm" color="success" variant="flat" className="font-bold" onClick={() => onStatusChange?.(row._id, "done")}>Done</Button>
                          <Button size="sm" color="danger" variant="flat" className="font-bold" onClick={() => onStatusChange?.(row._id, "canceled")}>Cancel</Button>
                        </>
                      )}

                      <Link href={`${viewBasePath}/${row._id}`} passHref legacyBehavior>
                        <Button as="a" size="sm" variant="flat" className="font-bold text-slate-700 dark:text-slate-300">
                          View
                        </Button>
                      </Link>

                      {canManage && row.status === "pending" && (
                        <>
                          <Link href={`/dashboard/request/edit/${row._id}`} passHref legacyBehavior>
                            <Button as="a" size="sm" variant="flat" color="warning" className="font-bold">
                              Edit
                            </Button>
                          </Link>

                          <Button
                            size="sm"
                            color="danger"
                            className="bg-red-600 text-white font-bold shadow-md shadow-red-600/10 hover:bg-red-500"
                            onClick={() => onDelete?.(row._id)}
                          >
                            Delete
                          </Button>
                        </>
                      )}
                    </div>
                  </td>
                )}
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
}