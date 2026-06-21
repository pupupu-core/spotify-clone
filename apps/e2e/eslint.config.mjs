import playwright from 'eslint-plugin-playwright';

import baseConfig from '../../eslint.config.mjs';

export default [
  playwright.configs['flat/recommended'],
  ...baseConfig,
  {
    files: ['**/*.ts', '**/*.js'],
    // Override or add rules here
    rules: {
      'import-x/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: true,
        },
      ],
      'playwright/expect-expect': [
        'error',
        {
          assertFunctionNames: ['expect', 'expectOpened'],
        },
      ],
    },
  },
];
