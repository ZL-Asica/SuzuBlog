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
    '@tailwindcss/postcss': {},
  },
}

export default config
