import baseConfig from '../../eslint.config.mjs';

export default [
  ...baseConfig,
  {
    files: ['**/*.ts'],
    rules: {
      '@typescript-eslint/consistent-type-imports': 'off',
      '@typescript-eslint/parameter-properties': [
        'error',
        {
          prefer: 'class-property',
          allow: ['private readonly', 'protected readonly', 'readonly'],
        },
      ],
    },
  },
];
