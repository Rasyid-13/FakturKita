# 📱 INSTRUKSI KHUSUS UNTUK HP ANDROID (Acode)

> **PENTING:** Dokumen ini adalah panduan LANGKAH DEMI LANGKAH untuk Anda yang menggunakan HP Android + Acode. Tidak perlu laptop.

---

## 🎯 TUJUAN HARI INI

Dalam 2-3 jam ke depan, Anda harus:
1. ✅ Setup Firebase (database untuk menyimpan data waitlist)
2. ✅ Edit kode Firebase config di Acode
3. ✅ Upload ke GitHub
4. ✅ Deploy ke Vercel (dapat URL website)
5. ✅ Share link ke minimal 20 orang

---

## 📦 STEP 0: Extract File ZIP

1. Download file `fakturkita-landing.zip`
2. Buka aplikasi **ZArchiver** (atau file manager bawaan)
3. Extract ZIP ke folder: `/storage/emulated/0/Acode/fakturkita-landing/`
4. Buka Acode → Open Folder → pilih `fakturkita-landing`

---

## 🔥 STEP 1: Setup Firebase (30 menit)

### 1.1 Buat Project Firebase
1. Buka Chrome → ketik `console.firebase.google.com`
2. Login dengan akun Google Anda
3. Klik tombol biru **"Create a project"**
4. Nama project: `fakturkita-[namaAnda]`
   - Contoh: `fakturkita-budi`
   - **JANGAN pakai spasi atau karakter khusus**
5. Matikan centang "Enable Google Analytics for this project"
6. Klik **"Create project"**
7. Tunggu sampai selesai (loading 30-60 detik)
8. Klik **"Continue"**

