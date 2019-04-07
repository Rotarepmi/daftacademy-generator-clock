
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const buildDir = path.resolve(__dirname, "dist");

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: buildDir
  },
  mode: isProduction ? 'production' : 'development',
  devtool: 'eval',
  devServer: {
    contentBase: buildDir
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.s(a|c)ss$/,
        use: [
          isProduction
            ? MiniCssExtractPlugin.loader
            : { loader: "style-loader", options: { sourceMap: !isProduction } },
          { loader: "css-loader", options: { sourceMap: !isProduction } },
          { loader: "postcss-loader", options: { sourceMap: !isProduction } },
          { loader: 'resolve-url-loader', options: { sourceMap: !isProduction } },
          { loader: "sass-loader", options: { sourceMap: !isProduction } }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "DaftClock"
    })
  ],
}
