// Floating Stats Bar Component
const StatsComponent = {
    stats: [
        {
            icon: 'fa-users',
            number: '350+',
            label: 'Total Relawan Pernah Mengabdi'
        },
        {
            icon: 'fa-home',
            number: '15+',
            label: 'Desa Terbantu'
        },
        {
            icon: 'fa-children',
            number: '1000+',
            label: 'Anak Terbantu'
        }
    ],
    
    render: function() {
        const statsHTML = this.stats.map(stat => `
            <div class="flex flex-col items-center fade-in">
                <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                    <i class="fas ${stat.icon} text-3xl text-purple-700"></i>
                </div>
                <h3 class="text-4xl font-bold text-purple-700 mb-2">${stat.number}</h3>
                <p class="text-gray-600 text-lg">${stat.label}</p>
            </div>
        `).join('');
        
        return `
            <div class="relative -mt-20 z-20 bg-white pb-0">
                <div class="container mx-auto px-4">
                    <div class="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                            ${statsHTML}
                        </div>
                    </div>
                </div>
            </div>
        `;
    },
    
    init: function() {
        const container = document.getElementById('stats-container');
        if (container) {
            container.innerHTML = this.render();
            this.animateNumbers();
        }
    },
    
    animateNumbers: function() {
        // Optional: Add number counting animation
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        });
        
        const statElements = document.querySelectorAll('.fade-in');
        statElements.forEach(el => observer.observe(el));
    }
};

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => StatsComponent.init());
} else {
    StatsComponent.init();
}