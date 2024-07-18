import type { ModuleFormat, OutputOptions, RollupOptions } from 'rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { getBabelOutputPlugin } from '@rollup/plugin-babel'
import ts from '@rollup/plugin-typescript'
import json from '@rollup/plugin-json'

import pkg from './package.json' assert { type: 'json' }

const formats: Array<ModuleFormat> = [
  'commonjs',
  'esm'
]
const output: Array<OutputOptions> = formats.map((format) => {
  const suffix = {
    value: 'js'
  }
  if (format === 'commonjs') {
    suffix.value = 'cjs'
  }
  const fileName = `bundle.${ format }.${ suffix.value }`
  const result: OutputOptions = {
    file: `dist/${ fileName }`,
    format,
    banner: `
      /**
       * @license
       * author: ${ pkg.author }
       * ${ fileName } v${ pkg.version }
       * Released under the ${ pkg.license } license.
       */
    `,
    sourcemap: false
  }
  return result
})

const rollupConfig: RollupOptions = {
  input: 'src/main.ts',
  output,
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
    ...['path', 'url', 'os', 'stream']
  ],
  plugins: [
    getBabelOutputPlugin(),
    nodeResolve(),
    json(),
    ts({
      compilerOptions: {
        module: 'esnext'
      }
    })
  ]
}

export default rollupConfig
