// Navbar Component
const NavbarComponent = {
    render: function() {
        return `
            <nav class="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
                <div class="container mx-auto px-4 py-3">
                    <div class="flex items-center justify-between">
                        <!-- Logo -->
                        <div class="flex items-center">
                            <img src="assets/img/logoim.svg" alt="ITERA Mengajar" class="h-12">
                        </div>
                        
                        <!-- Desktop Menu -->
                        <div class="hidden md:flex items-center space-x-8">
                            <a href="#philosophy" class="text-gray-700 hover:text-purple-700 transition smooth-scroll">Tentang Kami</a>
                            <a href="#programs" class="text-gray-700 hover:text-purple-700 transition smooth-scroll">Program Kerja</a>
                            <a href="https://www.instagram.com/p/DOV3dDakwOb/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" class="text-gray-700 hover:text-purple-700 transition">Donasi</a>
                            <button class="px-6 py-2 border-2 border-purple-700 text-purple-700 rounded-lg hover:bg-purple-700 hover:text-white transition">
                                <a href="https://desty.page/iteramengajar2025">Daftar Volunteer</a>
                            </button>
                        </div>
                        
                        <!-- Mobile Menu Button -->
                        <button id="mobile-menu-btn" class="md:hidden text-gray-700">
                            <i class="fas fa-bars text-2xl"></i>
                        </button>
                    </div>
                    
                    <!-- Mobile Menu -->
                    <div id="mobile-menu" class="mobile-menu md:hidden">
                        <div class="pt-4 pb-3 space-y-3">
                            <a href="#philosophy" class="block text-gray-700 hover:text-purple-700 transition py-2 smooth-scroll">Tentang Kami</a>
                            <a href="#programs" class="block text-gray-700 hover:text-purple-700 transition py-2 smooth-scroll">Program Kerja</a>
                            <a href="https://www.instagram.com/p/DOV3dDakwOb/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" class="block text-gray-700 hover:text-purple-700 transition py-2">Donasi</a>
                            <button class="w-full px-6 py-2 border-2 border-purple-700 text-purple-700 rounded-lg hover:bg-purple-700 hover:text-white transition">
                                <a href="https://desty.page/iteramengajar2025">Daftar Volunteer</a>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        `;
    },
    
    init: function() {
        const container = document.getElementById('navbar-container');
        if (container) {
            container.innerHTML = this.render();
            this.setupEventListeners();
        }
    },
    
    setupEventListeners: function() {
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (mobileMenu.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        }
        
        // Smooth scroll for navigation links
        setTimeout(() => {
            const smoothScrollLinks = document.querySelectorAll('.smooth-scroll');
            smoothScrollLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = link.getAttribute('href').substring(1);
                    const targetElement = document.getElementById(targetId + '-container');
                    
                    if (targetElement) {
                        const navbarHeight = 80; // Approximate navbar height
                        const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                        const offsetPosition = elementPosition - navbarHeight;
                        
                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                        
                        // Close mobile menu if open
                        if (mobileMenu && mobileMenu.classList.contains('active')) {
                            mobileMenu.classList.remove('active');
                            const icon = mobileMenuBtn.querySelector('i');
                            icon.classList.remove('fa-times');
                            icon.classList.add('fa-bars');
                        }
                    }
                });
            });
        }, 500);
    }
};

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => NavbarComponent.init());
} else {
    NavbarComponent.init();
}