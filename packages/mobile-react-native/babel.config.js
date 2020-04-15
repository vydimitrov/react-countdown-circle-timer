module.exports = (api) => {
  api.cache(true)

  const presets = [
    ['@babel/preset-env', { modules: false }],
    'module:metro-react-native-babel-preset',
  ]

  return {
    presets,
  }
}
