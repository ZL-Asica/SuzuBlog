import process from 'node:process'

/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    'postcss-flexbugs-fixes': {},
    'postcss-preset-env': {
      stage: 3, // Only stable features
      autoprefixer: {
        flexbox: 'no-2009', // Disable flexbox support for IE9
      },
      features: {
        'custom-properties': false, // Disable custom properties
      },
    },
    'tailwindcss': {},
    'autoprefixer': {},
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}), // Add cssnano only in production
  },
}

export default config
