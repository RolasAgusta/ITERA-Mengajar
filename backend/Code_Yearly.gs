/**
 * ITERA Mengajar - Registration Form Backend (Yearly Auto-Pilot System)
 * Google Apps Script dengan sistem otomatis pengelompokan tahunan
 * 
 * Features:
 * - Auto-create yearly folders in Google Drive (2025, 2026, dst)
 * - Auto-create yearly sheets in Spreadsheet (2025, 2026, dst)
 * - Smart detection: reuse existing folders/sheets if already exist
 * - Save 5 files per applicant: CV, Esai, MotLet, Transkrip, Pernyataan
 * 
 * Setup:
 * 1. Copy kode ini ke script.google.com
 * 2. Deploy > New deployment > Web app
 * 3. Execute as: Me
 * 4. Who has access: Anyone
 * 5. Copy deployment URL dan paste ke SCRIPT_URL di form.js
 */

// ==================== KONFIGURASI ====================
const CONFIG = {
  SPREADSHEET_ID: '1g6amTnSbARWoqXaeFty2iBhBeX6i1JCbd9fLe6RN1yc', // Master Spreadsheet
  PARENT_FOLDER_ID: '10oPAztO0ksB2BRFoME9weO4M9zD4EpOj'  // Master Folder di Google Drive
};

// ==================== MAIN FUNCTION ====================
/**
 * Handle POST request dari form pendaftaran
 * Auto-pilot: Detect tahun, create/reuse yearly folders & sheets
 */
function doPost(e) {
  try {
    // Parse request body
    const data = JSON.parse(e.postData.contents);
    
    Logger.log('=== START PROCESSING ===');
    Logger.log('Received data for: ' + data.nama + ' (NIM: ' + data.nim + ')');
    
    // Validasi data wajib
    if (!validateRequiredFields(data)) {
      Logger.log('❌ Validation failed: Missing required fields');
      return createResponse(false, 'Data tidak lengkap. Mohon isi semua field yang wajib.');
    }
    
    Logger.log('✅ Validation passed');
    
    // ==================== STEP 1: DETECT TAHUN ====================
    const currentYear = new Date().getFullYear().toString();
    Logger.log('📅 Current Year: ' + currentYear);
    
    // ==================== STEP 2: MANAJEMEN DRIVE (YEARLY FOLDER) ====================
    // Get parent folder
    const parentFolder = DriveApp.getFolderById(CONFIG.PARENT_FOLDER_ID);
    Logger.log('📁 Parent folder found: ' + parentFolder.getName());
    
    // Get or create yearly folder (e.g., "2025")
    const yearFolder = getOrCreateYearFolder(parentFolder, currentYear);
    Logger.log('✅ Year folder ready: ' + yearFolder.getName() + ' (' + yearFolder.getUrl() + ')');
    
    // Create personal folder inside year folder (e.g., "2025/JohnDoe_123456_Berkas")
    const personalFolder = createPersonalFolder(yearFolder, data.nama, data.nim);
    Logger.log('✅ Personal folder created: ' + personalFolder.getUrl());
    
    // Save 5 files to personal folder
    const fileUrls = saveFilesToPersonalFolder(data, personalFolder);
    Logger.log('✅ Files saved successfully');
    
    // ==================== STEP 3: MANAJEMEN SHEETS (YEARLY SHEET) ====================
    // Get or create yearly sheet (e.g., sheet "2025")
    const yearSheet = getOrCreateYearSheet(currentYear);
    Logger.log('✅ Year sheet ready: ' + yearSheet.getName());
    
    // Save data to yearly sheet
    saveToYearSheet(yearSheet, data, fileUrls, personalFolder.getUrl());
    Logger.log('✅ Data saved to sheet: ' + yearSheet.getName());
    
    Logger.log('=== PROCESS COMPLETED SUCCESSFULLY ===');
    
    // Return success response
    return createResponse(true, 'Pendaftaran berhasil! Data Anda telah tersimpan.', {
      timestamp: new Date().toISOString(),
      year: currentYear,
      files: fileUrls,
      folder: personalFolder.getUrl()
    });
    
  } catch (error) {
    Logger.log('❌ ERROR in doPost: ' + error.toString());
    Logger.log('Error stack: ' + error.stack);
    return createResponse(false, 'Terjadi kesalahan: ' + error.message);
  }
}

// ==================== VALIDATION ====================
/**
 * Validasi field yang wajib diisi
 */
