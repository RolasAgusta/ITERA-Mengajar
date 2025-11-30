# 📅 Yearly Auto-Pilot System - User Guide

## 🎯 Overview

Sistem backend ini dirancang untuk **berjalan otomatis jangka panjang** dengan pengelompokan data berdasarkan tahun. Setiap tahun, sistem akan membuat folder dan sheet baru secara otomatis.

---

## 🏗️ Struktur Otomatis

### Google Drive Structure
```
📁 Folder Induk (10oPAztO0ksB2BRFoME9weO4M9zD4EpOj)
├── 📁 2025/
│   ├── 📁 JohnDoe_123456_Berkas/
│   │   ├── 📄 JohnDoe_123456_CV_20251130_120530.pdf
│   │   ├── 📄 JohnDoe_123456_Esai_20251130_120530.pdf
│   │   ├── 📄 JohnDoe_123456_MotLet_20251130_120530.pdf
│   │   ├── 📄 JohnDoe_123456_Transkrip_20251130_120530.pdf
│   │   └── 📄 JohnDoe_123456_Pernyataan_20251130_120530.pdf
│   ├── 📁 JaneSmith_789012_Berkas/
│   │   └── ...
│   └── 📁 (more applicants...)
├── 📁 2026/
│   └── 📁 (applicants for 2026...)
└── 📁 2027/
    └── 📁 (applicants for 2027...)
```

### Google Sheets Structure
```
📊 Master Spreadsheet (1g6amTnSbARWoqXaeFty2iBhBeX6i1JCbd9fLe6RN1yc)
├── 📋 Sheet: 2025
│   ├── Header Row (Purple background, white text, bold)
│   ├── Row 2: John Doe data
│   ├── Row 3: Jane Smith data
│   └── ...
├── 📋 Sheet: 2026
│   └── ...
└── 📋 Sheet: 2027
    └── ...
```

---

## 🚀 Deployment Steps

### 1. Copy Code to Apps Script

