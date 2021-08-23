const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const host = 'localhost'
const port = 3000

module.exports = {
  entry: path.resolve(__dirname, 'src/index.tsx'),
  output: {
    path: path.resolve(__dirname, '../docs'),
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
        test: /\.tsx$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.po$/,
        use: path.resolve(__dirname, '../packages/react-localized-loader/lib/react-localized-loader.js'),
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.js'],
    alias: {
      'lib': path.resolve(__dirname, 'src/__react.tsx'), // eslint-disable-line
      'react-localized': path.resolve(__dirname, '../packages/react-localized'),
      'react-localized-core': path.resolve(__dirname, '../packages/react-localized-core'),
    },
  },
  devServer: {
    host,
    port,
  },
}