function validateRequiredFields(data) {
  const required = [
    'nama', 'email', 'nim', 'prodi', 'angkatan', 'whatsapp', 'motivasi',
    'file_cv', 'file_esai', 'file_motlet', 'file_transkrip', 'file_pernyataan'
  ];
  
  for (let field of required) {
    if (!data[field] || data[field].toString().trim() === '') {
      Logger.log('Missing field: ' + field);
      return false;
    }
  }
  
  return true;
}

// ==================== YEARLY FOLDER MANAGEMENT ====================
/**
 * Get or create yearly folder in parent folder
 * @param {Folder} parentFolder - Parent folder object
 * @param {string} year - Year string (e.g., "2025")
 * @return {Folder} Yearly folder object
 */
function getOrCreateYearFolder(parentFolder, year) {
  try {
    Logger.log('Checking for year folder: ' + year);
    
    // Check if yearly folder already exists
    const existingFolders = parentFolder.getFoldersByName(year);
    
    if (existingFolders.hasNext()) {
      const yearFolder = existingFolders.next();
      Logger.log('✅ Year folder already exists: ' + yearFolder.getName());
      return yearFolder;
    } else {
      // Create new yearly folder
      Logger.log('Creating new year folder: ' + year);
      const newYearFolder = parentFolder.createFolder(year);
      Logger.log('✅ Year folder created: ' + newYearFolder.getName());
      return newYearFolder;
    }
    
  } catch (error) {
    Logger.log('❌ Error in getOrCreateYearFolder: ' + error.toString());
    throw new Error('Gagal membuat/mengakses folder tahun: ' + error.message);
  }
}

/**
 * Create personal folder inside year folder
 * Format: NAMA_NIM_Berkas
 * @param {Folder} yearFolder - Year folder object
 * @param {string} nama - Applicant name
 * @param {string} nim - Student ID
 * @return {Folder} Personal folder object
 */
function createPersonalFolder(yearFolder, nama, nim) {
  try {
    Logger.log('Creating personal folder inside: ' + yearFolder.getName());
    
    // Clean name for folder
    const cleanName = nama.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 50);
    const cleanNim = nim.replace(/[^0-9]/g, '');
    
    // Format: NAMA_NIM_Berkas
    const folderName = cleanName + '_' + cleanNim + '_Berkas';
    Logger.log('Folder name will be: ' + folderName);
    
    // Check if folder already exists (avoid duplicate)
    const existingFolders = yearFolder.getFoldersByName(folderName);
    
    if (existingFolders.hasNext()) {
      Logger.log('⚠️ Folder already exists, creating with timestamp');
      // Add timestamp to make unique
      const timestamp = Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyyyMMdd_HHmmss');
      const uniqueFolderName = folderName + '_' + timestamp;
      
      const newFolder = yearFolder.createFolder(uniqueFolderName);
      Logger.log('✅ Folder created (with timestamp): ' + newFolder.getName());
      Logger.log('📍 Folder URL: ' + newFolder.getUrl());
      
      return newFolder;
    } else {
      Logger.log('Creating new folder...');
      
      const newFolder = yearFolder.createFolder(folderName);
      Logger.log('✅ Folder created: ' + newFolder.getName());
      Logger.log('📍 Folder URL: ' + newFolder.getUrl());
      
      return newFolder;
    }
    
  } catch (error) {
    Logger.log('❌ Error creating personal folder: ' + error.toString());
    throw new Error('Gagal membuat folder personal: ' + error.message);
  }
}

// ==================== FILE HANDLING ====================
/**
 * Save 5 files (CV, Esai, MotLet, Transkrip, Pernyataan) to personal folder
 * @param {Object} data - Form data with Base64 files
 * @param {Folder} personalFolder - Personal folder object
 * @return {Object} Object with file URLs
 */