1. Buka [Google Apps Script](https://script.google.com/)
2. Klik **New Project**
3. Delete default code
4. Copy-paste **semua isi file `Code_Yearly.gs`**
5. Rename project: `ITERA Mengajar - Registration Backend`
6. Klik **Save** (💾)

### 2. Deploy as Web App

1. Klik **Deploy** > **New deployment**
2. Klik gear icon (⚙️) > Select **Web app**
3. Configuration:
   - **Description**: `Production v1 - Yearly System`
   - **Execute as**: `Me (your-email@gmail.com)`
   - **Who has access**: `Anyone`
4. Klik **Deploy**
5. **Authorize access**:
   - Review permissions
   - Click **Allow**
6. **Copy Deployment URL**:
   ```
   https://script.google.com/macros/s/AKfycbw.../exec
   ```

### 3. Update Frontend

1. Buka file `assets/js/pendaftaran/form.js`
2. Cari baris: `const SCRIPT_URL = '...'`
3. Replace dengan **Deployment URL baru**:
   ```javascript
   const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw.../exec';
   ```
4. Save file

---

## 🔄 How It Works (Automatic Flow)

### When Applicant Submits Form:

1. **Detect Current Year**
   ```javascript
   const currentYear = new Date().getFullYear().toString(); // "2025"
   ```

2. **Google Drive Management**
   - Check: Apakah folder "2025" sudah ada di folder induk?
   - **YES**: Gunakan folder yang ada
   - **NO**: Buat folder baru "2025"
   - Create personal folder: `NAMA_NIM_Berkas` di dalam folder "2025"
   - Save 5 PDF files ke personal folder

3. **Google Sheets Management**
   - Check: Apakah sheet "2025" sudah ada di spreadsheet?
   - **YES**: Gunakan sheet yang ada
   - **NO**: 
     - Buat sheet baru "2025"
     - Tulis header row dengan 14 kolom
     - Format header (purple background, white text, bold)
   - Append data pendaftar ke baris paling bawah

4. **Return Success Response**
   ```json
   {
     "result": "success",
     "message": "Pendaftaran berhasil!",
     "timestamp": "2025-11-30T12:05:30.000Z",
     "year": "2025",
     "files": { ... },
     "folder": "https://drive.google.com/..."
   }
   ```

---

## 📊 Sheet Structure (14 Columns)

| Column | Header | Type | Example |
|--------|--------|------|---------|
| A | Timestamp | DateTime | `30/11/2025 12:05:30` |
| B | Nama Lengkap | Text | `John Doe` |
| C | Email Student | Email | `john.123456@student.itera.ac.id` |
| D | NIM | Number | `123456` |
| E | Program Studi | Text | `Teknik Informatika` |
| F | Angkatan | Number | `2023` |
| G | WhatsApp | Phone | `081234567890` |
| H | Motivasi | Text (Long) | `Saya ingin...` |
| I | Link CV | URL | `https://drive.google.com/...` |
| J | Link Esai | URL | `https://drive.google.com/...` |
| K | Link MotLet | URL | `https://drive.google.com/...` |
| L | Link Transkrip | URL | `https://drive.google.com/...` |
| M | Link Pernyataan | URL | `https://drive.google.com/...` |
| N | Folder Pendaftar | URL | `https://drive.google.com/...` |

**Visual Formatting:**
- **Header Row**: Purple background (#7c3aed), white text, bold, center-aligned
- **Data Rows**: Zebra striping (even rows = light gray #f3f4f6)
- **File Links (I-M)**: Blue color (#2563eb), underlined
- **Folder Link (N)**: Green color (#059669), bold, underlined

---

## 🧪 Testing (Optional)

### Test Configuration Access

1. Buka Apps Script Editor
2. Uncomment function `testConfiguration()`
3. Klik **Run** > Select `testConfiguration`
4. Check **Execution log**:
   ```
   ✅ Parent Folder accessible: Folder Name
   ✅ Spreadsheet accessible: Spreadsheet Name
   ✅ All configurations are valid!
   ```

### Test Full Flow (Simulated Submission)

1. Uncomment function `testDoPost()`
2. Klik **Run** > Select `testDoPost`
3. Check:
   - **Drive**: Folder "2025" created with test applicant folder
   - **Sheets**: Sheet "2025" created with header + test data
   - **Execution log**: All steps logged

---

## 🔐 Security & Permissions

### Required Permissions (First Run):
- **Google Drive**: Read/Write access untuk create folders & files
- **Google Sheets**: Read/Write access untuk create/edit sheets
- **External Requests**: Receive POST requests dari public web

### File Sharing:
- All uploaded PDFs: **Anyone with link can VIEW** (read-only)
- Personal folders: **Inherited from parent** (private by default)

---

## 🛠️ Maintenance

### When to Update Deployment:

1. **Jika mengubah kode backend**:
   - Edit `Code_Yearly.gs`
   - Deploy > **Manage deployments**
   - Klik **Edit** (pencil icon) pada deployment aktif
   - Pilih **New version**
   - Klik **Deploy**
   - ⚠️ **URL tetap sama** (tidak perlu update frontend)

2. **Jika perlu rollback**:
   - Manage deployments > Select older version
   - Deploy

### Monitoring:

1. **Check Apps Script Logs**:
   - Apps Script Editor > **Executions**
   - View execution history, errors, duration

2. **Check Drive Storage**:
   - Google Drive > Folder Induk
   - Verify yearly folders created correctly

3. **Check Sheet Data**:
   - Open Master Spreadsheet
   - Verify yearly sheets exist with data

---

## 📈 Long-Term Benefits

✅ **Zero Manual Setup**: Tahun baru? Sistem auto-create folder & sheet  
✅ **Organized by Year**: Easy filtering, reporting per tahun  
✅ **Scalable**: Support unlimited years (2025, 2026, 2027, ...)  
✅ **Low Maintenance**: Set & forget, runs automatically  
✅ **Clear Audit Trail**: All data grouped chronologically  

---

## 🆘 Troubleshooting

### Error: "Gagal membuat folder tahun"
- **Cause**: Insufficient Drive permissions
- **Fix**: Re-authorize Apps Script > Allow Drive access

### Error: "Gagal membuat sheet tahun"
- **Cause**: Spreadsheet ID incorrect
- **Fix**: Verify `CONFIG.SPREADSHEET_ID` matches your spreadsheet

### Folder created in wrong location
- **Cause**: Parent folder ID incorrect
- **Fix**: Verify `CONFIG.PARENT_FOLDER_ID` is correct

### No data in sheet
- **Cause**: POST request failed or CORS issue
- **Fix**: Check Apps Script execution log for errors

---

## 📞 Support

Jika menemukan masalah, check:
1. **Apps Script Logs**: Executions tab
2. **Browser Console**: Network errors
3. **Form Validation**: All fields filled correctly

---

## 📝 Version History

- **v1.0** (2025-11-30): Initial yearly auto-pilot system
  - Auto-create yearly folders
  - Auto-create yearly sheets
  - Support 5 file uploads
  - 14 columns sheet structure
