module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|react-native-svg)/)',
  ],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
}
