/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: '#00C8FF',
                secondary: '#6366f1',
                dark: '#030712',
                card: '#0F172A',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                heading: ['Outfit', 'sans-serif'],
            },
            boxShadow: {
                'glow-sm': '0 0 20px rgba(0, 200, 255, 0.3)',
                'glow-md': '0 0 30px rgba(0, 200, 255, 0.15)',
                'glow-lg': '0 0 40px rgba(0, 200, 255, 0.5)',
            }
        },
    },
    plugins: [],
}
