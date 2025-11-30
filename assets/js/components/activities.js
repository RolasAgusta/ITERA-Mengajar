// Activities Section Component
const ActivitiesComponent = {
    activities: [
        {
            title: 'Mengajar Anak-Anak',
            description: 'Bantu anak-anak kurang mampu mendapatkan pendidikan yang layak melalui program mengajar sukarela.',
            icon: 'fa-chalkboard-teacher',
            gradient: 'from-purple-400 to-purple-600',
            location: 'Jakarta, Bandung, Surabaya'
        },
        {
            title: 'Bersih-Bersih Pantai',
            description: 'Bergabunglah dalam aksi membersihkan pantai dari sampah plastik dan jaga kelestarian laut kita.',
            icon: 'fa-water',
            gradient: 'from-blue-400 to-purple-500',
            location: 'Bali, Lombok, Makassar'
        },
        {
            title: 'Donor Darah',
            description: 'Setetes darahmu bisa menyelamatkan nyawa. Ikuti kegiatan donor darah rutin di kota Anda.',
            icon: 'fa-tint',
            gradient: 'from-red-400 to-purple-500',
            location: 'Semua Kota Besar'
        },
        {
            title: 'Bantuan Bencana',
            description: 'Berikan bantuan langsung kepada korban bencana alam dan bantu proses pemulihan komunitas.',
            icon: 'fa-hands-helping',
            gradient: 'from-orange-400 to-purple-500',
            location: 'Sesuai Lokasi Bencana'
        },
        {
            title: 'Perawatan Lansia',
            description: 'Berikan perhatian dan kasih sayang kepada para lansia yang membutuhkan pendampingan.',
            icon: 'fa-user-nurse',
            gradient: 'from-green-400 to-purple-500',
            location: 'Jakarta, Yogyakarta'
        },
        {
            title: 'Konservasi Hutan',
            description: 'Ikut serta dalam program penanaman pohon dan pelestarian hutan untuk generasi mendatang.',
            icon: 'fa-tree',
            gradient: 'from-teal-400 to-purple-500',
            location: 'Kalimantan, Sumatra'
        }
    ],
    
    renderCard: function(activity) {
        return `
            <div class="activity-card bg-white rounded-xl shadow-lg overflow-hidden">
                <div class="h-48 bg-gradient-to-br ${activity.gradient} flex items-center justify-center">
                    <i class="fas ${activity.icon} text-6xl text-white"></i>
                </div>
                <div class="p-6">
                    <h3 class="text-2xl font-bold text-gray-800 mb-3">${activity.title}</h3>
                    <p class="text-gray-600 mb-4">
                        ${activity.description}
                    </p>
                    <div class="flex items-center text-sm text-gray-500 mb-4">
                        <i class="fas fa-map-marker-alt mr-2"></i>
                        <span>${activity.location}</span>
                    </div>
                    <button class="w-full py-3 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition font-semibold btn-ripple">
                        Lihat Detail
                    </button>
                </div>
            </div>
        `;
    },
    
    render: function() {
        const cardsHTML = this.activities.map(activity => this.renderCard(activity)).join('');
        
        return `
            <section id="activities" class="py-20 bg-gray-50 fade-in">
                <div class="container mx-auto px-4">
                    <!-- Section Header -->
                    <div class="text-center mb-16 fade-in">
                        <h2 class="text-4xl font-bold text-gray-800 mb-4">Cari Aktivitas Relawan</h2>
                        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
                            Pilih aktivitas yang sesuai dengan minat dan keahlianmu untuk membuat dampak positif
                        </p>
                    </div>

                    <!-- Activities Grid -->
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        ${cardsHTML}
                    </div>
                </div>
            </section>
        `;
    },
    
    init: function() {
        const container = document.getElementById('activities-container');
        if (container) {
            container.innerHTML = this.render();
            this.setupEventListeners();
        }
    },
    
    setupEventListeners: function() {
        const buttons = document.querySelectorAll('.activity-card button');
        buttons.forEach((button, index) => {
            button.addEventListener('click', () => {
                alert(`Anda memilih: ${this.activities[index].title}`);
            });
        });
    }
};

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => ActivitiesComponent.init());
} else {
    ActivitiesComponent.init();
}