import { RollupOptions, ModuleFormat, OutputOptions } from 'rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { getBabelOutputPlugin } from '@rollup/plugin-babel'
import ts from 'rollup-plugin-typescript2'
import json from '@rollup/plugin-json'
import commonjs from '@rollup/plugin-commonjs'
import path from 'path'

const { getPresetsEnv } = require('./babel.presets')
const pkg = require(path.resolve('package.json'))

const formats: Array<ModuleFormat> = [
  'cjs',
  'esm'
]
const output: Array<OutputOptions> = formats.map((format) => {
  const fileName = `bundle.${format}.js`
  const result: OutputOptions = {
    file: `dist/${fileName}`,
    format,
    banner: `
      /**
       * @license
       * author: ${pkg.author}
       * ${fileName} v${pkg.version}
       * Released under the ${pkg.license} license.
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
    getBabelOutputPlugin({
      presets: [
        getPresetsEnv(false)
      ]
    }),
    nodeResolve(),
    json(),
    ts({
      tsconfigOverride: {
        compilerOptions: {
          module: 'esnext'
        }
      }
    })
    // Warning: Use --bundleConfigAsCjs instead of commonjs
    // commonjs({
    //   extensions: ['.js', '.ts']
    // })
  ]
}

export default rollupConfig
