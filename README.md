# Beach-Go - Wisata Pantai Lampung

Beach-Go adalah platform pencarian dan ticketing masuk destinasi pantai di Lampung, terdiri dari aplikasi Mobile (User Client), Web CMS (Admin Dashboard), serta API (Backend Services).

## Struktur Project

Repository ini merupakan monorepo sederhana yang menampung beberapa sub-proyek:

1. **`mobile-user`**: Aplikasi mobile berbasis **React Native / Expo** untuk mencari pantai, membaca ulasan, dan memesan tiket masuk.
2. **`web-cms`**: Web admin panel berbasis **Next.js 16** dan **Tailwind CSS v4** untuk mengelola data pantai, melacak transaksi booking tiket, dan mengelola level perizinan user.
3. **`api`**: Layanan backend microservices (`user`, `beach`, `gateway`) berbasis Node.js dan Prisma ORM.

---

## Petunjuk Menjalankan Proyek

### 1. Menjalankan Aplikasi Mobile (`mobile-user`)
```bash
cd mobile-user
npm install
npx expo start
```

### 2. Menjalankan Web CMS (`web-cms`)
```bash
cd web-cms
npm install
npm run dev
```

### 3. Menjalankan Backend API (`api`)
Silakan lihat panduan lengkap di masing-masing folder microservice (`api/user`, `api/beach`) untuk melakukan setup database Prisma dan menjalankan server.