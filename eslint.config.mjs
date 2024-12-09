import { zlAsicaTsReactConfig } from 'eslint-config-zl-asica';
import nextPlugin from '@next/eslint-plugin-next';

export default [
  ...zlAsicaTsReactConfig,

  // Next.js Plugin Config
  {
    plugins: {
      '@next/next': nextPlugin
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      'array-element-newline': 'off',
      'unicorn/expiring-todo-comments': 'off',
      'unicorn/filename-case': 'off',
      '@typescript-eslint/no-unused-expressions': 'off'
    }
  }
];
