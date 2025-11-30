// Form Pendaftaran Volunteer - JavaScript Logic

// ==================== CONSTANTS ====================
const PRODI_LIST = [
    "Arsitektur",
    "Arsitektur Lanskap",
    "Biologi",
    "Desain Komunikasi Visual",
    "Farmasi",
    "Fisika",
    "Kimia",
    "Matematika",
    "Perencanaan Wilayah dan Kota",
    "Rekayasa Instrumentasi dan Automasi",
    "Rekayasa Kehutanan",
    "Rekayasa Kosmetik",
    "Rekayasa Minyak dan Gas",
    "Rekayasa Tata Kelola Air Terpadu",
    "Sains Aktuaria",
    "Sains Atmosfer dan Keplanetan",
    "Sains Data",
    "Sains Lingkungan Kelautan",
    "Teknik Biomedis",
    "Teknik Biosistem",
    "Teknik Elektro",
    "Teknik Fisika",
    "Teknik Geofisika",
    "Teknik Geologi",
    "Teknik Geomatika",
    "Teknik Industri",
    "Teknik Informatika",
    "Teknik Kelautan",
    "Teknik Kimia",
    "Teknik Lingkungan",
    "Teknik Material",
    "Teknik Mesin",
    "Teknik Perkeretaapian",
    "Teknik Pertambangan",
    "Teknik Sipil",
    "Teknik Sistem Energi",
    "Teknik Telekomunikasi",
    "Teknologi Industri Pertanian",
    "Teknologi Pangan"
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPE = 'application/pdf';

// ==================== DOM ELEMENTS ====================
const prodiInput = document.getElementById('prodi');
const prodiDropdown = document.getElementById('prodi-dropdown');
const form = document.getElementById('registrationForm');
const submitBtn = document.getElementById('submitBtn');

// ==================== STATE ====================
let selectedProdi = '';

// ==================== AUTOCOMPLETE FUNCTIONS ====================

/**
 * Render autocomplete dropdown with filtered items
 */
function renderProdiDropdown(items) {
    if (items.length === 0) {
        prodiDropdown.innerHTML = '<div class="px-4 py-3 text-gray-500 text-sm">Tidak ada hasil</div>';
        prodiDropdown.classList.remove('hidden');
        return;
    }

    const html = items.map(prodi => `
        <div class="autocomplete-item px-4 py-3 cursor-pointer border-b border-gray-100 last:border-0 flex items-start gap-3" 
             onclick="selectProdi('${prodi}')">
            <i class="fas fa-graduation-cap text-purple-600 flex-shrink-0 mt-1"></i>
            <span class="flex-1 break-words">${prodi}</span>
        </div>
    `).join('');

    prodiDropdown.innerHTML = html;
    prodiDropdown.classList.remove('hidden');
}

/**
 * Select a program studi from dropdown
 */
function selectProdi(prodi) {
    prodiInput.value = prodi;
    selectedProdi = prodi;
    prodiDropdown.classList.add('hidden');
    validateField(prodiInput, 'prodi-error');
    checkFormValidity();
}

/**
 * Filter prodi list based on search query
 */
function filterProdiList(query) {
    const filtered = PRODI_LIST.filter(prodi => 
        prodi.toLowerCase().includes(query.toLowerCase())
    );
    return filtered;
}

// ==================== EVENT LISTENERS - AUTOCOMPLETE ====================

// Show dropdown on focus
prodiInput.addEventListener('focus', function() {
    renderProdiDropdown(PRODI_LIST);
});

// Filter on input
prodiInput.addEventListener('input', function() {
    const query = this.value;
    const filtered = filterProdiList(query);
    renderProdiDropdown(filtered);
});

// Close dropdown when clicking outside
document.addEventListener('click', function(e) {
    if (!prodiInput.contains(e.target) && !prodiDropdown.contains(e.target)) {
        prodiDropdown.classList.add('hidden');
    }
});

// ==================== FILE UPLOAD FUNCTIONS ====================

/**
 * File input configuration
 */
const fileInputs = [
    { input: 'cv-file', filename: 'cv-filename', error: 'cv-error', area: 0 },
    { input: 'esai-file', filename: 'esai-filename', error: 'esai-error', area: 1 },
    { input: 'motlet-file', filename: 'motlet-filename', error: 'motlet-error', area: 2 }
];

/**
 * Validate uploaded file
 */
function validateFile(file, errorEl) {
    // Validate PDF format
    if (file.type !== ALLOWED_FILE_TYPE) {
        return { valid: false, message: 'Format file harus PDF' };
    }

    // Validate size (5MB)
    if (file.size > MAX_FILE_SIZE) {
        return { valid: false, message: 'Ukuran file maksimal 5MB' };
    }

    return { valid: true };
}

/**
 * Handle file upload
 */
function handleFileUpload(fileInput, filenameEl, errorEl, uploadArea) {
    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        
        if (!file) return;

        const validation = validateFile(file, errorEl);

        if (!validation.valid) {
            errorEl.textContent = validation.message;
            errorEl.classList.remove('hidden');
            fileInput.value = '';
            uploadArea.classList.remove('has-file');
            filenameEl.classList.add('hidden');
            checkFormValidity();
            return;
        }

        // Success
        filenameEl.innerHTML = `<i class="fas fa-check-circle mr-1"></i> ${file.name}`;
        filenameEl.classList.remove('hidden');
        errorEl.classList.add('hidden');
        uploadArea.classList.add('has-file');
        checkFormValidity();
    });
}

