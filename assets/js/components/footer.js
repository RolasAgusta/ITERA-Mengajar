// Footer Component
const FooterComponent = {
    links: {
        quickLinks: [
            { text: 'Tentang Kami', href: '#philosophy' },
            { text: 'FAQ', href: '#faq' },
            { text: 'Kontak', href: '#contact' }
        ],
        socialMedia: [
            { icon: 'fa-youtube', href: 'https://www.youtube.com/@ITERAMengajar', label: 'YouTube' },
            { icon: 'fa-instagram', href: 'https://www.instagram.com/iteramengajar/', label: 'Instagram' },
        ]
    },
    
    render: function() {
        const quickLinksHTML = this.links.quickLinks.map(link => `
            <li>
                <a href="${link.href}" class="text-gray-400 hover:text-purple-400 transition">
                    ${link.text}
                </a>
            </li>
        `).join('');
        
        const socialMediaHTML = this.links.socialMedia.map(social => `
            <a href="${social.href}" 
               class="w-10 h-10 bg-purple-700 rounded-full flex items-center justify-center hover:bg-purple-600 transition"
               aria-label="${social.label}">
                <i class="fab ${social.icon}"></i>
            </a>
        `).join('');
        
        return `
            <footer class="bg-gray-800 text-white pt-12 pb-6">
                <div class="container mx-auto px-4">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
                        <!-- Brand Section -->
                        <div>
                            <h3 class="text-2xl font-bold text-purple-400 mb-4">ITERA Mengajar</h3>
                            <p class="text-gray-300 leading-relaxed">
                                Gerakan sosial yang berfokus pada pendidikan sebagai wadah para mahasiswa/i ITERA untuk berkontribusi dalam menciptakan dampak positif di masyarakat.
                            </p>
                        </div>
                        
                        <!-- Contact Information -->
                        <div>
                            <h4 class="text-lg font-bold text-white mb-4">For more information:</h4>
                            <ul class="space-y-4">
                                <li class="flex items-start gap-3">
                                    <div class="w-6 flex-shrink-0 flex justify-center mt-1">
                                        <i class="fas fa-envelope text-purple-400"></i>
                                    </div>
                                    <div class="flex-1">
                                        <a href="mailto:oaiteramengajar@gmail.com" class="text-gray-300 hover:text-purple-400 transition break-all">
                                            oaiteramengajar@gmail.com
                                        </a>
                                    </div>
                                </li>
                                <li class="flex items-start gap-3">
                                    <div class="w-6 flex-shrink-0 flex justify-center mt-1">
                                        <i class="fab fa-youtube text-purple-400"></i>
                                    </div>
                                    <div class="flex-1">
                                        <a href="https://www.youtube.com/@ITERAMengajar" class="text-gray-300 hover:text-purple-400 transition" target="_blank">
                                            ITERA MENGAJAR
                                        </a>
                                    </div>
                                </li>
                                <li class="flex items-start gap-3">
                                    <div class="w-6 flex-shrink-0 flex justify-center mt-1">
                                        <i class="fas fa-map-marker-alt text-purple-400"></i>
                                    </div>
                                    <div class="flex-1">
                                        <span class="text-gray-300 leading-relaxed">
                                            Institut Teknologi Sumatera, Jalan Terusan Ryacudu, Way Huwi, Kec. Jati Agung, Kabupaten Lampung Selatan, Lampung 35365
                                        </span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        
                        <!-- Social Media -->
                        <div>
                            <h4 class="text-lg font-bold text-white mb-4">Ikuti Kami</h4>
                            <div class="flex space-x-4">
                                ${socialMediaHTML}
                            </div>
                        </div>
                    </div>
                    
                    <!-- Copyright -->
                    <div class="border-t border-gray-700 mt-8 pt-6 pb-0 text-center text-gray-300">
                        <p>&copy; ${new Date().getFullYear()} ITERA Mengajar. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        `;
    },
    
    init: function() {
        const container = document.getElementById('footer-container');
        if (container) {
            container.innerHTML = this.render();
        }
    }
};

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => FooterComponent.init());
} else {
    FooterComponent.init();
}