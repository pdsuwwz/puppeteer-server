const path = require('node:path')
const { name } = require('./package.json')

module.exports = {
  apps: [
    {
      name,
      script: path.resolve(__dirname, './dist/bundle.commonjs.cjs'),
      instances: require('node:os').cpus().length,
      autorestart: true,
      watch: true,
      cron_restart: '0 3 * * *',
      env_production: {
        NODE_ENV: 'production',
        PORT: 8080,
      },
    },
  ],
}
