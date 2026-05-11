/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-clean-order'],
  rules: {
    'at-rule-no-unknown': null,
    'selector-class-pattern': null,
    'selector-pseudo-element-no-unknown': [true, { ignorePseudoElements: ['ng-deep'] }],
    'no-empty-source': null,
  },
  overrides: [
    {
      files: ['**/*.component.ts'],
      customSyntax: 'postcss-angular',
      rules: {
        'no-empty-source': null,
      },
    },
  ],
  ignoreFiles: ['**/*', '!apps/web/src/**/*.scss', '!apps/web/src/**/*.component.ts'],
};
