# 🚀 Setup Google Apps Script Backend

Panduan lengkap untuk deploy backend form pendaftaran ITERA Mengajar.

---

## 📋 Prerequisites

- Akun Google dengan akses ke:
  - Google Spreadsheet (ID: `1g6amTnSbARWoqXaeFty2iBhBeX6i1JCbd9fLe6RN1yc`)
  - Google Drive Folder (ID: `10oPAztO0ksB2BRFoME9weO4M9zD4EpOj`)

---

## 🔧 Langkah 1: Setup Google Apps Script

### 1.1 Buka Apps Script Editor
1. Buka https://script.google.com
2. Klik **New Project**
3. Rename project menjadi `ITERA Mengajar - Registration Backend`

### 1.2 Copy Kode Backend
1. Hapus kode default di editor
2. Copy seluruh isi file `backend/Code.gs`
3. Paste ke Apps Script editor
4. Klik **Save** (Ctrl+S / Cmd+S)

### 1.3 Test Konfigurasi (Optional)
1. Di Apps Script editor, pilih function `testFileOperations`
2. Klik **Run**
3. Authorize aplikasi saat diminta
4. Cek **Execution log** - harus muncul:
   ```
   ✅ Folder accessible: [Nama Folder]
   ✅ Spreadsheet accessible: [Nama Spreadsheet]
   All configurations are valid!
   ```

---

## 🌐 Langkah 2: Deploy Web App

### 2.1 Deploy
1. Klik **Deploy** > **New deployment**
2. Klik ⚙️ icon di sebelah "Select type"
3. Pilih **Web app**
4. Isi konfigurasi:
   - **Description**: `ITERA Mengajar Registration v1.0`
   - **Execute as**: **Me** (akun Anda)
   - **Who has access**: **Anyone** (Siapa saja bisa akses)
5. Klik **Deploy**
6. **PENTING**: Copy **Web app URL** yang muncul
   - Format: `https://script.google.com/macros/s/AKfycby.../exec`

### 2.2 Re-authorize (jika diminta)
1. Klik **Authorize access**
2. Pilih akun Google Anda
3. Klik **Advanced** > **Go to [Project Name] (unsafe)**
4. Klik **Allow**

---

## 🔗 Langkah 3: Update Frontend

### 3.1 Edit form.js
1. Buka file: `assets/js/pendaftaran/form.js`
2. Cari baris:
   ```javascript
   const SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec';
   ```
3. Ganti `YOUR_DEPLOYMENT_ID` dengan URL Web App dari Langkah 2.1
4. Save file

### 3.2 Contoh:
```javascript
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/exec';
```

---

## ✅ Langkah 4: Testing

### 4.1 Test via Browser
1. Buka `http://localhost:8000/pendaftaran.html`
2. Isi semua field form
3. Upload 3 file PDF (CV, Esai, Motivation Letter)
4. Klik **Kirim Pendaftaran**
5. Tunggu loading selesai
6. Harus muncul alert: `✅ Pendaftaran berhasil dikirim!`

### 4.2 Verifikasi Google Spreadsheet
1. Buka Spreadsheet: https://docs.google.com/spreadsheets/d/1g6amTnSbARWoqXaeFty2iBhBeX6i1JCbd9fLe6RN1yc
2. Cek sheet **Pendaftaran** (akan dibuat otomatis jika belum ada)
3. Harus ada row baru dengan:
   - Timestamp
   - Data pendaftar (Nama, Email, NIM, dll)
   - Link CV, Esai, Motivation Letter (clickable, warna biru)

### 4.3 Verifikasi Google Drive
1. Buka Folder: https://drive.google.com/drive/folders/10oPAztO0ksB2BRFoME9weO4M9zD4EpOj
2. Harus ada 3 file PDF baru:
   - `NAMA_NIM_CV_YYYYMMDD_HHMMSS.pdf`
   - `NAMA_NIM_Esai_YYYYMMDD_HHMMSS.pdf`
   - `NAMA_NIM_MotLet_YYYYMMDD_HHMMSS.pdf`
3. Klik file > Bagikan > Harus ada "Anyone with the link can view"

---

## 🐛 Troubleshooting

### Error: "Script function not found: doPost"
- **Solusi**: Pastikan function `doPost(e)` ada di Code.gs dan sudah di-save

### Error: "Authorization required"
- **Solusi**: 
  1. Buka Apps Script editor
  2. Run function `testFileOperations`
  3. Authorize aplikasi

