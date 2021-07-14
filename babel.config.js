/**
 * Configuration for development environment only
 */

const { getPresetsEnv } = require('./babel.presets')

module.exports = {
  presets: [
    getPresetsEnv(),
    '@babel/preset-typescript'
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@': './src'
        }
      }
    ]
  ]
}
