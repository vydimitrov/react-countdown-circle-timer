const esbuild = require('esbuild')
const pkg = require('../package.json')

const commonProps = {
  entryPoints: [pkg.source],
  bundle: true,
  minify: true,
  external: ['react', 'react-native', 'react-native-svg'],
}

esbuild.build({
  ...commonProps,
  outfile: pkg.main,
  format: 'cjs',
})
