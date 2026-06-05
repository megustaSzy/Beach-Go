"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface Beach {
  id: number;
  name: string;
  description: string;
  location: string;
  ticketPrice: number;
  imageUrl: string;
  createdAt: string;
}

export interface Booking {
  id: string;
  userName: string;
  userPhone: string;
  beachName: string;
  quantity: number;
  amount: number;
  date: string;
  status: "Success" | "Pending" | "Cancelled";
}

export interface User {
  id: number;
  name: string;
  email: string;
  notelp: string;
  role: "SUPER_ADMIN" | "ADMIN" | "USER";
  status: "Active" | "Inactive";
}

type DataContextType = {
  beaches: Beach[];
  addBeach: (beach: Omit<Beach, "id" | "createdAt">) => void;
  updateBeach: (id: number, beach: Partial<Beach>) => void;
  deleteBeach: (id: number) => void;
  bookings: Booking[];
  updateBookingStatus: (id: string, status: Booking["status"]) => void;
  users: User[];
  updateUserRole: (id: number, role: User["role"]) => void;
  updateUserStatus: (id: number, status: User["status"]) => void;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

const initialBeaches: Beach[] = [
  {
    id: 1,
    name: "Pantai Klara",
    description: "Pantai Klara terkenal dengan airnya yang jernih dan dangkal, sangat cocok untuk keluarga dan anak-anak.",
    location: "Pesawaran, Lampung",
    ticketPrice: 25000,
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=60",
    createdAt: "2026-05-10",
  },
  {
    id: 2,
    name: "Pantai Sari Ringgung",
    description: "Memiliki pasir timbul yang memukau di tengah laut dan fasilitas lengkap untuk rekreasi air.",
    location: "Pesawaran, Lampung",
    ticketPrice: 25000,
    imageUrl: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&auto=format&fit=crop&q=60",
    createdAt: "2026-05-12",
  },
  {
    id: 3,
    name: "Pantai Mutun",
    description: "Pantai berpasir putih bersih dengan akses dekat dari kota Bandar Lampung, populer untuk akhir pekan.",
    location: "Pesawaran, Lampung",
    ticketPrice: 20000,
    imageUrl: "https://images.unsplash.com/photo-1473442240418-452f03b7ae40?w=800&auto=format&fit=crop&q=60",
    createdAt: "2026-05-15",
  },
  {
    id: 4,
    name: "Pantai Sebalang",
    description: "Tempat terbaik menikmati sunset di Lampung dengan vibes ala Bali, dilengkapi cafe-cafe aesthetic.",
    location: "Lampung Selatan",
    ticketPrice: 30000,
    imageUrl: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800&auto=format&fit=crop&q=60",
    createdAt: "2026-05-20",
  },
];

const initialBookings: Booking[] = [
  {
    id: "B-2026-005",
    userName: "Aditya Pratama",
    userPhone: "081234567890",
    beachName: "Pantai Klara",
    quantity: 2,
    amount: 50000,
    date: "2026-06-05 09:30",
    status: "Success",
  },
  {
    id: "B-2026-004",
    userName: "Siti Rahma",
    userPhone: "082233445566",
    beachName: "Pantai Sari Ringgung",
    quantity: 3,
    amount: 75000,
    date: "2026-06-05 08:15",
    status: "Pending",
  },
  {
    id: "B-2026-003",
    userName: "Budi Santoso",
    userPhone: "085566778899",
    beachName: "Pantai Mutun",
    quantity: 2,
    amount: 40000,
    date: "2026-06-04 17:45",
    status: "Success",
  },
  {
    id: "B-2026-002",
    userName: "Dewi Lestari",
    userPhone: "087788990011",
    beachName: "Pantai Sebalang",
    quantity: 4,
    amount: 120000,
    date: "2026-06-04 14:20",
    status: "Cancelled",
  },
  {
    id: "B-2026-001",
    userName: "Rian Hidayat",
    userPhone: "089900112233",
    beachName: "Pantai Mutun",
    quantity: 3,
    amount: 60000,
    date: "2026-06-04 11:10",
    status: "Success",
  },
];

const initialUsers: User[] = [
  {
    id: 1,
    name: "Muhammad Fajar Azriel",
    email: "admin@beachgo.com",
    notelp: "081273928172",
    role: "SUPER_ADMIN",
    status: "Active",
  },
  {
    id: 2,
    name: "Deni Himawan",
    email: "deni@beachgo.com",
    notelp: "082381274921",
    role: "ADMIN",
    status: "Active",
  },
  {
    id: 3,
    name: "Raditya Ahmad",
    email: "radit@beachgo.com",
    notelp: "081392817382",
    role: "ADMIN",
    status: "Active",
  },
  {
    id: 4,
    name: "Pajar User",
    email: "pajar@user.com",
    notelp: "085372839218",
    role: "USER",
    status: "Active",
  },
  {
    id: 5,
    name: "Budi Santoso",
    email: "budi@gmail.com",
    notelp: "089928172635",
    role: "USER",
    status: "Inactive",
  },
];

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [beaches, setBeaches] = useState<Beach[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Load initial states
    const localBeaches = localStorage.getItem("bg_beaches");
    const localBookings = localStorage.getItem("bg_bookings");
    const localUsers = localStorage.getItem("bg_users");

    if (localBeaches) setBeaches(JSON.parse(localBeaches));
    else setBeaches(initialBeaches);

    if (localBookings) setBookings(JSON.parse(localBookings));
    else setBookings(initialBookings);

    if (localUsers) setUsers(JSON.parse(localUsers));
    else setUsers(initialUsers);

    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem("bg_beaches", JSON.stringify(beaches));
    }
  }, [beaches, loaded]);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem("bg_bookings", JSON.stringify(bookings));
    }
  }, [bookings, loaded]);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem("bg_users", JSON.stringify(users));
    }
  }, [users, loaded]);

  const addBeach = (beach: Omit<Beach, "id" | "createdAt">) => {
    const newBeach: Beach = {
      ...beach,
      id: beaches.length > 0 ? Math.max(...beaches.map((b) => b.id)) + 1 : 1,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setBeaches((prev) => [newBeach, ...prev]);
  };

  const updateBeach = (id: number, updated: Partial<Beach>) => {
    setBeaches((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updated } : b))
    );
  };

  const deleteBeach = (id: number) => {
    setBeaches((prev) => prev.filter((b) => b.id !== id));
  };

  const updateBookingStatus = (id: string, status: Booking["status"]) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...status } : b))
    );
  };

  const updateUserRole = (id: number, role: User["role"]) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, role } : u))
    );
  };

  const updateUserStatus = (id: number, status: User["status"]) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status } : u))
    );
  };

  return (
    <DataContext.Provider
      value={{
        beaches,
        addBeach,
        updateBeach,
        deleteBeach,
        bookings,
        updateBookingStatus,
        users,
        updateUserRole,
        updateUserStatus,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
