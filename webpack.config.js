var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    'babel-polyfill',
    './src'
  ],

  output: {
    path:     './build',
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      {
        test:    /\.scss?$/,
        loaders: ['style', 'css', 'sass']
      },
      {
        test:    /\.jsx?$/,
        exclude: /node_modules/,
        loader:  'babel-loader',
        include: [
          path.resolve(__dirname, 'src')
        ]
      }
    ],

    plugins: [
      new HtmlWebpackPlugin({
        title: 'React Universal Starter App'
      })
    ],

    devtool: 'source-map'
  }
};
