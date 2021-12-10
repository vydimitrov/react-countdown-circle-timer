const esbuild = require('esbuild')
const pkg = require('../package.json')

const commonProps = {
  entryPoints: [pkg.source],
  bundle: true,
  external: ['react'],
}

esbuild.build({
  ...commonProps,
  outfile: pkg.main,
  format: 'cjs',
})
