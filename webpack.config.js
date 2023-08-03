const path = require('path');
const {WebDoctorWebpackPlugin} = require("@web-doctor/webpack-plugin");

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                targets: [
                  '> 0.01%',
                  'not dead',
                  'not op_mini all'
                ],
                modules: false,
                bugfixes: true,
                shippedProposals: false,
                useBuiltIns: 'usage',
                exclude: [
                  'transform-typeof-symbol'
                ],
                corejs: {
                  version: '3.30',
                  proposals: true
                }
              }]
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new WebDoctorWebpackPlugin({
      disableClientServer: false,
    }),
  ],
};
