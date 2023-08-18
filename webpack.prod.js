const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = env => {
  console.info(env);
  console.info('env', process.env.NODE_ENV);
  console.info('ANALYZE', process.env.ANALYZE);

  return merge(common, {
    mode: 'production',
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Production',
      }),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: '[name].css',
        chunkFilename: '[id].css',
      }),
    ],
    optimization: {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          'lib-react': {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            priority: 0,
            name: 'lib-react',
            reuseExistingChunk: true,
          },
          'lib-router': {
            test: /[\\/]node_modules[\\/](react-router|react-router-dom|@remix-run\/router|history)[\\/]/,
            priority: 0,
            name: 'lib-router',
            reuseExistingChunk: true,
          },
          'lib-lodash': {
            test: /[\\/]node_modules[\\/](lodash|lodash-es)[\\/]/,
            priority: 0,
            name: 'lib-lodash',
            reuseExistingChunk: true,
          },
        },
      },
      runtimeChunk: 'single',
      // usedExports: false,
      // providedExports: false,
      // minimize: true,
    },
  });
};
