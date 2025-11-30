// FAQ Accordion Component
const FAQComponent = {
    faqs: [
        {
            id: 1,
            question: 'Apa syarat menjadi volunteer ITERA Mengajar?',
            answer: 'Syarat menjadi volunteer ITERA Mengajar adalah mahasiswa aktif ITERA, memiliki komitmen tinggi untuk mengajar, dan bersedia mengikuti seleksi serta sekolah yang diadakan. Tidak ada batasan jurusan, semua mahasiswa bisa bergabung.'
        },
        {
            id: 2,
            question: 'Berapa lama durasi pengabdian?',
            answer: 'Durasi pengabdian ITERA Mengajar biasanya berlangsung selama 1 semester, disesuaikan dengan program yang dijalankan. Jadwal mengajar fleksibel dan dapat disesuaikan dengan jadwal kuliah mahasiswa.'
        },
        {
            id: 3,
            question: 'Apakah program ini mengganggu jadwal kuliah?',
            answer: 'Tidak, program ITERA Mengajar dirancang agar tidak mengganggu jadwal kuliah. Kegiatan mengajar biasanya dilakukan di akhir pekan atau waktu luang mahasiswa.'
        },
        {
            id: 4,
            question: 'Apakah ada biaya untuk bergabung dan ketika kegiatan?',
            answer: 'Tidak ada biaya untuk bergabung ataupun selama kegiatan dengan ITERA Mengajar. Program ini didukung penuh oleh kampus dan berbagai donatur.'
        },
        {
            id: 5,
            question: 'Bagaimana cara mendaftar?',
            answer: 'Pendaftaran dibuka setiap periode rekrutmen melalui  akun media sosial ITERA Mengajar. Proses seleksi meliputi administrasi, pelatihan pra-pengabdian, dan wawancara. Pantau terus informasi pendaftaran kami!'
        }
    ],
    
    activeId: null,
    
    toggleFAQ: function(id) {
        if (this.activeId === id) {
            this.activeId = null;
        } else {
            this.activeId = id;
        }
        this.updateUI();
    },
    
    updateUI: function() {
        this.faqs.forEach(faq => {
            const answerEl = document.getElementById(`answer-${faq.id}`);
            const iconEl = document.getElementById(`icon-${faq.id}`);
            const questionEl = document.getElementById(`question-${faq.id}`);
            
            if (this.activeId === faq.id) {
                // Open state
                answerEl.style.maxHeight = answerEl.scrollHeight + 'px';
                answerEl.classList.remove('opacity-0');
                answerEl.classList.add('opacity-100');
                iconEl.innerHTML = '<i class="fas fa-minus text-purple-700"></i>';
                questionEl.classList.add('text-purple-700');
            } else {
                // Closed state
                answerEl.style.maxHeight = '0px';
                answerEl.classList.remove('opacity-100');
                answerEl.classList.add('opacity-0');
                iconEl.innerHTML = '<i class="fas fa-plus text-purple-700"></i>';
                questionEl.classList.remove('text-purple-700');
            }
        });
    },
    
    renderFAQItem: function(faq) {
        return `
            <div class="faq-item border-b border-gray-200 last:border-0">
                <button 
                    class="w-full flex items-center justify-between py-6 px-6 text-left hover:bg-purple-50 transition-all duration-300 rounded-lg group"
                    onclick="FAQComponent.toggleFAQ(${faq.id})"
                >
                    <span id="question-${faq.id}" class="text-lg font-semibold text-gray-800 pr-8 transition-colors duration-300">
                        ${faq.question}
                    </span>
                    <span id="icon-${faq.id}" class="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-purple-100 transition-transform duration-300 group-hover:scale-110">
                        <i class="fas fa-plus text-purple-700"></i>
                    </span>
                </button>
                <div 
                    id="answer-${faq.id}" 
                    class="overflow-hidden transition-all duration-500 ease-in-out opacity-0"
                    style="max-height: 0px;"
                >
                    <div class="px-6 pb-6">
                        <p class="text-gray-600 leading-relaxed">
                            ${faq.answer}
                        </p>
                    </div>
                </div>
            </div>
        `;
    },
    
    render: function() {
        const faqsHTML = this.faqs.map(faq => this.renderFAQItem(faq)).join('');
        
        return `
            <section id="faq" class="py-20 bg-gray-50">
                <div class="container mx-auto px-4">
                    <!-- Section Header -->
                    <div class="text-center mb-12 fade-in">
                        <h2 class="text-4xl font-bold text-gray-800 mb-4">
                            Pertanyaan yang Sering Diajukan
                        </h2>
                        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                            Informasi seputar pendaftaran dan kegiatan ITERA Mengajar
                        </p>
                    </div>

                    <!-- FAQ Accordion -->
                    <div class="max-w-3xl mx-auto">
                        <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
                            ${faqsHTML}
                        </div>
                    </div>
                </div>
            </section>
            
            <style>
                .faq-item button:hover #icon-${this.activeId} {
                    transform: rotate(90deg);
                }
                
                /* Smooth height transition */
                .faq-item > div {
                    transition: max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1), 
                                opacity 0.3s ease-in-out;
                }
            </style>
        `;
    },
    
    init: function() {
        const container = document.getElementById('activities-container');
        if (container) {
            container.innerHTML = this.render();
        }
    }
};

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => FAQComponent.init());
} else {
    FAQComponent.init();
}
