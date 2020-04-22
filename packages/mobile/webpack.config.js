const webpackBaseConfig = require('../../webpack-base-config')

module.exports = {
  ...webpackBaseConfig,
  resolve: {
    ...webpackBaseConfig.resolve,
    alias: {
      ...webpackBaseConfig.resolve.alias,
      'react-native': require.resolve('react-native'),
      'react-native-svg': require.resolve('react-native-svg'),
    },
  },
  externals: {
    ...webpackBaseConfig.externals,
    'react-native': 'react-native',
    'react-native-svg': 'react-native-svg',
  },
}
