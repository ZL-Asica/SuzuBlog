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
  files: ['src/components/anime/**/*.tsx'],
  rules: {
    'react-hooks-extra/no-direct-set-state-in-use-effect': 'off',
  },
}, {
  files: ['posts/**/*.md'],
  rules: {
    'react-hooks/rules-of-hooks': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'react/display-name': 'off',
    'react/prop-types': 'off',
    'antfu/no-top-level-await': 'off',
  },
}, {
  // TODO: Need wait for their support for tailwindcss v4
  // ! Not support tailwindcss v4 yet
  // files: ['**/*.{ts,tsx}'],
  // ...tailwind.configs["flat/recommended"],
})
