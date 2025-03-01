import antfu from '@antfu/eslint-config'
import nextPlugin from '@next/eslint-plugin-next'
// import tailwind from "eslint-plugin-tailwindcss";

export default antfu({
  formatters: true,
  react: true,
  typescript: {
    tsconfigPath: 'tsconfig.json',
  },
  plugins: {
    '@next/next': nextPlugin,
  },
  lessOpinionated: true,
  rules: {
    'react-dom/no-dangerously-set-innerhtml': 'off',
  },
}, {
  files: ['src/app/**/loading.tsx'],
  rules: {
    'react/no-array-index-key': 'off',
  },
}, {
  // TODO: Need wait for their support for tailwindcss v4
  // ! Not support tailwindcss v4 yet
  // files: ['**/*.{ts,tsx}'],
  // ...tailwind.configs["flat/recommended"],
})
