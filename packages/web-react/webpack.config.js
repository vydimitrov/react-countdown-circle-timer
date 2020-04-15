var path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  devtool: 'source-map',
  output: {
    path: path.resolve('lib'),
    filename: 'index.js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: 'babel-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: { react: require.resolve('react') },
  },
  externals: {
    react: {
      root: 'react',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
  },
}
