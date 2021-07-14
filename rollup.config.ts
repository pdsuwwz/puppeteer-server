import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import ts from 'rollup-plugin-typescript2'
import json from '@rollup/plugin-json'

import path from 'path'
const pkg = require(path.resolve('package.json'))

const formats = [
  'cjs',
  'esm'
]
const output = formats.map((format) => ({
  file: `dist/bundle.${format}.js`,
  format,
  sourcemap: false
}))

export default {
  input: 'src/main.ts',
  output,
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
    ...['path', 'url', 'os', 'stream']
  ],
  plugins: [
    nodeResolve(),
    json(),
    ts({
      tsconfigOverride: {
        compilerOptions: {
          module: 'esnext'
        }
      }
    }),
    commonjs({ extensions: ['.js', '.ts'] })
  ]
}
