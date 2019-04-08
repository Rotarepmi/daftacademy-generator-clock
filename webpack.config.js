
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

const buildDir = path.resolve(__dirname, "dist");

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  entry: ["@babel/polyfill", "./src/js/index.js"],
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
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
      title: "DaftClock"
    })
  ],
}
