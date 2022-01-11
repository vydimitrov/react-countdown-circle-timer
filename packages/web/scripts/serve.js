require('esbuild').serve(
  {
    servedir: 'example',
    port: 3000,
  },
  {
    entryPoints: ['example/index.tsx'],
    outdir: 'example/js',
    bundle: true,
  }
)
