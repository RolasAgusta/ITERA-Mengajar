/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./pendaftaran.html",
    "./assets/js/**/*.js",
  ],
  theme: {
    container: {
      center: true, // Paksa container selalu di tengah
      padding: '2rem', // Beri padding default agar konten tidak nempel dinding
      screens: {
        '2xl': '1400px', // Batasi lebar maksimal agar tidak terlalu lebar di layar besar
      },
    },
    extend: {},
  },
  plugins: [],
}
