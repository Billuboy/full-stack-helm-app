/* eslint-disable import/no-self-import */
require('esbuild').build({
  entryPoints: ['server.ts'],
  bundle: true,
  minify: true,
  target: 'node20',
  platform: 'node',
  external: ['aws-sdk'],
  outdir: 'out',
});
