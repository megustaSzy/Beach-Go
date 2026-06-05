# Arsitektur Proyek Web CMS Beach-Go

Proyek ini dibangun menggunakan **Next.js 16** dengan struktur **App Router** dan dipadukan dengan **Tailwind CSS v4** untuk styling.

## Struktur Folder Utama
- `/src/app`: Mengatur routing berbasis folder (App Router).
  - `/login`: Halaman autentikasi masuk admin.
  - `/dashboard`: Layout utama dashboard dengan panel sidebar dan sub-pages.
  - `/api`: Menyediakan mock endpoint handler (GET, POST, PATCH) untuk simulasi interaksi backend.
- `/src/components`: Komponen UI modular.
  - `/dashboard`: Komponen spesifik dashboard seperti `Sidebar`, `Header`, dan `DataProvider`.
  - `/ui`: Komponen visual dasar reusable (Button, Card, Input, EmptyState, AlertBanner).
- `/src/hooks`: Custom React hooks (seperti `useTheme` untuk dark mode, dan `useFormat` untuk lokalisasi).
- `/src/lib`: Kode utility, helper validation, dan report calculations.

## Manajemen State
- State global (Beaches, Bookings, Users) dikelola melalui `DataProvider` menggunakan React Context dan sinkronisasi otomatis ke `localStorage`.
