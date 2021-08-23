const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const host = 'localhost'
const port = 3000

module.exports = {
  entry: path.resolve(__dirname, '../../examples/src/index.tsx'),
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.tsx$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.po$/,
        use: path.resolve(__dirname, '../react-localized-loader/lib/react-localized-loader.js'),
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.js'],
    alias: {
      'lib': path.resolve(__dirname, '../../examples/src/__react.tsx'), // eslint-disable-line
      'react-localized': path.resolve(__dirname, '../react-localized'),
      'react-localized-core': path.resolve(__dirname, '../react-localized-core'),
    },
  },
  devServer: {
    host,
    port,
    open: true,
  },
}
