const webpack = require('webpack');
const path = require('path');


module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist/static/js'),
    publicPath: '/',
    filename: 'main.js'
  },
  mode: 'development',
  devServer: {
    contentBase: './dist',
    compress: true,
    host: '0.0.0.0',
    public: "0.0.0.0:8080",
    port: 3000
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'stage-0', 'react']
          }
        }
      }
    ]
  }
};
