"use client";

import React, { useState } from "react";
import { 
  User, 
  Settings as SettingsIcon, 
  ShieldAlert, 
  Save, 
  Percent, 
  Database,
  Lock
} from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"profile" | "system">("profile");

  // Profile forms
  const [name, setName] = useState("Muhammad Fajar Azriel");
  const [email, setEmail] = useState("admin@beachgo.com");
  const [phone, setPhone] = useState("081273928172");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // System settings
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [taxRate, setTaxRate] = useState("2.5");
  const [maxTickets, setMaxTickets] = useState("10");

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Profil admin berhasil disimpan!");
    setOldPassword("");
    setNewPassword("");
  };

  const handleSystemSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Konfigurasi sistem berhasil disimpan!");
  };

  return (
    <div className="space-y-6">
      {/* Header Panel */}
      <div>
        <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          Pengaturan Panel & Sistem
        </h2>
        <p className="text-muted-foreground text-xs mt-0.5">
          Kelola data profil admin Anda serta konfigurasikan sistem aplikasi Beach-Go.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border">
        <button
          onClick={() => setActiveTab("profile")}
          className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-semibold transition-colors ${
            activeTab === "profile"
              ? "border-primary text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <User className="h-4 w-4" />
          <span>Profil Saya</span>
        </button>
        <button
          onClick={() => setActiveTab("system")}
          className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-semibold transition-colors ${
            activeTab === "system"
              ? "border-primary text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <SettingsIcon className="h-4 w-4" />
          <span>Konfigurasi Aplikasi</span>
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === "profile" ? (
        <form onSubmit={handleProfileSave} className="max-w-2xl rounded-xl border border-border bg-card p-6 shadow-xs text-left">
          <h3 className="font-semibold text-base text-foreground mb-4">Informasi Profil Admin</h3>
          
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-hidden focus:ring-1 focus:ring-primary focus:border-primary"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">No Telepon</label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-hidden focus:ring-1 focus:ring-primary focus:border-primary"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-hidden focus:ring-1 focus:ring-primary focus:border-primary"
              />
            </div>

            <div className="h-px bg-border my-6" />

            <h3 className="font-semibold text-base text-foreground mb-4 flex items-center gap-1.5">
              <Lock className="h-4 w-4" /> Keamanan & Password
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Password Lama</label>
                <input
                  type="password"
                  placeholder="Masukkan password lama"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-hidden focus:ring-1 focus:ring-primary focus:border-primary"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Password Baru</label>
                <input
                  type="password"
                  placeholder="Masukkan password baru"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-hidden focus:ring-1 focus:ring-primary focus:border-primary"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
              >
                <Save className="h-4 w-4" />
                <span>Simpan Perubahan</span>
              </button>
            </div>
          </div>
        </form>
      ) : (
        <form onSubmit={handleSystemSave} className="max-w-2xl rounded-xl border border-border bg-card p-6 shadow-xs text-left">
          <h3 className="font-semibold text-base text-foreground mb-4">Parameter Konfigurasi Aplikasi</h3>
          
          <div className="space-y-6">
            {/* Maintenance toggle */}
            <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-4">
              <div className="space-y-0.5 text-left">
                <div className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <ShieldAlert className="h-4 w-4 text-amber-500" /> Mode Perbaikan (Maintenance)
                </div>
                <div className="text-xs text-muted-foreground">
                  Jika aktif, aplikasi mobile & web tidak bisa diakses sementara oleh user.
                </div>
              </div>
              <button
                type="button"
                onClick={() => setMaintenanceMode(!maintenanceMode)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                  maintenanceMode ? "bg-primary" : "bg-muted-foreground/30"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    maintenanceMode ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Fee config */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                  <Percent className="h-4 w-4 text-muted-foreground" /> Biaya Layanan Aplikasi (%)
                </label>
                <input
                  type="text"
                  required
                  value={taxRate}
                  onChange={(e) => setTaxRate(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-hidden focus:ring-1 focus:ring-primary focus:border-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                  <Database className="h-4 w-4 text-muted-foreground" /> Maks. Pembelian Tiket / Transaksi
                </label>
                <input
                  type="number"
                  required
                  value={maxTickets}
                  onChange={(e) => setMaxTickets(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-hidden focus:ring-1 focus:ring-primary focus:border-primary"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
              >
                <Save className="h-4 w-4" />
                <span>Simpan Konfigurasi</span>
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
