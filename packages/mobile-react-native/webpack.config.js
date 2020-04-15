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
    alias: {
      react: require.resolve('react'),
      'react-native': require.resolve('react-native'),
      'react-native-svg': require.resolve('react-native-svg'),
    },
  },
  externals: {
    react: 'react',
    'react-native': 'react-native',
    'react-native-svg': 'react-native-svg',
  },
}
