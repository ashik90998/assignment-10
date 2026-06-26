"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, Button, Chip } from "@heroui/react";
import { Ellipsis } from "@gravity-ui/icons";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { api } from "@/lib/api";
import ProtectedRoute from "@/components/common/ProtectedRoute";

export default function AllUsersPage() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [openMenu, setOpenMenu] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await api.getUsers(`page=${page}&limit=8`);
      setUsers(res?.data || []);
      setTotalPages(res?.totalPages || 1);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-6 max-w-[1400px] mx-auto space-y-6"
      >
        <h1 className="text-2xl font-bold">All Users</h1>

        <Card className="p-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left">
                <th className="py-3">Name</th>
                <th className="py-3">Email</th>
                <th className="py-3">Blood Group</th>
                <th className="py-3">Role</th>
                <th className="py-3">Status</th>
                <th className="py-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="border-b">
                  <td className="py-4">{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.bloodGroup}</td>
                  <td className="capitalize">{u.role}</td>
                  <td>
                    <Chip
                      color={u.status === "active" ? "success" : "danger"}
                      size="sm"
                    >
                      {u.status}
                    </Chip>
                  </td>

                  <td>
                    <div className="relative">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="flat"
                        onClick={() =>
                          setOpenMenu(openMenu === u._id ? null : u._id)
                        }
                      >
                        <Ellipsis />
                      </Button>

                      {openMenu === u._id && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="absolute right-0 top-full mt-1 z-50 w-44 bg-white dark:bg-[#0B1F3A] border rounded-xl shadow-xl p-1 text-left"
                        >
                          {["donor", "volunteer", "admin"].map((role) => (
                            <button
                              key={role}
                              onClick={() => handleRole(u._id, role)}
                              className="w-full px-3 py-2 text-sm text-left hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg capitalize"
                            >
                              Make {role}
                            </button>
                          ))}

                          <button
                            onClick={() =>
                              handleStatus(
                                u._id,
                                u.status === "active"
                                  ? "blocked"
                                  : "active"
                              )
                            }
                            className="w-full px-3 py-2 text-sm text-left hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg text-red-600"
                          >
                            {u.status === "active"
                              ? "Block User"
                              : "Unblock User"}
                          </button>
                        </motion.div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {totalPages > 1 && (
          <div className="mt-6 flex justify-center items-center gap-3">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-10 h-10 rounded-xl border flex items-center justify-center disabled:opacity-40"
            >
              <ChevronLeft size={18} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-10 h-10 rounded-xl ${page === p
                  ? "bg-red-500 text-white"
                  : "border"
                  }`}
              >
                {p}
              </button>
            ))}

            <button
              onClick={() =>
                setPage((p) => Math.min(totalPages, p + 1))
              }
              disabled={page === totalPages}
              className="w-10 h-10 rounded-xl border flex items-center justify-center disabled:opacity-40"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </motion.div>
    </ProtectedRoute>
  );
}