### Error: "Exception: Spreadsheet not found"
- **Solusi**: Cek apakah Spreadsheet ID benar dan Anda punya akses edit

### Error: "Exception: Folder not found"
- **Solusi**: Cek apakah Folder ID benar dan Anda punya akses edit

### Form tidak submit (tidak ada response)
- **Solusi**:
  1. Buka Console browser (F12)
  2. Cek tab **Console** dan **Network**
  3. Pastikan `SCRIPT_URL` sudah diisi dengan benar
  4. Pastikan mode `no-cors` digunakan

### File tidak masuk Drive
- **Solusi**:
  1. Cek Apps Script **Execution log**
  2. Pastikan Base64 encoding benar (tanpa prefix `data:application/pdf;base64,`)
  3. Cek ukuran file < 5MB

---

## 📊 Struktur Data Spreadsheet

| Column | Field | Type | Example |
|--------|-------|------|---------|
| A | Timestamp | DateTime | 30/11/2025 14:30:25 |
| B | Nama Lengkap | String | John Doe |
| C | Email Student ITERA | Email | john.123456@student.itera.ac.id |
| D | NIM | String | 123456 |
| E | Program Studi | String | Teknik Informatika |
| F | Angkatan | String | 2022 |
| G | WhatsApp | String | 081234567890 |
| H | Motivasi | Text | Motivasi saya adalah... |
| I | Link CV | URL | https://drive.google.com/file/d/... |
| J | Link Esai | URL | https://drive.google.com/file/d/... |
| K | Link Motivation Letter | URL | https://drive.google.com/file/d/... |
| L | Folder Pendaftar | URL | https://drive.google.com/drive/folders/... |

---

## 📁 Struktur Folder Google Drive

```
📁 PARENT_FOLDER (ID: 10oPAztO0ksB2BRFoME9weO4M9zD4EpOj)
├── 📁 Rolas_123130018_BerkasDaftar
│   ├── 📄 Rolas_123130018_CV_20251130_143025.pdf
│   ├── 📄 Rolas_123130018_Esai_20251130_143025.pdf
│   └── 📄 Rolas_123130018_MotLet_20251130_143025.pdf
├── 📁 John_Doe_987654_BerkasDaftar
│   ├── 📄 John_Doe_987654_CV_20251130_150000.pdf
│   ├── 📄 John_Doe_987654_Esai_20251130_150000.pdf
│   └── 📄 John_Doe_987654_MotLet_20251130_150000.pdf
└── ...
```

**Keuntungan:**
- ✅ File terorganisir per pendaftar
- ✅ Mudah mencari file berdasarkan nama/NIM
- ✅ Folder clickable dari Spreadsheet (kolom L)
- ✅ Tidak ada file tercampur
- ✅ Bisa download semua file pendaftar sekaligus (download folder)

---

## 🔄 Update Deployment

Jika ada perubahan kode:

1. Edit `Code.gs` di Apps Script editor
2. Save perubahan
3. Deploy > **New deployment** (bukan Manage deployments)
4. Update `SCRIPT_URL` di form.js dengan URL baru

**Atau** gunakan deployment version:
1. Deploy > **Manage deployments**
2. Klik ✏️ (edit) pada deployment aktif
3. Ubah **Version** menjadi **New version**
4. Save - URL tetap sama, tidak perlu update frontend

---

## 🔒 Security Notes

- ✅ Files di Drive: **Anyone with link** (read-only)
- ✅ Web App: **Anyone** dapat submit (anonymous)
- ⚠️ Tidak ada authentication - semua orang bisa submit
- ⚠️ Tidak ada rate limiting - bisa kena spam
- 💡 Untuk production: Tambah CAPTCHA atau authentication

---

## 📞 Support

Jika ada masalah:
1. Cek **Apps Script Execution log**: https://script.google.com > Project > Executions
2. Cek **Browser Console** (F12)
3. Test ulang dengan `testFileOperations()`

---

## ✨ Features

✅ Auto-save data ke Spreadsheet  
✅ Auto-upload PDF ke Drive  
✅ **Auto-create folder personal per pendaftar**  
✅ **Folder naming: NAMA_NIM_BerkasDaftar**  
✅ Auto-create clickable links  
✅ Timestamp otomatis  
✅ File naming dengan Nama + NIM  
✅ Alternate row colors  
✅ Header formatting  
✅ File sharing permissions  
✅ **Folder link di Spreadsheet (kolom L - warna hijau)**  

---

**Last Updated**: 30 November 2025  
**Version**: 1.0  
**Maintained by**: ITERA Mengajar Team
