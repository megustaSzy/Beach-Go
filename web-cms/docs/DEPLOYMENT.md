# Panduan Deploy Web CMS Beach-Go

Dokumen ini menjelaskan langkah-langkah untuk melakukan build dan deploy web-cms (Next.js) ke server produksi.

## Prasyarat
- Node.js versi 18 ke atas
- package manager (npm atau yarn)

## Langkah Build Lokal
1. Install dependensi proyek:
   ```bash
   npm install
   ```
2. Jalankan perintah build Next.js:
   ```bash
   npm run build
   ```
3. Start server lokal hasil build:
   ```bash
   npm run start
   ```

## Deploy ke Vercel (Rekomendasi)
1. Hubungkan repository GitHub Anda ke Vercel.
2. Pilih folder Root Directory: `web-cms`.
3. Konfigurasikan Environment Variables jika ada.
4. Klik **Deploy**. Vercel akan otomatis mendeteksi konfigurasi Next.js dan melakukan deployment.
