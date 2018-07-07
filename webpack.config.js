const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body'
})
const fs = require('fs')
 // node@8.0.0
 // npm@5.0.0
 // npm zainstalowany globalnie

var webpackConfig = {
  entry: './src/index.jsx',
  output: {
    path: '/dist',
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.json$/, loader: 'json-loader'},
      { test: /\.css$/, loader: "style-loader!css-loader?importLoaders=1" },
      { test: /\.(scss)$/, use: [
          { loader: 'style-loader' }, 
          { loader: 'css-loader' }, 
          { loader: 'postcss-loader', options: {
              plugins: function () { // post css plugins, can be exported to postcss.config.js
              return [
                  require('precss'),
                  require('autoprefixer')
                ];
              }
            }}, 
          { loader: 'sass-loader'}
        ]}
    ],

  },
  devServer: {
    port: 3000,
    historyApiFallback: true, // dzięki temu działa router(nie wiem czemu)
    contentBase: './',
    proxy: { // proxy URLs to backend development server
      '/api/**': {
        target: 'http://localhost:8080'
      },
    },
  },
  plugins: [
    HtmlWebpackPluginConfig,
    ]
}

module.exports = webpackConfig