import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import ts from 'rollup-plugin-typescript2'
import json from '@rollup/plugin-json'

import path from 'path'
const pkg = require(path.resolve('package.json'))

const formats = [
  'cjs',
  'umd',
  'esm'
]
const output = formats.map((format) => ({
  file: `dist/bundle.${format}.js`,
  format,
  globals: {
    'koa': 'Koa',
    'koa-router': 'Router',
    'koa-bodyparser': 'bodyParser',
    'dotenv': 'dotenv',
    'puppeteer': 'puppeteer'
  },
  sourcemap: false
}))

export default {
  input: 'src/main.ts',
  output,
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
    ...['path', 'url', 'stream']
  ],
  plugins: [
    nodeResolve(),
    json(),
    ts(),
    commonjs({ extensions: ['.js', '.ts'] })
  ]
}
