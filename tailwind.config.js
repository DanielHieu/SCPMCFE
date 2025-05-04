/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--primary-color)',
        },
        error: {
          DEFAULT: 'var(--error-color)',
        },
        available: {
          bg: 'var(--available-bg)',
          border: 'var(--available-border)',
        },
        occupied: {
          bg: 'var(--occupied-bg)',
          border: 'var(--occupied-border)',
        },
        reserved: {
          bg: 'var(--reserved-bg)',
          border: 'var(--reserved-border)',
        },
        disabled: {
          bg: 'var(--disabled-bg)',
          border: 'var(--disabled-border)',
        },
        selected: {
          bg: 'var(--selected-bg)',
          border: 'var(--selected-border)',
        },
      },
      borderRadius: {
        DEFAULT: 'var(--border-radius)',
      },
      boxShadow: {
        DEFAULT: 'var(--shadow)',
      },
      transitionDuration: {
        DEFAULT: 'var(--transition-speed)',
      },
    },
  },
  plugins: [],
} 