# ITERA Mengajar Website

Website profil untuk organisasi ITERA Mengajar - Program pengabdian masyarakat Institut Teknologi Sumatera.

## 🚀 Fitur

- **Hero Section** - Banner utama dengan call-to-action
- **Stats Section** - Statistik pencapaian organisasi
- **Philosophy Section** - Filosofi dan visi organisasi
- **Leadership Timeline** - Timeline ketua pelaksana dari tahun 2019-2025 (dengan Swiper carousel)
- **Programs Section** - Carousel program kerja utama dan kolaborasi
- **FAQ Section** - Accordion untuk pertanyaan umum
- **Footer** - Informasi kontak dan media sosial

## 🛠️ Tech Stack

- **HTML5** - Struktur halaman
- **Tailwind CSS v4** - Styling dengan utility-first CSS (Local CLI)
- **Vanilla JavaScript** - Component-based architecture
- **Swiper.js v11** - Carousel/slider untuk leadership dan programs
- **Font Awesome 6.4.0** - Icon library

## 📦 Instalasi

1. Clone repository ini:
```bash
git clone <repository-url>
cd "ITERA Mengajar"
```

2. Install dependencies:
```bash
npm install
```

3. Build Tailwind CSS:
```bash
npm run build
```

## 🔧 Development

1. Jalankan Tailwind CLI dalam watch mode (auto-rebuild saat ada perubahan):
```bash
npm run dev
```

2. Buka file `index.html` di browser atau jalankan local server:
```bash
python3 -m http.server 8000
```

3. Akses website di: `http://localhost:8000`

## 📁 Struktur Folder

```
ITERA Mengajar/
├── index.html                 # Main HTML file
├── assets/
│   ├── css/
│   │   ├── input.css         # Tailwind source file
│   │   ├── output.css        # Compiled CSS (96KB)
│   │   └── style.css         # Custom styles
│   ├── js/
│   │   ├── main.js           # Main JS entry point
│   │   └── component/
│   │       ├── navbar.js     # Navigation component
│   │       ├── hero.js       # Hero section
│   │       ├── stats.js      # Statistics cards
│   │       ├── philosophy.js # Philosophy section
│   │       ├── leadership.js # Leadership timeline (Swiper)
│   │       ├── programs.js   # Programs carousel (Swiper)
│   │       ├── faq.js        # FAQ accordion
│   │       └── footer.js     # Footer component
│   └── img/                  # Images folder
├── tailwind.config.js        # Tailwind configuration
├── package.json              # NPM scripts
└── README.md
```

## 🎨 Tailwind Configuration

Website ini menggunakan **Tailwind CSS v4** dengan konfigurasi container:

```javascript
container: {
  center: true,       // Auto center dengan mx-auto
  padding: '2rem',    // Padding horizontal 32px
  screens: {
    '2xl': '1400px',  // Max-width untuk layar besar
  },
}
```

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (1 column)
- **Tablet**: 640px - 1023px (2 columns)
- **Desktop**: ≥ 1024px (4 columns untuk leadership timeline)

## 🎯 Key Features

### Leadership Timeline
- Swiper carousel dengan 4 kartu di desktop
- Pagination dots (hidden di mobile)
- Smooth scroll animation
- Dimulai dari tahun terbaru (2025)

### Programs Carousel
- 2 tab: Program Utama & Kolaborasi
- Equal height cards
- Infinite loop
- Auto height adjustment

### FAQ Accordion
- Single item open at a time
- Smooth transitions
- Purple active state

## 📄 Scripts

```json
{
  "dev": "tailwindcss -i assets/css/input.css -o assets/css/output.css --watch",
  "build": "tailwindcss -i assets/css/input.css -o assets/css/output.css --minify"
}
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Contact

- **Instagram**: [@iteramengajar](https://instagram.com/iteramengajar)
- **Email**: oaiteramengajar@gmail.com
- **Phone**: +62 896 2994 4399
- **Address**: Jl. Terusan Ryacudu, Way Huwi, Kec. Jati Agung, Lampung Selatan

## 📝 License

Copyright © 2025 ITERA Mengajar
