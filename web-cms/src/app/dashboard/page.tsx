"use client";

import React from "react";
import { 
  DollarSign, 
  MapPin, 
  Ticket, 
  Users, 
  TrendingUp, 
  ArrowUpRight, 
  Clock, 
  CheckCircle, 
  XCircle 
} from "lucide-react";
import Link from "next/link";

// Mock metrics
const metrics = [
  {
    name: "Total Pendapatan",
    value: "Rp 45.280.000",
    change: "+12.5%",
    trendingUp: true,
    icon: DollarSign,
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  {
    name: "Tiket Terjual",
    value: "1.240 Tiket",
    change: "+8.2%",
    trendingUp: true,
    icon: Ticket,
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  {
    name: "Total Pantai",
    value: "18 Pantai",
    change: "+2 Pantai baru",
    trendingUp: true,
    icon: MapPin,
    color: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
  },
  {
    name: "User Terdaftar",
    value: "3.420 User",
    change: "+15.3%",
    trendingUp: true,
    icon: Users,
    color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
];

// Mock recent bookings
const recentBookings = [
  {
    id: "B-2026-005",
    userName: "Aditya Pratama",
    beachName: "Pantai Klara",
    amount: "Rp 50.000",
    date: "Hari ini, 09:30",
    status: "Success",
  },
  {
    id: "B-2026-004",
    userName: "Siti Rahma",
    beachName: "Pantai Sari Ringgung",
    amount: "Rp 75.000",
    date: "Hari ini, 08:15",
    status: "Pending",
  },
  {
    id: "B-2026-003",
    userName: "Budi Santoso",
    beachName: "Pantai Mutun",
    amount: "Rp 40.000",
    date: "Kemarin, 17:45",
    status: "Success",
  },
  {
    id: "B-2026-002",
    userName: "Dewi Lestari",
    beachName: "Pantai Sebalang",
    amount: "Rp 120.000",
    date: "Kemarin, 14:20",
    status: "Cancelled",
  },
  {
    id: "B-2026-001",
    userName: "Rian Hidayat",
    beachName: "Pantai Mutun",
    amount: "Rp 60.000",
    date: "04 Jun, 11:10",
    status: "Success",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome Message */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Selamat Datang Kembali, Fajar!
        </h2>
        <p className="text-muted-foreground text-sm mt-1">
          Berikut adalah ringkasan performa dan tiket Beach-Go Anda hari ini.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div
              key={metric.name}
              className="rounded-xl border border-border bg-card p-6 shadow-xs hover:shadow-md hover:border-muted-foreground/20 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  {metric.name}
                </span>
                <div className={`rounded-lg p-2 ${metric.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-2xl font-bold tracking-tight text-foreground">
                  {metric.value}
                </span>
                <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="text-emerald-500 font-semibold">{metric.change}</span>
                  <span>dari bulan lalu</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts & Analytics */}
      <div className="grid gap-6 lg:grid-cols-7">
        {/* Main Chart */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-xs lg:col-span-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-foreground text-base">Analisis Penjualan Tiket</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Penjualan 6 bulan terakhir</p>
              </div>
              <span className="flex items-center gap-1.5 rounded-lg bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <TrendingUp className="h-3.5 w-3.5" />
                +14.2%
              </span>
            </div>

            {/* Custom SVG Bar Chart */}
            <div className="mt-8 h-64 w-full flex items-end justify-between px-2 gap-4">
              {/* Jan */}
              <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <div className="w-full bg-primary/20 hover:bg-primary rounded-t-sm h-[45%] transition-all duration-300 relative group">
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-foreground text-background text-[10px] px-1.5 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-sm font-medium">Rp 12jt</span>
                </div>
                <span className="text-xs text-muted-foreground">Jan</span>
              </div>
              {/* Feb */}
              <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <div className="w-full bg-primary/20 hover:bg-primary rounded-t-sm h-[60%] transition-all duration-300 relative group">
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-foreground text-background text-[10px] px-1.5 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-sm font-medium">Rp 18jt</span>
                </div>
                <span className="text-xs text-muted-foreground">Feb</span>
              </div>
              {/* Mar */}
              <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <div className="w-full bg-primary/20 hover:bg-primary rounded-t-sm h-[50%] transition-all duration-300 relative group">
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-foreground text-background text-[10px] px-1.5 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-sm font-medium">Rp 15jt</span>
                </div>
                <span className="text-xs text-muted-foreground">Mar</span>
              </div>
              {/* Apr */}
              <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <div className="w-full bg-primary/20 hover:bg-primary rounded-t-sm h-[75%] transition-all duration-300 relative group">
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-foreground text-background text-[10px] px-1.5 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-sm font-medium">Rp 22jt</span>
                </div>
                <span className="text-xs text-muted-foreground">Apr</span>
              </div>
              {/* Mei */}
              <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <div className="w-full bg-primary/20 hover:bg-primary rounded-t-sm h-[85%] transition-all duration-300 relative group">
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-foreground text-background text-[10px] px-1.5 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-sm font-medium">Rp 28jt</span>
                </div>
                <span className="text-xs text-muted-foreground">Mei</span>
              </div>
              {/* Jun */}
              <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <div className="w-full bg-primary rounded-t-sm h-[95%] transition-all duration-300 relative group">
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-foreground text-background text-[10px] px-1.5 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-sm font-medium">Rp 32jt</span>
                </div>
                <span className="text-xs text-muted-foreground font-semibold text-foreground">Jun</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Transactions List */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-xs lg:col-span-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-foreground text-base">Booking Terbaru</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Daftar booking tiket masuk pantai</p>
            </div>
            <Link
              href="/dashboard/bookings"
              className="text-xs font-semibold text-primary hover:underline flex items-center gap-0.5"
            >
              Lihat semua <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="mt-6 divide-y divide-border">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0">
                <div className="flex flex-col text-left">
                  <span className="font-medium text-sm text-foreground">{booking.userName}</span>
                  <div className="flex items-center gap-1.5 mt-0.5 text-xs text-muted-foreground">
                    <span>{booking.beachName}</span>
                    <span>•</span>
                    <span>{booking.date}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <span className="font-semibold text-sm text-foreground">{booking.amount}</span>
                  {booking.status === "Success" && (
                    <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                      <CheckCircle className="h-2.5 w-2.5" /> Berhasil
                    </span>
                  )}
                  {booking.status === "Pending" && (
                    <span className="flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-600 dark:text-amber-400">
                      <Clock className="h-2.5 w-2.5" /> Pending
                    </span>
                  )}
                  {booking.status === "Cancelled" && (
                    <span className="flex items-center gap-1 rounded-full bg-destructive/10 px-2 py-0.5 text-[10px] font-semibold text-destructive">
                      <XCircle className="h-2.5 w-2.5" /> Gagal
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
