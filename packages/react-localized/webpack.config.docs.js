const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const host = 'localhost'
const port = 3000

module.exports = {

  entry: path.resolve(__dirname, '../../examples/src/index'),
  output: {
    path: path.resolve(__dirname, '../../docs'),
    publicPath: '',
  },
  target: 'web',
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            configFile: path.resolve(__dirname, '../../.babelrc'),
          },
        },
      },
      {
        test: /\.po$/,
        use: path.resolve(__dirname, '../react-localized-loader/lib/react-localized-loader.js'),
      },
    ],
  },
  resolve: {
    alias: {
      'react-localized': path.resolve(__dirname, '../react-localized'),
      'react-localized-core': path.resolve(__dirname, '../react-localized-core'),
    },
  },
  devServer: {
    host,
    port,
    stats: 'minimal',
  },
}
