import { CheckerPlugin } from 'awesome-typescript-loader';
import * as nodeExternals from 'webpack-node-externals';
import Helpers from './helpers';

module.exports = {
  target: 'node',

  devtool: 'source-map',

  entry: {
    index: Helpers.rootForSrc('index.ts'),
    'extract-excel.worker': Helpers.rootForSrc('app/workers/extract-excel.worker.ts')
  },

  output: {
    path: Helpers.rootForRelease(),
    filename: '[name].js'
  },

  resolve: {
    extensions: ['.ts', '.js', '.json'],

    modules: ['node_modules', Helpers.rootForSrc()]
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader'
      }
    ]
  },

  plugins: [new CheckerPlugin()],

  /**
   * The externals configuration option provides a way of excluding dependencies from the output bundles
   * @refer https://webpack.js.org/configuration/externals/
   */
  externals: [
    // don't bundle node_modules to output
    // this can accelerate compiling
    nodeExternals()
  ]
};