function saveFilesToPersonalFolder(data, personalFolder) {
  try {
    Logger.log('Saving files to folder: ' + personalFolder.getName());
    
    const timestamp = Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyyyMMdd_HHmmss');
    
    // Clean name for filename
    const cleanName = data.nama.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 50);
    const cleanNim = data.nim.replace(/[^0-9]/g, '');
    
    // Save CV
    Logger.log('Saving CV...');
    const cvFile = saveBase64FileToFolder(
      personalFolder,
      data.file_cv,
      cleanName + '_' + cleanNim + '_CV_' + timestamp + '.pdf'
    );
    Logger.log('✅ CV saved: ' + cvFile.getName());
    
    // Save Esai
    Logger.log('Saving Esai...');
    const esaiFile = saveBase64FileToFolder(
      personalFolder,
      data.file_esai,
      cleanName + '_' + cleanNim + '_Esai_' + timestamp + '.pdf'
    );
    Logger.log('✅ Esai saved: ' + esaiFile.getName());
    
    // Save Motivation Letter
    Logger.log('Saving Motivation Letter...');
    const motletFile = saveBase64FileToFolder(
      personalFolder,
      data.file_motlet,
      cleanName + '_' + cleanNim + '_MotLet_' + timestamp + '.pdf'
    );
    Logger.log('✅ MotLet saved: ' + motletFile.getName());
    
    // Save Transkrip Nilai
    Logger.log('Saving Transkrip Nilai...');
    const transkripFile = saveBase64FileToFolder(
      personalFolder,
      data.file_transkrip,
      cleanName + '_' + cleanNim + '_Transkrip_' + timestamp + '.pdf'
    );
    Logger.log('✅ Transkrip saved: ' + transkripFile.getName());
    
    // Save Surat Pernyataan
    Logger.log('Saving Surat Pernyataan...');
    const pernyataanFile = saveBase64FileToFolder(
      personalFolder,
      data.file_pernyataan,
      cleanName + '_' + cleanNim + '_Pernyataan_' + timestamp + '.pdf'
    );
    Logger.log('✅ Surat Pernyataan saved: ' + pernyataanFile.getName());
    
    // Set sharing permissions (Anyone with link can view)
    cvFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    esaiFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    motletFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    transkripFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    pernyataanFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    
    Logger.log('✅ All files shared successfully');
    
    return {
      cv: cvFile.getUrl(),
      esai: esaiFile.getUrl(),
      motlet: motletFile.getUrl(),
      transkrip: transkripFile.getUrl(),
      pernyataan: pernyataanFile.getUrl()
    };
    
  } catch (error) {
    Logger.log('❌ Error saving files: ' + error.toString());
    throw new Error('Gagal menyimpan file ke Drive: ' + error.message);
  }
}

/**
 * Decode Base64 and save as PDF file to specific folder
 * @param {Folder} folder - Destination folder
 * @param {string} base64Data - Base64 encoded file data
 * @param {string} filename - Filename for the PDF
 * @return {File} Created file object
 */
function saveBase64FileToFolder(folder, base64Data, filename) {
  try {
    // Decode Base64 string to bytes
    const bytes = Utilities.base64Decode(base64Data);
    
    // Create blob
    const blob = Utilities.newBlob(bytes, 'application/pdf', filename);
    
    // Save to specific folder
    const file = folder.createFile(blob);
    
    Logger.log('📄 File saved: ' + filename + ' (ID: ' + file.getId() + ')');
    
    return file;
    
  } catch (error) {
    Logger.log('❌ Error in saveBase64FileToFolder for ' + filename + ': ' + error.toString());
    throw new Error('Gagal decode/save file: ' + filename);
  }
}

// ==================== YEARLY SHEET MANAGEMENT ====================
/**
 * Get or create yearly sheet in master spreadsheet
 * @param {string} year - Year string (e.g., "2025")
 * @return {Sheet} Yearly sheet object
 */
function getOrCreateYearSheet(year) {
  try {
    Logger.log('Checking for year sheet: ' + year);
    
    const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
    let yearSheet = ss.getSheetByName(year);
    
    if (yearSheet) {
      Logger.log('✅ Year sheet already exists: ' + year);
      return yearSheet;
    } else {
      Logger.log('Creating new year sheet: ' + year);
      
      // Create new sheet with year name
      yearSheet = ss.insertSheet(year);
      
      // ==================== CREATE HEADER ROW ====================
      const headers = [
        'Timestamp',
        'Nama Lengkap',
        'Email Student',
        'NIM',
        'Program Studi',
        'Angkatan',
        'WhatsApp',
        'Motivasi',
        'Link CV',
        'Link Esai',
        'Link MotLet',
        'Link Transkrip',
        'Link Pernyataan',
        'Folder Pendaftar'
      ];
      
      // Write header row
      yearSheet.appendRow(headers);
      
      // Format header
      const headerRange = yearSheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground('#7c3aed'); // Purple
      headerRange.setFontColor('#ffffff'); // White text
      headerRange.setFontWeight('bold');
      headerRange.setHorizontalAlignment('center');
      headerRange.setVerticalAlignment('middle');
      
      // Set column widths for better readability
      yearSheet.setColumnWidth(1, 160); // Timestamp
      yearSheet.setColumnWidth(2, 200); // Nama
      yearSheet.setColumnWidth(3, 250); // Email
      yearSheet.setColumnWidth(4, 100); // NIM
      yearSheet.setColumnWidth(5, 250); // Prodi
      yearSheet.setColumnWidth(6, 80);  // Angkatan
      yearSheet.setColumnWidth(7, 120); // WhatsApp
      yearSheet.setColumnWidth(8, 300); // Motivasi
      yearSheet.setColumnWidth(9, 200); // Link CV
      yearSheet.setColumnWidth(10, 200); // Link Esai
      yearSheet.setColumnWidth(11, 200); // Link MotLet
      yearSheet.setColumnWidth(12, 200); // Link Transkrip
      yearSheet.setColumnWidth(13, 200); // Link Pernyataan
      yearSheet.setColumnWidth(14, 200); // Folder
      
      // Freeze header row
      yearSheet.setFrozenRows(1);
      
      Logger.log('✅ Year sheet created with header: ' + year);
      
      return yearSheet;
    }
    
  } catch (error) {
    Logger.log('❌ Error in getOrCreateYearSheet: ' + error.toString());
    throw new Error('Gagal membuat/mengakses sheet tahun: ' + error.message);
  }
}

