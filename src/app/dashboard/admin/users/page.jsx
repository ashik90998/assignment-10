"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, Pagination, Button, Chip } from "@heroui/react";
import { Ellipsis } from "@gravity-ui/icons";
import { api } from "@/lib/api";
import ProtectedRoute from "@/components/common/ProtectedRoute";

export default function AllUsersPage() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [openMenu, setOpenMenu] = useState(null);

  const fetchUsers = async () => {
    const res = await api.getUsers(`page=${page}&limit=8`);
    setUsers(res.data);
    setTotalPages(res.totalPages);
  };

  useEffect(() => { fetchUsers().catch(console.error); }, [page]);

  const handleRole = async (id, role) => {
    await api.updateUserRole(id, role);
    setOpenMenu(null);
    fetchUsers();
  };

  const handleStatus = async (id, status) => {
    await api.updateUserStatus(id, status);
    setOpenMenu(null);
    fetchUsers();
  };

  return (
    <ProtectedRoute roles={["admin"]}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 max-w-[1400px] mx-auto space-y-6">
        <h2 className="text-xl font-bold">All Users</h2>
        <Card className="p-6 bg-white dark:bg-[#0B1F3A] border shadow-md overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="p-3 text-xs font-semibold">Name</th>
                <th className="p-3 text-xs font-semibold">Email</th>
                <th className="p-3 text-xs font-semibold">Blood Group</th>
                <th className="p-3 text-xs font-semibold">Role</th>
                <th className="p-3 text-xs font-semibold">Status</th>
                <th className="p-3 text-xs font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="border-b hover:bg-slate-50 dark:hover:bg-slate-900/50 relative">
                  <td className="p-3 text-sm font-semibold">{u.name}</td>
                  <td className="p-3 text-xs text-slate-500">{u.email}</td>
                  <td className="p-3 text-sm text-red-600 font-bold">{u.bloodGroup}</td>
                  <td className="p-3 capitalize text-sm">{u.role}</td>
                  <td className="p-3"><Chip color={u.status === "active" ? "success" : "danger"} size="sm">{u.status}</Chip></td>
                  <td className="p-3 text-right relative">
                    <Button isIconOnly size="sm" variant="flat" onClick={() => setOpenMenu(openMenu === u._id ? null : u._id)}>
                      <Ellipsis />
                    </Button>
                    <AnimatePresence>
                      {openMenu === u._id && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="absolute right-0 top-full mt-1 z-50 w-44 bg-white dark:bg-[#0B1F3A] border rounded-xl shadow-xl p-1 text-left"
                        >
                          {["donor", "volunteer", "admin"].map((role) => (
                            <button key={role} onClick={() => handleRole(u._id, role)} className="w-full px-3 py-2 text-sm text-left hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg capitalize">
                              Make {role}
                            </button>
                          ))}
                          <button onClick={() => handleStatus(u._id, u.status === "active" ? "blocked" : "active")} className="w-full px-3 py-2 text-sm text-left hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg text-red-600">
                            {u.status === "active" ? "Block User" : "Unblock User"}
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {totalPages > 1 && <div className="mt-6 flex justify-center"><Pagination total={totalPages} page={page} onChange={setPage} color="danger" /></div>}
        </Card>
      </motion.div>
    </ProtectedRoute>
  );
}
