module.exports = {
  preset: 'react-native',
  setupFiles: ['./jest/setup.js'],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|react-native-svg)/)',
  ],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
}
