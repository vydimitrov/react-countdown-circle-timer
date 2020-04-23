module.exports = (api) => {
  api.cache(true)

  const presets = ['module:metro-react-native-babel-preset']

  return {
    presets,
  }
}
