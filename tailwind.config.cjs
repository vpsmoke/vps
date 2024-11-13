/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ['./*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],

  darkMode: ['class', '.body--dark'],

  safelist: ['text-primary-pure'],

  theme: {
    colors: {
      // Light MODE ----------------------------------------------
      white: withOpacity('--white'),
      transparent: 'rgba(255, 255, 255, 0)',
      'neutral-100': withOpacity('--neutral-100'),
      'neutral-70': withOpacity('--neutral-70'),
      'neutral-60': withOpacity('--neutral-60'),
      'neutral-30': withOpacity('--neutral-30'),
      'neutral-20': withOpacity('--neutral-20'),
      'neutral-10': withOpacity('--neutral-10'),
      'neutral-5': withOpacity('--neutral-5'),

      'branding-light': withOpacity('--branding-light'),
      'primary-pure': withOpacity('--primary-pure'),
      'primary-pure-10': withOpacity('--primary-pure-10'),
      'primary-pure-dark': withOpacity('--primary-pure-dark'),

      'alert-error-10': withOpacity('--alert-error-10'),
      'alert-error': withOpacity('--alert-error'),

      'alert-warning-10': withOpacity('--alert-warning-10'),
      'alert-warning': withOpacity('--alert-warning'),

      'alert-success-10': withOpacity('--alert-success-10'),
      'alert-success': withOpacity('--alert-success'),

      // DARK MODE -----------------------------------------------
      'd-neutral-40': withOpacity('--d-neutral-40'),
      'd-neutral-30': withOpacity('--d-neutral-30'),
      'd-neutral-20': withOpacity('--d-neutral-20'),
      'd-neutral-10': withOpacity('--d-neutral-10'),
      // "white": withOpacity("--d-neutral-10"),

      'd-primary-light': withOpacity('--d-primary-light'),
      'd-primary-pure': withOpacity('--d-primary-pure'),
      'd-primary-pure-10': withOpacity('--d-primary-pure-10'),
      'd-primary-pure-dark': withOpacity('--d-primary-pure-dark'),

      'd-alert-error-10': withOpacity('--d-error-10'),
      'd-alert-error': withOpacity('--d-error'),

      'd-alert-warning-10': withOpacity('--d-warning-10'),
      'd-alert-warning': withOpacity('--d-warning'),

      'd-alert-success-10': withOpacity('--d-success-10'),
      'd-alert-success': withOpacity('--d-success'),
    },

    spacing: {
      0: '0',
      1: '1px',
      2: '0.125rem',
      3: '3px',
      4: '0.25rem',
      6: ' 0.38rem',
      8: '0.5rem',
      9: '0.56rem',
      10: '.625rem',
      12: '0.75rem',
      14: '0.875rem',
      16: '1rem',
      18: '1.13rem',
      20: '1.25rem',
      24: '1.5rem',
      28: '1.75rem',
      32: '2rem',
      34: '2.75rem',
      40: '2.5rem',
      42: '2.63rem',
      48: '3rem',
      56: '3.5rem',
      64: '4rem',
      72: '4.5rem',
      80: '5rem',
      96: '6rem',
      120: '7.5rem',
      160: '10rem',
    },

    boxShadow: {
      sm: '0px 1px 1px 0px rgba(0, 0, 0, 0.06)',
      md: ' 0px -1px 2px rgba(0, 0, 0, 0.06), 0px 1px 1px rgba(1, 7, 27, 0.08), 0px 2px 1px rgba(1, 7, 27, 0.06), 0px 1px 3px rgba(1, 7, 27, 0.1)',
      lg: ' 0px 6px 10px rgba(1, 7, 27, 0.08), 0px 1px 18px rgba(1, 7, 27, 0.06), 0px 3px 5px rgba(1, 7, 27, 0.1)',
      xl: '0px 24px 38px rgba(0, 0, 0, 0.04), 0px 9px 46px rgba(0, 0, 0, 0.06), 0px 11px 15px rgba(1, 7, 27, 0.1)',
    },

    fontFamily: {
      sans: ['IBM Plex Sans', 'sans-serif'],
    },

    fontSize: {
      64: '4rem',
      48: '3rem',
      32: '2rem',
      24: '1.5rem',
      20: '1.25rem',
      18: '1.13rem',
      16: '1rem',
      14: '0.88rem',
      12: '0.75rem',
      10: '0.63rem',
    },

    extend: {
      screens: {
        'min2xl': { 'min': '1441px' },
        // => @media (max-width: 1535px) { ... }

        '2xl': { 'max': '1441px' },
        // => @media (max-width: 1535px) { ... }

        'xl': { 'max': '1367px' },
        // => @media (max-width: 1279px) { ... }

        'lg': { 'max': '1281px' },
        // => @media (max-width: 1023px) { ... }

        'md2': { 'max': '1180px' },
        // => @media (max-width: 767px) { ... }

        'md': { 'max': '767px' },
        // => @media (max-width: 767px) { ... }

        'sm': { 'max': '639px' },
        // => @media (max-width: 639px) { ... }

        'xs': { 'max': '500px' },
        // sm: { max: '48rem' },
      },

      backgroundImage: {
        'background-app':
          'linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 15.56%)',
      },

      lineHeight: {
        100: '100%',
        140: '140%',
        150: '150%',
      },
      borderRadius: {
        generic: '3px',
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {

      addUtilities({
        '.text-display': { fontSize: '4rem', lineHeight: '125%', 'letterSpacing': '-0.02em', fontWeight: '400', fontFamily: 'IBM Plex Sans, sans-serif' },
        '.text-title-1': { fontSize: '3rem', lineHeight: '125%', 'letterSpacing': '-0.02em', fontWeight: '400', fontFamily: 'IBM Plex Sans, sans-serif' },
        '.text-title-2': { fontSize: '2rem', lineHeight: '138%', 'letterSpacing': '-0.02em', fontWeight: '400', fontFamily: 'IBM Plex Sans, sans-serif' },
        '.text-title-3': { fontSize: '1.5rem', lineHeight: '133%', 'letterSpacing': '-0.02em', fontWeight: '400', fontFamily: 'IBM Plex Sans, sans-serif' },
        '.text-title-4': { fontSize: '1.125rem', lineHeight: '144%', 'letterSpacing': '-0.02em', fontWeight: '400', fontFamily: 'IBM Plex Sans, sans-serif' },
        '.text-title-5': { fontSize: '1rem', lineHeight: '150%', 'letterSpacing': '-0.02em', fontWeight: '400', fontFamily: 'IBM Plex Sans, sans-serif' },

        '.text-headline-1': { fontSize: '1.125rem', lineHeight: '144%', 'letterSpacing': '-0.02em', fontWeight: '500', fontFamily: 'IBM Plex Sans, sans-serif' },
        '.text-headline-2': { fontSize: '1rem', lineHeight: '150%', 'letterSpacing': '-0.02em', fontWeight: '500', fontFamily: 'IBM Plex Sans, sans-serif' },
        '.text-headline-3': { fontSize: '.875rem', lineHeight: '157%', 'letterSpacing': '-0.02em', fontWeight: '500', fontFamily: 'IBM Plex Sans, sans-serif' },
        '.text-headline-4': { fontSize: '.75rem', lineHeight: '158%', 'letterSpacing': '-0.02em', fontWeight: '500', fontFamily: 'IBM Plex Sans, sans-serif' },
        '.text-headline-5': { fontSize: '.625rem', lineHeight: '180%', 'letterSpacing': '-0.02em', fontWeight: '500', fontFamily: 'IBM Plex Sans, sans-serif' },

        '.text-paragraph-1': { fontSize: '1rem', lineHeight: '150%', 'letterSpacing': '-0.02em', fontWeight: '400', fontFamily: 'IBM Plex Sans, sans-serif' },
        '.text-paragraph-2': { fontSize: '.875rem', lineHeight: '157%', 'letterSpacing': '-0.02em', fontWeight: '400', fontFamily: 'IBM Plex Sans, sans-serif' },
        '.text-paragraph-3': { fontSize: '.75rem', lineHeight: '167%', 'letterSpacing': '-0.02em', fontWeight: '400', fontFamily: 'IBM Plex Sans, sans-serif' },
        '.text-paragraph-4': { fontSize: '.625rem', lineHeight: '180%', 'letterSpacing': '-0.02em', fontWeight: '400', fontFamily: 'IBM Plex Sans, sans-serif' },

        '.text-caps-1': { fontSize: '1rem', lineHeight: '125%', 'letterSpacing': '0.04em', fontWeight: '600', fontFamily: 'IBM Plex Sans, sans-serif', textTransform: 'uppercase' },
        '.text-caps-2': { fontSize: '.75rem', lineHeight: '133%', 'letterSpacing': '0.04em', fontWeight: '600', fontFamily: 'IBM Plex Sans, sans-serif', textTransform: 'uppercase' },
        '.text-caps-3': { fontSize: '.625rem', lineHeight: '160%', 'letterSpacing': '0.04em', fontWeight: '600', fontFamily: 'IBM Plex Sans, sans-serif', textTransform: 'uppercase' }

      })
    }),
  ],
}

function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`
    }
    return `rgb(var(${variableName}))`
  }
}
