const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { WebDoctorWebpackPlugin } = require("@web-doctor/webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    // clean: true,
  },
  devServer: {
    static: "./dist",
  },
  devtool: "hidden-source-map",
  mode: "production",
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              ["@babel/preset-react", { runtime: "automatic" }],
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new WebDoctorWebpackPlugin({
      disableClientServer: false,
    }),
  ],
};
