import antfu from '@antfu/eslint-config'
import nextPlugin from '@next/eslint-plugin-next'
import tailwind from 'eslint-plugin-tailwindcss'

export default antfu({
  react: true,
  typescript: {
    tsconfigPath: 'tsconfig.json',
  },
  formatters: {
    css: true,
    html: true,
    markdown: 'prettier',
  },
  plugins: {
    '@next/next': nextPlugin,
  },
  rules: {
    'react-dom/no-dangerously-set-innerhtml': 'off',
  },
  ...tailwind.configs['flat/recommended'],
  settings: {
    tailwindcss: {
      callees: ['classnames', 'clsx', 'ctl', 'className'],
      config: 'tailwind.config.ts',
    },
  },
})
