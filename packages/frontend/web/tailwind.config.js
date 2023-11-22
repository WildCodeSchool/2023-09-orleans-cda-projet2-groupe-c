/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#eb0573',
        'primary-dark': '#bd0069',
        secondary: '#3f436a',
        'dark-hard': '#111214',
        'dark-medium': '#1c1c1f',
        'dark-light': '#272721',
        ' dark-ulta-light': '#3c4045',
        'light-hard': '#eae3e3',
        'light-medium': '#f4efef',
        'light-light': '#fcfcfc',
        'divider-dark': '#4d4f58',
        'divider-light': '#ccced7',
        placeholder: '#9c89a2',
        success: '#51d686',
        'super-like': '#59c3ff',
        next: '#d52121',
      },
      fontFamily: {
        title: ['Heavitas'],
        base: ['Poppins'],
      },
    },
  },
  plugins: [],
};
