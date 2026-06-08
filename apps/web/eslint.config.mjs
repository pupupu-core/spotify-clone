import nx from '@nx/eslint-plugin';

import baseConfig from '../../eslint.config.mjs';

export default [
  ...baseConfig,
  ...nx.configs['flat/angular'],
  ...nx.configs['flat/angular-template'],
  {
    files: ['**/*.ts'],
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'ppf',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'ppf',
          style: 'kebab-case',
        },
      ],
      '@angular-eslint/no-forward-ref': 'error',
      '@angular-eslint/no-pipe-impure': 'error',
      '@angular-eslint/prefer-on-push-component-change-detection': 'error',
      '@angular-eslint/no-lifecycle-call': 'error',
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      '@angular-eslint/consistent-component-styles': 'warn',
      '@angular-eslint/prefer-signals': 'warn',
      '@angular-eslint/prefer-output-readonly': 'warn',
      '@angular-eslint/no-empty-lifecycle-method': 'warn',
      'import-x/extensions': [
        'error',
        'ignorePackages',
        {
          ts: 'never',
          js: 'never',
          mts: 'never',
          cts: 'never',
          config: 'off',
          routes: 'off',
          model: 'off',
          pipe: 'off',
          directive: 'off',
          service: 'off',
          component: 'off',
          resolver: 'off',
          mock: 'off',
          fixture: 'off',
          token: 'off',
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    // Override or add rules here
    rules: {
      '@angular-eslint/template/cyclomatic-complexity': ['warn', { maxComplexity: 10 }],
      '@angular-eslint/template/eqeqeq': 'error',
      '@angular-eslint/template/prefer-self-closing-tags': 'warn',
    },
  },
];