/**
 * Save applicant data to yearly sheet
 * @param {Sheet} yearSheet - Target sheet for the year
 * @param {Object} data - Form data
 * @param {Object} fileUrls - Object with file URLs
 * @param {string} folderUrl - Personal folder URL
 */
function saveToYearSheet(yearSheet, data, fileUrls, folderUrl) {
  try {
    Logger.log('Saving data to sheet: ' + yearSheet.getName());
    
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
      fileUrls.transkrip,
      fileUrls.pernyataan,
      folderUrl
    ];
    
    // Append data
    yearSheet.appendRow(rowData);
    
    // Format last row
    const lastRow = yearSheet.getLastRow();
    const dataRange = yearSheet.getRange(lastRow, 1, 1, rowData.length);
    
    // Alternate row colors (zebra striping)
    if (lastRow % 2 === 0) {
      dataRange.setBackground('#f3f4f6'); // Light gray for even rows
    }
    
    // Make file links clickable and blue
    for (let i = 9; i <= 13; i++) {
      const cell = yearSheet.getRange(lastRow, i);
      cell.setFontColor('#2563eb'); // Blue
      cell.setFontUnderline(true);
    }
    
    // Make folder link clickable and green (highlight)
    const folderCell = yearSheet.getRange(lastRow, 14);
    folderCell.setFontColor('#059669'); // Green
    folderCell.setFontUnderline(true);
    folderCell.setFontWeight('bold');
    
    Logger.log('✅ Data saved to sheet. Row: ' + lastRow);
    
  } catch (error) {
    Logger.log('❌ Error saving to sheet: ' + error.toString());
    throw new Error('Gagal menyimpan ke spreadsheet: ' + error.message);
  }
}

// ==================== RESPONSE HELPER ====================
/**
 * Create JSON response
 * @param {boolean} success - Success status
 * @param {string} message - Response message
 * @param {Object} additionalData - Optional additional data
 * @return {TextOutput} JSON response
 */
