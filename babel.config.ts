/**
 * Configuration for development environment only
 */

export default {

  presets: [
    '@babel/preset-env', {
      targets: {
        node: 'current',
      },
      // https://github.com/babel/babel/issues/10374#issuecomment-597029696
      modules: 'auto',
    },
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@': './src',
        },
      },
    ],
  ],
}
