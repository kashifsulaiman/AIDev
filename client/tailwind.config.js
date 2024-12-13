/** @type {import('tailwindcss').Config} */
const { nextui } = require('@nextui-org/react');

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/common/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      borderImage: {
        gradient:
          'linear-gradient(90.21deg, #FEE3B7 16.98%, #D992EA 50.35%, #9AE1FF 78.82%)',
      },

      backgroundImage: {
        'custom-gradient': 'linear-gradient(90deg, #961CBE 0%, #0F47F6 100%)',
        'custom-white':
          'linear-gradient(31.33deg, #ffffff 27.32%, #ffffff 86.89%)',
        'card-gradient':
          'linear-gradient(31.33deg, #B031F3 27.32%, #583DE0 86.89%)',
        'auth-gradient':
          'linear-gradient(106.28deg, #961CBE 34.87%, #0F47F6 98.02%)',
        'contact-gradient': 'linear-gradient(90deg, #961CBE 0%, #0F47F6 100%)',
        'card-team': 'linear-gradient(90deg, #961CBE 0%, #0F47F6 100%)',

        'purple-white-gradient-opactity25':
          'linear-gradient(289.67deg, #961cbe40 0.54%, #fefdff40 56.73%)',
        'purple-white-gradient':
          'linear-gradient(90deg, #961CBE 0%, #0F47F6 100%)',
        'purple-white-commingsoon':
          'linear-gradient(359deg, #961cbe40 0.54%, #fefdff40 56.73%)',
        'text-gradient': 'linear-gradient(90deg, #961CBE 0%, #0F47F6 100%)',
        'footer-gradient':
          'linear-gradient(3deg, #961cbe40 0.54%, #fefdff40 56.73%)',
      },
      backdropBlur: {
        '400px': '400px',
      },
      fontFamily: {
        Inter: ['Inter', 'sans-serif'],
        Noto: ['Noto Sans', 'sans-serif'],
        Kumbh: ['Kumbh Sans', 'sans-serif'],
        Anisha: ['Anisha', 'sans-serif'],
        Jakarta: ['Plus Jakarta Sans', 'sans-serif'],
        Sora: ['Sora', 'sans-serif'],
      },
      screens: {
        xs: '420px',
      },
      boxShadow: {
        'custom-1': '0px 1px 2px -1px rgba(0, 0, 0, 0.1)',
        xl: '0px 16px 44px 0px rgba(0, 0, 0, 0.07)',
        purple: '18.01px 26.06px 0px 0px #8A21C4',
        'custom-hero': '-2px 0 16px 17px #5c2d6fa1',
        'light-purple': '0 0 26px 20px #8923c55e',

        custom: '0px 4.43px 16.62px 0px #00000040',
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
      },
      borderRadius: {
        '3xl': '20px',
        40: '40px',
      },
      lineHeight: {
        11: '3rem',
      },
      maxWidth: {
        sm: '360px',
        '3xl': '800px',
        480: '480px',
        520: '520px',
      },
      minWidth: {
        480: '480px',
        520: '520px',
        560: '560px',
      },
      minHeight: {
        140: '140px',
      },

      colors: {
        'custom-purple': '#9B1BB9',
        'custom-blue': '#1147F6',
        purplish: '#BE87FF',
        gray: {
          100: '#96B1CD',
          150: '#ADADAD',
          200: '#4F6169',
          250: '#6C7275',
          300: '#D0D5DD',
          400: '#CBD5E0',
          500: '#a0aec0',
          600: '#718096',
          700: '#4A5568',
          800: '#2d3748',
          900: '#1a202c',
        },
        authgray: {
          100: '#0F172A',
          200: '#111827',
          300: '#475569',
          400: '#64748B',
        },
        authblue: {
          100: '#1D4ED8',
        },
        contactcolors: {
          100: 'var(--Black, #0E2242)',
          200: '#888888',
          300: '#C9C9C9',
          400: '#F6AF03',
        },
        aboutcolors: {
          100: '#4F4E4E',
        },
        primary: {
          100: '#8A21C4', //purple slider card bg
          800: '#376EE7',
          900: '#2a4365',
        },
        secondary: {
          100: '#ebf8ff',
          200: '#bee3f8',
          300: '#90cdf4',
          400: '#63b3ed',
          500: '#4299e1',
          600: '#3182ce',
          700: '#EB66A6',
        },
        blueTheme: {
          100: '#0070E0',
          600: '#376EE7',
          950: '#192652',
        },
        blakeTheme: {
          500: '#6D6D6D',
        },
        darkblue: {
          100: '#001635',
        },
        bordercolors: {
          100: '#5F3DE28F',
        },
      },
      animation: {
        grow: 'grow 1.2s ease-in-out',
        grows: 'grows 1.2s ease-in-out',
      },
      keyframes: {
        grow: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(0.7)' },
        },
        grows: {
          '0%': { transform: 'scale(0.8)' },
          '100%': { transform: 'scale(1)' },
        },
      },
    },
  },
  // darkMode: 'class',
  plugins: [nextui()],
};
