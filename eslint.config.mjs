import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: ['next-env.d.ts'],
  formatters: true,
  nextjs: true,
  typescript: {
    tsconfigPath: 'tsconfig.json',
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
})
