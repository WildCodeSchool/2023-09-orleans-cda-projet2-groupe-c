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
        'divider-dark': '#4d4f58',
        placeholder: '#9c89a2',
        success: '#51d686',
        'super-like': '#59c3ff',
        next: '#d52121',
      },
      fontFamily: {
        title: ['Heavitas'],
        base: ['Poppins'],
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
    },
  },
  plugins: [],
};
