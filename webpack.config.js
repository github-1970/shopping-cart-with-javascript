const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// for production
require('dotenv').config()
const IS_PROD = (process.env.MODE_ENV == 'production');
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: "./src/js/app.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: IS_PROD ? "[name].[contenthash].bundle.min.js" : "[name].[contenthash].bundle.js",
    clean: true
  },
  mode: process.env.MODE_ENV,
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
			plugins: ['@babel/plugin-transform-runtime']
          }
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]'
        }
      },
      {
        test: /\.(png|jpg|jpeg|svg|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name][ext]'
        }
      },
      {
        test: /\.(mp4)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'video/[name][ext]'
        }
      },
    ],
  },
  plugins: [
    new ESLintPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash].css"
    }),
    new HtmlWebpackPlugin({
      template: 'templates/index.html',
    }),
  ],
  optimization: {
    minimize: IS_PROD,
    minimizer: [
      new HtmlMinimizerPlugin({ parallel: true }),
      new CssMinimizerPlugin({ parallel: true }),
      new TerserPlugin({
        parallel: true,
        extractComments: false
      }),
    ],
  },
};
