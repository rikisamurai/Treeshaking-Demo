const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { WebDoctorWebpackPlugin } = require('@web-doctor/webpack-plugin');

// const MODE = 'production';
const MODE = process.env.DEV ? 'development' : 'production';

module.exports = env => {
  console.log('webpack environment', env);

  return {
    entry: {
      index: './src/index.js',
      print: './src/page/print.js',
    },
    output: {
      filename: '[name].[contenthash:8].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
    devServer: {
      static: './dist',
    },
    devtool: 'hidden-source-map',
    // devtool: 'inline-source-map',
    mode: MODE,
    module: {
      rules: [
        {
          test: /\.(?:js|mjs|cjs)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                ['@babel/preset-react', { runtime: 'automatic' }],
              ],
            },
          },
        },
        {
          test: /\.scss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            // fallback to style-loader in development
            // process.env.NODE_ENV !== "production"
            //   ? "style-loader"
            //   : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                // importLoaders: 1,
                modules: {
                  mode: 'local',
                  localIdentName: '[name]__[local]--[hash:base64:5]',
                },
              },
            },
            {
              loader: 'sass-loader',
            },
          ],
        },
      ],
    },
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
    plugins: [
      new HtmlWebpackPlugin({
        title: 'HtmlWebpackPlugin',
      }),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: '[name].css',
        chunkFilename: '[id].css',
      }),
      process.env.ANALYZE &&
        new WebDoctorWebpackPlugin({
          disableClientServer: false,
          features: ['bundle', 'treeShaking'],
        }),
    ].filter(Boolean),
  };
};
