const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const host = 'localhost'
const port = 3000

module.exports = {
  entry: [
    `webpack-dev-server/client?http://${host}:${port}`,
    path.resolve(__dirname, 'examples/index'),
  ],
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.po$/,
        use: path.resolve(__dirname, 'messages-loader.js')
      }
    ]
  },
  resolve: {
    alias: {
      'react-localized/lib': path.resolve(__dirname, 'src')
    }
  },
  devServer: {
    host,
    port,
    stats: 'minimal'
  }
}
