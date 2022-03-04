const fs = require('fs')
const esbuild = require('esbuild')
const pkg = require('../package.json')

const commonProps = {
  entryPoints: [pkg.source],
  bundle: true,
  minify: true,
  external: ['react'],
}

esbuild.build({
  ...commonProps,
  outfile: pkg.main,
  format: 'cjs',
})

esbuild
  .build({
    ...commonProps,
    outfile: pkg.module,
    format: 'esm',
  })
  .then(() => {
    fs.copyFile('../shared/src/types.ts', './lib/index.d.ts', (err) => {
      if (err) {
        throw err
      }
    })
  })
