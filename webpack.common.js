const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { WebDoctorWebpackPlugin } = require('@web-doctor/webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.js',
    print: './src/page/print.js',
  },
  output: {
    filename: '[name].[contenthash:8].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'usage',
                  corejs: '3.22',
                },
              ],
              ['@babel/preset-react', { runtime: 'automatic' }],
            ],
          },
        },
      },
      {
        test: /\.css$/i,
        exclude: /\.module\.css$/i,
        use: [
          process.env.NODE_ENV !== 'production'
            ? 'style-loader'
            : MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.module\.css$/i,
        use: [
          process.env.NODE_ENV !== 'production'
            ? 'style-loader'
            : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                mode: 'local',
              },
            },
          },
        ],
      },
      {
        test: /\.scss$/i,
        exclude: /\.module\.scss$/i,
        use: [
          // MiniCssExtractPlugin.loader,
          // fallback to style-loader in development
          process.env.NODE_ENV !== 'production'
            ? 'style-loader'
            : MiniCssExtractPlugin.loader,
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
      // SCSS MODULES
      {
        test: /\.module\.scss$/i,
        use: [
          process.env.NODE_ENV !== 'production'
            ? 'style-loader'
            : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                mode: 'local',
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
  plugins: [
    process.env.ANALYZE &&
      new WebDoctorWebpackPlugin({
        disableClientServer: false,
        features: ['bundle', 'treeShaking'],
      }),
  ].filter(Boolean),
};
