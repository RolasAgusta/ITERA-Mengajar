// Form Pendaftaran Volunteer - Component-Based Architecture

// ==================== CONFIGURATION ====================
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbydKAK3BeOlPA658DkD8X3Seqzs4Ok8cbF9zSyimlxM8s1gqHnU8RkLRfm0z8gIrds/exec';

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

// ==================== REGISTRATION COMPONENT ====================
const RegistrationComponent = {
    // Component state
    state: {
        selectedProdi: '',
        prodiInput: null,
        prodiDropdown: null,
        form: null,
        submitBtn: null,
        progressContainer: null,
        progressBar: null,
        uploadNote: null
    },

    // Render HTML template
    render: function() {
        return `
            <!-- Form Section -->
            <div class="container mx-auto px-4 py-10 max-w-3xl">
                <div class="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-purple-600">
                    
                    <!-- Back Button -->
                    <a href="index.html" class="inline-flex items-center gap-2 text-gray-500 hover:text-purple-700 active:text-purple-800 active:scale-95 font-medium transition-all duration-200 ease-in-out mb-8">
                        <i class="fas fa-arrow-left"></i>
                        <span>Kembali ke Beranda</span>
                    </a>
                    
                    <!-- Form Header -->
                    <div class="mb-8">
                        <h2 class="text-2xl font-bold text-purple-800 mb-2">Formulir Pendaftaran</h2>
                        <p class="text-gray-600">Lengkapi semua data berikut dengan jujur dan benar.</p>
                        <p class="text-sm text-red-500 italic mt-1">* Wajib diisi</p>
                    </div>

                    <form id="registrationForm" class="space-y-6">
                        
                        <!-- Nama Lengkap -->
                        <div>
                            <label for="nama" class="block text-sm font-semibold text-gray-700 mb-2">
                                Nama Lengkap <span class="text-red-600">*</span>
                            </label>
                            <input 
                                type="text" 
                                id="nama" 
                                name="nama"
                                class="w-full px-4 py-3 border-2 border-purple-200 rounded-lg text-gray-900 hover:border-purple-600 focus:border-purple-600 focus:outline-none transition-colors duration-200 ease-in-out"
                                placeholder="Masukkan nama lengkap Anda"
                            >
                            <p id="nama-error" class="text-red-600 text-sm mt-1 hidden">Nama lengkap wajib diisi</p>
                        </div>

                        <!-- E-mail Student ITERA -->
                        <div>
                            <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">
                                E-mail Student ITERA <span class="text-red-600">*</span>
                            </label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email"
                                pattern=".+@student\\.itera\\.ac\\.id"
                                class="w-full px-4 py-3 border-2 border-purple-200 rounded-lg text-gray-900 bg-white hover:border-purple-600 focus:border-purple-600 focus:outline-none transition-colors duration-200 ease-in-out"
                                placeholder="nama.nim@student.itera.ac.id"
                            >
                            <p id="email-error" class="text-red-600 text-sm mt-1 hidden">Wajib menggunakan email @student.itera.ac.id</p>
                        </div>

                        <!-- NIM -->
                        <div>
                            <label for="nim" class="block text-sm font-semibold text-gray-700 mb-2">
                                NIM <span class="text-red-600">*</span>
                            </label>
                            <input 
                                type="text" 
                                inputmode="numeric"
                                pattern="[0-9]*"
                                id="nim" 
                                name="nim"
                                class="w-full px-4 py-3 border-2 border-purple-200 rounded-lg bg-white text-gray-900 hover:border-purple-600 focus:border-purple-600 focus:outline-none transition-colors duration-200 ease-in-out"
                                placeholder="123130018"
                            >
                            <p id="nim-error" class="text-red-600 text-sm mt-1 hidden">NIM wajib diisi</p>
                        </div>

                        <!-- Program Studi (Autocomplete) -->
                        <div class="relative">
                            <label for="prodi" class="block text-sm font-semibold text-gray-700 mb-2">
                                Program Studi <span class="text-red-600">*</span>
                            </label>
                            <div class="relative w-full">
                                <input 
                                    type="text" 
                                    id="prodi" 
                                    name="prodi"
                                    autocomplete="off"
                                    class="w-full px-4 py-3 pr-12 border-2 border-purple-200 rounded-lg text-gray-900 hover:border-purple-600 focus:border-purple-600 focus:outline-none transition-colors duration-200 ease-in-out"
                                    placeholder="Ketik untuk mencari program studi..."
                                >
                                <svg class="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                                </svg>
                                
                                <!-- Autocomplete Dropdown -->
                                <div id="prodi-dropdown" class="absolute w-full bg-white border border-gray-200 rounded-lg mt-1 hidden z-10 autocomplete-dropdown">
                                    <!-- Options will be populated by JavaScript -->
                                </div>
                            </div>
                            <p id="prodi-error" class="text-red-600 text-sm mt-1 hidden">Program studi wajib dipilih</p>
                        </div>

                        <!-- Angkatan -->
                        <div>
                            <label for="angkatan" class="block text-sm font-semibold text-gray-700 mb-2">
                                Angkatan <span class="text-red-600">*</span>
                            </label>
                            <input 
                                type="text" 
                                inputmode="numeric"
                                id="angkatan" 
                                name="angkatan"
                                maxlength="4"
                                class="w-full px-4 py-3 border-2 border-purple-200 rounded-lg text-gray-900 bg-white hover:border-purple-600 focus:border-purple-600 focus:outline-none transition-colors duration-200 ease-in-out"
                                placeholder="Contoh: 2023"
                            >
                            <p id="angkatan-error" class="text-red-600 text-sm mt-1 hidden">Angkatan wajib diisi</p>
                        </div>

                        <!-- Nomor WhatsApp -->
                        <div>
                            <label for="whatsapp" class="block text-sm font-semibold text-gray-700 mb-2">
                                Nomor WhatsApp <span class="text-red-600">*</span>
                            </label>
                            <input 
                                type="text" 
                                inputmode="numeric"
                                id="whatsapp" 
                                name="whatsapp"
                                class="w-full px-4 py-3 border-2 border-purple-200 rounded-lg text-gray-900 bg-white hover:border-purple-600 focus:border-purple-600 focus:outline-none transition-colors duration-200 ease-in-out"
                                placeholder="Nomor WhatsApp Aktif"
                            >
                            <p id="whatsapp-error" class="text-red-600 text-sm mt-1 hidden">Nomor WhatsApp wajib diisi</p>
                        </div>

                        <!-- Motivasi -->
                        <div>
                            <label for="motivasi" class="block text-sm font-semibold text-gray-700 mb-2">
                                Motivasi Mendaftar <span class="text-red-600">*</span>
                            </label>
                            <textarea 
                                id="motivasi" 
                                name="motivasi"
                                rows="5"
                                class="w-full px-4 py-3 border-2 border-purple-200 rounded-lg text-gray-900 hover:border-purple-600 focus:border-purple-600 focus:outline-none transition-colors duration-200 ease-in-out resize-none"
                                placeholder="Ceritakan motivasi Anda bergabung dengan ITERA Mengajar..."
                            ></textarea>
                            <p id="motivasi-error" class="text-red-600 text-sm mt-1 hidden">Motivasi wajib diisi</p>
                        </div>

                        <!-- File Uploads -->
                        <div class="space-y-6 pt-4">
                            <h3 class="text-lg font-semibold text-gray-800">Berkas Pendukung</h3>
                            
                            <!-- CV Upload -->
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    Curriculum Vitae (CV) <span class="text-red-600">*</span>
                                </label>
                                <div class="file-upload-area border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer" data-file-input="cv-file">
                                    <i class="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-2"></i>
                                    <p class="text-gray-600 mb-1">Klik untuk upload CV</p>
                                    <p class="text-sm text-gray-400">Format: PDF (Max 5MB)</p>
                                    <input type="file" id="cv-file" name="cv" accept=".pdf" class="hidden">
                                    <p id="cv-filename" class="text-sm text-green-600 font-medium mt-2 hidden truncate block max-w-xs mx-auto"></p>
                                </div>
                                <p id="cv-error" class="text-red-600 text-sm mt-1 hidden">CV wajib diupload (format PDF)</p>
                            </div>

                            <!-- Esai Upload -->
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    Esai <span class="text-red-600">*</span>
                                </label>
                                <div class="file-upload-area border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer" data-file-input="esai-file">
                                    <i class="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-2"></i>
                                    <p class="text-gray-600 mb-1">Klik untuk upload Esai</p>
                                    <p class="text-sm text-gray-400">Format: PDF (Max 5MB)</p>
                                    <input type="file" id="esai-file" name="esai" accept=".pdf" class="hidden">
                                    <p id="esai-filename" class="text-sm text-green-600 font-medium mt-2 hidden truncate block max-w-xs mx-auto"></p>
                                </div>
                                <p id="esai-error" class="text-red-600 text-sm mt-1 hidden">Esai wajib diupload (format PDF)</p>
                            </div>

                            <!-- Motivation Letter Upload -->
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    Motivation Letter <span class="text-red-600">*</span>
                                </label>
                                <div class="file-upload-area border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer" data-file-input="motlet-file">
                                    <i class="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-2"></i>
                                    <p class="text-gray-600 mb-1">Klik untuk upload Motivation Letter</p>
                                    <p class="text-sm text-gray-400">Format: PDF (Max 5MB)</p>
                                    <input type="file" id="motlet-file" name="motivationLetter" accept=".pdf" class="hidden">
                                    <p id="motlet-filename" class="text-sm text-green-600 font-medium mt-2 hidden truncate block max-w-xs mx-auto"></p>
                                </div>
                                <p id="motlet-error" class="text-red-600 text-sm mt-1 hidden">Motivation Letter wajib diupload (format PDF)</p>
                            </div>

                            <!-- Transkrip Nilai Upload -->
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    Transkrip Nilai <span class="text-red-600">*</span>
                                </label>
                                <div class="file-upload-area border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer" data-file-input="transkrip-file">
                                    <i class="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-2"></i>
                                    <p class="text-gray-600 mb-1">Klik untuk upload Transkrip Nilai</p>
                                    <p class="text-sm text-gray-400">Format: PDF (Max 5MB)</p>
                                    <input type="file" id="transkrip-file" name="transkrip" accept=".pdf" class="hidden">
                                    <p id="transkrip-filename" class="text-sm text-green-600 font-medium mt-2 hidden truncate block max-w-xs mx-auto"></p>
                                </div>
                                <p id="transkrip-error" class="text-red-600 text-sm mt-1 hidden">Transkrip Nilai wajib diupload (format PDF)</p>
                            </div>

                            <!-- Surat Pernyataan Upload -->
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    Surat Pernyataan <span class="text-red-600">*</span>
                                </label>
                                <div class="file-upload-area border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer" data-file-input="pernyataan-file">
                                    <i class="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-2"></i>
                                    <p class="text-gray-600 mb-1">Klik untuk upload Surat Pernyataan</p>
                                    <p class="text-sm text-gray-400">Format: PDF (Max 5MB)</p>
                                    <input type="file" id="pernyataan-file" name="pernyataan" accept=".pdf" class="hidden">
                                    <p id="pernyataan-filename" class="text-sm text-green-600 font-medium mt-2 hidden truncate block max-w-xs mx-auto"></p>
                                </div>
                                <p id="pernyataan-error" class="text-red-600 text-sm mt-1 hidden">Surat Pernyataan wajib diupload (format PDF)</p>
                            </div>
                        </div>

                        <!-- Submit Button -->
                        <div class="pt-6">
                            <button 
                                type="submit" 
                                id="submitBtn"
                                class="w-full font-semibold py-4 rounded-lg transition-all duration-200 ease-in-out focus:outline-none btn-disabled-custom"
                                disabled
                            >
                                Kirim Pendaftaran
                            </button>
                            
                            <!-- Progress Bar -->
                            <div id="progressContainer" class="hidden w-full bg-gray-200 rounded-full h-4 mt-4 overflow-hidden">
                                <div id="progressBar" class="progress-bar-animated bg-purple-600 h-4 rounded-full transition-all duration-300" style="width: 0%"></div>
                            </div>
                            
                            <!-- Warning Note -->
                            <p id="uploadNote" class="hidden text-sm text-red-500 text-center mt-2 italic">
                                <i class="fas fa-exclamation-triangle mr-1"></i>
                                Mohon JANGAN tutup atau refresh halaman ini. Sedang mengunggah berkas (estimasi 15-30 detik)...
                            </p>
                        </div>
                    </form>
                </div>
            </div>

            <!-- Success Modal -->
            <div id="successModal" class="hidden fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div class="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center animate-modal-appear">
                    
                    <!-- Animated Checkmark Icon -->
                    <div class="mb-6 flex justify-center">
                        <div class="relative">
                            <svg class="checkmark-circle" width="80" height="80" viewBox="0 0 52 52">
                                <circle class="checkmark-circle-bg" cx="26" cy="26" r="25" fill="none"/>
                                <path class="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                            </svg>
                        </div>
                    </div>

                    <!-- Success Text -->
                    <h2 class="text-2xl font-bold text-gray-800 mb-3">
                        Pendaftaran Berhasil!
                    </h2>
                    
                    <p class="text-gray-600 mb-2 leading-relaxed">
                        Berkas Anda telah diterima, mohon tunggu informasi lebih lanjut.
                    </p>
                    
                    <p class="text-purple-600 font-semibold text-lg mb-8">
                        Semangat Mengabdi, Membangun Negeri!
                    </p>

                    <!-- Action Button -->
                    <button 
                        id="modalCloseBtn"
                        class="w-full bg-purple-600 text-white font-semibold py-4 rounded-lg transform transition-all duration-200 ease-in-out hover:bg-purple-700 hover:shadow-lg active:scale-95 active:bg-purple-800 focus:outline-none cursor-pointer"
                    >
                        Kembali ke Beranda
                    </button>
                </div>
            </div>
        `;
    },

    // Initialize component
    init: function() {
        // Inject CSS animations first (before anything else)
        this.injectStyles();

        const container = document.getElementById('registration-container');
        if (!container) {
            console.error('❌ Container #registration-container not found!');
            return;
        }

        // Inject HTML
        container.innerHTML = this.render();

        // Cache DOM elements (including progress bar elements)
        this.state.prodiInput = document.getElementById('prodi');
        this.state.prodiDropdown = document.getElementById('prodi-dropdown');
        this.state.form = document.getElementById('registrationForm');
        this.state.submitBtn = document.getElementById('submitBtn');
        this.state.progressContainer = document.getElementById('progressContainer');
        this.state.progressBar = document.getElementById('progressBar');
        this.state.uploadNote = document.getElementById('uploadNote');

        // Debug: Verify progress elements are cached
        console.log('✅ Registration Component initialized');
        console.log('📋 Progress Elements Found:', {
            progressContainer: this.state.progressContainer,
            progressBar: this.state.progressBar,
            uploadNote: this.state.uploadNote
        });

        // Setup all event listeners
        this.setupAutocomplete();
        this.setupFileUploads();
        this.setupValidation();
        this.setupFormSubmission();
        this.setupNumericInputs();

        // Initial button state check (ensure gray box on page load)
        this.checkFormValidity();

        console.log(`📋 ${PRODI_LIST.length} program studi available`);
    },

    // ==================== AUTOCOMPLETE LOGIC ====================
    setupAutocomplete: function() {
        const self = this;

        // Show dropdown on focus
        this.state.prodiInput.addEventListener('focus', function() {
            self.renderProdiDropdown(PRODI_LIST);
        });

        // Filter on input
        this.state.prodiInput.addEventListener('input', function() {
            const query = this.value;
            const filtered = self.filterProdiList(query);
            self.renderProdiDropdown(filtered);
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!self.state.prodiInput.contains(e.target) && !self.state.prodiDropdown.contains(e.target)) {
                self.state.prodiDropdown.classList.add('hidden');
            }
        });
    },

    renderProdiDropdown: function(items) {
        const self = this;
        
        if (items.length === 0) {
            this.state.prodiDropdown.innerHTML = '<div class="px-4 py-3 text-gray-500 text-sm">Tidak ada hasil</div>';
            this.state.prodiDropdown.classList.remove('hidden');
            return;
        }

        const html = items.map(prodi => `
            <div class="autocomplete-item px-4 py-3 cursor-pointer border-b border-gray-100 last:border-0 flex items-start gap-3" 
                 data-prodi="${prodi}">
                <i class="fas fa-graduation-cap text-purple-600 flex-shrink-0 mt-1"></i>
                <span class="flex-1 break-words">${prodi}</span>
            </div>
        `).join('');

        this.state.prodiDropdown.innerHTML = html;
        this.state.prodiDropdown.classList.remove('hidden');

        // Add click listeners to dropdown items
        this.state.prodiDropdown.querySelectorAll('.autocomplete-item').forEach(item => {
            item.addEventListener('click', function() {
                self.selectProdi(this.dataset.prodi);
            });
        });
    },

    selectProdi: function(prodi) {
        this.state.prodiInput.value = prodi;
        this.state.selectedProdi = prodi;
        this.state.prodiDropdown.classList.add('hidden');
        this.validateField(this.state.prodiInput, 'prodi-error');
        this.checkFormValidity();
    },

    filterProdiList: function(query) {
        return PRODI_LIST.filter(prodi => 
            prodi.toLowerCase().includes(query.toLowerCase())
        );
    },

    // ==================== HELPER FUNCTIONS ====================
    /**
     * Inject CSS animations directly into <head>
     * Ensures animated stripes are available regardless of external CSS loading
     */
    injectStyles: function() {
        // Check if styles already injected
        if (document.getElementById('progress-bar-styles')) {
            console.log('⚠️ Progress bar styles already injected');
            return;
        }

        const styleElement = document.createElement('style');
        styleElement.id = 'progress-bar-styles';
        styleElement.textContent = `
            /* Progress Bar Animated Stripes - Injected via JS */
            @keyframes moveStripes {
                0% { 
                    background-position: 0 0; 
                }
                100% { 
                    background-position: 1rem 0; 
                }
            }

            .progress-bar-striped {
                background-image: linear-gradient(
                    45deg,
                    rgba(255, 255, 255, 0.2) 25%,
                    transparent 25%,
                    transparent 50%,
                    rgba(255, 255, 255, 0.2) 50%,
                    rgba(255, 255, 255, 0.2) 75%,
                    transparent 75%,
                    transparent
                );
                background-size: 1rem 1rem;
            }

            .progress-bar-animated {
                animation: moveStripes 1s linear infinite;
            }

            .bg-purple-600 {
                background-color: #7c3aed !important;
            }

            /* Custom Disabled Button Style - Guaranteed Visibility */
            .btn-disabled-custom {
                background-color: #d1d5db !important; /* Gray 300 */
                color: #6b7280 !important; /* Gray 500 */
                cursor: not-allowed !important;
                transform: none !important;
                box-shadow: none !important;
            }
            
            .btn-disabled-custom:hover {
                background-color: #9ca3af !important; /* Gray 400 - Hover Effect */
            }
        `;

        document.head.appendChild(styleElement);
        console.log('✅ Progress bar animated styles injected into <head>');
    },

    /**
     * Smart filename truncation untuk nama file panjang
     * Memotong di tengah dan menjaga ekstensi file tetap terlihat
     */
    formatFilename: function(filename) {
        const MAX_LENGTH = 25;
        
        if (filename.length <= MAX_LENGTH) {
            return filename;
        }

        // Ambil 15 karakter pertama + "..." + 7 karakter terakhir
        const start = filename.substring(0, 15);
        const end = filename.substring(filename.length - 7);
        
        return `${start}...${end}`;
    },

    /**
     * Centralized loading state management
     * Mengatur semua UI elements terkait loading (button, progress bar, note)
     */
    setLoadingState: function(isLoading) {
        if (isLoading) {
            // Disable button dengan loading text
            this.state.submitBtn.disabled = true;
            this.state.submitBtn.innerHTML = 'Mohon tunggu<span class="loading-dots"></span>';

            // NUCLEAR APPROACH: Force visibility dengan hardcoded inline styles
            console.log('🔥 NUCLEAR: Forcing progress bar with inline styles...');
            
            // Force Container Visibility (bypass Tailwind)
            this.state.progressContainer.classList.remove('hidden');
            this.state.progressContainer.style.display = 'block';
            this.state.progressContainer.style.width = '100%';
            this.state.progressContainer.style.height = '20px';
            this.state.progressContainer.style.backgroundColor = '#e5e7eb'; // gray-200
            this.state.progressContainer.style.borderRadius = '9999px'; // rounded-full
            this.state.progressContainer.style.marginTop = '16px';
            this.state.progressContainer.style.overflow = 'hidden';
            
            // Force Progress Bar Visibility
            this.state.progressBar.style.display = 'block';
            this.state.progressBar.style.height = '100%';
            this.state.progressBar.style.width = '0%';
            this.state.progressBar.style.borderRadius = '9999px';
            this.state.progressBar.style.transition = 'width 0.3s ease';
            
            // Add animated stripes classes (DO NOT set backgroundColor inline to allow gradient)
            this.state.progressBar.classList.add('bg-purple-600');
            this.state.progressBar.classList.add('progress-bar-striped');
            this.state.progressBar.classList.add('progress-bar-animated');
            
            console.log('🎬 Animated stripes classes applied:', {
                hasBgPurple: this.state.progressBar.classList.contains('bg-purple-600'),
                hasStriped: this.state.progressBar.classList.contains('progress-bar-striped'),
                hasAnimated: this.state.progressBar.classList.contains('progress-bar-animated')
            });
            
            // Force Upload Note Visibility
            this.state.uploadNote.classList.remove('hidden');
            this.state.uploadNote.style.display = 'block';
            this.state.uploadNote.style.color = '#ef4444'; // red-500
            this.state.uploadNote.style.fontSize = '14px';
            this.state.uploadNote.style.textAlign = 'center';
            this.state.uploadNote.style.marginTop = '8px';
            this.state.uploadNote.style.fontStyle = 'italic';

            console.log('✅ Loading state: ACTIVE (Hardcoded styles applied)');
        } else {
            // Hide progress bar dan note
            this.state.progressContainer.classList.add('hidden');
            this.state.progressContainer.style.display = 'none';
            
            this.state.uploadNote.classList.add('hidden');
            this.state.uploadNote.style.display = 'none';

            // Reset button text (tanpa enable, biarkan disabled untuk reset form)
            this.state.submitBtn.innerHTML = 'Kirim Pendaftaran';

            console.log('✅ Loading state: INACTIVE');
        }
    },

    // ==================== FILE UPLOAD LOGIC ====================
    setupFileUploads: function() {
        const self = this;
        const fileInputs = [
            { input: 'cv-file', filename: 'cv-filename', error: 'cv-error' },
            { input: 'esai-file', filename: 'esai-filename', error: 'esai-error' },
            { input: 'motlet-file', filename: 'motlet-filename', error: 'motlet-error' },
            { input: 'transkrip-file', filename: 'transkrip-filename', error: 'transkrip-error' },
            { input: 'pernyataan-file', filename: 'pernyataan-filename', error: 'pernyataan-error' }
        ];

        fileInputs.forEach(({input, filename, error}) => {
            const fileInput = document.getElementById(input);
            const filenameEl = document.getElementById(filename);
            const errorEl = document.getElementById(error);
            const uploadArea = document.querySelector(`[data-file-input="${input}"]`);

            // Click on area to trigger file input
            uploadArea.addEventListener('click', () => fileInput.click());

            // Handle file selection
            fileInput.addEventListener('change', function(e) {
                const file = e.target.files[0];
                
                if (!file) return;

                const validation = self.validateFile(file);

                if (!validation.valid) {
                    errorEl.textContent = validation.message;
                    errorEl.classList.remove('hidden');
                    fileInput.value = '';
                    uploadArea.classList.remove('has-file');
                    filenameEl.classList.add('hidden');
                    self.checkFormValidity();
                    return;
                }

                // Success
                filenameEl.innerHTML = `<i class="fas fa-check-circle mr-1"></i> ${self.formatFilename(file.name)}`;
                filenameEl.classList.remove('hidden');
                errorEl.classList.add('hidden');
                uploadArea.classList.add('has-file');
                self.checkFormValidity();
            });
        });
    },

    validateFile: function(file) {
        if (file.type !== ALLOWED_FILE_TYPE) {
            return { valid: false, message: 'Format file harus PDF' };
        }

        if (file.size > MAX_FILE_SIZE) {
            return { valid: false, message: 'Ukuran file maksimal 5MB' };
        }

        return { valid: true };
    },

    // ==================== VALIDATION LOGIC ====================
    setupValidation: function() {
        const self = this;

        // Blur validation for text inputs
        ['nama', 'email', 'nim', 'motivasi'].forEach(id => {
            const field = document.getElementById(id);
            field.addEventListener('blur', () => {
                self.validateField(field, `${id}-error`);
                self.checkFormValidity();
            });
            field.addEventListener('input', () => self.checkFormValidity());
        });

        // Validation for angkatan and whatsapp
        ['angkatan', 'whatsapp'].forEach(id => {
            const field = document.getElementById(id);
            field.addEventListener('blur', () => {
                self.validateField(field, `${id}-error`);
                self.checkFormValidity();
            });
            field.addEventListener('input', () => self.checkFormValidity());
        });
    },

    validateField: function(field, errorId) {
        const errorEl = document.getElementById(errorId);
        const isValid = field.value.trim() !== '';

        if (!isValid) {
            field.classList.remove('border-purple-200');
            field.classList.add('border-red-500', 'ring-2', 'ring-red-200');
            errorEl.classList.remove('hidden');
        } else {
            field.classList.remove('border-red-500', 'ring-2', 'ring-red-200');
            field.classList.add('border-purple-200');
            errorEl.classList.add('hidden');
        }

        return isValid;
    },

    checkFormValidity: function() {
        const nama = document.getElementById('nama').value.trim();
        const email = document.getElementById('email').value.trim();
        const nim = document.getElementById('nim').value.trim();
        const prodi = document.getElementById('prodi').value.trim();
        const angkatan = document.getElementById('angkatan').value.trim();
        const whatsapp = document.getElementById('whatsapp').value.trim();
        const motivasi = document.getElementById('motivasi').value.trim();
        const cvFile = document.getElementById('cv-file').files[0];
        const esaiFile = document.getElementById('esai-file').files[0];
        const motletFile = document.getElementById('motlet-file').files[0];
        const transkripFile = document.getElementById('transkrip-file').files[0];
        const pernyataanFile = document.getElementById('pernyataan-file').files[0];

        // Logic Validasi
        const isValid = nama && email && nim && prodi && angkatan && whatsapp && motivasi && 
                        cvFile && esaiFile && motletFile && transkripFile && pernyataanFile;

        // Set Property Disabled (Logic HTML)
        this.state.submitBtn.disabled = !isValid;

        // Set Visual Style (Logic CSS) - HARDCODED with injected custom class
        if (isValid) {
            // STATE: SIAP KIRIM (Ungu, Kursor Tangan, Efek Tekan)
            this.state.submitBtn.className = "w-full bg-purple-600 text-white font-semibold py-4 rounded-lg cursor-pointer hover:bg-purple-700 hover:shadow-lg active:scale-95 active:bg-purple-800 transition-all duration-200 ease-in-out focus:outline-none transform";
            console.log('✅ Button Visual: PURPLE (Active)');
        } else {
            // STATE: BELUM LENGKAP (Custom injected class - guaranteed visible)
            this.state.submitBtn.className = "w-full font-semibold py-4 rounded-lg transition-all duration-200 ease-in-out focus:outline-none btn-disabled-custom";
            console.log('⛔ Button Visual: CUSTOM GRAY BOX (Disabled - Injected CSS)');
        }
    },

    validateAllFields: function() {
        let isValid = true;
        
        isValid &= this.validateField(document.getElementById('nama'), 'nama-error');
        isValid &= this.validateField(document.getElementById('email'), 'email-error');
        isValid &= this.validateField(document.getElementById('nim'), 'nim-error');
        isValid &= this.validateField(document.getElementById('prodi'), 'prodi-error');
        isValid &= this.validateField(document.getElementById('angkatan'), 'angkatan-error');
        isValid &= this.validateField(document.getElementById('whatsapp'), 'whatsapp-error');
        isValid &= this.validateField(document.getElementById('motivasi'), 'motivasi-error');

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
        if (!document.getElementById('transkrip-file').files[0]) {
            document.getElementById('transkrip-error').classList.remove('hidden');
            isValid = false;
        }
        if (!document.getElementById('pernyataan-file').files[0]) {
            document.getElementById('pernyataan-error').classList.remove('hidden');
            isValid = false;
        }

        return isValid;
    },

    // ==================== NUMERIC INPUT FILTERS ====================
    setupNumericInputs: function() {
        // Filter only numbers for NIM, Angkatan, WhatsApp
        ['nim', 'angkatan', 'whatsapp'].forEach(id => {
            const field = document.getElementById(id);
            field.addEventListener('input', function() {
                this.value = this.value.replace(/[^0-9]/g, '');
            });
        });
    },

    // ==================== FORM SUBMISSION ====================
    setupFormSubmission: function() {
        const self = this;

        this.state.form.addEventListener('submit', async function(e) {
            e.preventDefault();

            console.log('🚀 Starting submission...');

            // Final validation
            if (!self.validateAllFields()) {
                alert('⚠️ Mohon lengkapi semua field yang wajib diisi!');
                return;
            }

            // Verify progress elements exist
            if (!self.state.progressContainer || !self.state.progressBar || !self.state.uploadNote) {
                console.error('❌ Progress elements not found in state!');
                alert('Error: UI elements tidak ditemukan. Mohon refresh halaman.');
                return;
            }

            console.log('✅ Progress elements verified');

            // Activate loading state (centralized)
            self.setLoadingState(true);

            // Debug: Verify elements are visible
            console.log('📊 Progress Container Computed Styles:', {
                display: window.getComputedStyle(self.state.progressContainer).display,
                height: window.getComputedStyle(self.state.progressContainer).height,
                backgroundColor: window.getComputedStyle(self.state.progressContainer).backgroundColor,
                visibility: window.getComputedStyle(self.state.progressContainer).visibility
            });
            console.log('📊 Progress Bar Computed Styles:', {
                display: window.getComputedStyle(self.state.progressBar).display,
                height: window.getComputedStyle(self.state.progressBar).height,
                width: window.getComputedStyle(self.state.progressBar).width,
                backgroundColor: window.getComputedStyle(self.state.progressBar).backgroundColor
            });

            // Simulate progress (increment to max 90%)
            let progress = 0;
            const progressInterval = setInterval(() => {
                if (progress < 90) {
                    progress += 5;
                    self.state.progressBar.style.width = progress + '%';
                    console.log(`📊 Progress: ${progress}%`);
                }
            }, 500);

            try {
                // Get form data
                const formData = new FormData(self.state.form);
                
                // Convert files to Base64
                const cvFile = formData.get('cv');
                const esaiFile = formData.get('esai');
                const motletFile = formData.get('motivationLetter');
                const transkripFile = formData.get('transkrip');
                const pernyataanFile = formData.get('pernyataan');

                console.log('📄 Converting files to Base64...');

                // Convert files in parallel
                const [cvBase64, esaiBase64, motletBase64, transkripBase64, pernyataanBase64] = await Promise.all([
                    self.fileToBase64(cvFile),
                    self.fileToBase64(esaiFile),
                    self.fileToBase64(motletFile),
                    self.fileToBase64(transkripFile),
                    self.fileToBase64(pernyataanFile)
                ]);

                console.log('✅ Files converted successfully');

                // Prepare payload
                const payload = {
                    nama: formData.get('nama'),
                    email: formData.get('email'),
                    nim: formData.get('nim'),
                    prodi: formData.get('prodi'),
                    angkatan: formData.get('angkatan'),
                    whatsapp: formData.get('whatsapp'),
                    motivasi: formData.get('motivasi'),
                    file_cv: cvBase64,
                    file_esai: esaiBase64,
                    file_motlet: motletBase64,
                    file_transkrip: transkripBase64,
                    file_pernyataan: pernyataanBase64
                };

                console.log('📤 Sending to Google Apps Script...');

                // Send to Google Apps Script
                const response = await fetch(SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors', // Required for Google Apps Script
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload)
                });

                console.log('✅ Data sent successfully');

                // Stop progress simulation
                clearInterval(progressInterval);

                // Complete progress to 100%
                self.state.progressBar.style.width = '100%';
                console.log('📊 Progress: 100% (Complete)');

                // Wait a moment before showing success
                await new Promise(resolve => setTimeout(resolve, 500));

                // Deactivate loading state (centralized)
                self.setLoadingState(false);

                console.log('✅ Submission complete, showing success modal');

                // Show success modal
                self.showSuccessModal();

                // Reset form
                self.state.form.reset();
                
                // Reset file upload UI
                document.querySelectorAll('.file-upload-area').forEach(area => {
                    area.classList.remove('has-file');
                });
                document.querySelectorAll('[id$="-filename"]').forEach(el => {
                    el.classList.add('hidden');
                });

                // Reset submit button state
                self.state.submitBtn.disabled = true;
                
            } catch (error) {
                // Stop progress simulation
                clearInterval(progressInterval);

                // Deactivate loading state (centralized)
                self.setLoadingState(false);

                console.error('❌ Submission error:', error);
                alert('❌ Gagal mengirim data!\n\n' +
                      'Error: ' + error.message + '\n\n' +
                      'Mohon coba lagi atau hubungi admin jika masalah berlanjut.');
                
                // Re-enable submit button
                self.state.submitBtn.disabled = false;
            }
        });
    },

    // ==================== FILE TO BASE64 ====================
    /**
     * Convert file to clean Base64 string (without data URI prefix)
     */
    fileToBase64: function(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                // Get base64 string and remove prefix (data:application/pdf;base64,)
                const base64 = e.target.result.split(',')[1];
                resolve(base64);
            };
            
            reader.onerror = function(error) {
                reject(error);
            };
            
            reader.readAsDataURL(file);
        });
    },

    // ==================== SUCCESS MODAL ====================
    /**
     * Show custom success modal
     */
    showSuccessModal: function() {
        const modal = document.getElementById('successModal');
        if (modal) {
            modal.classList.remove('hidden');
            
            // Setup close button handler
            const closeBtn = document.getElementById('modalCloseBtn');
            if (closeBtn) {
                closeBtn.onclick = function() {
                    window.location.href = 'index.html';
                };
            }
            
            // Close on overlay click
            modal.onclick = function(e) {
                if (e.target === modal) {
                    window.location.href = 'index.html';
                }
            };
        }
    }
};

// ==================== INITIALIZATION ====================
// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => RegistrationComponent.init());
} else {
    RegistrationComponent.init();
}
