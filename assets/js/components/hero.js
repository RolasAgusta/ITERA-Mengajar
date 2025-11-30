// Hero Section Component
const HeroComponent = {
    render: function() {
        return `
            <section class="relative h-screen flex items-center justify-center mt-16">
                <!-- Background Image with Overlay -->
                <div class="absolute inset-0 z-0">
                    <img src="assets/img/HeroBackround.svg" 
                         alt="Volunteers" 
                         class="w-full h-full object-cover">
                    <div class="absolute inset-0 bg-black opacity-45"></div>
                </div>
                
                <!-- Hero Content -->
                <div class="relative z-10 text-center text-white px-4 max-w-4xl fade-in">
                    <h1 class="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                        ITERA Mengajar
                    </h1>
                    <p class="text-xl md:text-2xl mb-8 text-gray-200">
                        Semangat Mengabdi, Membangun Negeri
                    </p>
                    <a href="#philosophy" 
                       class="inline-block px-8 py-4 bg-purple-700 text-white text-lg font-semibold rounded-lg hover:bg-purple-800 transition transform hover:scale-105 shadow-lg btn-ripple smooth-scroll-hero">
                        Tentang Kami
                    </a>
                </div>
            </section>
        `;
    },
    
    init: function() {
        const container = document.getElementById('hero-container');
        if (container) {
            container.innerHTML = this.render();
            this.setupSmoothScroll();
        }
    },
    
    setupSmoothScroll: function() {
        setTimeout(() => {
            const smoothScrollBtn = document.querySelector('.smooth-scroll-hero');
            if (smoothScrollBtn) {
                smoothScrollBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = smoothScrollBtn.getAttribute('href').substring(1);
                    const targetElement = document.getElementById(targetId + '-container');
                    
                    if (targetElement) {
                        const navbarHeight = 80; // Approximate navbar height
                        const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                        const offsetPosition = elementPosition - navbarHeight;
                        
                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            }
        }, 100);
    }
};

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => HeroComponent.init());
} else {
    HeroComponent.init();
}