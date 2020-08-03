const path = require('path');

module.exports = {
  entry: './src/app.ts',
  output: {
    filename: 'bundle.js',
    // dynamic filename
    // filename: 'bundle.[contenthash].js',
    // resolve methodで絶対パス取得
    path: path.resolve(__dirname, 'dist'),
  },
};