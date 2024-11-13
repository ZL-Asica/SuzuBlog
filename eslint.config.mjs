import { zlAsicaTsReactConfig } from 'eslint-config-zl-asica';
import nextPlugin from '@next/eslint-plugin-next';

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
      'unicorn/filename-case': 'off',
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
];
