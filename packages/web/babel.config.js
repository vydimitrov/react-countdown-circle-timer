module.exports = (api) => {
  api.cache(true)

  const presets = ['@babel/preset-env', '@babel/preset-react']

  return {
    presets,
  }
}
