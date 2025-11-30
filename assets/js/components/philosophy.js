// Philosophy Component
const PhilosophyComponent = {
    philosophyPoints: [
        {
            icon: 'fa-feather-pointed',
            title: 'Pensil',
            description: 'Siluet pensil melambangkan semangat gotong royong dan keikhlasan dalam memberi untuk kemajuan pendidikan.'
        },
        {
            icon: 'fa-sun',
            title: 'Matahari',
            description: 'Matahari adalah simbol cahaya dan harapan baru. Matahari menggambarkan setiap ilmu yang diberikan akan menjadi penerang bagi masa depan anak-anak.'
        },
        {
            icon: 'fa-book-open',
            title: 'Buku Terbuka',
            description: 'Buku terbuka menggambarkan ilmu pengetahuan dan kreativitas kuat sebagai bagian dari ITERA Mengajar yang hadir untuk berbagi.'
        },
        {
            icon: 'fa-pen-nib',
            title: 'ITERA Mengajar',
            description: 'Tulisan “ITERA Mengajar” menegaskan bahwa seluruh kegiatan ini merupakan wujud nyata pengabdian ITERA kepada masyarakat.'
        }
    ],
    
    render: function() {
        const pointsHTML = this.philosophyPoints.map(point => `
            <div class="flex items-start space-x-4 fade-in">
                <div class="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <i class="fas ${point.icon} text-purple-600 text-xl"></i>
                </div>
                <div class="flex-1">
                    <h4 class="text-lg font-bold text-gray-800 mb-2">${point.title}</h4>
                    <p class="text-gray-600 leading-relaxed">${point.description}</p>
                </div>
            </div>
        `).join('');
        
        return `
            <section class="py-20 bg-white">
                <div class="container mx-auto px-4">
                    <div class="max-w-7xl mx-auto">
                        <!-- Grid Layout: Logo Left, Content Right -->
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <!-- Left Column: Floating Logo -->
                            <div class="flex justify-center items-center min-h-full">
                                <div class="floating-logo">
                                    <img src="assets/img/logoim.svg" 
                                         alt="Logo ITERA Mengajar" 
                                         class="w-64 h-64 lg:w-80 lg:h-80 object-contain drop-shadow-2xl">
                                </div>
                            </div>
                            
                            <!-- Right Column: Philosophy Content -->
                            <div class="space-y-8">
                                <!-- Header -->
                                <div class="fade-in">
                                    <h2 class="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
                                        Filosofi <span class="text-purple-700">Logo</span> ITERA Mengajar
                                    </h2>
                                    <p class="text-xl text-gray-600 leading-relaxed">
                                        Setiap elemen dalam logo ITERA Mengajar mengandung makna mendalam yang mencerminkan 
                                        <span class="font-semibold text-purple-700"> nilai-nilai</span> 
                                        yang dijunjung tinggi dalam setiap langkah pengabdian.
                                    </p>
                                </div>
                                
                                <!-- Philosophy Points -->
                                <div class="space-y-6">
                                    ${pointsHTML}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <style>
                /* Floating Animation for Logo */
                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-20px);
                    }
                }
                
                .floating-logo {
                    animation: float 6s ease-in-out infinite;
                }
                
                /* Hover effect for logo */
                .floating-logo:hover {
                    animation-play-state: paused;
                }
            </style>
        `;
    },
    
    init: function() {
        const container = document.getElementById('philosophy-container');
        if (container) {
            container.innerHTML = this.render();
            this.setupScrollAnimation();
        }
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
            const elements = document.querySelectorAll('#philosophy-container .fade-in');
            elements.forEach((element, index) => {
                element.style.opacity = '0';
                element.style.transform = 'translateY(20px)';
                element.style.transition = `all 0.6s ease ${index * 0.1}s`;
                observer.observe(element);
            });
        }, 100);
    }
};

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => PhilosophyComponent.init());
} else {
    PhilosophyComponent.init();
}
