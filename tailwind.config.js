/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          default: '#1d355d'
        },
        grey: {
          default: '#f2f2f2'
        },
        border: {
          default: '#6066d0b3'
        },
        text: {
          default: '#6066d0cc'
        },
        question: {
          default: '#2f527b'
        },
        right: {
          default: '#60bf88'
        },
        wrong: {
          default: '#ea8282'
        },
        button: {
          default: '#f9a826'
        }
      }
    }
  },
  plugins: []
}
