"use client";

import React, { useState } from "react";
import { useData, Beach } from "@/components/dashboard/data-context";
import { 
  Plus, 
  Search, 
  MapPin, 
  Edit2, 
  Trash2, 
  X, 
  DollarSign,
  Image as ImageIcon
} from "lucide-react";

export default function BeachesPage() {
  const { beaches, addBeach, updateBeach, deleteBeach } = useData();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBeach, setEditingBeach] = useState<Beach | null>(null);
  
  // Form states
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [ticketPrice, setTicketPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // Filtered beaches
  const filteredBeaches = beaches.filter(
    (b) =>
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openAddModal = () => {
    setEditingBeach(null);
    setName("");
    setDescription("");
    setLocation("");
    setTicketPrice("");
    setImageUrl("");
    setIsModalOpen(true);
  };

  const openEditModal = (beach: Beach) => {
    setEditingBeach(beach);
    setName(beach.name);
    setDescription(beach.description);
    setLocation(beach.location);
    setTicketPrice(beach.ticketPrice.toString());
    setImageUrl(beach.imageUrl);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description || !location || !ticketPrice) return;

    const price = parseInt(ticketPrice, 10);
    const finalImageUrl = imageUrl || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=60";

    if (editingBeach) {
      updateBeach(editingBeach.id, {
        name,
        description,
        location,
        ticketPrice: price,
        imageUrl: finalImageUrl,
      });
    } else {
      addBeach({
        name,
        description,
        location,
        ticketPrice: price,
        imageUrl: finalImageUrl,
      });
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus pantai ini?")) {
      deleteBeach(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Panel */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            Kelola Destinasi Pantai
          </h2>
          <p className="text-muted-foreground text-xs mt-0.5">
            Tambah, edit, atau hapus destinasi pantai Beach-Go.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity w-fit"
        >
          <Plus className="h-4 w-4" />
          <span>Tambah Pantai</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="relative flex max-w-md items-center">
        <Search className="absolute left-3.5 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Cari pantai berdasarkan nama atau lokasi..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-lg border border-border bg-card py-2.5 pl-10 pr-4 text-sm text-foreground placeholder-muted-foreground focus:outline-hidden focus:ring-1 focus:ring-primary focus:border-primary"
        />
      </div>

      {/* Grid List */}
      {filteredBeaches.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredBeaches.map((beach) => (
            <div
              key={beach.id}
              className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-xs transition-all duration-300 hover:shadow-md hover:border-muted-foreground/20"
            >
              {/* Image Preview */}
              <div className="relative h-48 w-full bg-muted overflow-hidden">
                <img
                  src={beach.imageUrl}
                  alt={beach.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur-xs">
                  Rp {beach.ticketPrice.toLocaleString("id-ID")}
                </div>
              </div>

              {/* Info Body */}
              <div className="flex flex-1 flex-col p-5 text-left">
                <h3 className="font-semibold text-base text-foreground leading-snug">
                  {beach.name}
                </h3>
                <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                  <span>{beach.location}</span>
                </div>
                <p className="mt-3 flex-1 text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                  {beach.description}
                </p>

                {/* Actions Footer */}
                <div className="mt-5 flex items-center gap-2 border-t border-border pt-4">
                  <button
                    onClick={() => openEditModal(beach)}
                    className="flex-1 flex items-center justify-center gap-1.5 rounded-lg border border-border bg-card py-2 text-xs font-semibold text-foreground hover:bg-muted transition-colors"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(beach.id)}
                    className="flex items-center justify-center rounded-lg border border-transparent bg-destructive/10 px-3 py-2 text-xs font-semibold text-destructive hover:bg-destructive/20 transition-colors"
                    aria-label="Hapus pantai"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-border py-12 text-center">
          <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 font-semibold text-foreground text-sm">Destinasi tidak ditemukan</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Coba cari dengan kata kunci lain atau tambahkan pantai baru.
          </p>
        </div>
      )}

      {/* Add / Edit Modal Drawer */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg rounded-xl border border-border bg-card shadow-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <h3 className="font-semibold text-base text-foreground">
                {editingBeach ? "Edit Destinasi Pantai" : "Tambah Destinasi Pantai"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="space-y-1.5 text-left">
                <label htmlFor="name" className="text-xs font-semibold text-foreground">Nama Pantai</label>
                <input
                  id="name"
                  type="text"
                  required
                  placeholder="Contoh: Pantai Klara"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-hidden focus:ring-1 focus:ring-primary focus:border-primary"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5 text-left">
                  <label htmlFor="location" className="text-xs font-semibold text-foreground">Lokasi</label>
                  <input
                    id="location"
                    type="text"
                    required
                    placeholder="Contoh: Pesawaran, Lampung"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-hidden focus:ring-1 focus:ring-primary focus:border-primary"
                  />
                </div>
                <div className="space-y-1.5 text-left">
                  <label htmlFor="price" className="text-xs font-semibold text-foreground">Harga Tiket (Rp)</label>
                  <input
                    id="price"
                    type="number"
                    required
                    placeholder="Contoh: 25000"
                    value={ticketPrice}
                    onChange={(e) => setTicketPrice(e.target.value)}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-hidden focus:ring-1 focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-1.5 text-left">
                <label htmlFor="image" className="text-xs font-semibold text-foreground">URL Gambar (Opsional)</label>
                <input
                  id="image"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-hidden focus:ring-1 focus:ring-primary focus:border-primary"
                />
              </div>

              <div className="space-y-1.5 text-left">
                <label htmlFor="description" className="text-xs font-semibold text-foreground">Deskripsi Pantai</label>
                <textarea
                  id="description"
                  required
                  rows={3}
                  placeholder="Tuliskan deskripsi lengkap tentang keindahan dan daya tarik pantai ini..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-hidden focus:ring-1 focus:ring-primary focus:border-primary"
                />
              </div>

              {/* Form Buttons */}
              <div className="flex items-center justify-end gap-2 border-t border-border pt-4 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
