<div align="center">

# 🏖️ Beach-Go

**The Ultimate Beach Discovery & Booking Platform**

[![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)](#)
[![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)](#)
[![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](#)
[![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)](#)
[![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)](#)

*Jelajahi keindahan pantai, pesan tiket dengan mudah, dan kelola pariwisata secara terpusat melalui ekosistem **Beach-Go**.*

</div>

---

## 📑 Daftar Isi
1. [Tentang Proyek](#-tentang-proyek)
2. [Fitur Utama](#-fitur-utama)
3. [Arsitektur & Tech Stack](#-arsitektur--tech-stack)
4. [Struktur Direktori](#-struktur-direktori)
5. [Prasyarat](#-prasyarat)
6. [Panduan Instalasi Lengkap](#-panduan-instalasi-lengkap)
   - [Setup Database](#1-setup-database--backend-api)
   - [Setup Backend (API)](#2-menjalankan-backend-microservices)
   - [Setup CMS Admin](#3-menjalankan-web-cms-dashboard-admin)
   - [Setup Mobile User](#4-menjalankan-aplikasi-mobile-expo)

---

## 💡 Tentang Proyek
**Beach-Go** adalah solusi *end-to-end* yang dirancang untuk memodernisasi cara wisatawan mengeksplorasi dan memesan tiket wisata pantai. Platform ini terdiri dari tiga pilar utama:
1. **Aplikasi Mobile (User):** Untuk pencarian pantai, *booking* tiket, pembayaran, dan ulasan.
2. **Web CMS (Admin):** *Dashboard* terpusat untuk memantau data transaksi, mengelola data pantai, dan *user management*.
3. **API Microservices:** Sistem *backend* modular dengan keamanan JWT, di mana setiap modul (User, Beach, Booking, Payment) berjalan secara independen.

---

## 🌟 Fitur Utama

### 📱 Mobile User App
- **Eksplorasi Pantai:** Cari pantai terpopuler lengkap dengan gambar, rating, dan fasilitas.
- **Sistem Booking:** Pesan tiket kunjungan dengan mudah.
- **Pembayaran Aman:** Dukungan integrasi metode pembayaran (GoPay, Transfer, dll).
- **Riwayat Perjalanan:** Lacak jadwal dan *history* liburanmu.

### 💻 Web CMS (Admin)
- **Manajemen Data Pantai:** Tambah, edit, dan hapus informasi destinasi wisata.
- **Pantau Transaksi:** Laporan pemesanan dan status pembayaran secara *real-time*.
- **Role Management:** Kelola akses antara Super Admin dan Admin Pantai.
- **Statistik & Analitik:** Lihat grafik pertumbuhan pengunjung.

### ⚙️ Backend Microservices
- **API Gateway:** *Single point of entry* yang aman dan cepat.
- **Isolasi Service:** *Scalable* dengan layanan yang dipecah per domain (*User, Beach, Booking, Payment*).
- **Validasi Ketat:** Menggunakan `class-validator` & sistem keamanan standar industri.

---

## 🏗️ Arsitektur & Tech Stack

Ekosistem aplikasi ini didukung oleh teknologi modern:

| Platform | Teknologi Utama | Styling / Database |
| :--- | :--- | :--- |
| **Backend API** | NestJS, TypeScript, JWT | PostgreSQL, Prisma ORM |
| **Mobile App** | React Native, Expo, Expo Router | StyleSheet / Tailwind |
| **Web CMS** | Next.js 14, React, TypeScript | Tailwind CSS, Shadcn UI |

### Diagram Microservices
```mermaid
graph TD
    Client[Mobile / Web Client] -->|HTTP / REST| Gateway[API Gateway :3004]
    Gateway -->|Auth Guard| User[User Service :3001]
    Gateway --> Beach[Beach Service :3002]
    Gateway --> Booking[Booking Service :3003]
    Gateway --> Payment[Payment Service :3005]
```

---

## 📁 Struktur Direktori

```bash
Beach-Go/
├── api/                   # 🧠 Backend Microservices Ecosystem
│   ├── beach/             # Manages catalogs, ratings, facilities
│   ├── booking/           # Manages ticket reservations
│   ├── gateway/           # Central API Router & Auth Middleware
│   ├── payment/           # Manages transactions & statuses
│   └── user/              # Manages accounts & roles
│
├── mobile-user/           # 📱 Aplikasi Mobile (Expo)
│   ├── app/               # Expo Router pages
│   ├── components/        # Reusable UI widgets
│   ├── services/          # Axios API calls
│   └── hooks/             # Custom state logic
│
└── web-cms/               # 🖥️ Dashboard Admin (Next.js)
    └── src/
        ├── app/           # Next.js Server Components
        ├── components/    # Shadcn UI library
        └── lib/           # Utils
```

---

## ⚙️ Prasyarat

Sebelum menginstal, pastikan sistem kamu memiliki perangkat lunak berikut:
- **Node.js** (versi 18.x atau terbaru)
- **PostgreSQL** (terinstal dan berjalan di lokal)
- **Git**
- **Expo Go App** (diunduh di iOS App Store atau Google Play Store)

---

## 🚀 Panduan Instalasi Lengkap

### 1. Setup Database & Backend API
Buka terminal dan lakukan langkah berikut untuk **setiap folder** *service* yang ada di dalam `api/` (`user`, `beach`, `booking`, `payment`).

```bash
# 1. Masuk ke direktori service (contoh: user)
cd api/user

# 2. Install Dependencies
npm install

# 3. Setup Environment Variables
# Buat file .env dan pastikan DATABASE_URL mengarah ke lokal PostgreSQL kamu
# Contoh: DATABASE_URL="postgresql://postgres:password@localhost:5432/db_user?schema=public"

# 4. Sinkronisasi Skema Database & Generate Client
npx prisma db push
npx prisma generate

# 5. Jalankan Service di mode development
npm run start:dev
```
> **Penting:** 
> Lakukan hal yang sama untuk direktori `api/gateway` (Gateway tidak butuh sinkronisasi Prisma, cukup `npm install` dan `npm run start:dev`). Pastikan **kelima service (port 3001-3005) berjalan secara bersamaan**.

### 2. Menjalankan Web CMS (Dashboard Admin)
Buka tab terminal baru:

```bash
# 1. Masuk ke folder web-cms
cd web-cms

# 2. Install Dependencies
npm install

# 3. Setup Environment (.env)
# Buat file .env.local dan tambahkan:
# NEXT_PUBLIC_API_URL=http://localhost:3004/api

# 4. Jalankan Server Next.js
npm run dev
```
Buka browser dan akses 👉 **[http://localhost:3000](http://localhost:3000)**

### 3. Menjalankan Aplikasi Mobile (Expo)
Buka tab terminal baru:

```bash
# 1. Masuk ke folder mobile-user
cd mobile-user

# 2. Install Dependencies
npm install

# 3. Setup Koneksi API
# Buka file constants/config.ts atau .env
# Ganti baseURL agar mengarah ke API Gateway. 
# ⚠️ Jika menggunakan HP Asli, gunakan Alamat IPv4 komputermu!
# Contoh: baseURL: 'http://192.168.1.15:3004/api'

# 4. Jalankan Expo Server
npx expo start
```
- **Testing di HP Fisik:** Buka aplikasi **Expo Go** lalu scan QR Code yang muncul di terminal.
- **Testing di Emulator:** Tekan huruf `a` untuk Android atau `i` untuk iOS.

---

<div align="center">
  Dibuat dengan ❤️ oleh Tim Beach-Go. 
  <br />
  Selamat mengembangkan dan menjelajahi pantai! 🏖️
</div>