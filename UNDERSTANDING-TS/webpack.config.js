const path = require('path');

module.exports = {
  mode: 'development',
  // entryを起点としてimportされたfileを全てwebpackで処理する
  entry: './src/app.ts',
  output: {
    filename: 'bundle.js',
    // dynamic filename
    // filename: 'bundle.[contenthash].js',
    // resolve methodで絶対パス取得
    path: path.resolve(__dirname, 'dist'),
    // webpack dev server使用時に使う設定、webpackでbundleされたfileはmemory上に作成されるのでそのfileをindex.htmlで読み込まれるものと同じにする必要がある
    publicPath: 'dist',
  },
  devtool: 'inline-source-map',
  // entryから取得されたfileをどのloaderで処理するか設定する
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  // importしたmoduleにどの拡張子を付与するかを設定
  resolve: {
    extensions: ['.ts', '.js'],
  },
};