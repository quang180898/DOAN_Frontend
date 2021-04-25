const path = require("path");
const globImporter = require("node-sass-glob-importer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: 'development',
  entry: ["./src/index.js"],
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    writeToDisk: true,
    proxy: {
      '/': 'http://localhost:8000'
    },
    host: 'localhost',
    port: 3000,
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg)(\?v=[a-z0-9]\.[a-z0-9]\.[a-z0-9])?$/,
        use: [
            {
                loader: "file-loader",
                options: {
                    limit: false,
                    name: '[name].[ext]',
                    outputPath: "fonts",
                },
            },
        ],
    },
    {
        test: /\.(png|jpg|gif)$/,
        use: [
            {
                loader: "url-loader",
                options: {
                    limit: false,
                    name: "[name].[ext]",
                    outputPath: "images/",
                },
            },
        ],
    },
      {
        test: /\.(scss|css)$/,
        use: [
            MiniCssExtractPlugin.loader,
            {
                loader: "css-loader",
                options: {},
            },
            {
                loader: "sass-loader",
                options: {
                    sassOptions: {
                        importer: globImporter(),
                    },
                },
            },
        ],
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
        filename: '[name].css',
    }),
    new HtmlWebpackPlugin({
        template: "./public/index.html"
    })
  ],
  output: {
    filename: 'bundle.js',
    publicPath: '/',
    path: __dirname + '/dist',
  },
};