/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  safelist: [
    {
      pattern: /w-\d+/,
    },
    {
      pattern: /h-\d+/,
    },
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        'light-hard': 'var(--light-hard)',
        'light-medium': 'var(--light-medium)',
        light: 'var(--light)',
        'dark-ulta-light': '#3c4045',
        divider: 'var(--divider)',
        placeholder: '#9c89a2',
        success: '#51d686',
        'super-like': '#59c3ff',
        next: '#d52121',
      },
      fontFamily: {
        title: ['Heavitas'],
        base: ['Poppins'],
      },
      fontSize: {
        xs: '0.75rem',
      },
      backgroundImage: {
        background: 'url(/images/home/background.webp)',
      },
      boxShadow: {
        btn: '0px 5px #bd0069',
      },
      scale: {
        moon: 'var(--moon)',
        sun: 'var(--sun)',
      },
      height: {
        'clamp-image': 'clamp(200px, 120vw, 70vh)',
      },
      animation: {
        'spin-infinite': 'spin 8s linear infinite',
      },
      keyframes: {
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
};
