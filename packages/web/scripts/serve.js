require('esbuild').serve(
  {
    servedir: 'example',
    port: 8888,
  },
  {
    entryPoints: ['example/index.tsx'],
    outdir: 'example/js',
    bundle: true,
  }
)
