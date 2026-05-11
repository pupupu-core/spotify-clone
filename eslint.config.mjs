import nx from '@nx/eslint-plugin';
import stylistic from '@stylistic/eslint-plugin';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import { importX } from 'eslint-plugin-import-x';
import unusedImports from 'eslint-plugin-unused-imports';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  ...nx.configs['flat/angular'],
  ...nx.configs['flat/angular-template'],
  {
    ignores: ['**/dist', '**/out-tsc', '**/vitest.config.*.timestamp*'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$'],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],
    },
  },
  {
    files: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.cts',
      '**/*.mts',
      '**/*.js',
      '**/*.jsx',
      '**/*.cjs',
      '**/*.mjs',
    ],
    // Override or add rules here
    plugins: {
      '@stylistic': stylistic,
      'import-x': importX,
      'unused-imports': unusedImports,
    },
    settings: {
      'import-x/extensions': ['.ts', '.tsx', '.cts', '.mts', '.js', '.jsx', '.cjs', '.mjs'],
      'import-x/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx', '.cts', '.mts'],
      },
      'import-x/resolver-next': [
        createTypeScriptImportResolver({
          project: './tsconfig.base.json',
        }),
      ],
    },
    rules: {
      'import-x/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: [
            '**/*.config.*',
            '**/*.spec.ts',
            '**/*.test.ts',
            '**/eslint.config.*',
            '**/playwright.config.*',
            '**/vitest.config.*',
          ],
        },
      ],
      'import-x/order': [
        'error',
        {
          alphabetize: { order: 'asc' },
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
        },
      ],
      'import-x/no-cycle': ['error', { maxDepth: Infinity }],
      'import-x/first': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/array-type': ['error', { default: 'array', readonly: 'array' }],
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        { ignoredMethodNames: ['constructor', 'transform'] },
      ],
      '@typescript-eslint/parameter-properties': 'error',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',

      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/no-empty-object-type': 'error',
      '@typescript-eslint/no-empty-function': 'warn',
      '@typescript-eslint/no-useless-constructor': 'error',
      '@typescript-eslint/naming-convention': [
        'warn',
        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
        },
      ],
      'prefer-const': 'error',
      'prefer-arrow-callback': 'error',
      'no-confusing-arrow': ['error', { allowParens: true }],
      'no-implicit-coercion': ['error', { allow: ['!!'] }],
      'sort-imports': [
        'error',
        {
          ignoreCase: true,
          ignoreDeclarationSort: true,
          allowSeparatedGroups: true,
        },
      ],
      complexity: ['error', 20],
      // '@stylistic/max-len': [
      //   'warn',
      //   {
      //     code: 120,
      //     comments: 180,
      //     ignoreTemplateLiterals: true,
      //     ignoreStrings: true,
      //   },
      // ],
      // 'max-lines': ['warn', 400],
      'max-classes-per-file': ['error', 1],
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],
      '@stylistic/padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: ['const', 'let'], next: '*' },
        {
          blankLine: 'any',
          prev: ['const', 'let'],
          next: ['const', 'let'],
        },
        { blankLine: 'always', prev: ['case', 'default'], next: '*' },
        { blankLine: 'always', prev: 'import', next: '*' },
        { blankLine: 'any', prev: 'import', next: 'import' },
      ],
    },
  },
  {
    files: ['apps/**/*.{ts,tsx,cts,mts}', 'packages/**/*.{ts,tsx,cts,mts}'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/no-unsafe-return': 'error',
      '@typescript-eslint/strict-boolean-expressions': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      '@typescript-eslint/prefer-readonly': 'error',
    },
  },
  {
    files: ['apps/api/**/*.ts'],
    rules: {
      '@typescript-eslint/consistent-type-imports': 'off',
      '@typescript-eslint/parameter-properties': [
        'error',
        {
          prefer: 'class-property',
          allow: ['private readonly', 'protected readonly', 'readonly'],
        },
      ],
      '@typescript-eslint/strict-boolean-expressions': 'off',
    },
  },
  {
    files: ['apps/web/**/*.ts'],
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
      '@angular-eslint/prefer-on-push-component-change-detection': 'error',
      '@angular-eslint/no-forward-ref': 'error',
      '@angular-eslint/no-pipe-impure': 'error',
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
    files: ['apps/web/**/*.html'],
    rules: {
      '@angular-eslint/template/cyclomatic-complexity': ['warn', { maxComplexity: 10 }],
      '@angular-eslint/template/eqeqeq': 'error',
      '@angular-eslint/template/prefer-self-closing-tags': 'warn',
    },
  },
  {
    files: ['**/*.dto.ts', '**/*.schema.ts'],
    rules: {
      'max-classes-per-file': 'off',
    },
  },
];
