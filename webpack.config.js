const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackBar = require("webpackbar");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    publicPath: "/",
    path: path.join(__dirname, "build"),
    filename: "[name].[contenthash].js",
  },
  mode: process.env.NODE_ENV || "development",
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ["ts-loader"],
      },
      {
        test: /\.(css|scss)$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
        use: ["file-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "index.html"),
    }),
    new ESLintPlugin({
      extensions: ["js", "jsx", "ts", "tsx"],
    }),
    new WebpackBar({
      name: "hristov.dev",
    }),
  ],
  devtool: "source-map",
  devServer: {
    port: 8080,
    historyApiFallback: true,
  },
};