function createResponse(success, message, additionalData = {}) {
  const response = {
    result: success ? 'success' : 'error',
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
 * Test function untuk doPost (Development only)
 * Uncomment untuk testing di Apps Script Editor
 */
/*
function testDoPost() {
  // Sample data untuk testing
  const testData = {
    nama: 'John Doe Test',
    email: 'john.123456@student.itera.ac.id',
    nim: '123456',
    prodi: 'Teknik Informatika',
    angkatan: '2023',
    whatsapp: '081234567890',
    motivasi: 'Ini adalah test motivasi untuk volunteer ITERA Mengajar.',
    file_cv: 'JVBERi0xLjQKJeLjz9MKMSAwIG9iago8PC9UeXBlL0NhdGFsb2cvUGFnZXMgMiAwIFI+PgplbmRvYmoKMiAwIG9iago8PC9UeXBlL1BhZ2VzL0tpZHNbMyAwIFJdL0NvdW50IDE+PgplbmRvYmoKMyAwIG9iago8PC9UeXBlL1BhZ2UvTWVkaWFCb3hbMCAwIDYxMiA3OTJdL1BhcmVudCAyIDAgUj4+CmVuZG9iagp4cmVmCjAgNAowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDAwMTUgMDAwMDAgbiAKMDAwMDAwMDA1OCAwMDAwMCBuIAowMDAwMDAwMTEzIDAwMDAwIG4gCnRyYWlsZXIKPDwvU2l6ZSA0L1Jvb3QgMSAwIFI+PgpzdGFydHhyZWYKMTkyCiUlRU9G',
    file_esai: 'JVBERi0xLjQKJeLjz9MKMSAwIG9iago8PC9UeXBlL0NhdGFsb2cvUGFnZXMgMiAwIFI+PgplbmRvYmoKMiAwIG9iago8PC9UeXBlL1BhZ2VzL0tpZHNbMyAwIFJdL0NvdW50IDE+PgplbmRvYmoKMyAwIG9iago8PC9UeXBlL1BhZ2UvTWVkaWFCb3hbMCAwIDYxMiA3OTJdL1BhcmVudCAyIDAgUj4+CmVuZG9iagp4cmVmCjAgNAowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDAwMTUgMDAwMDAgbiAKMDAwMDAwMDA1OCAwMDAwMCBuIAowMDAwMDAwMTEzIDAwMDAwIG4gCnRyYWlsZXIKPDwvU2l6ZSA0L1Jvb3QgMSAwIFI+PgpzdGFydHhyZWYKMTkyCiUlRU9G',
    file_motlet: 'JVBERi0xLjQKJeLjz9MKMSAwIG9iago8PC9UeXBlL0NhdGFsb2cvUGFnZXMgMiAwIFI+PgplbmRvYmoKMiAwIG9iago8PC9UeXBlL1BhZ2VzL0tpZHNbMyAwIFJdL0NvdW50IDE+PgplbmRvYmoKMyAwIG9iago8PC9UeXBlL1BhZ2UvTWVkaWFCb3hbMCAwIDYxMiA3OTJdL1BhcmVudCAyIDAgUj4+CmVuZG9iagp4cmVmCjAgNAowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDAwMTUgMDAwMDAgbiAKMDAwMDAwMDA1OCAwMDAwMCBuIAowMDAwMDAwMTEzIDAwMDAwIG4gCnRyYWlsZXIKPDwvU2l6ZSA0L1Jvb3QgMSAwIFI+PgpzdGFydHhyZWYKMTkyCiUlRU9G',
    file_transkrip: 'JVBERi0xLjQKJeLjz9MKMSAwIG9iago8PC9UeXBlL0NhdGFsb2cvUGFnZXMgMiAwIFI+PgplbmRvYmoKMiAwIG9iago8PC9UeXBlL1BhZ2VzL0tpZHNbMyAwIFJdL0NvdW50IDE+PgplbmRvYmoKMyAwIG9iago8PC9UeXBlL1BhZ2UvTWVkaWFCb3hbMCAwIDYxMiA3OTJdL1BhcmVudCAyIDAgUj4+CmVuZG9iagp4cmVmCjAgNAowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDAwMTUgMDAwMDAgbiAKMDAwMDAwMDA1OCAwMDAwMCBuIAowMDAwMDAwMTEzIDAwMDAwIG4gCnRyYWlsZXIKPDwvU2l6ZSA0L1Jvb3QgMSAwIFI+PgpzdGFydHhyZWYKMTkyCiUlRU9G',
    file_pernyataan: 'JVBERi0xLjQKJeLjz9MKMSAwIG9iago8PC9UeXBlL0NhdGFsb2cvUGFnZXMgMiAwIFI+PgplbmRvYmoKMiAwIG9iago8PC9UeXBlL1BhZ2VzL0tpZHNbMyAwIFJdL0NvdW50IDE+PgplbmRvYmoKMyAwIG9iago8PC9UeXBlL1BhZ2UvTWVkaWFCb3hbMCAwIDYxMiA3OTJdL1BhcmVudCAyIDAgUj4+CmVuZG9iagp4cmVmCjAgNAowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDAwMTUgMDAwMDAgbiAKMDAwMDAwMDA1OCAwMDAwMCBuIAowMDAwMDAwMTEzIDAwMDAwIG4gCnRyYWlsZXIKPDwvU2l6ZSA0L1Jvb3QgMSAwIFI+PgpzdGFydHhyZWYKMTkyCiUlRU9G'
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(mockEvent);
  Logger.log(result.getContent());
}
*/

/**
 * Test configuration access
 * Uncomment untuk verify IDs
 */
/*
function testConfiguration() {
  try {
    const parentFolder = DriveApp.getFolderById(CONFIG.PARENT_FOLDER_ID);
    Logger.log('✅ Parent Folder accessible: ' + parentFolder.getName());
    
    const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
    Logger.log('✅ Spreadsheet accessible: ' + ss.getName());
    
    Logger.log('✅ All configurations are valid!');
    
  } catch (error) {
    Logger.log('❌ Configuration error: ' + error.toString());
  }
}
*/
