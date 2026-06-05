"use client";

import React, { useState } from "react";
import { useData, User } from "@/components/dashboard/data-context";
import { 
  Search, 
  Shield, 
  ToggleLeft, 
  ToggleRight, 
  UserPlus, 
  UserCheck,
  UserX
} from "lucide-react";

export default function UsersPage() {
  const { users, updateUserRole, updateUserStatus } = useData();
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("All");

  // Filtered users
  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.notelp.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = roleFilter === "All" || u.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  const handleRoleToggle = (id: number, currentRole: User["role"]) => {
    const nextRole: User["role"] =
      currentRole === "SUPER_ADMIN"
        ? "ADMIN"
        : currentRole === "ADMIN"
        ? "USER"
        : "ADMIN"; // Cycle role or toggle
    
    updateUserRole(id, nextRole);
  };

  const handleStatusToggle = (id: number, currentStatus: User["status"]) => {
    const nextStatus = currentStatus === "Active" ? "Inactive" : "Active";
    updateUserStatus(id, nextStatus);
  };

  return (
    <div className="space-y-6">
      {/* Header Panel */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            Kelola User & Admin
          </h2>
          <p className="text-muted-foreground text-xs mt-0.5">
            Kelola perizinan akun, ganti role admin, serta aktifkan atau nonaktifkan akun user.
          </p>
        </div>
        <button
          onClick={() => alert("Fitur pembuatan admin manual sedang dikembangkan!")}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity w-fit"
        >
          <UserPlus className="h-4 w-4" />
          <span>Tambah Admin</span>
        </button>
      </div>

      {/* Filters and search bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        {/* Search */}
        <div className="relative flex flex-1 max-w-md items-center">
          <Search className="absolute left-3.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Cari user berdasarkan nama, email, no telp..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-border bg-card py-2.5 pl-10 pr-4 text-sm text-foreground placeholder-muted-foreground focus:outline-hidden focus:ring-1 focus:ring-primary focus:border-primary"
          />
        </div>

        {/* Role Filter */}
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-foreground focus:outline-hidden focus:ring-1 focus:ring-primary focus:border-primary w-fit"
        >
          <option value="All">Semua Role</option>
          <option value="SUPER_ADMIN">Super Admin</option>
          <option value="ADMIN">Admin</option>
          <option value="USER">Regular User</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40 text-muted-foreground font-medium text-left">
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Nama</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">No Telepon</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Aksi Perizinan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-muted/10 transition-colors">
                    <td className="px-6 py-4 font-semibold text-foreground">
                      #{user.id}
                    </td>
                    <td className="px-6 py-4 font-medium text-foreground text-left">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 text-foreground text-left">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 text-foreground text-left">
                      {user.notelp}
                    </td>
                    <td className="px-6 py-4 text-left">
                      {user.role === "SUPER_ADMIN" && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-red-500/10 px-2.5 py-1 text-xs font-semibold text-red-600 dark:text-red-400">
                          <Shield className="h-3 w-3" /> Super Admin
                        </span>
                      )}
                      {user.role === "ADMIN" && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-indigo-500/10 px-2.5 py-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                          <Shield className="h-3 w-3" /> Admin
                        </span>
                      )}
                      {user.role === "USER" && (
                        <span className="inline-flex rounded-full bg-muted-foreground/10 px-2.5 py-1 text-xs font-medium text-muted-foreground">
                          User
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-left">
                      {user.status === "Active" ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                          <UserCheck className="h-3 w-3" /> Aktif
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-destructive/10 px-2.5 py-1 text-xs font-semibold text-destructive">
                          <UserX className="h-3 w-3" /> Dinonaktifkan
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-4">
                        {/* Change Role Button */}
                        <button
                          onClick={() => handleRoleToggle(user.id, user.role)}
                          className="text-xs font-semibold text-primary hover:underline"
                          title="Ubah Role"
                          disabled={user.role === "SUPER_ADMIN"}
                        >
                          Ubah Role
                        </button>
                        
                        {/* Status Switcher Toggle Icon */}
                        <button
                          onClick={() => handleStatusToggle(user.id, user.status)}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                          title={user.status === "Active" ? "Nonaktifkan" : "Aktifkan"}
                          disabled={user.role === "SUPER_ADMIN"}
                        >
                          {user.status === "Active" ? (
                            <ToggleRight className="h-6 w-6 text-emerald-500" />
                          ) : (
                            <ToggleLeft className="h-6 w-6 text-muted-foreground" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-muted-foreground">
                    Tidak ada user ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
