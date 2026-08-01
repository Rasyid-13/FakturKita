# 🚀 FakturKita — Landing Page Validasi

Landing page ini dibuat untuk **mengukur minat pasar** sebelum membangun aplikasi penuh.

## 📁 Struktur File

```
fakturkita-landing/
├── index.html          # Halaman utama landing page
├── css/
│   └── style.css       # Styling (mobile-first, dark mode)
├── js/
│   └── main.js         # Logic form, Firebase, FAQ accordion
└── images/             # (kosong, untuk logo/assets nanti)
```

## ⚡ Langkah 1: Setup Firebase (Database Waitlist)

### A. Buat Project Firebase
1. Buka [console.firebase.google.com](https://console.firebase.google.com) di Chrome HP Anda
2. Klik "Create a project"
3. Nama project: `fakturkita-[nama Anda]` (contoh: `fakturkita-budi`)
4. Matikan "Google Analytics" (bisa diaktifkan nanti)
5. Klik "Create project"

### B. Ambil Config Firebase
1. Di dashboard Firebase, klik ikon `</>` (Add Firebase to your web app)
2. Register app dengan nama "FakturKita Landing"
3. Copy config yang muncul, contoh:
```javascript
const firebaseConfig = {
    apiKey: "AIzaSyA...",
    authDomain: "fakturkita-budi.firebaseapp.com",
    projectId: "fakturkita-budi",
    storageBucket: "fakturkita-budi.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abc123"
};
```
4. Buka file `js/main.js` di Acode
5. Ganti bagian `const firebaseConfig = { ... }` dengan config Anda
6. Save

### C. Setup Firestore Database
1. Di sidebar Firebase, klik "Firestore Database"
2. Klik "Create database"
3. Pilih "Start in production mode"
4. Pilih region: `asia-southeast1` (Singapore) — terdekat dengan Indonesia
5. Klik "Enable"

### D. Setup Security Rules
1. Di Firestore Database, klik tab "Rules"
2. Ganti rules dengan ini:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /waitlist/{docId} {
      allow read: if false;  // Hanya admin bisa baca
      allow create: if true; // Siapa saja bisa daftar
    }
  }
}
```
3. Klik "Publish"

## ⚡ Langkah 2: Deploy ke Vercel

### A. Upload ke GitHub
1. Buka [github.com](https://github.com) di Chrome HP
2. Buat repository baru: `fakturkita-landing`
3. Di Acode, buka terminal (jika ada) atau gunakan aplikasi Termux
4. Atau cara manual: zip folder `fakturkita-landing`, upload via GitHub web

**Cara paling mudah (via GitHub web):**
1. Di GitHub repo baru Anda, klik "uploading an existing file"
2. Drag & drop SEMUA file dari folder `fakturkita-landing`
3. Klik "Commit changes"

### B. Connect ke Vercel
1. Buka [vercel.com](https://vercel.com) di Chrome HP
2. Login dengan GitHub
3. Klik "Add New Project"
4. Import repository `fakturkita-landing`
5. Framework Preset: pilih "Other"
6. Klik "Deploy"
7. Tunggu 1-2 menit
8. Dapatkan URL: `https://fakturkita-landing-[random].vercel.app`

## ⚡ Langkah 3: Custom Domain (Opsional, Nanti)

1. Beli domain di Niagahoster/Namecheap: `fakturkita.id` atau `fakturkita.com`
2. Di Vercel dashboard → Project Settings → Domains
3. Add domain dan ikuti instruksi DNS

## 📊 Cara Melihat Data Waitlist

1. Buka Firebase Console → Firestore Database
2. Klik collection "waitlist"
3. Anda akan melihat semua pendaftar dengan data:
   - Nama, Email, WhatsApp
   - Jenis usaha
   - Pain point (kesulitan utama)
   - Tanggal daftar

## 🎯 Target Validasi

| Metric | Target | Action |
|--------|--------|--------|
| **Waitlist signups** | 50 orang dalam 2 minggu | Lanjut build MVP |
| **< 20 signups** | - | Pivot value proposition atau ganti ide |
| **Business type mix** | > 60% UMKM/freelancer | Confirm target market |
| **Pain point** | > 40% "software mahal/rumit" | Validate pricing strategy |

## 🚀 Langkah Selanjutnya Setelah Validasi

1. **Jika 50+ daftar:** Mulai build MVP (Invoice generator + PDF export)
2. **Hubungi 10 pendaftar:** Interview singkat via WhatsApp (5 menit)
3. **Share landing page:** TikTok, Instagram, grup WhatsApp UMKM, LinkedIn
4. **Tracking:** Pasang Google Analytics 4 atau Plausible untuk traffic

## 🛠️ Tech Stack Landing Page

- **HTML5** semantic
- **CSS3** custom properties, flexbox, grid
- **Vanilla JS** (no framework)
- **Firebase Firestore** (database waitlist)
- **Vercel** (hosting + CDN)

## 📱 Optimized For

- Mobile-first (HP Android)
- Fast loading (< 2s)
- SEO friendly
- Dark mode aesthetic
- Touch-friendly UI

---

**Dibuat untuk validasi ide FakturKita — Platform Invoice & Faktur Pajak Digital untuk UMKM Indonesia**
