module.exports = (api) => {
  api.cache(true)

  const presets = [
    ['@babel/preset-env', { modules: false }],
    '@babel/preset-react',
  ]

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
