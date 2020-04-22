module.exports = (api) => {
  api.cache(true)

  const presets = ['module:metro-react-native-babel-preset']

  const env = {
    test: {
      plugins: ['@babel/plugin-transform-modules-commonjs'],
    },
  }

  return {
    presets,
    env,
  }
}
