import { join } from 'path';

import { NxAppWebpackPlugin } from '@nx/webpack/app-plugin';

export const output = {
  path: join(__dirname, '../../dist/apps/api'),
  clean: true,
  ...(process.env.NODE_ENV !== 'production' && {
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
  }),
};
export const plugins = [
  new NxAppWebpackPlugin({
    target: 'node',
    compiler: 'tsc',
    main: './src/main.ts',
    tsConfig: './tsconfig.app.json',
    assets: ['./src/assets'],
    optimization: false,
    outputHashing: 'none',
    generatePackageJson: true,
    sourceMap: true,
  }),
];