// Initialize file upload handlers
fileInputs.forEach(({input, filename, error, area}) => {
    const fileInput = document.getElementById(input);
    const filenameEl = document.getElementById(filename);
    const errorEl = document.getElementById(error);
    const uploadArea = document.querySelectorAll('.file-upload-area')[area];

    handleFileUpload(fileInput, filenameEl, errorEl, uploadArea);
});

// ==================== VALIDATION FUNCTIONS ====================

/**
 * Validate individual field
 */
function validateField(field, errorId) {
    const errorEl = document.getElementById(errorId);
    const isValid = field.value.trim() !== '';

    if (!isValid) {
        field.classList.remove('border-gray-300');
        field.classList.add('border-red-500', 'ring-2', 'ring-red-200');
        errorEl.classList.remove('hidden');
    } else {
        field.classList.remove('border-red-500', 'ring-2', 'ring-red-200');
        field.classList.add('border-gray-300');
        errorEl.classList.add('hidden');
    }

    return isValid;
}

/**
 * Check if all form fields are valid
 */
function checkFormValidity() {
    const nama = document.getElementById('nama').value.trim();
    const nim = document.getElementById('nim').value.trim();
    const prodi = document.getElementById('prodi').value.trim();
    const angkatan = document.getElementById('angkatan').value;
    const motivasi = document.getElementById('motivasi').value.trim();
    const cvFile = document.getElementById('cv-file').files[0];
    const esaiFile = document.getElementById('esai-file').files[0];
    const motletFile = document.getElementById('motlet-file').files[0];

    const isValid = nama && nim && prodi && angkatan && motivasi && 
                    cvFile && esaiFile && motletFile;

    submitBtn.disabled = !isValid;
}

/**
 * Validate all fields before submission
 */
function validateAllFields() {
    let isValid = true;
    
    isValid &= validateField(document.getElementById('nama'), 'nama-error');
    isValid &= validateField(document.getElementById('nim'), 'nim-error');
    isValid &= validateField(document.getElementById('prodi'), 'prodi-error');
    isValid &= validateField(document.getElementById('angkatan'), 'angkatan-error');
    isValid &= validateField(document.getElementById('motivasi'), 'motivasi-error');

    // Validate files
    if (!document.getElementById('cv-file').files[0]) {
        document.getElementById('cv-error').classList.remove('hidden');
        isValid = false;
    }
    if (!document.getElementById('esai-file').files[0]) {
        document.getElementById('esai-error').classList.remove('hidden');
        isValid = false;
    }
    if (!document.getElementById('motlet-file').files[0]) {
        document.getElementById('motlet-error').classList.remove('hidden');
        isValid = false;
    }

    return isValid;
}

// ==================== EVENT LISTENERS - VALIDATION ====================

// Add blur validation for text inputs
['nama', 'nim', 'motivasi'].forEach(id => {
    const field = document.getElementById(id);
    field.addEventListener('blur', () => {
        validateField(field, `${id}-error`);
        checkFormValidity();
    });
    field.addEventListener('input', checkFormValidity);
});

// Validate angkatan select
document.getElementById('angkatan').addEventListener('change', function() {
    validateField(this, 'angkatan-error');
    checkFormValidity();
});

// ==================== FORM SUBMISSION ====================

/**
 * Handle form submission
 */
form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Final validation
    if (!validateAllFields()) {
        alert('⚠️ Mohon lengkapi semua field yang wajib diisi!');
        return;
    }

    // Get form data
    const formData = new FormData(form);
    const data = {
        nama: formData.get('nama'),
        nim: formData.get('nim'),
        prodi: formData.get('prodi'),
        angkatan: formData.get('angkatan'),
        motivasi: formData.get('motivasi'),
        cv: formData.get('cv').name,
        esai: formData.get('esai').name,
        motivationLetter: formData.get('motivationLetter').name
    };

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.classList.add('btn-loading');
    submitBtn.textContent = 'Mengirim...';

    // Simulate API call (replace with actual API endpoint)
    setTimeout(() => {
        // Success message
        alert('✅ Pendaftaran berhasil dikirim!\n\nData Anda:\n' +
              `Nama: ${data.nama}\n` +
              `NIM: ${data.nim}\n` +
              `Program Studi: ${data.prodi}\n` +
              `Angkatan: ${data.angkatan}\n\n` +
              'Terima kasih telah mendaftar sebagai volunteer ITERA Mengajar. ' +
              'Tim kami akan segera menghubungi Anda.');

        // Remove loading state
        submitBtn.classList.remove('btn-loading');
        submitBtn.textContent = 'Kirim Pendaftaran';

        // Reset form (optional)
        // form.reset();
        // document.querySelectorAll('.file-upload-area').forEach(area => {
        //     area.classList.remove('has-file');
        // });
        // document.querySelectorAll('[id$="-filename"]').forEach(el => {
        //     el.classList.add('hidden');
        // });
    }, 1500);
});

// ==================== INITIALIZATION ====================

console.log('✅ Form Pendaftaran initialized');
console.log(`📋 ${PRODI_LIST.length} program studi available`);
