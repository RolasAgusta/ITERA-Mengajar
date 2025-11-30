# 📡 API Documentation - Registration Form

## Endpoint

```
POST https://script.google.com/macros/s/{DEPLOYMENT_ID}/exec
```

---

## Request Format

### Headers
```
Content-Type: application/json
```

### Body (JSON)
```json
{
  "nama": "John Doe",
  "email": "john.123456@student.itera.ac.id",
  "nim": "123456",
  "prodi": "Teknik Informatika",
  "angkatan": "2022",
  "whatsapp": "081234567890",
  "motivasi": "Saya ingin menjadi volunteer karena...",
  "file_cv": "JVBERi0xLjQKJeLjz9MKMyAwIG9iaiA8...",
  "file_esai": "JVBERi0xLjQKJeLjz9MKMyAwIG9iaiA8...",
  "file_motlet": "JVBERi0xLjQKJeLjz9MKMyAwIG9iaiA8..."
}
```

### Field Descriptions

| Field | Type | Required | Max Length | Description |
|-------|------|----------|------------|-------------|
| `nama` | String | ✅ Yes | 255 | Nama lengkap pendaftar |
| `email` | String | ✅ Yes | 255 | Email student ITERA (@student.itera.ac.id) |
| `nim` | String | ✅ Yes | 20 | Nomor Induk Mahasiswa |
| `prodi` | String | ✅ Yes | 100 | Program Studi (dari list 39 prodi) |
| `angkatan` | String | ✅ Yes | 4 | Tahun angkatan (YYYY) |
| `whatsapp` | String | ✅ Yes | 20 | Nomor WhatsApp aktif |
| `motivasi` | String | ✅ Yes | - | Motivasi mendaftar sebagai volunteer |
| `file_cv` | String (Base64) | ✅ Yes | ~7MB | CV dalam format PDF (Base64 encoded) |
| `file_esai` | String (Base64) | ✅ Yes | ~7MB | Esai dalam format PDF (Base64 encoded) |
| `file_motlet` | String (Base64) | ✅ Yes | ~7MB | Motivation Letter PDF (Base64 encoded) |

### Notes:
- **Base64 Format**: Harus **clean Base64** (tanpa prefix `data:application/pdf;base64,`)
- **File Size**: Maksimal 5MB per file **sebelum** encoding Base64
- **PDF Only**: Hanya accept format PDF untuk ketiga file

---

## Response Format

### Success Response (200 OK)

```json
{
  "status": "success",
  "message": "Pendaftaran berhasil! Data Anda telah tersimpan.",
  "timestamp": "2025-11-30T14:30:25.123Z",
  "files": {
    "cv": "https://drive.google.com/file/d/xxxxxxxxxxxxx/view",
    "esai": "https://drive.google.com/file/d/xxxxxxxxxxxxx/view",
    "motlet": "https://drive.google.com/file/d/xxxxxxxxxxxxx/view"
  }
}
```

### Error Response (200 OK - with error status)

```json
{
  "status": "error",
  "message": "Data tidak lengkap. Mohon isi semua field yang wajib.",
  "timestamp": "2025-11-30T14:30:25.123Z"
}
```

**Note**: Google Apps Script Web App selalu return HTTP 200, cek field `status` untuk actual result.

---

## Error Messages

| Error Message | Cause | Solution |
|---------------|-------|----------|
| `Data tidak lengkap. Mohon isi semua field yang wajib.` | Ada field required yang kosong | Validasi semua field sebelum submit |
| `Gagal menyimpan file ke Drive: ...` | Error saat upload ke Drive | Cek Base64 encoding, file size, Drive permissions |
| `Gagal decode/save file: ...` | Base64 invalid atau corrupt | Pastikan Base64 clean (tanpa prefix) |
| `Gagal menyimpan ke spreadsheet: ...` | Error saat write ke Sheet | Cek Spreadsheet ID dan permissions |
| `Terjadi kesalahan: ...` | General error | Cek Apps Script Execution log |

---

## Example: Frontend Implementation

### JavaScript (Vanilla)

```javascript
// Convert file to Base64
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      // Remove prefix: data:application/pdf;base64,
      const base64 = e.target.result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Submit form
async function submitForm(formData) {
  // Convert files
  const [cvBase64, esaiBase64, motletBase64] = await Promise.all([
    fileToBase64(formData.cvFile),
    fileToBase64(formData.esaiFile),
    fileToBase64(formData.motletFile)
  ]);

  // Prepare payload
  const payload = {
    nama: formData.nama,
    email: formData.email,
    nim: formData.nim,
    prodi: formData.prodi,
    angkatan: formData.angkatan,
    whatsapp: formData.whatsapp,
    motivasi: formData.motivasi,
    file_cv: cvBase64,
    file_esai: esaiBase64,
    file_motlet: motletBase64
  };

  // Send request
  const response = await fetch(SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors', // Required for Google Apps Script
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload)
  });

  // Note: no-cors mode cannot read response
  // Assume success if no error thrown
  console.log('Form submitted successfully');
}
```

### cURL Example

```bash
curl -X POST \
  'https://script.google.com/macros/s/{DEPLOYMENT_ID}/exec' \
  -H 'Content-Type: application/json' \
  -d '{
    "nama": "John Doe",
    "email": "john.123456@student.itera.ac.id",
    "nim": "123456",
    "prodi": "Teknik Informatika",
    "angkatan": "2022",
    "whatsapp": "081234567890",
    "motivasi": "Test motivasi",
    "file_cv": "JVBERi0xLjQK...",
    "file_esai": "JVBERi0xLjQK...",
    "file_motlet": "JVBERi0xLjQK..."
  }'
```

---

## Rate Limiting

**Google Apps Script Limits:**
- Max execution time: **6 minutes** per request
- URL Fetch calls: **20,000** per day
- Script runtime: **90 minutes** per day (for free tier)

**Recommendations:**
- Implement client-side throttling
- Add CAPTCHA for production
- Consider paid Google Workspace for higher limits

---

## Security Best Practices

### ✅ DO:
- Validate all inputs on frontend before submit
- Use HTTPS only
- Implement CAPTCHA (reCAPTCHA v3)
- Log all submissions with timestamp
- Regular backup of Spreadsheet

### ❌ DON'T:
- Submit sensitive data (passwords, credit cards)
- Allow unlimited file sizes
- Expose Spreadsheet/Drive IDs publicly (if possible)
- Share Web App URL publicly without protection

---

## Testing Checklist

- [ ] All required fields submitted
- [ ] Email validation (@student.itera.ac.id)
- [ ] NIM numeric only
- [ ] Angkatan 4 digits
- [ ] WhatsApp numeric only
- [ ] Files are PDF format
- [ ] Files < 5MB each
- [ ] Base64 encoding correct (without prefix)
- [ ] Data appears in Spreadsheet
- [ ] Files uploaded to Drive
- [ ] Files are viewable (public link)
- [ ] Links in Spreadsheet are clickable
- [ ] Success alert displayed
- [ ] Form reset after submit

---

## Monitoring

### Apps Script Execution Log
1. Open: https://script.google.com
2. Select project
3. Left sidebar: **Executions**
4. View:
   - Execution time
   - Status (Success/Error)
   - Error messages
   - Logs (Logger.log output)

### Google Drive Quota
- Check: https://drive.google.com/settings/storage
- Free tier: 15 GB total
- Each PDF ~1-2 MB
- Monitor regularly

---

**Last Updated**: 30 November 2025  
**Version**: 1.0  
**API Stability**: Stable
