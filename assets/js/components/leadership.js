// Leadership Timeline Component
const LeadershipComponent = {
    leaders: [
        {
            year: '2019',
            name: 'Naufal Hasnur',
            quote: 'Teknik Mesin',
            image: 'https://ui-avatars.com/api/?name=Naufal+Hasnur&size=200&background=7c3aed&color=fff&bold=true'
        },
        {
            year: '2020',
            name: 'Aditya Rayhan Pradana',
            quote: 'Teknik Mesin',
            image: 'https://ui-avatars.com/api/?name=Aditya+Rayhan+Pradana&size=200&background=7c3aed&color=fff&bold=true'
        },
        {
            year: '2021',
            name: 'Nasyidan Muhamad Hisyan',
            quote: 'Sains Atmosfer dan Keplanetan',
            image: 'https://ui-avatars.com/api/?name=Nasyidan+Muhamad+Hisyan&size=200&background=7c3aed&color=fff&bold=true'
        },
        {
            year: '2022',
            name: 'Fajar Jumanthoro',
            quote: 'Teknik Elektro',
            image: 'https://ui-avatars.com/api/?name=Fajar+Jumanthoro&size=200&background=7c3aed&color=fff&bold=true'
        },
        {
            year: '2023',
            name: 'Arjuna Bahran Karani',
            quote: 'Teknik Biomedis',
            image: 'https://ui-avatars.com/api/?name=Arjuna+Bahran+Karani&size=200&background=7c3aed&color=fff&bold=true'
        },
        {
            year: '2024',
            name: 'Ghias Fabian Malik',
            quote: 'Teknologi Industri Pertanian',
            image: 'https://ui-avatars.com/api/?name=Ghias+Fabian+Malik&size=200&background=7c3aed&color=fff&bold=true'
        },
        {
            year: '2025',
            name: 'Ilham Andijaya',
            quote: 'Batu',
            image: 'https://ui-avatars.com/api/?name=Ilham+Andijaya&size=200&background=7c3aed&color=fff&bold=true'
        }
    ],
    
    renderCard: function(leader, index) {
        const isFirst = index === 0;
        const isLast = index === this.leaders.length - 1;
        
        // Determine connector line styles based on position
        let connectorStyle = '';
        if (isFirst) {
            // First item: start from center, extend right
            connectorStyle = 'left-[50%] w-[calc(50%+30px)]';
        } else if (isLast) {
            // Last item: start from left, stop at center
            connectorStyle = 'left-0 w-[50%]';
        } else {
            // Middle items: full width + gap
            connectorStyle = 'left-0';
        }
        
        return `
            <div class="swiper-slide h-auto">
                <!-- Static Connector Line (Fade In Only) -->
                <div class="connector-line absolute top-20 ${connectorStyle} h-1 bg-purple-200 z-0 opacity-0 transition-all duration-700 ease-out" ${!isFirst && !isLast ? 'style="width: calc(100% + 30px);"' : ''}></div>
                
                <!-- Animated Content Wrapper -->
                <div class="w-full relative flex flex-col items-center px-2 h-full content-wrapper opacity-0 translate-y-8 transition-all duration-700 ease-out">
                    <!-- Photo Circle -->
                    <div class="relative z-10 mb-4">
                        <div class="w-40 h-40 rounded-full border-4 border-purple-600 overflow-hidden bg-white shadow-xl transform transition hover:scale-105">
                            <img src="${leader.image}" 
                                 alt="${leader.name}" 
                                 class="w-full h-full object-cover">
                        </div>
                    </div>
                    
                    <!-- Content Card -->
                    <div class="bg-white rounded-xl shadow-lg p-6 w-full border-t-4 border-purple-600 transform transition hover:shadow-xl flex flex-col h-full">
                        <div class="text-center flex flex-col justify-between h-full">
                            <div class="inline-block px-4 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-3 self-center">
                                ${leader.year}
                            </div>
                            <h3 class="text-xl font-bold text-gray-800 mb-2">${leader.name}</h3>
                            <p class="text-gray-600 text-sm italic leading-relaxed mt-auto">
                                "${leader.quote}"
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },
    
    render: function() {
        const cardsHTML = this.leaders.map((leader, index) => this.renderCard(leader, index)).join('');
        
        return `
            <section class="py-10 bg-gray-50 overflow-hidden">
                <!-- Section Header -->
                <div class="text-center mb-8 px-4">
                    <h2 class="text-4xl font-bold text-gray-800 mb-4">
                        Ketua Pelaksana
                    </h2>
                    <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                        Pengabdian Ketua Pelaksana ITERA Mengajar untuk Membangun Negeri
                    </p>
                </div>

                <!-- Boxed Container Wrapper -->
                <div class="container mx-auto max-w-7xl px-4 relative z-10">
                    <div class="swiper leadershipSwiper pt-32 pb-24 -mt-24">
                        <div class="swiper-wrapper">
                            ${cardsHTML}
                        </div>
                        
                        <!-- Pagination -->
                        <div class="swiper-pagination"></div>
                    </div>
                </div>
            </section>
            
            <style>
                /* FORCE PADDING OVERRIDE - Bypass Tailwind Build Issues */
                .leadershipSwiper {
                    padding-top: 130px !important;  /* Ruang besar untuk animasi hover foto */
                    padding-bottom: 80px !important; /* Ruang cukup untuk pagination */
                    /* Hapus overflow: visible untuk mencegah bleeding */
                }
                
                .leadershipSwiper .swiper-pagination {
                    bottom: 0px !important; /* Pastikan pagination nempel di paling bawah padding */
                    left: 0 !important;
                    right: 0 !important;
                    width: 100% !important;
                    text-align: center !important;
                }
                
                .leadershipSwiper .swiper-pagination-bullet {
                    width: 40px;
                    height: 4px;
                    border-radius: 2px;
                    background: #d1d5db;
                    opacity: 1;
                    transition: all 0.3s ease;
                }
                
                .leadershipSwiper .swiper-pagination-bullet-active {
                    background: #7c3aed;
                    width: 60px;
                }
                
                /* Swiper Slide */
                .leadershipSwiper .swiper-slide {
                    height: auto;
                    display: flex;
                }
                
                /* Hide pagination on mobile devices */
                @media (max-width: 768px) {
                    .leadershipSwiper .swiper-pagination {
                        display: none !important;
                    }
                    
                    /* Kurangi padding bawah container di mobile karena tidak ada dots */
                    .leadershipSwiper {
                        padding-bottom: 40px !important; 
                    }
                }
            </style>
        `;
    },
    
    init: function() {
        const container = document.getElementById('leadership-container');
        if (container) {
            container.innerHTML = this.render();
            this.setupScrollAnimation();
            this.initSwiper();
        }
    },
    
    initSwiper: function() {
        // Hitung index slide terakhir (Tahun Terbaru)
        const lastIndex = this.leaders.length - 1;
        
        setTimeout(() => {
            new Swiper('.leadershipSwiper', {
                slidesPerView: 1,
                spaceBetween: 16,
                centeredSlides: false,
                loop: false,
                grabCursor: true,
                allowTouchMove: true,
                initialSlide: lastIndex,
                slidesOffsetBefore: 0,
                slidesOffsetAfter: 0,
                watchSlidesProgress: true,
                mousewheel: {
                    forceToAxis: true,
                    sensitivity: 1,
                    releaseOnEdges: true,
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                breakpoints: {
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                        centeredSlides: false,
                        slidesOffsetBefore: 0,
                        slidesOffsetAfter: 0,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 24,
                        centeredSlides: false,
                        slidesOffsetBefore: 0,
                        slidesOffsetAfter: 0,
                    },
                },
            });
        }, 100);
    },
    
    setupScrollAnimation: function() {
        // Add fade-in animation for timeline items
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const slide = entry.target;
                    
                    // Animate connector line (opacity only - keep it straight)
                    const connectorLine = slide.querySelector('.connector-line');
                    if (connectorLine) {
                        connectorLine.classList.remove('opacity-0');
                        connectorLine.classList.add('opacity-100');
                    }
                    
                    // Animate content wrapper (opacity + translateY)
                    const contentWrapper = slide.querySelector('.content-wrapper');
                    if (contentWrapper) {
                        contentWrapper.classList.remove('opacity-0', 'translate-y-8');
                        contentWrapper.classList.add('opacity-100', 'translate-y-0');
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px'
        });
        
        setTimeout(() => {
            // Target swiper-slide elements (which contain both line and content)
            const slides = document.querySelectorAll('#leadership-container .swiper-slide');
            slides.forEach((slide) => {
                observer.observe(slide);
            });
        }, 100);
    }
};

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => LeadershipComponent.init());
} else {
    LeadershipComponent.init();
}
