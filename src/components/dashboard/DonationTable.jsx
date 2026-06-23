"use client";

import Link from "next/link";
import { Button, Chip } from "@heroui/react";
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
    return <p className="text-center py-8 text-slate-500">No donation requests found.</p>;
  }

  return (
    <div className="w-full overflow-x-auto border border-slate-100 dark:border-slate-900 rounded-xl">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 dark:bg-slate-900 border-b">
            <th className="p-3 text-xs font-semibold text-slate-600">Recipient</th>
            <th className="p-3 text-xs font-semibold text-slate-600">Location</th>
            <th className="p-3 text-xs font-semibold text-slate-600">Date & Time</th>
            <th className="p-3 text-xs font-semibold text-slate-600 text-center">Blood Group</th>
            <th className="p-3 text-xs font-semibold text-slate-600">Status</th>
            {showActions && <th className="p-3 text-xs font-semibold text-slate-600 text-right">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {requests.map((row) => (
            <tr key={row._id} className="border-b last:border-0 hover:bg-slate-50/50 dark:hover:bg-slate-900/50">
              <td className="p-3 font-semibold text-sm">{row.recipientName}</td>
              <td className="p-3 text-xs text-slate-500">{formatLocation(row.district, row.upazila)}</td>
              <td className="p-3 text-xs">
                <div>{row.donationDate}</div>
                <div className="text-[10px] text-slate-400">{row.donationTime}</div>
              </td>
              <td className="p-3 text-center font-bold text-red-600">{row.bloodGroup}</td>
              <td className="p-3">
                <Chip color={getStatusColor(row.status)} variant="flat" size="sm">{formatStatus(row.status)}</Chip>
                {row.status === "inprogress" && row.donorName && (
                  <div className="mt-2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded text-[10px]">
                    <p className="font-semibold">Donor: {row.donorName}</p>
                    <p className="text-slate-500">{row.donorEmail}</p>
                  </div>
                )}
              </td>
              {showActions && (
                <td className="p-3 text-right">
                  <div className="flex items-center justify-end gap-1.5 flex-wrap">
                    {canManage && row.status === "inprogress" && (
                      <>
                        <Button size="sm" color="success" variant="flat" onClick={() => onStatusChange?.(row._id, "done")}>Done</Button>
                        <Button size="sm" color="danger" variant="flat" onClick={() => onStatusChange?.(row._id, "canceled")}>Cancel</Button>
                      </>
                    )}
                    <Button as={Link} href={`${viewBasePath}/${row._id}`} size="sm" variant="flat">View</Button>
                    {canManage && row.status === "pending" && (
                      <>
                        <Button as={Link} href={`/dashboard/request/edit/${row._id}`} size="sm" variant="flat" color="warning">Edit</Button>
                        <Button size="sm" color="danger" className="bg-red-600 text-white" onClick={() => onDelete?.(row._id)}>Delete</Button>
                      </>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
