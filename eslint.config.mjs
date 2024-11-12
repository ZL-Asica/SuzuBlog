import { zlAsicaTsReactConfig } from 'eslint-config-zl-asica';
import nextPlugin from '@next/eslint-plugin-next';
import { PassThrough } from 'stream';

export default [
  ...zlAsicaTsReactConfig,

  // Next.js Plugin Config
  {
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      'unicorn/prevent-abbreviations': [
        'error',
        {
          allowList: {
            generateStaticParams: true,
            props: true,
            params: true,
          },
        },
      ],
      'react-refresh/only-export-components': [
        'warn',
        {
          allowExportNames: [
            'metadata',
            'generateMetadata',
            'generateStaticParams',
            'generateSitemap',
            'generateRobotsTxt',
            'dynamic',
            'revalidate',
            'fetchCache',
            'config',
            'alternateLinks',
          ],
        },
      ],
    },
  },
  {
    files: ['src/services/**/*.ts'],
    rules: {
      'unicorn/filename-case': ['error', { cases: { camelCase: true } }],
    },
  },
  {
    files: ['src/app/**/*.ts', 'src/app/**/*.tsx'],
    rules: {
      'unicorn/filename-case': [
        'error',
        { cases: { kebabCase: true, pascalCase: true } },
      ],
    },
  },
];
