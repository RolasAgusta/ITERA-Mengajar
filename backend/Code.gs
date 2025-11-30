/**
 * ITERA Mengajar - Registration Form Backend
 * Google Apps Script untuk menerima data pendaftaran volunteer
 * 
 * Setup:
 * 1. Copy kode ini ke script.google.com
 * 2. Deploy > New deployment > Web app
 * 3. Execute as: Me
 * 4. Who has access: Anyone
 * 5. Copy URL dan paste ke SCRIPT_URL di form.js
 */

// ==================== KONFIGURASI ====================
const CONFIG = {
  SPREADSHEET_ID: '1g6amTnSbARWoqXaeFty2iBhBeX6i1JCbd9fLe6RN1yc',
  PARENT_FOLDER_ID: '10oPAztO0ksB2BRFoME9weO4M9zD4EpOj', // Folder induk untuk semua pendaftar
  SHEET_NAME: 'Pendaftaran' // Ganti jika nama sheet berbeda
};

// ==================== MAIN FUNCTION ====================
/**
 * Handle POST request dari form pendaftaran
 */
function doPost(e) {
  try {
    // Parse request body
    const data = JSON.parse(e.postData.contents);
    
    // Validasi data wajib
    if (!validateRequiredFields(data)) {
      return createResponse(false, 'Data tidak lengkap. Mohon isi semua field yang wajib.');
    }
    
    // Create personal folder untuk pendaftar
    const personalFolder = createPersonalFolder(data.nama, data.nim);
    
    // Save files ke folder personal
    const fileUrls = saveFilesToDrive(data, personalFolder);
    
    // Save data ke Google Spreadsheet (dengan link folder)
    saveToSpreadsheet(data, fileUrls, personalFolder.getUrl());
    
    // Return success response
    return createResponse(true, 'Pendaftaran berhasil! Data Anda telah tersimpan.', {
      timestamp: new Date().toISOString(),
      files: fileUrls,
      folder: personalFolder.getUrl()
    });
    
  } catch (error) {
    Logger.log('Error in doPost: ' + error.toString());
    return createResponse(false, 'Terjadi kesalahan: ' + error.message);
  }
}

// ==================== VALIDATION ====================
/**
 * Validasi field yang wajib diisi
 */
function validateRequiredFields(data) {
  const required = ['nama', 'email', 'nim', 'prodi', 'angkatan', 'whatsapp', 'motivasi', 'file_cv', 'file_esai', 'file_motlet'];
  
  for (let field of required) {
    if (!data[field] || data[field].toString().trim() === '') {
      Logger.log('Missing field: ' + field);
      return false;
    }
  }
  
  return true;
}

// ==================== FILE HANDLING ====================
/**
 * Create personal folder untuk pendaftar
 * Format: NAMA_NIM_BerkasDaftar
 */
function createPersonalFolder(nama, nim) {
  try {
    const parentFolder = DriveApp.getFolderById(CONFIG.PARENT_FOLDER_ID);
    
    // Bersihkan nama untuk folder name
    const cleanName = nama.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 50);
    const cleanNim = nim.replace(/[^0-9]/g, '');
    
    // Format nama folder: NAMA_NIM_BerkasDaftar
    const folderName = `${cleanName}_${cleanNim}_BerkasDaftar`;
    
    // Cek apakah folder sudah ada (untuk avoid duplicate)
    const existingFolders = parentFolder.getFoldersByName(folderName);
    
    if (existingFolders.hasNext()) {
      // Jika sudah ada, tambahkan timestamp
      const timestamp = Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyyyMMdd_HHmmss');
      const uniqueFolderName = `${folderName}_${timestamp}`;
      const newFolder = parentFolder.createFolder(uniqueFolderName);
      Logger.log('Personal folder created (with timestamp): ' + uniqueFolderName);
      return newFolder;
    } else {
      // Buat folder baru
      const newFolder = parentFolder.createFolder(folderName);
      Logger.log('Personal folder created: ' + folderName);
      return newFolder;
    }
    
  } catch (error) {
    Logger.log('Error creating personal folder: ' + error.toString());
    throw new Error('Gagal membuat folder personal: ' + error.message);
  }
}

/**
 * Save files (CV, Esai, Motivation Letter) ke folder personal pendaftar
 * Returns object dengan URLs file
 */
function saveFilesToDrive(data, personalFolder) {
  try {
    const timestamp = Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyyyMMdd_HHmmss');
    
    // Bersihkan nama untuk filename
    const cleanName = data.nama.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 50);
    const cleanNim = data.nim.replace(/[^0-9]/g, '');
    
    // Save CV
    const cvFile = saveBase64File(
      personalFolder,
      data.file_cv,
      `${cleanName}_${cleanNim}_CV_${timestamp}.pdf`
    );
    
    // Save Esai
    const esaiFile = saveBase64File(
      personalFolder,
      data.file_esai,
      `${cleanName}_${cleanNim}_Esai_${timestamp}.pdf`
    );
    
    // Save Motivation Letter
    const motletFile = saveBase64File(
      personalFolder,
      data.file_motlet,
      `${cleanName}_${cleanNim}_MotLet_${timestamp}.pdf`
    );
    
    // Set sharing permissions (Anyone with link can view)
    cvFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    esaiFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    motletFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    
    return {
      cv: cvFile.getUrl(),
      esai: esaiFile.getUrl(),
      motlet: motletFile.getUrl()
    };
    
  } catch (error) {
    Logger.log('Error saving files: ' + error.toString());
    throw new Error('Gagal menyimpan file ke Drive: ' + error.message);
  }
}

