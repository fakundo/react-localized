const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const host = 'localhost'
const port = 3000

module.exports = {
  entry: [
    `webpack-dev-server/client?http://${host}:${port}`,
    path.resolve(__dirname, '../../examples/src'),
  ],
  devtool: 'inline-source-map',
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
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
            ],
            plugins: [
              '@babel/plugin-transform-runtime',
              ['@babel/plugin-proposal-decorators', { legacy: true }],
            ],
          },
        },
      },
      {
        test: /\.po$/,
        use: path.resolve(__dirname, '../react-localized-loader/lib'),
      },
    ],
  },
  resolve: {
    alias: {
      'react-localized': path.resolve(__dirname, '../react-localized/src'),
      'react-localized-core': path.resolve(__dirname, '../react-localized-core/src'),
    },
  },
  devServer: {
    host,
    port,
    stats: 'minimal',
  },
}
