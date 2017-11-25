const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './src/index',

  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },

  plugins: [
    new UglifyJSPlugin(),
  ],

  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'app.js',
    publicPath: '/js',
  },

  devServer: {
    port: 9000,
    contentBase: path.join(__dirname, 'public'),
  },

  devtool: 'cheap-eval-source-map',
};
