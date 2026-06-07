const { join } = require('path');

const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');

module.exports = {
  resolve: {
    alias: {
      '$/core': join(__dirname, 'src/app/core'),
      '$/gateway': join(__dirname, 'src/app/gateway'),
      '$/infrastructure': join(__dirname, 'src/app/infrastructure'),
      '$/shared': join(__dirname, 'src/app/shared'),

      '@streaming-service/utils': join(__dirname, '../../packages/shared/utils/src/index.ts'),
      '@streaming-service/config': join(__dirname, '../../packages/shared/config/src/index.ts'),
      '@streaming-service/model': join(__dirname, '../../packages/shared/model/src/index.ts'),
    },
    extensions: ['.ts', '.js'],
  },
  output: {
    path: join(__dirname, '../../dist/apps/api'),
    clean: true,
    ...(process.env.NODE_ENV !== 'production' && {
      devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    }),
  },
  plugins: [
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
  ],
};
