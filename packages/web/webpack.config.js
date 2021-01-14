const webpackBaseConfig = require('../../webpack-base-config')

module.exports = {
  ...webpackBaseConfig,
  target: ['web', 'es5'], // Support IE11 and old browsers
}
