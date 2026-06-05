"use client";

import React, { useState } from "react";
import { useData, Booking } from "@/components/dashboard/data-context";
import { 
  Search, 
  Calendar, 
  User, 
  Phone, 
  Ticket, 
  Check, 
  X, 
  Eye,
  FileSpreadsheet
} from "lucide-react";

export default function BookingsPage() {
  const { bookings, updateBookingStatus } = useData();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | Booking["status"]>("All");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  // Filters
  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.beachName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "All" || b.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (id: string, status: Booking["status"]) => {
    updateBookingStatus(id, status);
    // If the currently viewed booking is updated, update the selected modal details
    if (selectedBooking && selectedBooking.id === id) {
      setSelectedBooking((prev) => prev ? { ...prev, status } : null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Panel */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            Booking & Transaksi Tiket
          </h2>
          <p className="text-muted-foreground text-xs mt-0.5">
            Kelola dan pantau pemesanan tiket masuk pantai oleh user.
          </p>
        </div>
        <button
          onClick={() => alert("Laporan transaksi berhasil diexport!")}
          className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-muted transition-colors w-fit"
        >
          <FileSpreadsheet className="h-4 w-4" />
          <span>Export Laporan</span>
        </button>
      </div>

      {/* Filters & Search bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        {/* Search */}
        <div className="relative flex flex-1 max-w-md items-center">
          <Search className="absolute left-3.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Cari berdasarkan ID, nama pembeli, atau pantai..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-border bg-card py-2.5 pl-10 pr-4 text-sm text-foreground placeholder-muted-foreground focus:outline-hidden focus:ring-1 focus:ring-primary focus:border-primary"
          />
        </div>

        {/* Status Tab buttons */}
        <div className="flex flex-wrap gap-1.5 rounded-lg bg-muted p-1 w-fit">
          {(["All", "Success", "Pending", "Cancelled"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`rounded-md px-3.5 py-1.5 text-xs font-medium transition-all ${
                statusFilter === status
                  ? "bg-card text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {status === "All" && "Semua"}
              {status === "Success" && "Berhasil"}
              {status === "Pending" && "Pending"}
              {status === "Cancelled" && "Gagal"}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings Table */}
      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40 text-muted-foreground font-medium text-left">
                <th className="px-6 py-4">ID Booking</th>
                <th className="px-6 py-4">Pembeli</th>
                <th className="px-6 py-4">Pantai</th>
                <th className="px-6 py-4 text-center">Jumlah</th>
                <th className="px-6 py-4 text-right">Total Bayar</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredBookings.length > 0 ? (
                filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-muted/10 transition-colors">
                    <td className="px-6 py-4 font-semibold text-foreground">
                      {booking.id}
                    </td>
                    <td className="px-6 py-4 text-left">
                      <div className="font-medium text-foreground">{booking.userName}</div>
                      <div className="text-xs text-muted-foreground">{booking.userPhone}</div>
                    </td>
                    <td className="px-6 py-4 text-foreground">
                      {booking.beachName}
                    </td>
                    <td className="px-6 py-4 text-center text-foreground">
                      {booking.quantity}
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-foreground">
                      Rp {booking.amount.toLocaleString("id-ID")}
                    </td>
                    <td className="px-6 py-4">
                      {booking.status === "Success" && (
                        <span className="inline-flex rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                          Berhasil
                        </span>
                      )}
                      {booking.status === "Pending" && (
                        <span className="inline-flex rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-semibold text-amber-600 dark:text-amber-400">
                          Pending
                        </span>
                      )}
                      {booking.status === "Cancelled" && (
                        <span className="inline-flex rounded-full bg-destructive/10 px-2.5 py-1 text-xs font-semibold text-destructive">
                          Gagal
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => setSelectedBooking(booking)}
                          className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                          title="Lihat Detail"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        
                        {booking.status === "Pending" && (
                          <>
                            <button
                              onClick={() => handleStatusChange(booking.id, "Success")}
                              className="rounded-lg p-2 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 transition-colors"
                              title="Setujui Pembayaran"
                            >
                              <Check className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleStatusChange(booking.id, "Cancelled")}
                              className="rounded-lg p-2 text-destructive hover:bg-destructive/10 transition-colors"
                              title="Tolak Transaksi"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-muted-foreground">
                    Tidak ada transaksi pemesanan tiket ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Booking Details Modal Drawer */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-xl border border-border bg-card shadow-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <h3 className="font-semibold text-base text-foreground">
                Detail Transaksi #{selectedBooking.id}
              </h3>
              <button
                onClick={() => setSelectedBooking(null)}
                className="rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Ticket Status Box */}
              <div className={`rounded-xl border p-4 text-center ${
                selectedBooking.status === "Success"
                  ? "bg-emerald-500/5 border-emerald-500/20"
                  : selectedBooking.status === "Pending"
                  ? "bg-amber-500/5 border-amber-500/20"
                  : "bg-destructive/5 border-destructive/20"
              }`}>
                <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Status Pemesanan</div>
                <div className={`text-lg font-bold mt-1 ${
                  selectedBooking.status === "Success"
                    ? "text-emerald-600 dark:text-emerald-400"
                    : selectedBooking.status === "Pending"
                    ? "text-amber-600 dark:text-amber-400"
                    : "text-destructive"
                }`}>
                  {selectedBooking.status === "Success" && "PEMBAYARAN BERHASIL"}
                  {selectedBooking.status === "Pending" && "MENUNGGU KONFIRMASI"}
                  {selectedBooking.status === "Cancelled" && "TRANSAKSI BATAL/GAGAL"}
                </div>
              </div>

              {/* Booking Info Fields */}
              <div className="space-y-4 text-left">
                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[10px] text-muted-foreground font-semibold uppercase">Nama Pembeli</div>
                    <div className="text-sm font-semibold text-foreground">{selectedBooking.userName}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[10px] text-muted-foreground font-semibold uppercase">No Telepon</div>
                    <div className="text-sm font-semibold text-foreground">{selectedBooking.userPhone}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Ticket className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[10px] text-muted-foreground font-semibold uppercase">Destinasi Pantai</div>
                    <div className="text-sm font-semibold text-foreground">{selectedBooking.beachName}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[10px] text-muted-foreground font-semibold uppercase">Tanggal & Waktu</div>
                    <div className="text-sm font-semibold text-foreground">{selectedBooking.date}</div>
                  </div>
                </div>
              </div>

              {/* Total Calculation */}
              <div className="border-t border-border pt-4">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Harga per Tiket</span>
                  <span>Rp {(selectedBooking.amount / selectedBooking.quantity).toLocaleString("id-ID")}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground mt-1.5">
                  <span>Jumlah Tiket</span>
                  <span>x{selectedBooking.quantity}</span>
                </div>
                <div className="flex items-center justify-between text-sm font-bold text-foreground mt-3 pt-3 border-t border-dashed border-border">
                  <span>Total Bayar</span>
                  <span>Rp {selectedBooking.amount.toLocaleString("id-ID")}</span>
                </div>
              </div>

              {/* Modal Actions */}
              {selectedBooking.status === "Pending" && (
                <div className="flex items-center gap-2 border-t border-border pt-4 mt-6">
                  <button
                    onClick={() => handleStatusChange(selectedBooking.id, "Cancelled")}
                    className="flex-1 rounded-lg border border-transparent bg-destructive/10 py-2.5 text-xs font-bold text-destructive hover:bg-destructive/20 transition-colors"
                  >
                    Tolak Transaksi
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedBooking.id, "Success")}
                    className="flex-1 rounded-lg bg-emerald-600 dark:bg-emerald-500 py-2.5 text-xs font-bold text-white hover:opacity-95 transition-opacity"
                  >
                    Setujui & Konfirmasi
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
