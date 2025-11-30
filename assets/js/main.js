// Main Application Logic
const App = {
    init: function() {
        console.log('ITERA Mengajar Platform Initialized');
        this.setupScrollEffects();
        this.setupSmoothScroll();
    },
    
    setupScrollEffects: function() {
        // Add scroll event listener for navbar shadow
        let lastScroll = 0;
        const navbar = document.querySelector('nav');
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                navbar?.classList.add('shadow-lg');
            } else {
                navbar?.classList.remove('shadow-lg');
            }
            
            lastScroll = currentScroll;
        });
        
        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observe all activity cards
        setTimeout(() => {
            const cards = document.querySelectorAll('.activity-card');
            cards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                card.style.transition = `all 0.6s ease ${index * 0.1}s`;
                observer.observe(card);
            });
        }, 100);
    },
    
    setupSmoothScroll: function() {
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    const mobileMenu = document.getElementById('mobile-menu');
                    if (mobileMenu?.classList.contains('active')) {
                        mobileMenu.classList.remove('active');
                        const icon = document.querySelector('#mobile-menu-btn i');
                        icon?.classList.remove('fa-times');
                        icon?.classList.add('fa-bars');
                    }
                }
            });
        });
    }
};

// Initialize app when all components are loaded
window.addEventListener('load', () => {
    App.init();
});

// Also initialize on DOMContentLoaded as fallback
document.addEventListener('DOMContentLoaded', () => {
    if (document.readyState === 'complete') {
        App.init();
    }
});