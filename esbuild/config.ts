import { BuildOptions } from 'esbuild'

export const esBuildConfig = (): BuildOptions => ({
  entryPoints: ['./src/index.ts'],
  outdir: 'dist',
  bundle: true,
  metafile: true,
  sourcemap: false,
  minify: true,
  splitting: false,
  format: 'esm',
  color: true,
  publicPath: '/',
  loader: {
    '.png': 'file',
    '.svg': 'file',
    '.jpg': 'file',
    '.js': 'jsx'
  },
  external: ['react', 'react-router-dom']
})