/**
 * Decode Base64 dan save sebagai file PDF
 */
function saveBase64File(folder, base64Data, filename) {
  try {
    // Decode Base64 string to bytes
    const bytes = Utilities.base64Decode(base64Data);
    
    // Create blob
    const blob = Utilities.newBlob(bytes, 'application/pdf', filename);
    
    // Save to folder
    const file = folder.createFile(blob);
    
    Logger.log('File saved: ' + filename + ' (ID: ' + file.getId() + ')');
    
    return file;
    
  } catch (error) {
    Logger.log('Error in saveBase64File for ' + filename + ': ' + error.toString());
    throw new Error('Gagal decode/save file: ' + filename);
  }
}

// ==================== SPREADSHEET HANDLING ====================
/**
 * Save data pendaftaran ke Google Spreadsheet
 */
function saveToSpreadsheet(data, fileUrls, folderUrl) {
  try {
    const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
    let sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
    
    // Buat sheet baru jika belum ada
    if (!sheet) {
      sheet = ss.insertSheet(CONFIG.SHEET_NAME);
      
      // Tambahkan header
      const headers = [
        'Timestamp',
        'Nama Lengkap',
        'Email Student ITERA',
        'NIM',
        'Program Studi',
        'Angkatan',
        'WhatsApp',
        'Motivasi',
        'Link CV',
        'Link Esai',
        'Link Motivation Letter',
        'Folder Pendaftar'
      ];
      
      sheet.appendRow(headers);
      
      // Format header
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground('#7c3aed'); // Purple
      headerRange.setFontColor('#ffffff');
      headerRange.setFontWeight('bold');
      headerRange.setHorizontalAlignment('center');
      
      // Freeze header row
      sheet.setFrozenRows(1);
      
      // Auto-resize columns
      for (let i = 1; i <= headers.length; i++) {
        sheet.autoResizeColumn(i);
      }
    }
    
    // Prepare row data
    const timestamp = Utilities.formatDate(new Date(), 'Asia/Jakarta', 'dd/MM/yyyy HH:mm:ss');
    const rowData = [
      timestamp,
      data.nama,
      data.email,
      data.nim,
      data.prodi,
      data.angkatan,
      data.whatsapp,
      data.motivasi,
      fileUrls.cv,
      fileUrls.esai,
      fileUrls.motlet,
      folderUrl
    ];
    
    // Append data
    sheet.appendRow(rowData);
    
    // Format last row
    const lastRow = sheet.getLastRow();
    const dataRange = sheet.getRange(lastRow, 1, 1, rowData.length);
    
    // Alternate row colors
    if (lastRow % 2 === 0) {
      dataRange.setBackground('#f3f4f6');
    }
    
    // Make file links clickable and blue
    for (let i = 9; i <= 11; i++) {
      const cell = sheet.getRange(lastRow, i);
      cell.setFontColor('#2563eb');
      cell.setFontUnderline(true);
    }
    
    // Make folder link clickable and green
    const folderCell = sheet.getRange(lastRow, 12);
    folderCell.setFontColor('#059669'); // Green
    folderCell.setFontUnderline(true);
    folderCell.setFontWeight('bold');
    
    Logger.log('Data saved to spreadsheet. Row: ' + lastRow);
    
  } catch (error) {
    Logger.log('Error saving to spreadsheet: ' + error.toString());
    throw new Error('Gagal menyimpan ke spreadsheet: ' + error.message);
  }
}

// ==================== RESPONSE HELPER ====================
/**
 * Create JSON response
 */
function createResponse(success, message, additionalData = {}) {
  const response = {
    status: success ? 'success' : 'error',
    message: message,
    timestamp: new Date().toISOString(),
    ...additionalData
  };
  
  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

// ==================== TESTING FUNCTIONS ====================
/**
 * Function untuk test (optional - hapus jika tidak diperlukan)
 */
function testDoPost() {
  // Sample data untuk testing
  const testData = {
    nama: 'John Doe Test',
    email: 'john.123456@student.itera.ac.id',
    nim: '123456',
    prodi: 'Teknik Informatika',
    angkatan: '2022',
    whatsapp: '081234567890',
    motivasi: 'Ini adalah test motivasi untuk volunteer ITERA Mengajar.',
    file_cv: 'base64_string_here',
    file_esai: 'base64_string_here',
    file_motlet: 'base64_string_here'
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(mockEvent);
  Logger.log(result.getContent());
}

/**
 * Test file operations
 */
function testFileOperations() {
  try {
    const folder = DriveApp.getFolderById(CONFIG.PARENT_FOLDER_ID);
    Logger.log('✅ Parent Folder accessible: ' + folder.getName());
    
    const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
    Logger.log('✅ Spreadsheet accessible: ' + ss.getName());
    
    Logger.log('All configurations are valid!');
    
  } catch (error) {
    Logger.log('❌ Configuration error: ' + error.toString());
  }
}
