const quote = files => files.map(file => JSON.stringify(file)).join(' ');

export default {
  '*.{ts,tsx,js,jsx,cjs,mjs,cts,mts}': files => [
    `pnpm exec eslint --fix --cache --cache-location .cache/eslint/.eslintcache ${quote(files)}`,
    `pnpm exec prettier --write ${quote(files)}`,
  ],

  '*.{scss,css}': files => [
    `pnpm exec stylelint --fix ${quote(files)}`,
    `pnpm exec prettier --write ${quote(files)}`,
  ],

  '*.{html,json,md,yml,yaml}': files => [`pnpm exec prettier --write ${quote(files)}`],
};
