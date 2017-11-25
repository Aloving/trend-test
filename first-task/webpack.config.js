const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './src/index',

  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'app.js',
    publicPath: '/js',
  },

  plugins: [
    new UglifyJSPlugin(),
  ],

  devServer: {
    port: 9000,
    contentBase: path.join(__dirname, 'public'),
  },

  devtool: 'cheap-eval-source-map',
};