### 1.2 Daftarkan Web App
1. Di dashboard Firebase, klik ikon `</>` (tulisan: "Add Firebase to your web app")
2. App nickname: `FakturKita Landing`
3. **JANGAN centang** "Also set up Firebase Hosting"
4. Klik **"Register app"**
5. Akan muncul kode config seperti ini:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyAbc123...",
  authDomain: "fakturkita-budi.firebaseapp.com",
  projectId: "fakturkita-budi",
  storageBucket: "fakturkita-budi.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:xyz789"
};
```

6. **COPY semua kode tersebut**

### 1.3 Edit File di Acode
1. Buka Acode → buka folder `fakturkita-landing`
2. Buka file: `js/main.js`
3. Cari bagian awal file yang ada `const firebaseConfig = {`
4. **HAPUS** semua isi firebaseConfig yang lama
5. **PASTE** config yang baru Anda copy dari Firebase
6. **SAVE** file (ikon disk di atas)

### 1.4 Setup Database Firestore
1. Kembali ke Chrome → Firebase Console
2. Di menu sidebar kiri, klik **"Firestore Database"**
3. Klik **"Create database"**
4. Pilih **"Start in production mode"**
5. Klik **"Next"**
6. Location: pilih `asia-southeast1 (Singapore)`
   - Ini server terdekat dengan Indonesia (cepat)
7. Klik **"Enable"**
8. Tunggu 1-2 menit

### 1.5 Atur Security Rules
1. Di Firestore Database, klik tab **"Rules"** (di atas)
2. Hapus semua rules yang ada
3. Copy-paste rules ini:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /waitlist/{docId} {
      allow read: if false;
      allow create: if true;
    }
  }
}
```

4. Klik **"Publish"**

✅ **Firebase SELESAI!**

---

## 🐙 STEP 2: Upload ke GitHub (20 menit)

### 2.1 Buat Repository
1. Buka Chrome → `github.com`
2. Login (atau daftar jika belum punya akun)
3. Klik tombol `+` di pojok kanan atas → **"New repository"**
4. Repository name: `fakturkita-landing`
5. Description: `Landing page for FakturKita - Invoice & Tax Platform for Indonesian MSMEs`
6. Pilih **"Public"**
7. **JANGAN centang** "Add a README file" (sudah ada)
8. Klik **"Create repository"**

### 2.2 Upload File (Cara Termudah)
1. Di halaman repo baru, klik link **"uploading an existing file"**
2. Klik **"choose your files"**
3. Buka file manager → masuk ke folder `fakturkita-landing`
4. **Pilih SEMUA file:**
   - `index.html`
   - `vercel.json`
   - `.gitignore`
   - `README.md`
   - folder `css/style.css`
   - folder `js/main.js`
5. Klik **"Commit changes"**

**Tips:** Jika tidak bisa upload folder, upload file satu per satu ke path yang benar:
- `index.html` → root
- `css/style.css` → buat folder css dulu
- `js/main.js` → buat folder js dulu

---

## ▲ STEP 3: Deploy ke Vercel (15 menit)

### 3.1 Import dari GitHub
1. Buka Chrome → `vercel.com`
2. Klik **"Sign Up"** → pilih **"Continue with GitHub"**
3. Izinkan akses ke repository Anda
4. Di dashboard Vercel, klik **"Add New Project"**
5. Cari dan klik repository `fakturkita-landing`
6. Klik **"Import"**

### 3.2 Configure Project
1. Project Name: `fakturkita-landing` (atau biarkan default)
2. Framework Preset: pilih **"Other"**
3. Root Directory: biarkan `./`
4. **JANGAN ubah** build settings lainnya
5. Klik **"Deploy"**

### 3.3 Dapatkan URL
1. Tunggu 1-2 menit (ada loading bar)
2. Akan muncul halaman "Congratulations!"
3. **COPY URL Anda**, contoh:
   `https://fakturkita-landing.vercel.app`
   atau
   `https://fakturkita-landing-abc123.vercel.app`

4. Simpan URL ini di catatan HP Anda!

✅ **Website Anda SUDAH ONLINE!**

---

## 📢 STEP 4: Share & Validasi (30 menit)

### 4.1 Test Dulu Sendiri
1. Buka URL website Anda di Chrome HP
2. Isi form waitlist dengan data palsu (untuk test)
3. Cek di Firebase Console → Firestore → collection "waitlist"
4. Jika data muncul = **BERHASIL!**

### 4.2 Share ke Target Market
**Copy template ini:**

```
Halo! Saya sedang membangun aplikasi faktur digital untuk UMKM Indonesia.

Bisa bantu isi form ini? Cuma 1 menit. Yang daftar dapat 3 bulan GRATIS saat aplikasi jadi 🎉

[URL_WEBSITE_ANDA]

Terima kasih! 🙏
```

**Kirim ke (target 20 orang hari ini):**
- [ ] 5 orang: Teman yang punya UMKM
- [ ] 5 orang: Grup WhatsApp komunitas UMKM
- [ ] 5 orang: Teman freelancer/konsultan
- [ ] 3 orang: Story Instagram/WhatsApp
- [ ] 2 orang: LinkedIn post

### 4.3 Tracking
1. Buka Firebase Console setiap hari
2. Cek berapa orang yang daftar
3. Catat di notes HP:
```
Tanggal | Daftar | Target
01 Aug  |   0    |   20  (hari ini)
02 Aug  |   ?    |   40  (2 hari)
07 Aug  |   ?    |  100  (1 minggu)
14 Aug  |   ?    |  200  (2 minggu)
```

---

## ✅ KRITERIA GO / NO-GO

### 🟢 GO (Lanjut Build MVP) — Jika dalam 2 minggu:
- **≥ 50 orang** daftar waitlist
- **≥ 40%** dari pendaftar adalah UMKM/freelancer
- **≥ 30%** memilih pain point "software mahal/rumit"

### 🔴 NO-GO (Pivot) — Jika dalam 2 minggu:
- **< 20 orang** daftar → Value proposition kurang kuat
- **< 20%** UMKM/freelancer → Target market salah
- **Banyak** yang bilang "tidak butuh" → Masalah tidak nyata

---

## 🆘 TROUBLESHOOTING

### "Firebase config error" di console
→ Pastikan Anda sudah ganti `YOUR_API_KEY` dengan config asli dari Firebase

### "Permission denied" saat submit form
→ Cek Firestore Rules, pastikan `allow create: if true;`

### Website tidak muncul di Vercel
→ Cek di Vercel dashboard → tab "Deployments" → lihat error log
→ Biasanya karena file tidak ter-upload ke GitHub dengan benar

### Form tidak bisa di-submit
→ Cek koneksi internet
→ Cek apakah Firebase config sudah benar
→ Buka Chrome DevTools (titik 3 → More tools → Developer tools) → tab Console → lihat error

---

## 📞 BUTUH BANTUAN?

Jika stuck di salah satu step, screenshot error-nya dan kirim ke saya. Saya akan bantu debug.

**Jangan menyerah di step setup.** Ini adalah gerbang pertama menuju bisnis digital Anda.

---

**⏱️ Estimasi Total Waktu:** 2-3 jam pertama kali
**🎯 Target Hari Ini:** Website online + 20 orang daftar waitlist

**Let's go! 🚀**
