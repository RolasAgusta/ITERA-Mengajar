# 🚀 DEPLOYMENT GUIDE - Update Google Apps Script

## ⚠️ PENTING: Langkah Wajib Setelah Edit Code

Setiap kali Anda mengubah kode di `Code.gs`, Anda **HARUS** deploy versi baru agar perubahan aktif.

---

## 📝 Langkah-Langkah Deploy Versi Baru

### Method 1: New Version (RECOMMENDED) ✅

**Keuntungan:** URL tetap sama, tidak perlu update frontend

1. **Buka Apps Script Editor**
   - Go to: https://script.google.com
   - Pilih project "ITERA Mengajar - Registration Backend"

2. **Paste Kode Baru**
   - Select All (Ctrl+A / Cmd+A)
   - Delete
   - Copy semua isi file `backend/Code.gs`
   - Paste ke editor
   - **Save** (Ctrl+S / Cmd+S)

3. **Deploy New Version**
   - Klik **Deploy** (pojok kanan atas)
   - Pilih **Manage deployments**
   
4. **Edit Deployment**
   - Cari deployment yang aktif (biasanya paling atas)
   - Klik icon **✏️ Edit** (pensil)
   
5. **Update Version**
   - Di bagian **Version**, klik dropdown
   - Pilih **New version**
   - (Optional) Isi deskripsi: "Fix folder creation logic"
   - Klik **Deploy**
   
6. **Konfirmasi**
   - Popup akan muncul: "Deployment updated successfully"
   - URL tetap sama (tidak berubah)
   - ✅ Selesai!

---

### Method 2: New Deployment (Jika Method 1 Gagal)

**Warning:** URL akan berubah, perlu update `form.js`

1. **Deploy > New deployment**
2. **Select type: Web app**
3. **Configuration:**
   - Description: `ITERA Mengajar v2.0 - Folder Fix`
   - Execute as: **Me**
   - Who has access: **Anyone**
4. **Deploy**
5. **Copy URL baru**
6. **Update di `form.js`:**
   ```javascript
   const SCRIPT_URL = 'URL_BARU_DISINI';
   ```

---

## 🧪 Testing Deployment

### 1. Test Configuration
```javascript
// Di Apps Script Editor:
// 1. Select function: testFileOperations
// 2. Click Run
// 3. Check Execution log
```

**Expected output:**
```
✅ Parent Folder accessible: [Nama Folder]
✅ Spreadsheet accessible: [Nama Spreadsheet]
All configurations are valid!
```

### 2. Test Form Submission

1. **Buka form**: http://localhost:8000/pendaftaran.html
2. **Isi semua field**
3. **Upload 3 PDF**
4. **Submit**
5. **Check Apps Script Execution Log**

**Expected log (successful):**
```
=== START PROCESSING ===
Received data for: Rolas (NIM: 123130018)
✅ Validation passed
📁 Parent folder found: [Folder Name]
Creating personal folder inside: [Folder Name]
Folder name will be: Rolas_123130018_Berkas
Creating new folder...
✅ Folder created: Rolas_123130018_Berkas
📍 Folder URL: https://drive.google.com/drive/folders/...
📍 Folder ID: xxx
✅ Personal folder created: [URL]
Saving files to folder: Rolas_123130018_Berkas
Saving CV...
📄 File saved: Rolas_123130018_CV_20251130_143025.pdf (ID: xxx)
✅ CV saved: Rolas_123130018_CV_20251130_143025.pdf
Saving Esai...
📄 File saved: Rolas_123130018_Esai_20251130_143025.pdf (ID: xxx)
✅ Esai saved: Rolas_123130018_Esai_20251130_143025.pdf
Saving Motivation Letter...
📄 File saved: Rolas_123130018_MotLet_20251130_143025.pdf (ID: xxx)
✅ MotLet saved: Rolas_123130018_MotLet_20251130_143025.pdf
✅ All files shared successfully
✅ Files saved successfully
✅ Data saved to spreadsheet
=== PROCESS COMPLETED SUCCESSFULLY ===
```

---

## 📊 Verification Checklist

### ✅ Check Google Spreadsheet
- [ ] Buka: https://docs.google.com/spreadsheets/d/1g6amTnSbARWoqXaeFty2iBhBeX6i1JCbd9fLe6RN1yc
- [ ] Row baru ada (12 kolom)
- [ ] Kolom L (Folder Pendaftar) berisi link hijau bold
- [ ] Kolom I, J, K (File links) berisi link biru underline

### ✅ Check Google Drive
- [ ] Buka: https://drive.google.com/drive/folders/10oPAztO0ksB2BRFoME9weO4M9zD4EpOj
- [ ] Ada folder baru: `NAMA_NIM_Berkas`
- [ ] Folder **TIDAK** di root Drive (harus di dalam folder induk)
- [ ] Klik folder, harus ada 3 PDF di dalamnya

### ✅ Test Folder Link
- [ ] Klik link hijau di kolom L Spreadsheet
- [ ] Harus membuka folder personal pendaftar
- [ ] File CV, Esai, MotLet terlihat di folder

---

## 🐛 Troubleshooting

### Problem: "Folder masih di Root Drive"

**Cause:** Menggunakan deployment lama (code belum ter-update)

**Solution:**
1. Deploy **New Version** (bukan hanya Save)
2. Refresh browser
3. Clear cache (Ctrl+Shift+R)
4. Test ulang

---

### Problem: "URL tidak valid / 404"

**Cause:** Deployment URL berubah atau salah

**Solution:**
1. Buka Apps Script
2. Deploy > Manage deployments
3. Copy URL deployment yang aktif
4. Update di `form.js`:
   ```javascript
   const SCRIPT_URL = 'https://script.google.com/macros/s/...';
   ```
5. Refresh browser

---

### Problem: "Authorization required"

**Cause:** Apps Script butuh permission

**Solution:**
1. Buka Apps Script Editor
2. Run function `testFileOperations`
3. Klik **Review Permissions**
4. Pilih akun Google Anda
5. Klik **Advanced** > **Go to [Project] (unsafe)**
6. Klik **Allow**
7. Deploy ulang

---

## 📋 Quick Checklist

Setiap kali edit `Code.gs`:

- [ ] Save code (Ctrl+S)
- [ ] Deploy > Manage deployments
- [ ] Edit deployment (✏️ icon)
- [ ] New version
- [ ] Deploy
- [ ] Test di form
- [ ] Check Execution log
- [ ] Verify Spreadsheet
- [ ] Verify Drive folder structure

---

## 🔗 Important Links

- **Apps Script Project**: https://script.google.com
- **Spreadsheet**: https://docs.google.com/spreadsheets/d/1g6amTnSbARWoqXaeFty2iBhBeX6i1JCbd9fLe6RN1yc
- **Drive Folder**: https://drive.google.com/drive/folders/10oPAztO0ksB2BRFoME9weO4M9zD4EpOj
- **Form (Local)**: http://localhost:8000/pendaftaran.html

---

**Last Updated**: 30 November 2025  
**Version**: 2.0 - Folder Creation Fix
