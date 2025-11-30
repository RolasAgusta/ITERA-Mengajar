// Programs Component
const ProgramsComponent = {
    mainPrograms: [
        {
            title: 'Mengajar Anak-anak',
            description: 'Meningkatkan semangat belajar siswa/i di desa binaan melalui metode pengajaran yang kreatif, interaktif, dan menyenangkan.',
            image: 'assets/img/MengajarAnak.JPG'
        },
        {
            title: 'CIE (Caring In Education)',
            description: 'Gerakan kepedulian nyata berupa penyaluran donasi alat tulis demi kenyamanan pendidikan.',
            image: 'assets/img/CIE.JPG'
        },
        {
            title: 'Sharing Ilmu Ke Masyarakat',
            description: 'Berbagi wawasan aplikatif dan keterampilan praktis kepada masyarakat umum.',
            image: ''
        },
        {
            title: 'Pengabdian Desa',
            description: 'Terjun langsung membersamai warga desa dalam memecahkan masalah sosial dan mengembangkan potensi desa secara berkelanjutan.',
            image: ''
        },
    ],
    
    collabPrograms: [
        {
            title: 'Ngamat - OAIL ITERA',
            description: 'Kolaborasi edukasi astronomi untuk mengenalkan keindahan semesta dan benda langit kepada anak-anak melalui observasi langsung.',
            image: ''
        },
        {
            title: 'Eco-Print - Hibahin',
            description: 'Workshop seni kriya ramah lingkungan yang memanfaatkan bahan alami dedaunan untuk menciptakan karya tekstil bernilai seni.',
            image: 'assets/img/IMxHibahin.JPG'
        },
        {
            title: 'Sekolah Konservasi Laut - Unit Selam ITERA',
            description: 'Edukasi pelestarian ekosistem pesisir dan laut untuk menanamkan rasa cinta bahari kepada generasi muda sejak dini.',
            image: 'assets/img/IMxUSI.JPG'
        },
    ],
    
    renderCard: function(program) {
        return `
            <div class="swiper-slide h-auto">
                <div class="bg-white rounded-xl shadow-lg overflow-hidden transform transition hover:shadow-2xl hover:-translate-y-2 flex flex-col h-full">
                    <!-- Image -->
                    <div class="relative h-56 overflow-hidden flex-shrink-0">
                        <img src="${program.image}" 
                             alt="${program.title}" 
                             class="w-full h-full object-cover">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    </div>
                    
                    <!-- Content -->
                    <div class="p-6 flex flex-col flex-grow">
                        <h3 class="text-xl font-bold text-gray-800 mb-3">
                            ${program.title}
                        </h3>
                        <p class="text-sm text-gray-600 leading-relaxed line-clamp-3">
                            ${program.description}
                        </p>
                    </div>
                </div>
            </div>
        `;
    },
    
    render: function() {
        const mainCardsHTML = this.mainPrograms.map(program => this.renderCard(program)).join('');
        const collabCardsHTML = this.collabPrograms.map(program => this.renderCard(program)).join('');
        
        return `
            <section id="programs" class="py-20 bg-white">
                <div class="container mx-auto px-4">
                    <!-- Custom Header with Tabs and Navigation -->
                    <div class="max-w-7xl mx-auto mb-6">
                        <div class="flex justify-between items-center">
                            <!-- Tab Menu -->
                            <div class="flex gap-8">
                                <button id="tab-utama" class="tab-button tab-active relative pb-3 text-lg font-bold transition">
                                    Program Utama
                                    <div class="tab-underline absolute bottom-0 left-0 w-full h-1 bg-purple-600"></div>
                                </button>
                                <button id="tab-kolaborasi" class="tab-button relative pb-3 text-lg text-gray-400 transition hover:text-gray-600">
                                    Program Kolaborasi
                                    <div class="tab-underline absolute bottom-0 left-0 w-full h-1 bg-purple-600 hidden"></div>
                                </button>
                            </div>
                            
                            <!-- Navigation Buttons for Main Programs -->
                            <div id="nav-utama" class="flex gap-3">
                                <button class="program-utama-prev w-12 h-12 rounded-full border-2 border-purple-600 text-purple-600 flex items-center justify-center transition hover:bg-purple-600 hover:text-white">
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                                    </svg>
                                </button>
                                <button class="program-utama-next w-12 h-12 rounded-full border-2 border-purple-600 text-purple-600 flex items-center justify-center transition hover:bg-purple-600 hover:text-white">
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                                    </svg>
                                </button>
                            </div>
                            
                            <!-- Navigation Buttons for Collaboration Programs -->
                            <div id="nav-kolaborasi" class="flex gap-3 hidden">
                                <button class="program-kolaborasi-prev w-12 h-12 rounded-full border-2 border-purple-600 text-purple-600 flex items-center justify-center transition hover:bg-purple-600 hover:text-white">
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                                    </svg>
                                </button>
                                <button class="program-kolaborasi-next w-12 h-12 rounded-full border-2 border-purple-600 text-purple-600 flex items-center justify-center transition hover:bg-purple-600 hover:text-white">
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Carousel Container: Program Utama -->
                    <div id="carousel-utama" class="max-w-7xl mx-auto">
                        <div class="swiper programUtamaSwiper">
                            <div class="swiper-wrapper pb-8">
                                ${mainCardsHTML}
                            </div>
                        </div>
                    </div>
                    
                    <!-- Carousel Container: Program Kolaborasi -->
                    <div id="carousel-kolaborasi" class="max-w-7xl mx-auto hidden">
                        <div class="swiper programKolaborasiSwiper">
                            <div class="swiper-wrapper pb-8">
                                ${collabCardsHTML}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <style>
                /* Program Card Hover Effects */
                .programUtamaSwiper .swiper-slide,
                .programKolaborasiSwiper .swiper-slide {
                    height: auto;
                }
                
                /* Tab Button Styles */
                .tab-button {
                    cursor: pointer;
                    user-select: none;
                }
                
                .tab-active {
                    color: #1f2937;
                    font-weight: bold;
                }
                
                .tab-active .tab-underline {
                    display: block;
                }
                
                /* Custom Navigation Button Styles */
                .program-utama-prev:active,
                .program-utama-next:active,
                .program-kolaborasi-prev:active,
                .program-kolaborasi-next:active {
                    transform: scale(0.95);
                }
            </style>
        `;
    },
    
    init: function() {
        const container = document.getElementById('programs-container');
        if (container) {
            container.innerHTML = this.render();
            this.initSwipers();
            this.setupTabSwitcher();
            this.setupScrollAnimation();
        }
    },
    
    initSwipers: function() {
        setTimeout(() => {
            // Initialize Main Programs Swiper
            new Swiper('.programUtamaSwiper', {
                slidesPerView: 1,
                spaceBetween: 20,
                loop: true,
                grabCursor: true,
                allowTouchMove: true,
                mousewheel: {
                    forceToAxis: true,
                    sensitivity: 1,
                    releaseOnEdges: true,
                },
                navigation: {
                    nextEl: '.program-utama-next',
                    prevEl: '.program-utama-prev',
                },
                breakpoints: {
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 24,
                    },
                },
            });
            
            // Initialize Collaboration Programs Swiper
            new Swiper('.programKolaborasiSwiper', {
                slidesPerView: 1,
                spaceBetween: 20,
                loop: true,
                grabCursor: true,
                allowTouchMove: true,
                mousewheel: {
                    forceToAxis: true,
                    sensitivity: 1,
                    releaseOnEdges: true,
                },
                navigation: {
                    nextEl: '.program-kolaborasi-next',
                    prevEl: '.program-kolaborasi-prev',
                },
                breakpoints: {
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 24,
                    },
                },
            });
        }, 150);
    },
    
    setupTabSwitcher: function() {
        const tabUtama = document.getElementById('tab-utama');
        const tabKolaborasi = document.getElementById('tab-kolaborasi');
        const carouselUtama = document.getElementById('carousel-utama');
        const carouselKolaborasi = document.getElementById('carousel-kolaborasi');
        const navUtama = document.getElementById('nav-utama');
        const navKolaborasi = document.getElementById('nav-kolaborasi');
        
        if (!tabUtama || !tabKolaborasi) return;
        
        // Function to switch to Main Programs
        const showMainPrograms = () => {
            // Update tab styles
            tabUtama.classList.add('tab-active', 'font-bold', 'text-gray-800');
            tabUtama.classList.remove('text-gray-400');
            tabUtama.querySelector('.tab-underline').classList.remove('hidden');
            
            tabKolaborasi.classList.remove('tab-active', 'font-bold', 'text-gray-800');
            tabKolaborasi.classList.add('text-gray-400');
            tabKolaborasi.querySelector('.tab-underline').classList.add('hidden');
            
            // Show/Hide carousels
            carouselUtama.classList.remove('hidden');
            carouselKolaborasi.classList.add('hidden');
            
            // Show/Hide navigation buttons
            navUtama.classList.remove('hidden');
            navKolaborasi.classList.add('hidden');
        };
        
        // Function to switch to Collaboration Programs
        const showCollabPrograms = () => {
            // Update tab styles
            tabKolaborasi.classList.add('tab-active', 'font-bold', 'text-gray-800');
            tabKolaborasi.classList.remove('text-gray-400');
            tabKolaborasi.querySelector('.tab-underline').classList.remove('hidden');
            
            tabUtama.classList.remove('tab-active', 'font-bold', 'text-gray-800');
            tabUtama.classList.add('text-gray-400');
            tabUtama.querySelector('.tab-underline').classList.add('hidden');
            
            // Show/Hide carousels
            carouselKolaborasi.classList.remove('hidden');
            carouselUtama.classList.add('hidden');
            
            // Show/Hide navigation buttons
            navKolaborasi.classList.remove('hidden');
            navUtama.classList.add('hidden');
        };
        
        // Event listeners
        tabUtama.addEventListener('click', showMainPrograms);
        tabKolaborasi.addEventListener('click', showCollabPrograms);
    },
    
    setupScrollAnimation: function() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px'
        });
        
        setTimeout(() => {
            const cards = document.querySelectorAll('#programs-container .swiper-slide');
            cards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = `all 0.6s ease ${index * 0.1}s`;
                observer.observe(card);
            });
        }, 150);
    }
};

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => ProgramsComponent.init());
} else {
    ProgramsComponent.init();
}
